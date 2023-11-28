import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

const EventDetailScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Request permission to access location
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Location permission not granted');
        return;
      }

      // Get the current location
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleCreateEvent = () => {
    // Implement your logic to handle the creation of the calendar event
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
    console.log('Image:', image);
    console.log('Location:', location);
    // Add your code to actually save the event to the calendar or server
  };

  return (
    <View style={styles.container}>
      <Text>Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />

      <Text>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={(text) => setDescription(text)}
      />

      <Text>Start Date:</Text>
      <TextInput
        style={styles.input}
        value={startDate}
        onChangeText={(text) => setStartDate(text)}
      />

      <Text>End Date:</Text>
      <TextInput
        style={styles.input}
        value={endDate}
        onChangeText={(text) => setEndDate(text)}
      />

      <TouchableOpacity onPress={pickImage}>
        <Text>Pick an image from camera roll</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

      <Text>Current Location:</Text>
      {location && (
        <Text>
          Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}
        </Text>
      )}

      <Button title="Create Event" onPress={handleCreateEvent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
  },
});

export default EventDetailScreen;
