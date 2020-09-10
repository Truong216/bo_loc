import * as React from 'react';
import { 
  View,
  Text,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Feather from 'react-native-vector-icons/Feather';

import { useSelector, } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const ProfileStack = createStackNavigator();
const LoginStack = createStackNavigator();
const ExploreStack = createStackNavigator();

import Setting from './screens/Setting';
import Profile from './screens/Profile';
import EditProfile from './screens/EditProfile';

import Welcome from './screens/Welcome';
import Login from './screens/Login';
import SignUp from './screens/SignUp';

import Home from './screens/Home';
import Hotel from './components/Hotel-1';
import Detail from './components/Detail-1';

import Hotel_find from './screens/Hotel_find';

import Loading from './components/GlobalLoading/index';

function Trips() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Trips!</Text>
    </View>
  );
}

function LoginStackScreen() {
  return (
    <NavigationContainer>
      <LoginStack.Navigator
        screenOptions={{
          headerTitle: null,
          headerTransparent: true,
        }}
      >
        <LoginStack.Screen name="Welcome" component={Welcome} />
        <LoginStack.Screen name="Login" component={Login} />
        <LoginStack.Screen name="SignUp" component={SignUp} />
      </LoginStack.Navigator>
    </NavigationContainer>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerTitle: null,
        headerTransparent: true,
      }}
    >
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen name="EditProfile" component={EditProfile} />
      <ProfileStack.Screen name="Setting" component={Setting} />
    </ProfileStack.Navigator>
  );
}

function ExploreStackScreen() {
  return (
    <ExploreStack.Navigator
      screenOptions={{
        headerTitle: null,
        headerTransparent: true,
      }}
    >
      <ExploreStack.Screen name="Home" component={Hotel_find} />
      <ExploreStack.Screen name="Detail" component={Detail} />
      <ExploreStack.Screen name="Hotel" component={Hotel} />
    </ExploreStack.Navigator>
  );
}

function AppNavigation() {
  const isLogin = useSelector(state => state.loginReducer.isLogin);
  console.log(isLogin);
  return (
    isLogin ? 
    ( <NavigationContainer>
      <Loading />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Explore') {
              return (
                <Feather
                  name= 'search'
                  size={size}
                  color='#68d3c2'
                />
              );
            } else if (route.name === 'Trips') {
              return (
                <Feather
                  name= 'heart'
                  size={size}
                  color='#68d3c2'
                />
              );
            } else if (route.name === 'Profile') {
              return (
                <Feather
                  name= 'user'
                  size={size}
                  color='#68d3c2'
                />
              );
            }
          },
        })}
      >
        <Tab.Screen name="Explore" component={ExploreStackScreen} />
        <Tab.Screen name="Trips" component={Detail} />
        <Tab.Screen name="Profile" component={ProfileStackScreen}/>
      </Tab.Navigator>
    </NavigationContainer> ) : (
      <LoginStackScreen />
    )
  );
}

export default AppNavigation;