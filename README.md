**ReactNativeTimerApp**
A React Native application for creating and managing timers with group functionality, progress tracking, and history visualization.

# Features

# 1. Add Timer

A screen to create new timers with the following fields:
Name: The name of the timer (e.g., "Workout Timer").
Duration: Timer duration in seconds.
Category: Assign a category to the timer (e.g., "Workout," "Study," "Break").
Save the timer to a list and persist the data locally (e.g., using AsyncStorage ).

# 2. Timer List with Grouping

Display all timers grouped by their categories in expandable/collapsible sections.
For each timer, show:
Name.
Remaining time.
Status: Running, Paused, or Completed.
Users can expand or collapse categories to view timers within them.
# 3. Timer Management
Provide controls for each timer to:
Start: Begin countdown.
Pause: Pause countdown.
Reset: Reset to original duration.
Mark timers as "Completed" when they reach zero.

# 4. Progress Visualization
Show a simple progress bar or percentage for each timer to visualize remaining time relative to the total duration.

# 5. User Feedback
When a timer completes:
Show an on-screen modal with a congratulatory message and the timer’s name.

# Enhanced Functionality

# 1. Timer History
Maintain a log of completed timers with:
Timer name.
Completion time.
Display the log on a separate "History" screen.

# 2. Customizable Alerts
Allow users to set an optional halfway alert for each timer (e.g., at 50% of the total duration).
Display a notification or message when the alert triggers.

**Prerequisites**

Node.js (v22.13.1)
npm (v10.9.2)
React Native CLI
Android Studio (for Android development)

**Setup Instructions**

# 1. Clone the Repository

```bash
git clone https://github.com/mohusman-prog/ReactNativeTimerApp.git
cd ReactNativeTimerApp
```
# 2. Install Dependencies


```bash
npm install
```
# 3. Start Metro Bundler

```bash
npx react-native start
```

# 4. Run the Application For Android:

```bash
npx react-native run-android
```

**Project Structure**

timer-management-app/
├── src/
│   ├── components/     # Reusable UI components
│   ├── context/        # store State Management
│   └── screens/      # Screen components
├── android/           # Android-specific files
├── ios/              # iOS-specific files
└── package.json

**Contact**
Your Name - Mohammed Usman
Project Link: https://github.com/mohusman-prog/ReactNativeTimerApp