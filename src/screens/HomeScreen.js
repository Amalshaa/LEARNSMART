import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = () => {
  const [books, setBooks] = useState([]);
  const [itemCount, setItemCount] = useState(0); // Local state for tracking clicks

  // Reset item count when screen is focused (every time the user comes back to this screen)
  useFocusEffect(
    React.useCallback(() => {
      setItemCount(0);  // Reset the count when the screen is focused
    }, []) // Empty array ensures it's only run when the screen is focused
  );

  useEffect(() => {
    fetch('https://openlibrary.org/subjects/computers.json?limit=10')
      .then((response) => response.json())
      .then((data) => setBooks(data.works || []))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleItemClick = () => {
    setItemCount((prevCount) => prevCount + 1);  // Increment the count when a card is clicked
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={handleItemClick}>
      <Image
        source={{
          uri: `https://covers.openlibrary.org/b/id/${item.cover_id}-M.jpg`,
        }}
        style={styles.cardImage}
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardSubtitle}>
          Author: {item.authors?.[0]?.name || 'Unknown'}
        </Text>
        <View style={styles.statusTag}>
          <Icon name="check-circle" size={20} color="#4CAF50" style={styles.icon} />
          <Text style={styles.statusTagText}>Available</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>IT & AI Books</Text>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>Item Click Count: {itemCount}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    flexDirection: 'row',
    padding: 12,
  },
  cardImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 12,
    resizeMode: 'cover',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  statusTag: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 6,
  },
  statusTagText: {
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: 16,
  },
  floatingButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 30,
    position: 'absolute',
    bottom: 20,
    right: 20,
    elevation: 5,
  },
  floatingButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;
