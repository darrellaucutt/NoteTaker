import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { loadNote, saveNote, type Note } from '@/storage/note';

const emptyNote: Note = { title: '', body: '' };

export function WriteScreen() {
  const theme = useTheme();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [saved, setSaved] = useState<Note>(emptyNote);
  const [ready, setReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);
  const [stored, setStored] = useState(false);

  useEffect(() => {
    let cancelled = false;

    loadNote()
      .then(note => {
        if (cancelled) {
          return;
        }
        if (note) {
          setTitle(note.title);
          setBody(note.body);
          setSaved(note);
          setStored(true);
        }
        setReady(true);
      })
      .catch(() => {
        if (!cancelled) {
          setReady(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const dirty = title !== saved.title || body !== saved.body;

  async function onSave() {
    setSaving(true);
    setSaveFailed(false);
    const note = { title, body };
    try {
      await saveNote(note);
      setSaved(note);
      setStored(true);
    } catch {
      setSaveFailed(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <KeyboardAvoidingView
          style={styles.keyboard}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Spacing.two}>
          <ThemedView style={styles.editor}>
            <ThemedView style={styles.header}>
              <ThemedText type="small" themeColor="textSecondary">
                {dirty ? 'Unsaved changes' : stored ? 'Saved on this phone' : 'New note'}
              </ThemedText>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Save note"
                disabled={!ready || !dirty || saving}
                onPress={onSave}
                style={({ pressed }) => [
                  styles.saveButton,
                  { backgroundColor: theme.backgroundElement },
                  (!ready || !dirty || saving) && styles.saveButtonDisabled,
                  pressed && dirty && styles.saveButtonPressed,
                ]}>
                {saving ? (
                  <ActivityIndicator color={theme.text} />
                ) : (
                  <ThemedText type="smallBold">Save</ThemedText>
                )}
              </Pressable>
            </ThemedView>
            {saveFailed ? (
              <ThemedText type="small" themeColor="textSecondary">
                Couldn't save the note. Try again.
              </ThemedText>
            ) : null}
            {ready ? (
              <>
                <TextInput
                  value={title}
                  onChangeText={setTitle}
                  placeholder="Title"
                  placeholderTextColor={theme.textSecondary}
                  style={[styles.titleInput, { color: theme.text }]}
                  returnKeyType="next"
                  submitBehavior="blurAndSubmit"
                  accessibilityLabel="Note title"
                />
                <TextInput
                  value={body}
                  onChangeText={setBody}
                  placeholder="Start writing…"
                  placeholderTextColor={theme.textSecondary}
                  style={[styles.bodyInput, { color: theme.text }]}
                  multiline
                  textAlignVertical="top"
                  accessibilityLabel="Note body"
                />
              </>
            ) : null}
          </ThemedView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  keyboard: {
    flex: 1,
  },
  editor: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.three,
    gap: Spacing.two,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
  },
  saveButton: {
    minWidth: 72,
    minHeight: 36,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.45,
  },
  saveButtonPressed: {
    opacity: 0.7,
  },
  titleInput: {
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 34,
    paddingVertical: Spacing.one,
  },
  bodyInput: {
    flex: 1,
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 26,
    paddingTop: Spacing.two,
  },
});
