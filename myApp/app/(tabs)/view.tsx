import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import { Button } from '@/components/ui/Button';
import { useLocalSearchParams} from 'expo-router';

export default function ViewFileScreen() {
  const route = useRoute();
const { path } = useLocalSearchParams<{ path: string }>();
  const navigation = useNavigation();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!path) return;

    const loadContent = async () => {
      try {
        const fileContent = await FileSystem.readAsStringAsync(path);
        setContent(fileContent);
      } catch (error) {
        Alert.alert('Error', 'Unable to read file content');
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [path]);

  const handleSave = async () => {
    try {
      await FileSystem.writeAsStringAsync(path, content);
      Alert.alert('Saved', 'Changes have been saved successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to save file');
    }
  };

  useEffect(() => {
    if (path) {
      const segments = path.split('/');
      const name = segments[segments.length - 1];
      navigation.setOptions({ title: name });
    }
  }, [path]);

  if (loading) return <Text style={{ padding: 16 }}>Loading...</Text>;

  return (
    <View style={styles.container}>
      <ScrollView>
        <TextInput
          multiline
          style={styles.textArea}
          value={content}
          onChangeText={setContent}
          placeholder="File content..."
        />
      </ScrollView>
      <Button onPress={handleSave} className="m-4">
        Save
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  textArea: {
    minHeight: 300,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    marginHorizontal: 16,
    borderRadius: 8,
    textAlignVertical: 'top',
  },
});
