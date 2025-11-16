# UI Screenshots and Features

This document describes the user interface and features of the Couple Shopping List application.

## Application States

### 1. Landing Page (Not Authenticated)
When users first visit the application, they see:
- A gradient purple background
- Welcome message: "Welcome to Our Shopping List! 🛒"
- Sign in form with email and password fields
- Option to create a new account
- Toggle between "Sign In" and "Create Account" modes

### 2. Shopping List View (Authenticated)
Once signed in, users see:
- User email displayed at the top with a sign-out button
- Title: "🛒 Our Shopping List"
- Input field to add new items with "Add Item" button
- List of shopping items with:
  - Checkbox to mark items as complete
  - Item name
  - "Added by [email]" metadata
  - Delete button (red X)
- Empty state message when no items exist

### 3. Shopping List with Items
- Items are displayed in chronological order
- Completed items show:
  - Strikethrough text
  - Grayed out appearance
  - Lower opacity
- Active items show in full color

## Key Features

### Real-time Synchronization
- When one user adds an item, it appears instantly for the other user
- Changes to checkboxes sync in real-time
- Deletions are immediately reflected

### Authentication
- Email/password authentication via Firebase
- Secure sign-in/sign-up
- Session persistence (stays logged in)
- Sign out functionality

### Shopping List Management
- **Add Items**: Type name and click "Add Item"
- **Mark Complete**: Click checkbox to toggle completion
- **Delete Items**: Click red X button to remove
- **View Metadata**: See who added each item

## Color Scheme
- **Primary**: Purple gradient background (#667eea to #764ba2)
- **Success**: Green (#4CAF50) for add buttons
- **Danger**: Red (#ff4444) for delete buttons
- **Neutral**: White backgrounds for content areas
- **Text**: Dark gray (#333) for primary text

## Responsive Design
- Works on desktop browsers
- Mobile-friendly layout
- Touch-friendly buttons and checkboxes

## Example Usage Flow

1. **First User (Alice)**
   - Opens the app
   - Creates account with alice@example.com
   - Adds "Milk" to the shopping list
   - Adds "Bread" to the shopping list

2. **Second User (Bob)**
   - Opens the app on their phone
   - Creates account with bob@example.com
   - Sees "Milk" and "Bread" appear in real-time
   - Adds "Eggs" to the list
   - Alice's phone immediately shows "Eggs"

3. **At the Store**
   - Alice checks off "Milk" (completed)
   - Bob's phone shows "Milk" as completed
   - Bob checks off "Bread"
   - Alice checks off "Eggs"
   - They're done shopping!

4. **After Shopping**
   - Alice deletes all completed items
   - Both lists are now empty
   - Ready for next week's shopping

## Future Enhancement Ideas

The application is designed to be extensible. Potential future features include:
- Categories for items (Produce, Dairy, etc.)
- Notes for specific items
- Quantity fields
- Expense tracking
- Price estimates
- Shared calendar
- Shopping history
- Export/print list
- Push notifications
- Barcode scanning
- Recipe integration

## Technical Notes

- The UI is built with pure React components
- No external UI library required
- Custom CSS for all styling
- Firebase handles all backend operations
- No server-side code needed
- Works offline (items are queued and sync when online)
