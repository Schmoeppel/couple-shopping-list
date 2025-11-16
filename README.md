# 🛒 Couple Shopping List

A shared shopping list web application built with React and Firebase, designed for couples to manage their grocery shopping together. The app features real-time synchronization, user authentication, and is hosted on GitHub Pages.

## Features

- ✅ **Real-time Synchronization**: Changes appear instantly for both users
- 🔐 **User Authentication**: Secure sign-in/sign-up with Firebase Authentication
- ➕ **Add Items**: Easily add items to the shared shopping list
- ✔️ **Mark Complete**: Check off items as you shop
- 🗑️ **Remove Items**: Delete items from the list
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🚀 **Backendless**: Powered by Firebase - no server setup required

## Tech Stack

- **Frontend**: React 19
- **Backend**: Firebase (Authentication + Realtime Database)
- **Hosting**: GitHub Pages
- **Styling**: CSS3

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A Firebase account

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Authentication** with Email/Password sign-in method
4. Create a **Realtime Database** in test mode (or with appropriate security rules)
5. Get your Firebase configuration from Project Settings

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Schmoeppel/couple-shopping-list.git
cd couple-shopping-list
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```bash
cp .env.example .env.local
```

4. Edit `.env.local` and add your Firebase configuration:
```env
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_DATABASE_URL=https://your_project_id-default-rtdb.firebaseio.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### Running Locally

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

### Deploying to GitHub Pages

1. Update the `homepage` field in `package.json` with your GitHub Pages URL
2. Deploy:
```bash
npm run deploy
```

This will build the app and push it to the `gh-pages` branch.

## Firebase Security Rules

For production use, update your Firebase Realtime Database rules:

```json
{
  "rules": {
    "shoppingList": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

This ensures only authenticated users can read and write to the shopping list.

## Usage

1. **Create an Account**: Both users should create accounts using their email and password
2. **Sign In**: Log in with your credentials
3. **Add Items**: Type an item name and click "Add Item"
4. **Check Off Items**: Click the checkbox to mark items as purchased
5. **Delete Items**: Click the ✕ button to remove items

## Future Features

Potential features for future development:
- 📊 Expense tracking
- 📅 Shared calendar
- 🏷️ Categories for items
- 🔔 Push notifications
- 📝 Notes for items
- 🎨 Customizable themes

## Contributing

This is a personal project, but suggestions and feedback are welcome!

## License

MIT License - feel free to use this project for your own shopping list needs!

## Author

Built with ❤️ for shared grocery shopping
