import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useState } from 'react';

export const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const ContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [favoritesBlooms, setFavoritesBlooms] = useState([]);
  const [idea, setIdea] = useState(null);
  const [bloom, setBloom] = useState(null);
  const [savedNotes, setSavedNotes] = useState([]);

  // notes

  const saveNote = async (data, editNote) => {
    try {
      const storedNote = await AsyncStorage.getItem('notes');
      let notes = storedNote !== null ? JSON.parse(storedNote) : [];

      let updatedNotes;

      if (editNote?.id) {
        updatedNotes = notes.map(log => (log.id === editNote.id ? data : log));
      } else {
        updatedNotes = [...notes, data];
      }

      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    } catch (e) {
      console.error('Failed', e);
    }
  };

  const fetchNotes = async () => {
    try {
      const savedData = await AsyncStorage.getItem('notes');
      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        setSavedNotes(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //daily ideas

  const getFavoritesIdeas = async () => {
    const stored = await AsyncStorage.getItem('favoritesIdeas');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  };

  const removeIdea = async selectedIdea => {
    const jsonValue = await AsyncStorage.getItem('favoritesIdeas');
    let data = jsonValue != null ? JSON.parse(jsonValue) : [];
    console.log('data', data);
    console.log('selectedIdea', selectedIdea);
    const filtered = data.filter(item => item.idea !== selectedIdea.idea);

    setFavorites(filtered);
    await AsyncStorage.setItem('favoritesIdeas', JSON.stringify(filtered));
  };

  // daily blooms

  const getFavoritesBlooms = async () => {
    const stored = await AsyncStorage.getItem('favorites');
    if (stored) {
      setFavoritesBlooms(JSON.parse(stored));
    }
  };

  const removeBloom = async selectedBloom => {
    const jsonValue = await AsyncStorage.getItem('favorites');
    let data = jsonValue != null ? JSON.parse(jsonValue) : [];
    console.log('data', data);
    console.log('selectedIdea', selectedBloom);
    const filtered = data.filter(item => item !== selectedBloom);

    setFavoritesBlooms(filtered);
    await AsyncStorage.setItem('favorites', JSON.stringify(filtered));
  };

  const value = {
    getFavoritesIdeas,
    getFavoritesBlooms,
    favoritesBlooms,
    setFavoritesBlooms,
    favorites,
    setFavorites,
    idea,
    setIdea,
    bloom,
    setBloom,
    removeIdea,
    removeBloom,
    saveNote,
    fetchNotes,
    savedNotes,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
