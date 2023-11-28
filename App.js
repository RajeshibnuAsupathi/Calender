import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';   
import { store } from './store/store';
import IconButton from './components/IconButton';
import EventListScreen from './screens/EventListScreen';
import EventDetailScreen from './screens/EventDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="EventsScreen"
          component={EventListScreen}
          options={{
            title: 'Events',
          }}
        />
        <Stack.Screen
          name="EventDetailScreen"
          component={EventDetailScreen}
          options={{
            title: 'Events',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
