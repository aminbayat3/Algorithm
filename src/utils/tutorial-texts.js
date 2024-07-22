const TUTORIAL_TEXT_INTRODUCTION = `Welcome to Quality Charging, Christian!
We're excited to guide you through our application with this quick and fun tutorial.
Not only will you learn how to make the most of Quality Charging, but we also have some exciting rewards waiting for you!

Great News! Complete this tutorial and you'll earn 3 exclusive badges. Plus, you'll get a chance to spin the Wheel of Fortune. Who knows, you might score an amazing discount at the end!

Let’s get started and unlock those rewards!`;

const TUTORIAL_TEXT_WALLBOX_NUMBER = `Here you can set the number of wallboxes. A Wallbox is a dedicated charging station that is typically mounted on a wall, either in a garage or on an exterior wall of a home or business. Now, enter a number here to move on to the next step!`;

const TUTORIAL_TEXT_TASK_ONE_DONE = `Good job! You have received 2 badges! You can earn more badges if you keep going like this! `;
const TUTORIAL_TEXT_TASK_TWO_DONE = `Good job! You have received another 2 badges! Keep going! `;
const TUTORIAL_TEXT_TASK_THREE_DONE = `Good job! another two badges for you! `;

const TUTORIAL_TEXT_LEG_DURATION = `You can change the leg duration here. A leg duration refers to the interval during which the software wakes up and checks for any events, such as a vehicle being plugged in or unplugged. Essentially, it is the time period between these checks, where the software is idle or sleeping, and then it becomes active to monitor for any changes or actions that may have occurred. Enter a number here to move on to the next step. `;

const TUTORIAL_TEXT_CONNECTION_LOAD =
  "You can change the Connection load here. Connection load refers to the amount of power that a station receives from its power supply. This load can vary throughout the day depending on various factors, such as demand, operational requirements, or external conditions. Enter a number here to move on to the next step.";

const TUTORIAL_TEXT_START_TIME = `For this Simulation You can change the time when the software starts working, but in the reality we do not have a start time. Set a time to move on to the next step.`

const TUTORIAL_TEXT_AC_LIMIT = `Here you can change the AC Limit for each wallbox.The AC limit of a wallbox is the maximum amount of alternating current it can safely deliver to an electric vehicle. This limit is expressed in kilowatts (kW).`;

const TUTORIAL_TEXT_TANK_SIZE = `Here you change the tank size for each car. The tank size refers to the Electrical Vehicles' battery and is expressed in Kilowatt-hour. `;

const TUTORIAL_TEXT_CAR_AC_LIMIT = `Here you can change the AC Limit for each car. The AC limit refers to the maximum power level at which an electric vehicle (EV) can receive alternating current (AC) electricity from a charger `

const TUTORIAL_TEXT_CONNECTION_LOADS = `Here, you can adjust the connection load for each leg (duration), as in reality, the connection load varies over time. For instance, the connection load might be lower at night compared to during the day.`

const TUTORIAL_TEXT_CONGRATULATIONS = `Congratulations! 
You’ve successfully completed the tutorial. As a token of our appreciation, here are 2 extra badges. Now, navigate to the shop page and you can use these badges to get a discount code for using our main application. Enjoy your rewards and happy exploring!`

const TUTORIAL_TEXT_SPIN_ALERT = `Congratulations! You've unlocked the Wheel of Fortune. Spin up to 3 times and rack up even more badges. Good luck, and may fortune favor you!`

export {
  TUTORIAL_TEXT_INTRODUCTION,
  TUTORIAL_TEXT_WALLBOX_NUMBER,
  TUTORIAL_TEXT_TASK_ONE_DONE,
  TUTORIAL_TEXT_TASK_TWO_DONE,
  TUTORIAL_TEXT_LEG_DURATION,
  TUTORIAL_TEXT_CONNECTION_LOAD,
  TUTORIAL_TEXT_TASK_THREE_DONE,
  TUTORIAL_TEXT_START_TIME,
  TUTORIAL_TEXT_AC_LIMIT,
  TUTORIAL_TEXT_TANK_SIZE,
  TUTORIAL_TEXT_CAR_AC_LIMIT, 
  TUTORIAL_TEXT_CONNECTION_LOADS,
  TUTORIAL_TEXT_CONGRATULATIONS,
  TUTORIAL_TEXT_SPIN_ALERT
};
