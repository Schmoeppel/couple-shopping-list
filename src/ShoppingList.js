import React, { useState, useEffect } from 'react';
import { database } from './firebase';
import { ref, push, onValue, remove, update } from 'firebase/database';
import './ShoppingList.css';

function ShoppingList({ user }) {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const itemsRef = ref(database, 'shoppingList');
    
    const unsubscribe = onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      const itemsList = [];
      
      if (data) {
        Object.keys(data).forEach((key) => {
          itemsList.push({
            id: key,
            ...data[key]
          });
        });
      }
      
      setItems(itemsList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addItem = (e) => {
    e.preventDefault();
    
    if (newItem.trim() === '') return;
    
    const itemsRef = ref(database, 'shoppingList');
    push(itemsRef, {
      name: newItem,
      completed: false,
      addedBy: user?.email || 'Anonymous',
      timestamp: Date.now()
    });
    
    setNewItem('');
  };

  const toggleComplete = (id, completed) => {
    const itemRef = ref(database, `shoppingList/${id}`);
    update(itemRef, { completed: !completed });
  };

  const deleteItem = (id) => {
    const itemRef = ref(database, `shoppingList/${id}`);
    remove(itemRef);
  };

  if (loading) {
    return <div className="loading">Loading shopping list...</div>;
  }

  return (
    <div className="shopping-list">
      <h1>🛒 Our Shopping List</h1>
      
      <form onSubmit={addItem} className="add-item-form">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add item to shopping list..."
          className="item-input"
        />
        <button type="submit" className="add-button">Add Item</button>
      </form>

      <div className="items-list">
        {items.length === 0 ? (
          <p className="empty-message">No items in the list. Add something!</p>
        ) : (
          items
            .sort((a, b) => a.timestamp - b.timestamp)
            .map((item) => (
              <div key={item.id} className={`item ${item.completed ? 'completed' : ''}`}>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleComplete(item.id, item.completed)}
                  className="checkbox"
                />
                <div className="item-content">
                  <span className="item-name">{item.name}</span>
                  <span className="item-meta">Added by {item.addedBy}</span>
                </div>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="delete-button"
                >
                  ✕
                </button>
              </div>
            ))
        )}
      </div>
    </div>
  );
}

export default ShoppingList;
