import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput, Switch, SegmentedButtons } from 'react-native-paper';
import { Timestamp } from 'firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createTask, updateTask } from '../services/tasks';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { ensureNotificationSetup } from '../services/notifications';

export default function TaskFormScreen({ route, navigation }) {
  const { t } = useTranslation();
  const editing = route.params?.task || null;
  const { user } = useAuth();

  const [title, setTitle] = useState(editing?.title || '');
  const [description, setDescription] = useState(editing?.description || '');
  const [priority, setPriority] = useState(editing?.priority || 'medium');
  const [date, setDate] = useState(editing?.dueAt?.toDate?.() || new Date());
  const [notify, setNotify] = useState(editing?.notify ?? true);
  const [showPicker, setShowPicker] = useState(false);

  const onSave = async () => {
    await ensureNotificationSetup();
    const payload = {
      title, description, priority,
      dueAt: Timestamp.fromDate(date),
      notify, done: editing?.done ?? false
    };
    if (editing) {
      await updateTask(user.uid, editing.id, payload);
    } else {
      await createTask(user.uid, payload);
    }
    navigation.goBack();
  };

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <TextInput label={t('title')} value={title} onChangeText={setTitle} />
      <TextInput label={t('description')} value={description} onChangeText={setDescription} multiline />
      <SegmentedButtons
        value={priority}
        onValueChange={setPriority}
        buttons={[
          { value: 'low', label: t('low') },
          { value: 'medium', label: t('medium') },
          { value: 'high', label: t('high') },
        ]}
      />
      <Button onPress={() => setShowPicker(true)}>{t('dueAt')}: {date.toLocaleString()}</Button>
      {showPicker && (
        <DateTimePicker value={date} onChange={(_, d) => { if (d) setDate(d); setShowPicker(false); }} mode="datetime" />
      )}
      <Switch value={notify} onValueChange={setNotify} />
      <Button mode="contained" onPress={onSave}>{t('save')}</Button>
    </View>
  );
}
