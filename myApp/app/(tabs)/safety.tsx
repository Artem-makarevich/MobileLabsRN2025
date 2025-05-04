import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';

const CustomButton = ({ label, onPress, theme }) => (
  <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: theme.card }]}>
    <Text style={[styles.buttonText, { color: theme.text }]}>{label}</Text>
  </TouchableOpacity>
);

const SafetyScreen = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Safety</Text>

      <View style={[styles.tabContainer, { backgroundColor: theme.card }]}>
        <View style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.activeTabText, { color: theme.text }]}>Guard</Text>
        </View>
        <View style={styles.tab}>
          <Text style={[styles.inactiveTabText, { color: '#777' }]}>Confirmations</Text>
        </View>
      </View>

      <View style={styles.codeSection}>
        <Text style={[styles.loggedIn, { color: theme.textSecondary || '#ccc' }]}>Logged in as player</Text>
        <Text style={[styles.code, { color: theme.text }]}>N5KCV</Text>
        <View style={[styles.codeProgress, { backgroundColor: '#333' }]}>
          <View style={[styles.codeProgressBar, { backgroundColor: theme.accent || '#00bfff' }]} />
        </View>
      </View>

      <Text style={[styles.info, { color: theme.textSecondary || '#ccc' }]}>
        You’ll enter your code each time you enter your password to sign in to your Steam account.
      </Text>
      <Text style={[styles.tip, { color: theme.accent || '#00bfff' }]}>
        Tip: If you don’t share your PC, you can select "Remember my password" when you sign in...
      </Text>

      <View style={styles.buttonContainer}>
        <CustomButton label="Remove Authenticator" onPress={() => {}} theme={theme} />
        <CustomButton label="My Recovery Code" onPress={() => {}} theme={theme} />
        <CustomButton label="Help" onPress={() => {}} theme={theme} />
      </View>
    </View>
  );
};

export default SafetyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
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
    fontSize: 14,
    marginBottom: 5,
  },
  code: {
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 4,
  },
  codeProgress: {
    height: 4,
    width: 120,
    marginTop: 10,
    borderRadius: 2,
  },
  codeProgressBar: {
    width: '60%',
    height: '100%',
    borderRadius: 2,
  },
  info: {
    fontSize: 13,
    marginVertical: 10,
  },
  tip: {
    fontSize: 13,
    marginBottom: 20,
  },
  buttonContainer: {
    gap: 10,
  },
  button: {
    borderRadius: 6,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});
