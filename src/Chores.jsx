import { useState, useEffect } from 'react';
import { ref, push, onValue, update, remove } from 'firebase/database';
import { database } from './firebase';
import './Chores.css';

const PRESET_CHORES = [
  { name: 'Müll runter', points: 5 },
  { name: 'Kochen', points: 5 },
  { name: 'Bad putzen', points: 5 },
  { name: 'Fenster putzen', points: 5 },
  { name: 'Einkaufen', points: 5 },
  { name: 'Saugen', points: 5 },
  { name: 'Wäsche aufhängen', points: 5 },
  { name: 'Wäsche abhängen', points: 5 },
  { name: 'Spülmaschine ausräumen', points: 5 },
];

function Chores() {
  const [activeChores, setActiveChores] = useState([]);
  const [scores, setScores] = useState({ Thomas: 0, Chantale: 0 });
  const [showAddChore, setShowAddChore] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState('');
  const [customChore, setCustomChore] = useState('');
  const [customPoints, setCustomPoints] = useState(5);
  const [loading, setLoading] = useState(true);

  // Load active chores
  useEffect(() => {
    const choresRef = ref(database, 'chores/active');
    
    const unsubscribe = onValue(choresRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const choresArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        choresArray.sort((a, b) => b.timestamp - a.timestamp);
        setActiveChores(choresArray);
      } else {
        setActiveChores([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Load scores
  useEffect(() => {
    const scoresRef = ref(database, 'chores/scores');
    
    const unsubscribe = onValue(scoresRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setScores(data);
      }
    });

    return () => unsubscribe();
  }, []);

  // Add new chore
  const addChore = () => {
    let choreName = '';
    let chorePoints = 5;

    if (selectedPreset === 'custom') {
      if (customChore.trim() === '') return;
      choreName = customChore.trim();
      chorePoints = customPoints;
    } else if (selectedPreset) {
      const preset = PRESET_CHORES.find(c => c.name === selectedPreset);
      choreName = preset.name;
      chorePoints = preset.points;
    } else {
      return;
    }

    const choresRef = ref(database, 'chores/active');
    push(choresRef, {
      name: choreName,
      points: chorePoints,
      timestamp: Date.now()
    });

    // Reset form
    setSelectedPreset('');
    setCustomChore('');
    setCustomPoints(5);
    setShowAddChore(false);
  };

  // Complete chore
  const completeChore = (chore, person) => {
    const choreRef = ref(database, `chores/active/${chore.id}`);
    
    // Remove from active
    remove(choreRef);

    // Add to history
    const historyRef = ref(database, 'chores/history');
    push(historyRef, {
      name: chore.name,
      points: chore.points,
      completedBy: person,
      timestamp: Date.now()
    });

    // Update scores
    const scoresRef = ref(database, 'chores/scores');
    if (person === 'Both') {
      const halfPoints = Math.floor(chore.points / 2);
      update(scoresRef, {
        Thomas: (scores.Thomas || 0) + halfPoints,
        Chantale: (scores.Chantale || 0) + halfPoints
      });
    } else {
      update(scoresRef, {
        [person]: (scores[person] || 0) + chore.points
      });
    }
  };

  // Delete chore without completing
  const deleteChore = (id) => {
    const choreRef = ref(database, `chores/active/${id}`);
    remove(choreRef);
  };

  if (loading) {
    return (
      <div className="chores-container">
        <div className="loading">Loading chores...</div>
      </div>
    );
  }

  return (
    <div className="chores-container">
      <header className="chores-header">
        <h2>🧹 Chores</h2>
        <div className="scores">
          <div className="score-card">
            <span className="score-name">Thomas</span>
            <span className="score-points">{scores.Thomas || 0} pts</span>
          </div>
          <div className="score-card">
            <span className="score-name">Chantale</span>
            <span className="score-points">{scores.Chantale || 0} pts</span>
          </div>
        </div>
      </header>

      <button 
        onClick={() => setShowAddChore(!showAddChore)} 
        className="btn btn-primary add-chore-btn"
      >
        {showAddChore ? '✕ Cancel' : '+ Add Chore'}
      </button>

      {showAddChore && (
        <div className="add-chore-form">
          <select 
            value={selectedPreset} 
            onChange={(e) => setSelectedPreset(e.target.value)}
            className="chore-select"
          >
            <option value="">Select a chore...</option>
            {PRESET_CHORES.map(chore => (
              <option key={chore.name} value={chore.name}>
                {chore.name} ({chore.points} pts)
              </option>
            ))}
            <option value="custom">✏️ Custom chore</option>
          </select>

          {selectedPreset === 'custom' && (
            <div className="custom-chore-inputs">
              <input
                type="text"
                value={customChore}
                onChange={(e) => setCustomChore(e.target.value)}
                placeholder="Enter custom chore..."
                className="input"
              />
              <input
                type="number"
                value={customPoints}
                onChange={(e) => setCustomPoints(parseInt(e.target.value) || 5)}
                min="1"
                className="input points-input"
              />
            </div>
          )}

          <button onClick={addChore} className="btn btn-primary">
            Add to List
          </button>
        </div>
      )}

      <div className="chores-list">
        {activeChores.length === 0 ? (
          <div className="empty-state">
            <p>No chores to do! 🎉</p>
            <p className="empty-state-hint">Add a chore to get started</p>
          </div>
        ) : (
          activeChores.map(chore => (
            <div key={chore.id} className="chore-item">
              <div className="chore-info">
                <span className="chore-name">{chore.name}</span>
                <span className="chore-points">{chore.points} pts</span>
              </div>
              <div className="chore-actions">
                <button
                  onClick={() => completeChore(chore, 'Thomas')}
                  className="btn-complete btn-thomas"
                  title="Thomas did this"
                >
                  Thomas
                </button>
                <button
                  onClick={() => completeChore(chore, 'Chantale')}
                  className="btn-complete btn-chantale"
                  title="Chantale did this"
                >
                  Chantale
                </button>
                <button
                  onClick={() => completeChore(chore, 'Both')}
                  className="btn-complete btn-both"
                  title="We did this together"
                >
                  Both
                </button>
                <button
                  onClick={() => deleteChore(chore.id)}
                  className="btn-delete-chore"
                  title="Delete chore"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Chores;
