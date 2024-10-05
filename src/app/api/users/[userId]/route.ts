import { NextResponse } from "next/server";
import { connectToDatabase } from "@/database/mongoose";
import User from "@/database/models/User";
import { endOfToday, startOfMonth, startOfWeek, startOfYear, subDays } from "date-fns";

type Range = "all" | "week" | "month" | "year";

export async function GET(
    request: Request,
    { params }: { params: { userId: string } }
  ) {
    try {
      const userId = params.userId;
  
      const url = new URL(request.url);
      const field = url.searchParams.get("field");
      
      // Connect to the database
      await connectToDatabase();
  
      // Get weight by date range
      if (field === "weight") {
        const range = url.searchParams.get("range") as Range;
  
        const endOfRange = endOfToday();
        let startOfRange: Date;
  
        // Set the start of range based on the query parameter
        switch (range) {
          case "week":
            startOfRange = startOfWeek(new Date());
            break;
          case "month":
            startOfRange = subDays(new Date(), 30);
            break;
          case "year":
            startOfRange = startOfYear(new Date());
            break;
          case "all":
            startOfRange = new Date(0);
            break;
          default:
            return NextResponse.json(
              { error: "Invalid range parameter" },
              { status: 400 }
            );
        }
  
        const user = await User.findById(userId, "stats");
        if (!user) {
          return NextResponse.json(
            { error: "User not found" },
            { status: 404 }
          );
        }

        let weight

        if(user.stats?.weight){   
            // Filter weight entries by the specified date range
            weight = user.stats?.weight ? user.stats.weight.toObject().filter(
                (w: { value: number; date: string; units: "kg" | "lb" }) => {
                    const weightDate = new Date(w.date); 
                    return weightDate >= startOfRange && weightDate <= endOfRange;
                }
            ) : [];
        }else{
            weight = []
        }  
        return NextResponse.json({ weight });
      }
  
      // If no specific field is requested, return the entire user
      const user = await User.findById(userId, '-stats');
      console.log(user)
      if (!user) {
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(user);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
        return NextResponse.json({ error: err.message }, { status: 500 });
      }
      
      // Fallback for any other errors
      return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
  }

export async function PATCH(
  request: Request,
  { params }: { params: { userId: string } }
) {
  let updateQuery;

  try {
    const userId = params.userId;
    const update = await request.json();
    if (update.action === "update-weight") {
      updateQuery = {
        $push: {
          "stats.weight": {
            value: update.weight,
            date: new Date(),
            units: "kg",
          },
        },
      };
    }
    console.log(updateQuery);
    await connectToDatabase();
    const user = await User.findByIdAndUpdate(userId, updateQuery);
    return NextResponse.json({ message: "hello" });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }
    return NextResponse.json({ message: "error" });
  }
}
