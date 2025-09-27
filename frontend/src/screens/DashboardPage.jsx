import React, { useEffect, useState } from 'react';
import config from '../constants.js';

const DashboardPage = ({ user, notes, varieties, onLogout, onLoadData, onCreateNote }) => {
  const [newNote, setNewNote] = useState({
    wineName: '',
    vintage: new Date().getFullYear(),
    rating: 3,
    aromaNotes: '',
    tasteNotes: '',
    grapeVarietyId: '',
    tastingDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    onLoadData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewNote(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateNote = async (event) => {
    event.preventDefault();
    if (!newNote.grapeVarietyId) {
      alert('Please select a grape variety.');
      return;
    }
    await onCreateNote({
      ...newNote,
      vintage: parseInt(newNote.vintage, 10),
      rating: parseInt(newNote.rating, 10)
    });
    // Reset form
    setNewNote({
        wineName: '',
        vintage: new Date().getFullYear(),
        rating: 3,
        aromaNotes: '',
        tasteNotes: '',
        grapeVarietyId: '',
        tastingDate: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
             <h1 className="text-2xl font-bold text-gray-900">VinoLog</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {user.name}!</span>
            <a
              href={`${config.BACKEND_URL}/admin`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              Admin
            </a>
            <button
              onClick={onLogout}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Column */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Add a New Tasting Note</h2>
              <form onSubmit={handleCreateNote} className="space-y-4">
                <input type="text" name="wineName" placeholder="Wine Name (e.g., 'Château Margaux')" value={newNote.wineName} onChange={handleInputChange} className="w-full p-2 border rounded-md shadow-sm" required />
                <select name="grapeVarietyId" value={newNote.grapeVarietyId} onChange={handleInputChange} className="w-full p-2 border rounded-md shadow-sm" required>
                  <option value="">Select Grape Variety</option>
                  {varieties.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                </select>
                <input type="number" name="vintage" placeholder="Vintage Year" value={newNote.vintage} onChange={handleInputChange} className="w-full p-2 border rounded-md shadow-sm" required />
                <input type="date" name="tastingDate" value={newNote.tastingDate} onChange={handleInputChange} className="w-full p-2 border rounded-md shadow-sm" required />
                <textarea name="aromaNotes" placeholder="Aroma Notes" value={newNote.aromaNotes} onChange={handleInputChange} className="w-full p-2 border rounded-md shadow-sm" rows="3" />
                <textarea name="tasteNotes" placeholder="Taste Notes" value={newNote.tasteNotes} onChange={handleInputChange} className="w-full p-2 border rounded-md shadow-sm" rows="3" />
                <div>
                  <label className="block text-sm font-medium text-gray-700">Rating: {newNote.rating} / 5</label>
                  <input type="range" name="rating" min="1" max="5" step="1" value={newNote.rating} onChange={handleInputChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                </div>
                <button type="submit" className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors font-semibold">
                  Save Note
                </button>
              </form>
            </div>
          </div>

          {/* Notes Column */}
          <div className="lg:col-span-2">
             <h2 className="text-2xl font-semibold mb-4 text-gray-800 px-4 sm:px-0">Your Tasting Notes</h2>
            {notes.length === 0 ? (
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <p className="text-gray-500">No tasting notes yet. Add your first one!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {notes.map(note => (
                  <div key={note.id} className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-semibold text-purple-600">{note.grapeVariety?.name || 'Unknown Variety'} ({note.grapeVariety?.color})</p>
                                <h3 className="text-lg font-bold text-gray-900">{note.wineName} - {note.vintage}</h3>
                                <p className="text-xs text-gray-500">Noted by {note.author?.name || 'Anonymous'} on {new Date(note.tastingDate).toLocaleDateString()}</p>
                            </div>
                            <div className="text-2xl font-bold text-yellow-500">{note.rating}/5</div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <h4 className="font-semibold text-gray-700">Aroma</h4>
                                <p className="text-gray-600 whitespace-pre-wrap">{note.aromaNotes || 'N/A'}</p>
                            </div>
                             <div>
                                <h4 className="font-semibold text-gray-700">Taste</h4>
                                <p className="text-gray-600 whitespace-pre-wrap">{note.tasteNotes || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
