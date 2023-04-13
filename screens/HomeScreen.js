import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { getFirestore, collection, query, onSnapshot, addDoc } from 'firebase/firestore';
import { auth } from '../config/firebase';
const backImage = require("../assets/backImage.png");

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
	<Stack.Navigator >
	  <Stack.Screen style={styles.container} name="Joueurs" component={Joueurs} />
	  <Stack.Screen  style={styles.container} name="Details" component={Details} />
	</Stack.Navigator>
  );
}

function Joueurs({ navigation }) {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
	const q = query(collection(getFirestore(), 'users'));
	const unsubscribe = onSnapshot(q, (snapshot) => {
	  const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	  setUsers(users);
	  filterAndSortUsers(searchText, users);
	});

	return () => {
	  unsubscribe();
	};
  }, []);

  const filterAndSortUsers = (text, players) => {
	const filtered = players.filter((player) =>
	  player.name.toLowerCase().includes(text.toLowerCase())
	);
	filtered.sort((a, b) => b.butPlayer - a.butPlayer);
	setFilteredUsers(filtered);
  };

  useEffect(() => {
	filterAndSortUsers(searchText, users);
  }, [searchText, users]);




  const renderItem = ({ item }) => (
	<TouchableOpacity
	  style={styles.item}
	  onPress={() => navigation.navigate('Details', { user: item })}
	>
	
	  <Image style={styles.itemImage} source={{ uri: item.imageUrl }} />
	  <View style={styles.itemContent}>
		<Text style={styles.itemTitle}>{item.name}</Text>
		<Text style={styles.itemSubtitle}>{item.positionPlayer}</Text>
		<Text style={styles.itemSubtitle}>Buts:{item.butPlayer}</Text>
		<Text style={styles.itemSubtitle}>Assist:{item.assistPlayer}</Text>
	  </View>
	</TouchableOpacity>
  );

  return (
	<View style={styles.container}>
	  <TextInput
		style={styles.searchBar}
		value={searchText}
		onChangeText={setSearchText}
		placeholder="Rechercher"
	  />
	  <FlatList
		data={filteredUsers}
		renderItem={renderItem}
		keyExtractor={(item) => item.id}
	  />
	</View>
  );
}

function Details({ route, navigation }) {
  const { user } = route.params;

  return (
	  
	   
	<View style={styles.selectedUserContainer}>
	
	<Image source={backImage} style={styles.backImage} />
	  <TouchableOpacity onPress={() => navigation.goBack()}>
	  </TouchableOpacity>
	  <Image style={styles.selectedUserImage} source={{ uri: user.imageUrl }} />
	  <View style={styles.selectedUserContent}>
	  <ScrollView 
		 keyboardShouldPersistTaps="always"
		 style={{flexGrow: 1, paddingTop: StatusBar.currentHeight, height: 400}} >
		<Text style={styles.selectedUserTitle}>{user.name}</Text>
		<Text style={styles.selectedUserSubtitle}>{user.positionPlayer}</Text>
		<Text style={styles.selectedUserSubtitle}>Buts:{user.butPlayer}</Text>
		<Text style={styles.selectedUserSubtitle}>Assist:{user.assistPlayer}</Text>
		<View style={styles.row}>
			<Text style={styles.label}>Nom:</Text>
			<Text style={styles.value}>{user.name}</Text>
		  </View>
		  <View style={styles.row}>
			<Text style={styles.label}>Poste:</Text>
			<Text style={styles.value}>{user.positionPlayer}</Text>
		  </View>
		  <View style={styles.row}>
			<Text style={styles.label}>Taille:</Text>
			<Text style={styles.value}>{user.taillePlayer} cm</Text>
		  </View>
		  <View style={styles.row}>
			<Text style={styles.label}>Poids:</Text>
			<Text style={styles.value}>{user.poidsPlayer} kg</Text>
		  </View>
		  <View style={styles.row}>
			<Text style={styles.label}>Buts:</Text>
			<Text style={styles.value}>{user.butPlayer}</Text>
		  </View>
		  <View style={styles.row}>
			<Text style={styles.label}>Assists:</Text>
			<Text style={styles.value}>{user.assistPlayer}</Text>
		  </View>
		  <View style={styles.row}>
			<Text style={styles.label}>Catégorie:</Text>
			<Text style={styles.value}>{user.selectedCategory}</Text>
		  </View>
		  <View style={styles.row}>
			<Text style={styles.label}>E-mail:</Text>
			<Text style={styles.value}>{user.email}</Text>
		  </View>
		  </ScrollView>
	  </View>
	  <SafeAreaView style={styles.form}>
	  </SafeAreaView>
	</View>
  );
}

// Ajoutez ce style
const styles = StyleSheet.create({
  goBack: {
	fontSize: 18,
	textAlign: 'left',
	padding: 10,
	color: 'blue',
  },
container: {
flex: 1,
backgroundColor: '#F6F7FB',
padding: 10,
height: 500,

},
flatListStyle: {
position: 'absolute',
bottom: 0,
width: '100%',
height: '60%',
backgroundColor: '#F6F7FB',
borderTopWidth: 1,
marginRight: 10,
marginLeft: 10,
borderTopColor: '#ccc',
},
item: {
flexDirection: 'row',
alignItems: 'center',
paddingVertical: 10,
borderBottomWidth: 1,
borderBottomColor: '#ccc',
},
itemImage: {
width: 70,
height: 70,
borderRadius: 40,
marginRight: 10,
borderColor: '#ffffff',
borderWidth: 2,
},
itemContent: {
flex: 1,
},
itemTitle: {
fontSize: 18,
fontWeight: 'bold',
},
itemSubtitle: {
fontSize: 16,
},
selectedUserContainer: {
position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  alignItems: 'center',
  backgroundImage: 'url("../assets/backImage.png")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: "100%"
},
selectedUserImage: {
marginTop: "5%",
width: 150,
height: 150,
borderRadius: 100,
borderWidth: 3,
borderColor: '#FFFFFF',
},
selectedUserContent: {
 flex: 1,
  width: "90%",
  height: 350,
  position: 'absolute',
  left: 20,
  marginTop: "50%",
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.2) 40%, rgba(255, 255, 255, 0.4) 100%)',
  borderRadius: 10,
  padding: 20,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.9)'
},
selectedUserTitle: {
fontSize: 32,
fontWeight: 'bold',
},
selectedUserSubtitle: {
fontSize: 20,
},
searchBar: {
	height: 40,
	borderColor: 'gray',
	borderWidth: 1,
	paddingLeft: 10,
	marginBottom: 10,
	borderRadius: 5,
  },
  backImage: {
	  width: "100%",
	  height: 840,
	  position: "absolute",
	  top: 0,
	  resizeMode: 'cover',
	  
	},
row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginVertical: 5,
		borderColor: 'gray',
		borderWidth: 1,
		padding: 10,
		borderRadius: 10,
	  },
	  label: {
		fontWeight: 'bold',
		fontSize: 16,
		
	  },
	  value: {
		fontSize: 16,
	  },
});