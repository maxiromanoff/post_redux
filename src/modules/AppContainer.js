import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import routes from './routes';
import HomeScreen from './home';
import CreatePost from './createPost';

const Stack = createStackNavigator();

const AppContainer = () => {
  return (
    <Stack.Navigator
      initialRouteName={routes.HomeScreen}
      headerMode="none"
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen name={routes.HomeScreen} component={HomeScreen} />
      <Stack.Screen name={routes.CreatePost} component={CreatePost} />
    </Stack.Navigator>
  );
};

export default AppContainer;
