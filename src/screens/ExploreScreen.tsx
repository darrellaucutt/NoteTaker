import { Linking, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';

export function ExploreScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="subtitle">Explore</ThemedText>
        <ThemedText themeColor="textSecondary">
          This is a React Native app. Screens live in src/screens, and the tab bar is set up in App.tsx.
        </ThemedText>
        <ThemedView type="backgroundElement" style={styles.card}>
          <ThemedText type="smallBold">Run it</ThemedText>
          <ThemedText type="small">npm start</ThemedText>
          <ThemedText type="small">npm run android</ThemedText>
          <ThemedText type="small">npm run ios</ThemedText>
        </ThemedView>
        <Pressable onPress={() => Linking.openURL('https://reactnative.dev/docs/getting-started')}>
          <ThemedText type="linkPrimary">React Native documentation</ThemedText>
        </Pressable>
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
    alignSelf: 'center',
    width: '100%',
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.five,
    gap: Spacing.three,
  },
  card: {
    gap: Spacing.two,
    padding: Spacing.three,
    borderRadius: Spacing.three,
  },
});
