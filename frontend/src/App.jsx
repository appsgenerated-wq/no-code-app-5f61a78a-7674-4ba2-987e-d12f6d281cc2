import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import { testBackendConnection } from './services/apiService.js';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import './index.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [tastingNotes, setTastingNotes] = useState([]);
  const [grapeVarieties, setGrapeVarieties] = useState([]);
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [backendConnected, setBackendConnected] = useState(false);
  const manifest = new Manifest();

  useEffect(() => {
    const checkConnectionAndSession = async () => {
      console.log('🚀 [APP] Starting backend connection test...');
      const result = await testBackendConnection();
      setBackendConnected(result.success);

      if (result.success) {
        console.log('✅ [APP] Backend connection successful. Checking user session...');
        try {
          const user = await manifest.from('User').me();
          setCurrentUser(user);
          setCurrentScreen('dashboard');
        } catch (error) {
          console.log('ℹ️ [APP] No active user session found.');
          setCurrentUser(null);
          setCurrentScreen('landing');
        }
      } else {
        console.error('❌ [APP] Backend connection failed:', result.error);
      }
    };

    checkConnectionAndSession();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      await manifest.login(email, password);
      const user = await manifest.from('User').me();
      setCurrentUser(user);
      setCurrentScreen('dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleLogout = async () => {
    await manifest.logout();
    setCurrentUser(null);
    setTastingNotes([]);
    setGrapeVarieties([]);
    setCurrentScreen('landing');
  };

  const loadData = async () => {
    try {
      const varietiesResponse = await manifest.from('GrapeVariety').find({ sort: { name: 'asc' } });
      setGrapeVarieties(varietiesResponse.data);

      const notesResponse = await manifest.from('TastingNote').find({
        include: ['author', 'grapeVariety'],
        sort: { createdAt: 'desc' },
      });
      setTastingNotes(notesResponse.data);
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  const createTastingNote = async (noteData) => {
    try {
      const newNote = await manifest.from('TastingNote').create(noteData);
      // Refetch notes to get the fully populated new note with relationships
      await loadData();
    } catch (error) {
      console.error('Failed to create tasting note:', error);
      alert('Could not create tasting note. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className="text-xs font-medium text-gray-600">{backendConnected ? 'Connected' : 'Disconnected'}</span>
      </div>

      {currentScreen === 'dashboard' && currentUser ? (
        <DashboardPage
          user={currentUser}
          notes={tastingNotes}
          varieties={grapeVarieties}
          onLogout={handleLogout}
          onLoadData={loadData}
          onCreateNote={createTastingNote}
        />
      ) : (
        <LandingPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
