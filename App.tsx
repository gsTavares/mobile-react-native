import { StatusBar } from 'expo-status-bar';
import { Button, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('./assets/logo.png')}
      />
      <View>
        <View style={styles.inputGroup}>
          <Text>E-mail</Text>
          <TextInput style={styles.input} placeholder='E-mail'
            keyboardType='email-address' />
        </View>
        <View style={styles.inputGroup}>
          <Text>Senha</Text>
          <TextInput style={styles.input} placeholder='Senha'
            secureTextEntry />
        </View>
        <View>
          <Button title='Iniciar' color={'#15bd3f'} />
        </View>
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

  inputGroup: {
    width: 300,
    marginBottom: 30
  },

  input: {
    borderWidth: 2,
    borderColor: '#157fbd',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3
  }
});
