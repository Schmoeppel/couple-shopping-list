import { useState } from 'react';
import ShoppingList from './ShoppingList';
import Chores from './Chores';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('shopping');

  const tabs = [
    { id: 'shopping', label: '🛒 Shopping', component: ShoppingList },
    { id: 'chores', label: '🧹 Chores', component: Chores },
    // Future tabs can be added here:
    // { id: 'money', label: '💰 Money', component: Money },
    // { id: 'recipes', label: '🍳 Recipes', component: Recipes },
    // { id: 'stats', label: '📊 Stats', component: Stats },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="app">
      <div className="container">
        {/* Tab Navigation */}
        <nav className="tab-nav">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Active Tab Content */}
        <div className="tab-content">
          {ActiveComponent && <ActiveComponent />}
        </div>
      </div>
    </div>
  );
}

export default App;
