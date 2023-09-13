import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddNoteScreen from './screens/AddNoteScreen';
import SavedNotesScreen from './screens/SavedNotesScreen';
import NoteDetailScreen from './screens/NoteDetailScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Notes' }} />
        <Stack.Screen name="AddNote" component={AddNoteScreen} options={{ title: 'Add Note' }} />
        <Stack.Screen name="SavedNotes" component={SavedNotesScreen} options={{ title: 'Saved Notes' }} />
        <Stack.Screen name="NoteDetail" component={NoteDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
