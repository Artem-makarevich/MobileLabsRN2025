import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';

const ProfileScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const saveProfile = () => {
    if (password !== confirmPassword) {
      Alert.alert('Помилка', 'Паролі не співпадають!');
      return;
    }
    alert(`Збережено:\nІм’я: ${firstName}\nПрізвище: ${lastName}\nЕлектронна пошта: ${email}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ім’я:</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="Введіть ваше ім’я"
      />
      <Text style={styles.label}>Прізвище:</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Введіть ваше прізвище"
      />
      <Text style={styles.label}>Електронна пошта:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Введіть вашу електронну пошту"
        keyboardType="email-address"
      />
      <Text style={styles.label}>Пароль:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Введіть пароль"
        secureTextEntry
      />
      <Text style={styles.label}>Підтвердження паролю:</Text>
      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Підтвердьте пароль"
        secureTextEntry
      />
      <Button title="Зберегти профіль" onPress={saveProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
  },
});

export default ProfileScreen;
