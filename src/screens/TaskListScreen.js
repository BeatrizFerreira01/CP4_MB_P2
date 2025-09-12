import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { FAB, Text } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
import { listenTasks, updateTask, removeTask } from '../services/tasks';
import TaskItem from '../components/TaskItem';
import useQuote from '../hooks/useQuote';
import { useTranslation } from 'react-i18next';

export default function TaskListScreen({ navigation }) {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [tasks, setTasks] = useState([]);
  const { data: quote } = useQuote();

  useEffect(() => {
    const unsub = listenTasks(user.uid, setTasks);
    return unsub;
  }, [user?.uid]);

  return (
    <View style={{ flex: 1 }}>
      {quote ? <Text style={{ padding: 12 }}>{t('quote')}: {quote}</Text> : null}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggleDone={() => updateTask(user.uid, item.id, { done: !item.done })}
            onDelete={() => removeTask(user.uid, item.id, item.notificationId)}
            onEdit={() => navigation.navigate('TaskForm', { task: item })}
          />
        )}
        ListEmptyComponent={<Text style={{ padding: 20 }}>Sem tarefas</Text>}
      />
      <FAB icon="plus" style={{ position: 'absolute', right: 16, bottom: 16 }} onPress={() => navigation.navigate('TaskForm')} label={t('newTask')} />
    </View>
  );
}
