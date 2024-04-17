import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/logo.png')}
      />
      <View>
        <Button title='Iniciar' color={'#15bd3f'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 300,
    paddingTop: 10
  },
});
