import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

const EventDetailScreen = ({ initialEvent }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [isCameraOpen, setCameraOpen] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    // Initialize state with initialEvent details if available
    if (initialEvent) {
      setTitle(initialEvent.title || '');
      setDescription(initialEvent.description || '');
      setStartDate(initialEvent.startDate || '');
      setEndDate(initialEvent.endDate || '');
      setImage(initialEvent.image || null);
      setLocation(initialEvent.location || null);
    }

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
  }, [initialEvent]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setImage(photo.uri);
      setCameraOpen(false);
    }
  };

  const handleSaveEvent = () => {
    // Implement your logic to handle the saving or updating of the calendar event
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
    console.log('Image:', image);
    console.log('Location:', location);
    // Add your code to actually save or update the event to the calendar or server
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

      <TouchableOpacity onPress={() => setCameraOpen(true)}>
        <Text>Take a picture</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

      <Text>Current Location:</Text>
      {location && (
        <Text>
          Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}
        </Text>
      )}

      <Button title={initialEvent ? 'Save' : 'Create Event'} onPress={handleSaveEvent} />

      {isCameraOpen && (
        <View style={styles.cameraContainer}>
          <Camera
            style={styles.camera}
            type={Camera.Constants.Type.back}
            ref={cameraRef}
          >
            <View style={styles.cameraButtons}>
              <Button title="Take Picture" onPress={takePicture} />
              <Button title="Cancel" onPress={() => setCameraOpen(false)} />
            </View>
          </Camera>
        </View>
      )}
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
  cameraContainer: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'row',
  },
  camera: {
    flex: 1,
  },
  cameraButtons: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 20,
  },
});

export default EventDetailScreen;
