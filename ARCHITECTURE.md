# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     GitHub Pages                             │
│  https://schmoeppel.github.io/couple-shopping-list/         │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │         Static React Application (Build)           │    │
│  │                                                     │    │
│  │  • HTML, CSS, JavaScript bundles                   │    │
│  │  • No server-side processing                       │    │
│  │  • Client-side routing                             │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                             │
                             │ HTTPS
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                   Firebase Services                          │
│                                                              │
│  ┌──────────────────┐        ┌─────────────────────┐       │
│  │  Authentication  │        │  Realtime Database  │       │
│  │                  │        │                     │       │
│  │ • Email/Password │        │ • Shopping List     │       │
│  │ • User Sessions  │        │ • Real-time Sync    │       │
│  │ • Security Rules │        │ • Security Rules    │       │
│  └──────────────────┘        └─────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
         │                                │
         │                                │
    ┌────┴────┐                      ┌───┴────┐
    │         │                      │        │
    ▼         ▼                      ▼        ▼
┌────────┐ ┌────────┐          ┌────────┐ ┌────────┐
│ User 1 │ │ User 2 │          │ User 1 │ │ User 2 │
│Browser │ │Browser │          │Browser │ │Browser │
└────────┘ └────────┘          └────────┘ └────────┘
```

## Component Architecture

```
App.js (Root Component)
│
├─ Firebase Config (firebase.js)
│  └─ Initialize Firebase SDK
│
├─ Auth Component (Auth.js)
│  ├─ Sign In Form
│  ├─ Create Account Form
│  └─ User Info Display
│
└─ ShoppingList Component (ShoppingList.js)
   ├─ Add Item Form
   ├─ Items List
   │  └─ Item Component (inline)
   │     ├─ Checkbox (toggle complete)
   │     ├─ Item Name
   │     ├─ Item Metadata
   │     └─ Delete Button
   └─ Empty State Message
```

## Data Flow

### Adding an Item

```
User Input
    │
    ▼
ShoppingList.addItem()
    │
    ▼
Firebase.push(item)
    │
    ▼
Firebase Realtime Database
    │
    ├─────────────────┐
    │                 │
    ▼                 ▼
onValue Listener   onValue Listener
(User 1)           (User 2)
    │                 │
    ▼                 ▼
Update UI          Update UI
(Both users see the new item in real-time)
```

### Toggling Item Completion

```
User Clicks Checkbox
    │
    ▼
ShoppingList.toggleComplete(id)
    │
    ▼
Firebase.update({ completed: !completed })
    │
    ▼
Firebase Realtime Database
    │
    ├─────────────────┐
    │                 │
    ▼                 ▼
onValue Listener   onValue Listener
(User 1)           (User 2)
    │                 │
    ▼                 ▼
Update UI          Update UI
(Item shows as completed on both devices)
```

## Database Structure

```json
{
  "shoppingList": {
    "item-id-1": {
      "name": "Milk",
      "completed": false,
      "addedBy": "alice@example.com",
      "timestamp": 1700000000000
    },
    "item-id-2": {
      "name": "Bread",
      "completed": true,
      "addedBy": "bob@example.com",
      "timestamp": 1700000001000
    }
  }
}
```

## Security Model

### Authentication
- Firebase Authentication handles user management
- Email/password sign-in method
- Sessions persist across page reloads

### Database Security Rules
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

- Only authenticated users can read the shopping list
- Only authenticated users can write to the shopping list
- Both users have equal access to all items
- No user-specific filtering (shared list)

## Deployment Pipeline

```
Developer Commits
    │
    ▼
GitHub Repository (main branch)
    │
    ▼
GitHub Actions Workflow Triggered
    │
    ├─ Install Dependencies (npm ci)
    │
    ├─ Build React App (npm run build)
    │  └─ Inject Firebase config from secrets
    │
    ├─ Upload Build Artifact
    │
    └─ Deploy to GitHub Pages
       │
       ▼
    Live Website Updated
```

## Technology Choices

### React
- **Why**: Component-based architecture, excellent for real-time UIs
- **Version**: 19.2.0 (latest)

### Firebase
- **Why**: 
  - Backendless solution (no server to maintain)
  - Built-in real-time synchronization
  - Free tier sufficient for personal use
  - Easy authentication
- **Services Used**: 
  - Firebase Authentication
  - Firebase Realtime Database

### GitHub Pages
- **Why**:
  - Free hosting for static sites
  - Automatic HTTPS
  - GitHub Actions integration
  - Easy deployment workflow

### GitHub Actions
- **Why**:
  - Automated deployment
  - Secure secrets management
  - No manual build steps
  - Version control integration

## Scalability Considerations

### Current Design (2 users)
- ✅ Perfect for a couple
- ✅ Real-time sync works great
- ✅ Free tier sufficient

### If Scaling to More Users
Would need to consider:
- User-specific lists (multi-tenancy)
- List sharing permissions
- Rate limiting
- Database indexing
- Pagination for large lists
- Cost optimization

## Performance

### Build Size
- Main JavaScript bundle: ~136 KB (gzipped)
- CSS bundle: ~1.2 KB (gzipped)
- Total page weight: < 150 KB

### Load Time
- First load: ~1-2 seconds
- Subsequent loads: Instant (browser cache)

### Real-time Sync Latency
- Typical: 100-500ms
- Depends on internet connection and Firebase region

## Browser Compatibility

Supports modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Environment Configuration

### Development
- Local `.env.local` file
- Hot reload enabled
- Debug mode active

### Production
- Environment variables from GitHub Secrets
- Optimized build
- Error tracking (can be added)

## Maintenance

### Updates Required
- Dependency updates (quarterly)
- Security patches (as needed)
- Firebase SDK updates (as needed)

### Monitoring
- Firebase Console for usage stats
- GitHub Actions logs for deployments
- Browser console for client errors

### Backup
- Firebase automatically handles backups
- Git repository serves as code backup
- Can export Firebase data via console
