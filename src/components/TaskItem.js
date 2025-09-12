import React from 'react';
import { List, IconButton } from 'react-native-paper';

export default function TaskItem({ task, onToggleDone, onDelete, onEdit }) {
  return (
    <List.Item
      title={task.title}
      description={task.description}
      onPress={onEdit}
      left={() => (
        <IconButton
          icon={task.done ? 'check-circle' : 'checkbox-blank-circle-outline'}
          onPress={onToggleDone}
        />
      )}
      right={() => (
        <IconButton
          icon="delete"
          onPress={onDelete}
        />
      )}
    />
  );
}
