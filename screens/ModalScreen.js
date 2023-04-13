import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import { auth } from '../config/firebase';
import { getFirestore, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import ModalDropdown from 'react-native-modal-dropdown';


export default function Profile() {
  const [butPlayer, setbutPlayer] = useState('');
  const [assistPlayer, setassistPlayer] = useState('');

  const firestore = getFirestore();
  const userDocRef = doc(firestore, "users", auth.currentUser.uid);
  
  useEffect(() => {
	const unsubscribe = onSnapshot(userDocRef, (doc) => {
	  if (doc.exists()) {
		const data = doc.data();
		setbutPlayer(data.butPlayer);
		setassistPlayer(data.assistPlayer);
	  }
	});

	return () => unsubscribe();
  }, []);
  
  const onUpdateProfile = async () => {
	try {
	  await updateDoc(userDocRef, {
		butPlayer: butPlayer,
		assistPlayer: assistPlayer,
	  });
	} catch (error) {
	  console.error("Error updating profile: ", error);
	  Alert.alert("Error updating profile!");
	}
  };
  
  const addGoal = () => {
	setbutPlayer((prevButPlayer) => prevButPlayer + 1);
	onUpdateProfile();
  };
  
  const subtractGoal = () => {
	if (butPlayer > 0) {
	  setbutPlayer((prevButPlayer) => prevButPlayer - 1);
	  onUpdateProfile();
	}
  };
  
  const addAssist = () => {
	setassistPlayer((prevAssistPlayer) => prevAssistPlayer + 1);
	onUpdateProfile();
  };
  
  const subtractAssist = () => {
	if (assistPlayer > 0) {
	  setassistPlayer((prevAssistPlayer) => prevAssistPlayer - 1);
	  onUpdateProfile();
	}
  };


  return (
	  <ScrollView
		keyboardShouldPersistTaps="always"
		style={{ flexGrow: 1 }}>
		<View style={styles.container}>
		  <View>
			<Text style={styles.modalText}>⚽ Nombres de BUT ⚽</Text>
			<View style={styles.buttonContainer}>
			  <TouchableOpacity style={[styles.button, styles.leftButton]} onPress={subtractGoal}>
				<Text style={styles.buttonText}>-</Text>
			  </TouchableOpacity>
			  <TouchableOpacity style={[styles.button, styles.rightButton]} onPress={addGoal}>
				<Text style={styles.buttonText}>+</Text>
			  </TouchableOpacity>
			</View>
		  </View>
		  <View>
			<Text style={styles.modalText}>⚽ Nombres ASSIST ⚽</Text>
			<View style={styles.buttonContainer}>
			  <TouchableOpacity style={[styles.button, styles.leftButton]} onPress={subtractAssist}>
				<Text style={styles.buttonText}>-</Text>
			  </TouchableOpacity>
			  <TouchableOpacity style={[styles.button, styles.rightButton]} onPress={addAssist}>
				<Text style={styles.buttonText}>+</Text>
			  </TouchableOpacity>
			</View>
		  </View>
		</View>
	  </ScrollView>
	);
  }
  
  const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: "#0f3b7a",
	  alignItems: "center",
	  justifyContent: "flex-start",
	  paddingTop: StatusBar.currentHeight,
	  height: '100%',
	},
	buttonContainer: {
	  flexDirection: 'row',
	},
	button: {
	  width: 60,
	  height: 60,
	  margin: 20,
	  justifyContent: 'center',
	  alignItems: 'center',
	  backgroundColor: '#FFFFFF',
	  borderRadius: 20,
	  borderWidth: 1,
	  borderColor: '#1e4d92',
	  shadowColor: "#000",
	  shadowOffset: {
		width: 2,
		height: 2,
	  },
	  shadowOpacity: 0.25,
	  shadowRadius: 3.84,
	  elevation: 5,
	},
	leftButton: {
	  borderTopLeftRadius: 20,
	  borderBottomLeftRadius: 20,
	},
	rightButton: {
	  borderTopRightRadius: 20,
	  borderBottomRightRadius: 20,
	},
	buttonText: {
	  color: '#1e4d92',
	  fontWeight: 'regular',
	  fontSize: 30,
	},
	modalText: {
	  color: '#FFFFFF',
	  fontWeight: 'regular',
	  fontSize: 20,
	  marginTop: 10,
	},
  });