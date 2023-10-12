import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function App() {
  const [messageToEncrypt, setMessageToEncrypt] = useState('');
  const [messageToDecrypt, setMessageToDecrypt] = useState('');
  const [shift, setShift] = useState(0);
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');

  const encrypt = () => {
    const encryptedArray = shiftMessage(messageToEncrypt, shift);
    setEncryptedMessage(encryptedArray);
  };

  const decrypt = () => {
    const decryptedArray = shiftMessage(messageToDecrypt, -shift);
    setDecryptedMessage(decryptedArray);
  };

  const shiftMessage = (text, shift) => {
    return text
      .split('')
      .map((char) => {
        if (/[a-zA-Z]/.test(char)) {
          const isUpperCase = char === char.toUpperCase();
          const base = isUpperCase ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
          const charCode = char.charCodeAt(0);
          const shiftedCharCode = ((charCode - base + shift + 26) % 26) + base;
          return String.fromCharCode(shiftedCharCode);
        } else {
          return char;
        }
      })
      .join('');
  };

  const handleShiftChange = (text) => {
    const parsedShift = parseInt(text);
    if (!isNaN(parsedShift)) {
      setShift(parsedShift);
    } else {
      setShift(0);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cifrado y Descifrado César</Text>
      <Text>Coloque el mensaje a cifrar</Text>
      <TextInput
        style={styles.input}
        
        placeholder="Mensaje a Cifrar"
        value={messageToEncrypt}
        onChangeText={(text) => setMessageToEncrypt(text)}
      />
      <Text>Coloque el desplazamiento</Text>
      <TextInput
        style={styles.input}
        placeholder="Número de Posiciones a Desplazar"
        value={shift.toString()}
        onChangeText={handleShiftChange}
      />
      <Text></Text>
      <Button title="Cifrar" onPress={encrypt} />
      <Text></Text>
      <Text>El Mensaje Cifrado es: {encryptedMessage}</Text>
      <Text></Text>
      <Text>Coloque el mensaje cifrado</Text>
      <TextInput
        style={styles.input}
        placeholder="Mensaje a Descifrar"
        value={messageToDecrypt}
        onChangeText={(text) => setMessageToDecrypt(text)}
      />
      <Button title="Descifrar" onPress={decrypt} />
      <Text>El Mensaje Descifrado es: {decryptedMessage}</Text>
      <Text></Text>
      <Text>Josué granados cortés</Text>
      <Text>7° "B"</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    width: '100%',
    padding: 10,
    marginBottom: 10,
  },
});
