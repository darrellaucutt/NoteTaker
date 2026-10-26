import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'note';

export type Note = {
  title: string;
  body: string;
};

export async function loadNote(): Promise<Note | null> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  const parsed: unknown = JSON.parse(raw);
  if (
    typeof parsed !== 'object' ||
    parsed === null ||
    !('title' in parsed) ||
    !('body' in parsed) ||
    typeof parsed.title !== 'string' ||
    typeof parsed.body !== 'string'
  ) {
    return null;
  }

  return { title: parsed.title, body: parsed.body };
}

export async function saveNote(note: Note): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(note));
}
