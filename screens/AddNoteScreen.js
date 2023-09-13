import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


function AddNoteScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSaveNote = async () => {
    try {
      // Create a new note object with title, content, and timestamp
      const newNote = {
        title,
        content,
        timestamp: new Date().toISOString(),
      };
  
      // Retrieve existing notes or initialize an empty array if it's the first note
      const existingNotes = JSON.parse(await AsyncStorage.getItem('notes')) || [];
  
      // Add the new note to the array of existing notes
      existingNotes.push(newNote);
  
      // Save the updated notes array to AsyncStorage
      await AsyncStorage.setItem('notes', JSON.stringify(existingNotes));
  
      // Show a confirmation message
      Alert.alert('Note Saved', 'Your note has been saved successfully.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error('Error saving note:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Add Note</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { height: 180 }]} // Increase the height for content input
          placeholder="Content"
          value={content}
          onChangeText={(text) => setContent(text)}
          multiline
        />
      </View>
      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSaveNote}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
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
  inputContainer: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  input: {
    fontSize: 16,
    height: 40,
  },
  saveButton: {
    backgroundColor: '#F8FF95',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddNoteScreen;
