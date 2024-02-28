import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Switch, FlatList, StyleSheet, Text, Keyboard } from 'react-native';

// Componente que representa uma mensagem no chat
const ChatMessage = ({ message, isClient }) => (
  <View style={[styles.messageContainer, isClient ? styles.clientMessage : styles.attendantMessage]}>
    <Text style={styles.messageText}>{message}</Text>
  </View>
);

// Componente principal do aplicativo
function App() {
  const [mensagens, setMensagens] = useState([]); // Estado para armazenar as mensagens do chat
  const [inputText, setInputText] = useState(''); // Estado para armazenar o texto digitado pelo usuário
  const [isCliente, setIsCliente] = useState(true); // Estado para controlar se o usuário é cliente ou atendente
  const inputRef = useRef(null); // Referência para o componente TextInput

  // Função para enviar uma mensagem
  const botaoEnviaMensagem = () => {
    if (inputText.trim() !== '') { // Verifica se o texto não está vazio
      setMensagens([...mensagens, { id: mensagens.length.toString(), text: inputText, isClient: isCliente }]); // Adiciona a mensagem ao estado de mensagens
      setInputText(''); // Limpa o campo de entrada
    }
  };

  // Função chamada quando o usuário pressiona uma tecla no teclado
  const teclaEnviaMensagem = (event) => {
    if (event.key === 'Enter') { // Verifica se a tecla pressionada é "Enter"
      botaoEnviaMensagem(); // Chama a função para enviar a mensagem
    }
  };

  return (
    <View style={styles.container}>
      {/* Componente para alternar entre cliente e atendente */}
      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>Cliente</Text>
        <Switch
          value={isCliente}
          onValueChange={(value) => setIsCliente(value)}
          thumbColor="#FFFFFF"
          trackColor={{ false: '#CCCCCC', true: '#25D366' }}
        />
        <Text style={styles.switchText}>Atendente</Text>
      </View>
      {/* Lista de mensagens */}
      <FlatList
        data={mensagens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatMessage message={item.text} isClient={item.isClient} />}
        contentContainerStyle={styles.messagesContainer}
      />
      {/* Componente de entrada de texto */}
      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Digite sua mensagem..."
          value={inputText}
          onChangeText={setInputText}
          multiline
          onSubmitEditing={botaoEnviaMensagem} // Função chamada quando o usuário pressiona "Enviar" no teclado
          onKeyPress={teclaEnviaMensagem} // Função chamada quando o usuário pressiona uma tecla no teclado
        />
        {/* Botão de enviar mensagem */}
        <TouchableOpacity style={styles.sendButton} onPress={botaoEnviaMensagem}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Estilos do componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  switchText: {
    fontSize: 16,
    marginRight: 8,
    marginLeft: 8,
  },
  messagesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
  },
  messageContainer: {
    maxWidth: '80%',
    marginBottom: 8,
    padding: 12,
    borderRadius: 8,
  },
  clientMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  attendantMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E4E4E4',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#CCCCCC',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#25D366',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default App;
