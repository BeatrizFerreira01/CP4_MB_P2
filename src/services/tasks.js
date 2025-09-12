import {
  collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot,
  serverTimestamp, query, orderBy
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { scheduleTaskNotification, cancelNotification } from './notifications';

const path = (uid) => collection(db, 'users', uid, 'tasks');

export function listenTasks(uid, cb) {
  const q = query(path(uid), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snap) => {
    const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    cb(data);
  });
}

export async function createTask(uid, task) {
  const docRef = await addDoc(path(uid), {
    ...task,
    done: task.done ?? false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  let notificationId = null;
  if (task.notify && task.dueAt) {
    notificationId = await scheduleTaskNotification({ id: docRef.id, title: task.title, when: task.dueAt.toDate?.() || task.dueAt });
    await updateDoc(docRef, { notificationId });
  }
  return docRef.id;
}

export async function updateTask(uid, id, patch) {
  const ref = doc(db, 'users', uid, 'tasks', id);
  // Se alterou data/notify, reprograma notificação
  if ('notify' in patch || 'dueAt' in patch || 'title' in patch) {
    const nId = patch.notificationId;
    if (nId) await cancelNotification(nId);
    let newId = null;
    if (patch.notify && patch.dueAt) {
      newId = await scheduleTaskNotification({ id, title: patch.title, when: patch.dueAt.toDate?.() || patch.dueAt });
    }
    patch.notificationId = newId;
  }
  await updateDoc(ref, { ...patch, updatedAt: serverTimestamp() });
}

export async function removeTask(uid, id, notificationId) {
  if (notificationId) await cancelNotification(notificationId);
  const ref = doc(db, 'users', uid, 'tasks', id);
  await deleteDoc(ref);
}
