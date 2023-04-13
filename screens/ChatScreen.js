import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import { auth } from '../config/firebase';
import { getFirestore, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import ModalDropdown from 'react-native-modal-dropdown';

async function pickImage() {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (status !== 'granted') {
	alert('Nous avons besoin de la permission pour accéder à votre galerie.');
	return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
	mediaTypes: ImagePicker.MediaTypeOptions.Images,
	allowsEditing: true,
	aspect: [4, 3],
	quality: 1,
  });

  if (!result.canceled) {
	const imageUri = result.assets[0].uri;
	// Utilisez l'imageUri comme vous le souhaitez
  }
};

const defaultAvatar = require("../assets/defaultAvatar.png");



export default function Profile() {
  const [name, setName] = useState('');
  const [positionPlayer, setpositionPlayer] = useState('');
  const [taillePlayer, settaillePlayer] = useState('');
  const [poidsPlayer, setpoidsPlayer] = useState('');
  const [butPlayer, setbutPlayer] = useState('');
  const [assistPlayer, setassistPlayer] = useState('');
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('U11');

  const firestore = getFirestore();
  const userDocRef = doc(firestore, "users", auth.currentUser.uid);
  
  const addGoal = () => {
	setbutPlayer(prevButPlayer => prevButPlayer + 1);
	onUpdateProfile();
  };
  
  const subtractGoal = () => {
	if (butPlayer > 0) {
	  setbutPlayer(prevButPlayer => prevButPlayer - 1);
	  onUpdateProfile();
	}
  };
  
  const addAssist = () => {
	setassistPlayer(prevAssistPlayer => prevAssistPlayer + 1);
	onUpdateProfile();
  };
  
  const subtractAssist = () => {
	if (assistPlayer > 0) {
	  setassistPlayer(prevAssistPlayer => prevAssistPlayer - 1);
	  onUpdateProfile();
	}
  };

  useEffect(() => {
	const unsubscribe = onSnapshot(userDocRef, (doc) => {
	  if (doc.exists()) {
		const data = doc.data();
		setName(data.name);
		setpositionPlayer(data.positionPlayer);
		settaillePlayer(data.taillePlayer);
		setpoidsPlayer(data.poidsPlayer);
		setbutPlayer(data.butPlayer);
		setassistPlayer(data.assistPlayer);
		setEmail(data.email);
		setImageUrl(data.imageUrl);
	  } else {
		console.log("No such document!");
	  }
	});
	return unsubscribe;
  }, []);

  const onUpdateProfile = async () => {
	try {
	  await updateDoc(userDocRef, {
		name,
		positionPlayer,
		taillePlayer: parseInt(taillePlayer),
		poidsPlayer: parseInt(poidsPlayer),
		butPlayer: parseInt(butPlayer),
		assistPlayer: parseInt(assistPlayer),
		selectedCategory,
		email,
		imageUrl,
	  });
	  Alert.alert("Votre profil est bien mis à jour!");
	} catch (error) {
	  console.error("Erreur de mise à jour: ", error);
	  Alert.alert("Erreur de mise à jour!");
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
<ScrollView 
	 Style={styles.container}
     keyboardShouldPersistTaps="always">
	 <View Style={styles.container}>
	  <View style={styles.profileInfo}>
		<TouchableOpacity onPress={pickImage}>
		  {imageUrl ? (
			<Image source={{ uri: imageUrl }} style={styles.avatar} />
		  ) : (
			<Image source={defaultAvatar} style={styles.avatar} />
		  )}
		</TouchableOpacity>
		
		<View style={styles.profileDetails}>
		<TouchableOpacity style={[styles.updateButton, styles.shadowProp]} onPress={onUpdateProfile}>
			<Text style={styles.updateButtonText}>Mettre à jour</Text>
		  </TouchableOpacity>
		  <Text style={styles.label}>Name:</Text>
		  <TextInput
			style={[styles.input, styles.shadowProp]}
			placeholder="Enter your name"
			value={name}
			onChangeText={setName}
		  />
			<View>
			  <Text style={styles.label}>Position du joueur :</Text>
			  <ModalDropdown
				options={[
				  'Gardien de but',
				  'Défenseur central',
				  'Défenseur latéral',
				  'Milieu défensif',
				  'Milieu central',
				  'Milieu offensif',
				  'Ailier',
				  'Avant-centre',
				  'Deuxième attaquant',
				  'Attaquant de soutien latéral'
				]}
				defaultValue={positionPlayer}
				onSelect={(index, value) => setpositionPlayer(value)}
				style={[styles.input, styles.shadowProp]}
				renderRow={(rowData, rowID, highlighted) => (
				  <View style={[styles.row, highlighted && styles.highlightedRow]}>
					<Text style={[styles.rowText, highlighted && styles.highlightedRowText]}>
					  {rowData}
					</Text>
				  </View>
				)}
			  />
			</View>
			<View>
			  <Text style={styles.label}>Catégorie d'âge :</Text>
			  <ModalDropdown
				options={[
				  'U6',
				  'U7',
				  'U8',
				  'U14',
				  'U15',
				  'U16',
				  'U17',
				  'U18',
				  'U19',
				  'Senior'
				]}
				defaultValue={selectedCategory}
				onSelect={(index, value) => setSelectedCategory(value)}
				style={[styles.input, styles.shadowProp]}
				renderRow={(rowData, rowID, highlighted) => (
				  <View style={[styles.row, highlighted && styles.highlightedRow]}>
					<Text style={[styles.rowText, highlighted && styles.highlightedRowText]}>
					  {rowData}
					</Text>
				  </View>
				)}
			  />
			</View>
			<Text style={styles.label}>Taille:</Text>
			<TextInput
			  style={[styles.input, styles.shadowProp]}
			  placeholder="Taille du joueur en centimètres"
			  value={taillePlayer.toString()}
			  onChangeText={settaillePlayer}
			  keyboardType="numeric"
			  returnKeyType={'done'}
			/>
			<Text style={styles.label}>Poids:</Text>
			<TextInput
			  style={[styles.input, styles.shadowProp]}
			  placeholder="Poids du joueur en kilogrammes"
			  value={poidsPlayer.toString()}
			  onChangeText={setpoidsPlayer}
			  keyboardType="numeric"
			  returnKeyType={'done'}
			/>
			<Text style={styles.label}>Statistiques de but:</Text>
			<TextInput
			  style={[styles.input, styles.shadowProp]}
			  placeholder="Statistiques (nombre de buts)"
			  value={butPlayer.toString()}
			  onChangeText={setbutPlayer}
			  keyboardType="numeric"
			  returnKeyType={'done'}
			/>
			<Text style={styles.label}>Statistiques d'assistances:</Text>
			<TextInput
			  style={[styles.input, styles.shadowProp]}
			  placeholder="Statistiques (nombre d'assistances)"
			  value={assistPlayer.toString()}
			  onChangeText={setassistPlayer}
			  keyboardType="numeric"
			  returnKeyType={'done'}
			/>
		  <Text style={styles.label}>Email:</Text>
		  <TextInput
			style={[styles.input, styles.shadowProp]}
			placeholder="Enter your email"
			value={email}
			onChangeText={setEmail}
			returnKeyType={'done'}
		  />
		</View>
	  </View>
	  </View>
	</ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
	flex: 1,
	backgroundColor: "#F6F7FB",
	alignItems: "center",
	justifyContent: "flex-start",
	paddingTop: StatusBar.currentHeight,
	height: '100%',
	width: '100%',
  },
  header: {
	width: "100%",
	backgroundColor: "#F6F7FB",
	height: 50,
	justifyContent: "center",
	alignItems: "center",
  },
  headerText: {
	color: "#fff",
	fontWeight: "bold",
	fontSize: 20,
  },
  profileInfo: {
	flexDirection: "column",
	marginVertical: 20,
	alignItems: "center",
  },
  avatar: {
	width: 120,
	height: 120,
	borderRadius: 60,
  },
  profileDetails: {
	flex: 1,
	marginLeft: 20,
	marginRight: 20,
  },
  label: {
	fontWeight: "regular",
	marginVertical: 10,
	fontSize: 16,
	marginLeft: 10,
	width: '100%',
	},
	input: {
	backgroundColor: "#fff",
	  height: 50,
	  marginBottom: 10,
	  fontSize: 16,
	  borderRadius: 10,
	  padding: 12,
	  width: 'auto',
	},
	updateButton: {
	backgroundColor: '#0f3b7a',
	  borderRadius: 10,
	  height: 50,
	  justifyContent: 'center',
	  alignItems: 'center',
	  marginTop: 10,
	  
	},
	updateButtonText: {
	color: "#fff",
	fontWeight: "bold",
	fontSize: 16,
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
	  dropdownText: {
		fontSize: 16,
		color: 'black',
		padding: 8,
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 5,
		textAlign: 'center',
	  },
	  dropdownStyle: {
		width: '80%',
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 5,
	  },
	  dropdownTextStyle: {
		fontSize: 16,
		color: 'black',
		padding: 8,
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 5,
		textAlign: 'center',
	  },
	  pickerContainer: {
		  marginTop: 20,
		  borderWidth: 1,
		  borderColor: '#ccc',
		  borderRadius: 10,
		  overflow: 'hidden',
		  marginBottom: 10,
		  width: 'auto',
		  height: 180,
		},
		  row: {
			padding: 10,
			width: 'auto',
			backgroundColor: '#fff',
			borderBottomWidth: 1,
			borderBottomColor: '#eee',
			// Add styles for the shadow effect here
			shadowColor: '#000',
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.2,
			shadowRadius: 2,
			// Add styles for the 3D effect here
			transform: [{ perspective: 1000 }, { scale: 0.95 }]
		  },
		  highlightedRow: {
			backgroundColor: '#f0f0f0'
			
		  },
		  rowText: {
			fontSize: 16,
			color: '#333'
		  },
		  highlightedRowText: {
			color: '#000',
		  }
	});
