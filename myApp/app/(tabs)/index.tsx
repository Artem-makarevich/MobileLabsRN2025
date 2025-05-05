import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, TextInput, StyleSheet, Modal, Button } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';

const ROOT_DIR = FileSystem.documentDirectory + 'AppData';

export default function HomeScreen() {
  const [currentPath, setCurrentPath] = useState(ROOT_DIR);
  const [items, setItems] = useState<string[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [newName, setNewName] = useState('');
  const [isFolder, setIsFolder] = useState(true);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false); // Change initial state to false

  // Request media library permissions (if necessary)
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access media is required!');
      }
    };

    requestPermissions();
  }, []);

  // Load the directory content
  const loadDirectory = async (path: string) => {
    setIsLoading(true); // Set loading to true when starting the directory load
    try {
      const content = await FileSystem.readDirectoryAsync(path);
      const sorted = content.sort();
      setItems(sorted);
    } catch (e) {
      console.error('Помилка при читанні директорії:', e);
      Alert.alert('Помилка', 'Не вдалося прочитати директорію');
    } finally {
      setIsLoading(false); // Set loading to false after data load attempt
    }
  };

  // Ensure the directory exists on first render
  useEffect(() => {
    const ensureDir = async () => {
      try {
        const dirInfo = await FileSystem.getInfoAsync(ROOT_DIR);
        if (!dirInfo.exists) {
          await FileSystem.makeDirectoryAsync(ROOT_DIR, { intermediates: true });
        }
        setCurrentPath(ROOT_DIR);
      } catch (e) {
        console.error('Помилка при створенні директорії:', e);
        Alert.alert('Помилка', 'Не вдалося створити директорію');
      }
    };

    ensureDir();
  }, []);

  // Load directory contents whenever the current path changes
  useEffect(() => {
    if (!isLoading) {
      loadDirectory(currentPath);
    }
  }, [currentPath]);

  // Handle item press
  const handleItemPress = async (item: string) => {
    const fullPath = `${currentPath}/${item}`;
    const info = await FileSystem.getInfoAsync(fullPath);
    if (info.isDirectory) {
      setCurrentPath(fullPath);
    } else {
      navigation.navigate('ViewFile', { path: fullPath });
    }
  };

  // Go back to the previous directory
  const handleGoBack = () => {
    if (currentPath === ROOT_DIR) return;

    const parentPath = currentPath.substring(0, currentPath.lastIndexOf('/')) || ROOT_DIR;
    setCurrentPath(parentPath);
  };

  // Create a new folder or file
  const createItem = async () => {
    if (!newName.trim()) {
      Alert.alert('Помилка', 'Імʼя не може бути порожнім');
      return;
    }

    try {
      setIsLoading(true); // Start loading
      if (isFolder) {
        await FileSystem.makeDirectoryAsync(`${currentPath}/${newName}`);
      } else {
        await FileSystem.writeAsStringAsync(`${currentPath}/${newName}.txt`, '');
      }
      setNewName(''); // Clear the input field after creating
      loadDirectory(currentPath); // Reload the directory after creation
    } catch (e) {
      Alert.alert('Помилка', 'Не вдалося створити елемент');
    } finally {
      setShowInput(false);
      setIsLoading(false); // Stop loading after the operation
    }
  };

  // Confirm deletion of an item
  const confirmDelete = (name: string) => {
    Alert.alert('Видалення', `Видалити ${name}?`, [
      { text: 'Скасувати' },
      {
        text: 'Видалити',
        style: 'destructive',
        onPress: () => deleteItem(name),
      },
    ]);
  };

  // Delete an item
  const deleteItem = async (name: string) => {
    const path = `${currentPath}/${name}`;
    try {
      setIsLoading(true);
      await FileSystem.deleteAsync(path, { idempotent: true });
      loadDirectory(currentPath); // Reload directory after deletion
    } catch (e) {
      Alert.alert('Помилка', 'Не вдалося видалити');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.path}>{currentPath.replace(ROOT_DIR, '') || '/'}</Text>

      {isLoading ? (
        <Text>Завантаження...</Text>
      ) : items.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Папка порожня</Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleItemPress(item)}
              onLongPress={() => confirmDelete(item)}
              style={styles.item}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <View style={styles.actions}>
        <Button title="⬆ Go Up" onPress={handleGoBack} />
        <Button title="+ Folder" onPress={() => { setIsFolder(true); setShowInput(true); }} />
        <Button title="+ File" onPress={() => { setIsFolder(false); setShowInput(true); }} />
      </View>

      <Modal visible={showInput} animationType="slide" transparent>
        <View style={styles.modalView}>
          <TextInput
            placeholder={isFolder ? 'Folder Name' : 'File Name'}
            value={newName}
            onChangeText={setNewName}
            style={styles.input}
          />
          <Button title="Create" onPress={createItem} />
          <Button title="Cancel" onPress={() => setShowInput(false)} color="grey" />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  path: { fontWeight: 'bold', marginBottom: 10 },
  item: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  modalView: {
    backgroundColor: 'white',
    padding: 20,
    margin: 40,
    borderRadius: 10,
    elevation: 5,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});
