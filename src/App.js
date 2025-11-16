import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Auth from './Auth';
import ShoppingList from './ShoppingList';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="App">
        <div className="loading-container">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Auth user={user} />
      {user ? (
        <ShoppingList user={user} />
      ) : (
        <div className="welcome-message">
          <h1>Welcome to Our Shopping List! 🛒</h1>
          <p>Please sign in or create an account to start managing your shared shopping list.</p>
        </div>
      )}
    </div>
  );
}

export default App;
