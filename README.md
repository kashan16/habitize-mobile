# 📱 Habitize Mobile

<!-- ![Habitize Logo](./images/logo.png) -->

> A modern, intuitive habit-tracking mobile application built with React Native, Expo, Supabase, and TypeScript

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React_Native-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-1C1E24?style=flat&logo=expo&logoColor=#D04A37)](https://expo.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white)](https://supabase.com/)

## 🌟 Overview

Habitize Mobile is a comprehensive habit-tracking mobile application that helps you build better daily routines on the go. Track your habits, record memorable moments, and monitor your sleep patterns all in one beautiful, native mobile interface.

<!-- ![App Screenshot](./images/app-preview.png) -->

## ✨ Features

### 📝 Memorable Moments
Capture your daily highlights and reflections with a simple text note. Each day, record one meaningful moment that you want to remember, directly from your mobile device.

<!-- ![Memorable Moments Feature](./images/mobile-moments.png) -->

### 📊 Habit Grid
Create and track unlimited habits with an intuitive touch-friendly grid interface. Simply tap to toggle completion status for each day with smooth animations and haptic feedback.

<!-- ![Habit Grid Interface](./images/mobile-habits.png) -->

### 😴 Sleep Tracker
Log your sleep hours and visualize your sleep patterns with beautiful charts optimized for mobile screens. Understanding your sleep trends has never been easier.

<!-- ![Sleep Tracker Charts](./images/mobile-sleep.png) -->

### 🔐 Secure Authentication
Full user authentication system with email/password login and social authentication options, ensuring your data remains private and secure across all your devices.

<!-- ![Authentication Flow](./images/mobile-auth.png) -->

### 📱 Native Mobile Features
- **Push Notifications**: Get reminded about your daily habits
- **Offline Support**: Continue tracking even without internet connection
- **Dark Mode**: Beautiful dark theme that adapts to your system preferences
- **Haptic Feedback**: Satisfying tactile responses for interactions
- **Gesture Navigation**: Intuitive swipe gestures and touch interactions

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation v6
- **State Management**: Zustand
- **UI Components**: NativeWind (Tailwind CSS for React Native)
- **Icons**: Lucide React Native
- **Backend**: Supabase (PostgreSQL, Auth, RLS, Real-time)
- **Animations**: React Native Reanimated
- **Charts**: Victory Native or React Native Chart Kit
- **Storage**: Async Storage & Supabase

## 📁 Project Structure

```
habitize-mobile/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # Base UI components
│   │   ├── HabitGrid.tsx    # Habit tracking grid
│   │   ├── SleepChart.tsx   # Sleep visualization
│   │   └── Navigation.tsx   # Navigation components
│   ├── screens/             # App screens
│   │   ├── auth/           # Authentication screens
│   │   ├── dashboard/      # Main app screens
│   │   ├── habits/         # Habit management screens
│   │   ├── sleep/          # Sleep tracking screens
│   │   └── moments/        # Memorable moments screens
│   ├── store/              # Zustand stores
│   │   ├── authStore.ts    # Authentication state
│   │   ├── habitStore.ts   # Habit management state
│   │   └── appStore.ts     # Global app state
│   ├── hooks/              # Custom React hooks
│   │   ├── useHabits.ts    # Habit management hook
│   │   ├── useMoments.ts   # Daily moments hook
│   │   └── useSleepLogs.ts # Sleep tracking hook
│   ├── lib/                # Utilities and configurations
│   │   ├── supabase.ts     # Supabase client
│   │   ├── storage.ts      # Async storage utilities
│   │   └── utils.ts        # Helper functions
│   ├── types/              # TypeScript type definitions
│   │   ├── navigation.ts   # Navigation types
│   │   ├── database.ts     # Database types
│   │   └── index.ts        # Global types
│   └── constants/          # App constants
│       ├── Colors.ts       # Color scheme
│       └── Config.ts       # App configuration
├── assets/                 # Static assets
│   ├── images/            # App images and icons
│   └── fonts/             # Custom fonts
├── app.config.js          # Expo configuration
├── metro.config.js        # Metro bundler config
├── tailwind.config.js     # NativeWind configuration
├── global.css             # Global styles
└── package.json           # Dependencies and scripts
```

## 🗄️ Database Schema

The application uses the following Supabase tables with Row-Level Security (RLS) enabled:

- **`habits`**: User-defined habits with categories and streaks
- **`habit_logs`**: Daily habit completion records with timestamps
- **`memorable_moments`**: Daily memorable moment entries with media support
- **`sleep_logs`**: Sleep duration and quality tracking
- **`user_preferences`**: User settings and preferences

<!-- ![Database Schema](./images/db-schema.png) -->

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kashan16/habitize-mobile.git
   cd habitize-mobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

4. **Configure Supabase**
   - Create a new Supabase project
   - Update your `.env.local` with the project URL and anon key
   - Run the database migrations (see Database Setup below)

5. **Start the development server**
   ```bash
   npx expo start
   ```

### Database Setup

1. **Run migrations**
   ```sql
   -- Run the SQL files in supabase/migrations/ in your Supabase SQL Editor
   ```

2. **Enable Row Level Security**
   ```sql
   -- Enable RLS on all tables
   ALTER TABLE habits ENABLE ROW LEVEL SECURITY;
   ALTER TABLE habit_logs ENABLE ROW LEVEL SECURITY;
   ALTER TABLE memorable_moments ENABLE ROW LEVEL SECURITY;
   ALTER TABLE sleep_logs ENABLE ROW LEVEL SECURITY;
   ```

3. **Set up authentication policies**
   ```sql
   -- Create policies for each table (see supabase/policies.sql)
   ```

## 📱 Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run on web browser
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🎨 UI Components

Built with modern, accessible components using NativeWind:

- **Form Components**: Input fields, buttons, date pickers with native feel
- **Data Visualization**: Charts, grids, progress indicators optimized for mobile
- **Navigation**: Bottom tabs, stack navigation, drawer navigation
- **Feedback**: Toast notifications, loading states, haptic feedback
- **Gestures**: Swipe actions, pull-to-refresh, long press interactions

## 📱 Platform Features

### iOS Specific
- **Haptic Feedback**: Native iOS haptics for better user experience
- **Face ID/Touch ID**: Biometric authentication support
- **iOS Design Guidelines**: Following Apple's Human Interface Guidelines

### Android Specific
- **Material Design**: Following Google's Material Design principles
- **Android Gestures**: Native Android navigation gestures
- **Adaptive Icons**: Support for Android adaptive icons

## 🔧 Development

### Code Style

This project uses:
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type checking
- **Husky** for git hooks

### State Management

Using Zustand for lightweight state management:

```typescript
// Example store structure
export const useHabitStore = create<HabitState>((set, get) => ({
  habits: [],
  loading: false,
  error: null,
  
  fetchHabits: async () => {
    // Implementation
  },
  
  addHabit: async (habit) => {
    // Implementation
  },
}));
```

### Navigation

Using React Navigation v6 with TypeScript:

```typescript
// Navigation types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  HabitDetail: { habitId: string };
};
```

## 🚀 Deployment

### Build for Production

1. **Configure app.config.js**
   ```javascript
   export default {
     expo: {
       name: "Habitize",
       slug: "habitize-mobile",
       version: "1.0.0",
       // ... other config
     },
   };
   ```

2. **Build for iOS**
   ```bash
   npx expo build:ios
   ```

3. **Build for Android**
   ```bash
   npx expo build:android
   ```

### App Store Distribution

- Follow Expo's guide for submitting to App Store and Google Play
- Ensure all required app store assets are prepared
- Test thoroughly on physical devices before submission

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-mobile-feature
   ```
3. **Make your changes**
4. **Run tests and linting**
   ```bash
   npm run lint
   npm run type-check
   ```
5. **Test on both iOS and Android**
6. **Commit your changes**
   ```bash
   git commit -m "feat: add amazing mobile feature"
   ```
7. **Push to your branch**
   ```bash
   git push origin feature/amazing-mobile-feature
   ```
8. **Open a Pull Request**

### Mobile-Specific Contribution Guidelines

- Test on both iOS and Android platforms
- Follow platform-specific design guidelines
- Ensure proper accessibility support
- Test with different screen sizes and orientations
- Verify performance on lower-end devices
- Follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages

## 🐛 Known Issues

- [ ] Initial load performance optimization needed
- [ ] Offline sync conflict resolution
- [ ] Push notification scheduling improvements

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Kashan Yunus** - [@kashan16](https://github.com/kashan16)

## 🙏 Acknowledgments

- [React Native](https://reactnative.dev/) for the amazing mobile framework
- [Expo](https://expo.dev/) for the development platform and tools
- [Supabase](https://supabase.com/) for the backend infrastructure
- [NativeWind](https://www.nativewind.dev/) for Tailwind CSS in React Native
- [React Navigation](https://reactnavigation.org/) for navigation solution
- [Zustand](https://github.com/pmndrs/zustand) for state management
- [Lucide React Native](https://lucide.dev/) for the icon library

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/kashan16/habitize-mobile/issues) page
2. Create a new issue if your problem isn't already addressed
3. Join our [discussions](https://github.com/kashan16/habitize-mobile/discussions) for general questions
4. For mobile-specific issues, please include:
   - Device model and OS version
   - Expo/React Native version
   - Steps to reproduce the issue

## 🔄 Roadmap

- [ ] **v1.1**: Widget support for iOS and Android
- [ ] **v1.2**: Apple Watch and Wear OS companion apps
- [ ] **v1.3**: Social features and habit sharing
- [ ] **v1.4**: Advanced analytics and insights
- [ ] **v1.5**: Habit templates and community challenges

---

<div align="center">
  <strong>Built with ❤️ by Kashan Yunus</strong>
  <br>
  <em>Track your habits anywhere. Transform your life on the go.</em>
</div>