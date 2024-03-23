"use server";

import { Document } from "mongoose";
import User from "./database/models/User";
import { connectToDatabase } from "./database/mongoose";
import { Days, Mesocycle as MesocycleType } from "./types";
import Mesocycle from "./database/models/Mesocycle";
import {differenceInWeeks, previousMonday, startOfDay} from 'date-fns'

export async function createUser(user: any) {
  try {
    await connectToDatabase();
    const newUser: Document = await User.create(user);
    console.log("newUser: ", newUser);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();
    const deletedUser = await User.findOneAndDelete({ clerkId });
    console.log("deletedUser: ", deletedUser);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
}

export async function updateUser(user: any) {
  try {
    await connectToDatabase();
    const updatedUser = await User.findOneAndUpdate(
      { clerkId: user.clerkId },
      user
    );
    console.log("updatedUser: ", updatedUser);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
}

export async function createMesocycle(
  mesocycle: MesocycleType,
  clerkId: string
) {
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId });
    const newMesocycle = { ...mesocycle, user: user._id };
    console.log(newMesocycle);
    await Mesocycle.create(newMesocycle);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
  // redirect('/app/my-mesocycles')
}

export async function getMesocyclesByUserId(clerkId: string) {
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId });
    const mesocycles = await Mesocycle.find({ user: user._id });
    return JSON.parse(JSON.stringify(mesocycles));
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
}

export async function activateMesocycle(mesoId: string) {
  try {
    await connectToDatabase();
    await Mesocycle.updateMany({ isActive: true }, { isActive: false, $unset: { startDate: 1 } });
    await Mesocycle.findByIdAndUpdate(mesoId, { isActive: true, startDate: startOfDay(previousMonday(new Date()))});
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
}

export async function deleteMesocycle(mesoId: string) {
  try {
    await connectToDatabase();
    await Mesocycle.findByIdAndDelete(mesoId);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
}
