# Hypertrophy
With the Hypertrophy app you can effectively plan and structure your workouts into mesocycles. A mesocycle is a structured period of training typically lasting several weeks to a few months, focusing on specific aspects of fitness or performance.

## Technologies Used
- Node.js (TypeScript)
- CSS: Tailwind
- UI: Shadcn
- OAuth: Clerk

## Key Features
### OAuth
OAuth is implemented with Clerk, which provides:
- sign-in and sign-up components
![sign in component](/public/readme/clerk-sign-in.png)

- UserButton, that allows the user to sign out or manage their account
![user button](/public//readme//user-btn.png)

### Creating a Mesocycle
The first thing you need to do is to create a new mesocycle on the **Create Mesocycle** page. A mesocycle is a structured period of training typically lasting several weeks to a few months, focusing on specific aspects of fitness or performance.

For each day of the week, you can structure your workout by selecting target muscle groups and appropriate exercises that train them.
![create mesocycele](/public/readme/create-meso.png)

### Saved Mesocycles
After clicking on Create Mesocycle, you are redirected to the **My Mesocycles** page, where all of your created mesocycles live. Clicking on one of them shows a quick view of planned exercises for each day.
![my mesocycles page](/public/readme/my-mesos.png)
 Now you can click the options icon and activate the mesocycle you want.

### Today's workout
When one of your mesocycles is active, the app will automatically display the exercise planned for the day on the **Today's Workout** page. Your job is to perform the exercises one by one and input the weight and number of reps for each set.
![today's workout](/public/readme/todays-workout.png)

After completing all required exercises, click on Complete Workout button.

### Completed Workouts
When you complete a workout, all completed workouts and exercises can be viewed in the **Completed Workouts** page. 
![completed workouts](/public/readme/completed-workouts.png)

Workouts are stored and displayed week by week, day by day, which allows for a comprehensive overview of your dedication and progress tracking.

### Try It Out
Try out the live app [here](https://hypertrophy-self.vercel.app/). You can create a new account or use the demo account that has been created for reviewing purpuses. The username and password can be found on the sign-in page.