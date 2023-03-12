import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { getFirestore, setDoc, doc, collection, set} from 'firebase/firestore';
const backImage = require("../assets/backImage.png");

export default function Signup({ navigation }) {
  const [nom, setnom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const onHandleSignup = async() => {
  const firestore = getFirestore();
  
    if (email !== '' && password !== '') {

        createUserWithEmailAndPassword(auth, email, password)
        
        .then((response) => {
          const uid = auth.currentUser?.uid
          const userRef = collection(firestore, "users");
          const data = {
              uid,
              email,
              nom,
          };
            setDoc(doc(userRef, uid), data);    
        })    
    }
  };
  
  
  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Créer un compte</Text>
        <TextInput
            style={[styles.input, styles.shadowProp]}
            placeholder='Entrez votre nom complet'
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setnom(text)}
            value={nom}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
        />
         <TextInput
        style={[styles.input, styles.shadowProp]}
        placeholder="Entrez votre e-mail"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoFocus={true}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={[styles.input, styles.shadowProp]}
        placeholder="Entrer un mot de passe"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        textContentType="password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
        <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}> Connexion</Text>
      </TouchableOpacity>
      <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
        <Text style={{color: 'gray', fontWeight: '400', fontSize: 16}}>Déjà un compte? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{color: '#0f3b7a', fontWeight: '600', fontSize: 18 }}> Connexion</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    marginTop: 50,
    fontSize: 25,
    fontWeight: 'regular',
    color: "#0f3b7a",
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#fff",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
    
  },
  backImage: {
    width: "100%",
    height: 340,
    position: "absolute",
    top: 0,
    resizeMode: 'cover',
  },
  whiteSheet: {
    width: '100%',
    height: '75%',
    position: "absolute",
    bottom: 0,
    backgroundColor: '#F6F7FB',
    borderTopLeftRadius: 60,
    borderColor: '#0f3b7a',
    borderTopWidth: 1,
    borderLeftWidth: 1,
  },
  form: {
    flex: 1,
    marginTop: 15,
    justifyContent: 'center',
    marginHorizontal: 30,
    marginTop: 50,
    
  },
  button: {
    backgroundColor: '#d4163a',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
});