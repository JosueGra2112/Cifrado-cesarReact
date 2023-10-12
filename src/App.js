import React, { useState } from 'react';

function App() {
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
    <div className="container">
      <h1 className="title">Cifrado y Descifrado César</h1>
      <div>
        <p>Coloque el mensaje a cifrar</p>
        <input
          type="text"
          placeholder="Mensaje a Cifrar"
          value={messageToEncrypt}
          onChange={(e) => setMessageToEncrypt(e.target.value)}
        />
      </div>
      <div>
        <p>Coloque el desplazamiento</p>
        <input
          type="number"
          placeholder="Número de Posiciones a Desplazar"
          value={shift}
          onChange={(e) => handleShiftChange(e.target.value)}
        />
      </div>
      <div>
        <button onClick={encrypt}>Cifrar</button>
      </div>
      <div>
        <p>El Mensaje Cifrado es: {encryptedMessage}</p>
      </div>
      <div>
        <p>Coloque el mensaje cifrado</p>
        <input
          type="text"
          placeholder="Mensaje a Descifrar"
          value={messageToDecrypt}
          onChange={(e) => setMessageToDecrypt(e.target.value)}
        />
      </div>
      <div>
        <button onClick={decrypt}>Descifrar</button>
      </div>
      <div>
        <p>El Mensaje Descifrado es: {decryptedMessage}</p>
      </div>
      <div>
        <p>Josué granados cortés</p>
        <p>7° "B"</p>
      </div>
    </div>
  );
}

export default App;
