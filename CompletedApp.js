import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, FlatList, SafeAreaView, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

import { rdb, firebase } from './firebase';
import formatDate from './formatDate';
import colors from './colors';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [name, setName] = useState('i_didnt_change_my_name');

  useEffect(() => {
    rdb.ref('messages').on('child_added', snap => {
      const data = snap.val();
      const newMessage = {
        ...data,
        date: new Date(data.date),
      }
      setMessages(oldMessages => [newMessage, ...oldMessages]);
    });
  }, []);

  const didPressSendMessage = () => {
    const newMessage = {
      name,
      text: messageText,
      date: firebase.database.ServerValue.TIMESTAMP,
    }
    rdb.ref('messages').push(newMessage);
    setMessageText('');
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput 
        value={name}
        placeholder='Your name'
        style={[styles.input, styles.nameInput]}
        onChangeText={setName}
      />
      <FlatList 
        inverted
        data={messages}
        contentContainerStyle={{
          paddingTop: 20
        }}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.messageTitle}>{item.name} {formatDate(item.date)}</Text>
            <View style={styles.message}>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          </View>
        )}
        keyExtractor={m => String(m.date)}
      />
      <KeyboardAvoidingView 
        enabled
        behavior='padding' 
        style={styles.messageInputContainer}
      >
        <TextInput 
          value={messageText}
          placeholder='Your message'
          style={styles.input}
          onChangeText={setMessageText}
        />
        <TouchableOpacity 
          style={styles.sendMessageButton}
          onPress={didPressSendMessage}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = {
  input: {
    padding: 8,
    paddingLeft: 24,
    paddingRight: 24,
    fontSize: 16,
    backgroundColor: colors.inputGray,
    flex: 1,
  },
  nameInput: {
    flex: 0,
    width: '100%',
  },
  messageContainer: {
    marginTop: 10,
    marginLeft: 16,
  },
  messageTitle: {
    marginBottom: 4,
    marginLeft: 14,
  },
  messageText: {
    color: 'white',
  },
  message: {
    backgroundColor: colors.messageBlue,
    padding: 8,
    borderRadius: 14,
    paddingLeft: 14,
    paddingRight: 14,
    alignSelf: 'flex-start',
  },
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sendMessageButton: {
    borderRadius: 12,
    backgroundColor: colors.messageBlue,
    height: 24,
    width: 24,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
};
