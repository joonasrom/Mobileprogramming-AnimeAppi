import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { AsyncStorage } from 'react-native';
import { StyleSheet, TextInput, View, Button, LogBox } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';

//Ignoring timer warning for now...
LogBox.ignoreLogs(['Setting a timer for a long period of time']);

//Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBy49dtcNj0izr01HXj30vL47-iAu61VBo",
    authDomain: "react-anime-chat.firebaseapp.com",
    projectId: "react-anime-chat",
    storageBucket: "react-anime-chat.appspot.com",
    messagingSenderId: "911563070948",
    appId: "1:911563070948:web:e8a1426bf0de303e2fbbf1"
};

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
};

//Database
const db = firebase.firestore();

//Chats from database
const chats = db.collection('chats');

export default function App() {
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    
    //Gets user and messages from database when opened
    useEffect(() => {
        readUser()
        const unsub = chats.onSnapshot((querySnapshot) => {
            const messagesDatabase = querySnapshot
                .docChanges()
                .filter(({ type }) => type === 'added')
                .map(({ doc }) => {
                    const message = doc.data()
                    return { ...message, createdAt: message.createdAt.toDate() }
                })
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            appendMessages(messagesDatabase);
        })
        return () => unsub()
    }, []);

    //Appends messages to giftedchat
    const appendMessages = useCallback(
        (messages) => {
            setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
        },
        [messages]
    );

    //Reads logged in used
    async function readUser() {
        const user = await AsyncStorage.getItem('user')
        if (user) {
            setUser(JSON.parse(user))
        }
    };

    //Sets username and gives it random id
    async function handlePress() {
        const _id = Math.random().toString(36).substring(7)
        const user = { _id, name }
        await AsyncStorage.setItem('user', JSON.stringify(user))
        setUser(user)
    };

    //Logs user out of chat
    async function handleLogOut() {
        await AsyncStorage.setItem('user', JSON.stringify(null))
        setUser(null)
        setName("")
    };

    //Handles message sending 
    async function handleSend(messages) {
        const writing = messages.map((msg) => chats.add(msg))
        await Promise.all(writing)
    };

    //If user is not logged in, user will have to give username and log in
    if (!user) {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="Anna chat käyttäjänimi" value={name} onChangeText={setName} />
                <Button onPress={handlePress} color="#A16E83" title="Siirry chattiin" />
            </View>
        );
    }
    return (<View style={styles.container}>
        <Button
            title="Kirjaudu ulos"
            color="#A16E83"
            onPress={handleLogOut}
        />
        <GiftedChat
            textProps={{ style: { color: "#5d3c4a" } }}
            listViewProps={{
                style: {
                    backgroundColor: '#E7E3D4',
                }
            }}
            messages={messages} user={user} onSend={handleSend} />
    </View>
    );
};

//Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E7E3D4',
        justifyContent: 'center',
        padding: 5,
    },
    input: {
        height: 50,
        width: '100%',
        borderWidth: 1,
        padding: 15,
        marginBottom: 20,
        borderColor: 'gray',
    },
});