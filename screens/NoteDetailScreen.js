import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function NoteDetailScreen({ route }) {
  const { note } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.timestamp}>{note.timestamp}</Text>
      <Text style={styles.content}>{note.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
  },
});

export default NoteDetailScreen;
