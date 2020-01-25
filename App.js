import React from 'react';
import { SafeAreaView, StyleSheet, Text, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.welcome}>Olá Mundo</Text>
        <Text style={styles.welcome}>Abaixo</Text>
      </SafeAreaView>
    </>
  );
};

export default App;
