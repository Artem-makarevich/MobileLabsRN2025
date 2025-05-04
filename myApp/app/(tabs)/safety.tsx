import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeContext';
const SafetyScreen = () => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Safety</Text>

      <View style={styles.tabContainer}>
        <View style={[styles.tab, styles.activeTab]}>
          <Text style={styles.activeTabText}>Guard</Text>
        </View>
        <View style={styles.tab}>
          <Text style={styles.inactiveTabText}>Confirmations</Text>
        </View>
      </View>

      <View style={styles.codeSection}>
        <Text style={styles.loggedIn}>Logged in as player</Text>
        <Text style={styles.code}>N5KCV</Text>
        <View style={styles.codeProgress}>
          <View style={styles.codeProgressBar} />
        </View>
      </View>

      <Text style={styles.info}>
        You’ll enter your code each time you enter your password to sign in to your Steam account.
      </Text>
      <Text style={styles.tip}>
        Tip: If you don’t share your PC, you can select {'"'}Remember my password{'"'} when you sign in to the PC client
        to enter your password and authenticator code less often.
      </Text>

      <View style={styles.buttonContainer}>
        <Button mode="contained-tonal" style={styles.button}>Remove Authenticator</Button>
        <Button mode="contained-tonal" style={styles.button}>My Recovery Code</Button>
        <Button mode="contained-tonal" style={styles.button}>Help</Button>
      </View>
    </View>
  );
};

export default SafetyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f111d',
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1f2235',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 30,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#2a2d45',
  },
  activeTabText: {
    color: 'white',
    fontWeight: '600',
  },
  inactiveTabText: {
    color: '#777',
  },
  codeSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  loggedIn: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 5,
  },
  code: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 4,
  },
  codeProgress: {
    height: 4,
    width: 120,
    backgroundColor: '#333',
    marginTop: 10,
    borderRadius: 2,
  },
  codeProgressBar: {
    width: '60%',
    height: '100%',
    backgroundColor: '#00bfff',
    borderRadius: 2,
  },
  info: {
    color: '#ccc',
    fontSize: 13,
    marginVertical: 10,
  },
  tip: {
    color: '#00bfff',
    fontSize: 13,
    marginBottom: 20,
  },
  buttonContainer: {
    gap: 10,
  },
  button: {
    backgroundColor: '#1f2235',
    borderRadius: 6,
  },
});
