import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../contexts/AuthContext';
import SignInScreen from '../screens/SignInScreen';
import TaskListScreen from '../screens/TaskListScreen';
import TaskFormScreen from '../screens/TaskFormScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { useTranslation } from 'react-i18next';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  const { t } = useTranslation();
  return (
    <Tab.Navigator>
      <Tab.Screen name="TaskList" component={TaskListScreen} options={{ title: t('tasks') }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: t('settings') }} />
    </Tab.Navigator>
  );
}

export default function Routes() {
  const { user, initializing } = useAuth();
  if (initializing) return null; // splash simples

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen name="Home" component={Tabs} options={{ headerShown: false }} />
          <Stack.Screen name="TaskForm" component={TaskFormScreen} />
        </>
      ) : (
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
}
