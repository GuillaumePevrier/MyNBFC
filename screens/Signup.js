import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { getFirestore, setDoc, doc, collection, set} from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';

const backImage = require("../assets/backImage.png");
const defaultAvatar = require("../assets/defaultAvatar.png");

export default function Signup({ navigation }) {
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [dateAge, setdateAge] = useState('');
  const [positionPlayer, setpositionPlayer] = useState('');
  const [footPlayer, setfootPlayer] = useState('');
  const [taillePlayer, settaillePlayer] = useState('');
  const [poidsPlayer, setpoidsPlayer] = useState('');
  const [clubPlayer, setclubPlayer] = useState('');
  const [butPlayer, setbutPlayer] = useState('');
  const [assistPlayer, setassistPlayer] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('U11');

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
          name,
          imageUrl,
          dateAge,
          positionPlayer,
          footPlayer,
          taillePlayer: parseInt(taillePlayer),
          poidsPlayer: parseInt(poidsPlayer),
          clubPlayer,
          butPlayer: parseInt(butPlayer),
          assistPlayer: parseInt(assistPlayer),
          selectedCategory,
        };
        setDoc(doc(userRef, uid), data);    
      })    
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImageUrl(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Créer un compte</Text>
        <TouchableOpacity onPress={pickImage}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.photoButton} />
          ) : (
            <Image source={defaultAvatar} style={styles.photoButton} />
          )}
        </TouchableOpacity>
        <TextInput
          style={[styles.input, styles.shadowProp]}
          placeholder='Entrez votre nom complet'
          placeholderTextColor="#aaaaaa"
          onChangeText={setname}
          value={name}
          returnKeyType={'done'}
          />
          <TextInput
          style={[styles.input, styles.shadowProp]}
          placeholder='Entrez votre adresse email'
          placeholderTextColor="#aaaaaa"
          onChangeText={setEmail}
          value={email}
          returnKeyType={'done'}
          />
          <TextInput
          style={[styles.input, styles.shadowProp]}
          placeholder='Entrez votre mot de passe'
          placeholderTextColor="#aaaaaa"
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
          returnKeyType={'done'}
          />
          <TouchableOpacity
          style={[styles.button, styles.shadowProp]}
          onPress={onHandleSignup}
          >
          <Text style={styles.buttonText}>Créer un compte</Text>
          </TouchableOpacity>
          <View style={styles.bottom}>
          <Text style={styles.bottomText}>Vous avez déjà un compte?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.bottomLink}>Connectez-vous</Text>
          </TouchableOpacity>
          </View>
          </SafeAreaView>
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
          backImage: {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          },
          whiteSheet: {
          position: 'absolute',
          top: '20%',
          width: '100%',
          height: '100%',
          backgroundColor: '#F6F7FB',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          zIndex: 10,
          },
          form: {
          position: 'absolute',
          top: '25%',
          width: '90%',
          marginHorizontal: '5%',
          padding: 20,
          borderRadius: 20,
          backgroundColor: '#F6F7FB',
          zIndex: 20,
          },
          title: {
          marginLeft: 85,
          fontWeight: 'regular',
          color: '#d4163a',
          fontSize: 25,
          marginBottom: 20,
          },
          input: {
          backgroundColor: "#fff",
          height: 58,
          marginBottom: 20,
          fontSize: 16,
          borderRadius: 10,
          padding: 12,
          },
          button: {
          backgroundColor: '#0f3b7a',
          borderRadius: 10,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
          },
          buttonText: {
          color: '#fff',
          fontWeight: 'bold',
          fontSize: 18,
          },
          bottom: {
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 20,
          },
          bottomText: {
          color: '#808080',
          marginRight: 5,
          },
          bottomLink: {
          color: '#d4163a',
          fontWeight: 'bold',
          },
          shadowProp: {
          shadowColor: '#000',
          shadowOffset: {
          width: 0,
          height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          elevation: 4,
          },
          photoButton: {
          justifyContent: 'center',
          alignItems: 'center',
          width: 150,
          height: 150,
          borderRadius: 75,
          backgroundColor: '#c4c4c4',
          marginBottom: 15,
          marginLeft: 95,
          
        }
      })
        