import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, SafeAreaView, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

import { rdb, firebase } from './firebase';

const formatDate = date => {
  let hour = date.getHours();
  let min = date.getMinutes();
  if (hour > 12) {
    hour = hour - 12;
  }
  if (min < 10) {
    min = `0${min}`;
  }
  return `${hour}:${min}`;
};

export default function App() {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState();
  const [name, setName] = useState('i_didnt_change_my_name');

  // V2
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

    // V1
    // setMessages([newMessage, ...messages]);

    // V2
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
        style={{ width: '100%' }}
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

const styles = StyleSheet.create({
  input: {
    padding: 8,
    paddingLeft: 24,
    paddingRight: 24,
    fontSize: 16,
    backgroundColor: '#F7F7F7',
    flex: 1,
  },
  nameInput: {
    flex: 0,
    width: '100%',
  },
  messageContainer: {
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 16,
    alignSelf: 'flex-start',
  },
  messageTitle: {
    marginBottom: 4,
    marginLeft: 14,
  },
  messageText: {
    color: 'white',
  },
  message: {
    backgroundColor: '#3399FF',
    padding: 8,
    borderRadius: 14,
  },
  messageInputContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  sendMessageButton: {
    borderRadius: 12,
    backgroundColor: 'blue',
    height: 24,
    width: 24,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
