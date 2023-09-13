import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Notes</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#F8FF95' }]}
            onPress={() => navigation.navigate('AddNote')}
          >
            <Text style={styles.buttonText}>Add Note</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#F8FF95' }]}
            onPress={() => navigation.navigate('SavedNotes')}
          >
            <Text style={styles.buttonText}>Saved Notes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'lightgray', // Background color for the entire screen
  },
  box: {
    borderWidth: 2,
    borderColor: 'lightgray',
    padding: 20,
    borderRadius: 10, // Border radius for the box
    backgroundColor: 'white',
    elevation: 5, // Add elevation for a more pronounced hovering effect on Android
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginRight: 10,
    // paddingHorizontal: 10,
    marginTop: 20,
  },
  button: {
    backgroundColor: '#F8FF95', // Yellow background color for the buttons
    width: 150, // Set a fixed width for the buttons
    height: 60, // Set a fixed height for the buttons
    borderRadius: 10, // Border radius for the buttons
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
