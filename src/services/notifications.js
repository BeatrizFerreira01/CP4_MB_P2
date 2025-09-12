import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

export async function ensureNotificationSetup() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default', importance: Notifications.AndroidImportance.DEFAULT,
    });
  }
  if (Device.isDevice) {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      await Notifications.requestPermissionsAsync();
    }
  }
}

export async function scheduleTaskNotification({ id, title, when }) {
  if (!when || when < new Date()) return null;
  return Notifications.scheduleNotificationAsync({
    content: { title: '⏰ ' + title, body: 'Sua tarefa está agendada.' },
    trigger: when,
  });
}

export async function cancelNotification(notificationId) {
  if (notificationId) await Notifications.cancelScheduledNotificationAsync(notificationId);
}
