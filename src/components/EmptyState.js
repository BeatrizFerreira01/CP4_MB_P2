import React from 'react';
import { Text, View } from 'react-native';

export default function EmptyState({ message = "Sem tarefas" }) {
  return (
    <View style={{ padding: 20, alignItems: 'center' }}>
      <Text>{message}</Text>
    </View>
  );
}
