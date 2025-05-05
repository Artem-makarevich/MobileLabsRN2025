// screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  StyleSheet,
  Modal,
  Button,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';

const ROOT_DIR = FileSystem.documentDirectory + 'AppData';

export default function HomeScreen() {
  const [currentPath, setCurrentPath] = useState(ROOT_DIR);
  const [items, setItems] = useState<string[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [newName, setNewName] = useState('');
  const [isFolder, setIsFolder] = useState(true);
  const navigation = useNavigation();

  const loadDirectory = async (path: string) => {
    const content = await FileSystem.readDirectoryAsync(path);
    setItems(content);
  };

  useEffect(() => {
    loadDirectory(currentPath);
  }, [currentPath]);

  const handleItemPress = async (item: string) => {
    const fullPath = `${currentPath}/${item}`;
    const info = await FileSystem.getInfoAsync(fullPath);
    if (info.isDirectory) {
      setCurrentPath(fullPath);
    } else {
      navigation.navigate('ViewFile', { path: fullPath });
    }
  };

  const handleGoBack = () => {
    if (currentPath === ROOT_DIR) return;
    const parent = currentPath.split('/').slice(0, -2).join('/') + '/';
    setCurrentPath(parent);
  };

  const createItem = async () => {
    const fullPath = `${currentPath}/${newName}`;
    try {
      if (isFolder) {
        await FileSystem.makeDirectoryAsync(fullPath);
      } else {
        await FileSystem.writeAsStringAsync(fullPath + '.txt', '');
      }
      loadDirectory(currentPath);
    } catch (e) {
      Alert.alert('Error', 'Cannot create item');
    } finally {
      setShowInput(false);
      setNewName('');
    }
  };

  const confirmDelete = (name: string) => {
    Alert.alert('Confirm delete', `Delete ${name}?`, [
      { text: 'Cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteItem(name),
      },
    ]);
  };

  const deleteItem = async (name: string) => {
    const path = `${currentPath}/${name}`;
    await FileSystem.deleteAsync(path, { idempotent: true });
    loadDirectory(currentPath);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.path}>{currentPath.replace(ROOT_DIR, '') || '/'}</Text>
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
