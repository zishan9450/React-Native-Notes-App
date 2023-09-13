import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SavedNotesScreen({ navigation }) {
  const [savedNotes, setSavedNotes] = useState([]);

  useEffect(() => {
    // Fetch saved notes from AsyncStorage when the component mounts
    loadSavedNotes();
  }, []);

  const loadSavedNotes = async () => {
    try {
      // Retrieve saved notes from AsyncStorage
      const savedNotesJSON = await AsyncStorage.getItem('notes');
      if (savedNotesJSON !== null) {
        // Parse the saved notes JSON
        const savedNotesData = JSON.parse(savedNotesJSON);
        setSavedNotes(savedNotesData);
      }
    } catch (error) {
      console.error('Error fetching saved notes:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  const handleNotePress = (note) => {
    // Navigate to a new screen to display the note content
    navigation.navigate('NoteDetail', { note });
  };

  const handleEditNote = (note) => {
    // Navigate to a screen where users can edit the note
    navigation.navigate('EditNote', { note });
  };

  const handleDeleteNote = (note) => {
    // Prompt the user for confirmation before deleting the note
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this note?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteNoteAndRefresh(note),
        },
      ],
      { cancelable: true }
    );
  };

  const deleteNoteAndRefresh = async (noteToDelete) => {
    try {
      // Delete the note from the savedNotes array
      const updatedNotes = savedNotes.filter((note) => note.id !== noteToDelete.id);

      // Update savedNotes state
      setSavedNotes(updatedNotes);

      // Save the updated notes array to AsyncStorage
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    } catch (error) {
      console.error('Error deleting note:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Saved Notes</Text>
      <FlatList
        data={savedNotes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.noteItem}>
            <TouchableOpacity
              style={styles.noteContent}
              onPress={() => handleNotePress(item)}
            >
              <Text style={styles.noteTitle}>{item.title}</Text>
              <Text style={styles.noteTimestamp}>{item.timestamp}</Text>
            </TouchableOpacity>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEditNote(item)}
              >
                <Text>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteNote(item)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noteItem: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  noteContent: {
    flex: 1,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noteTimestamp: {
    fontSize: 14,
    color: 'gray',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: 'lightblue',
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: 'salmon',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
  },
});

export default SavedNotesScreen;
