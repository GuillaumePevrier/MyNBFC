import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
} from 'react-native';

import { getFirestore, collection, query, onSnapshot, addDoc } from 'firebase/firestore';
import { auth } from '../config/firebase';

export default function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
	const q = query(collection(getFirestore(), 'users'));
	const unsubscribe = onSnapshot(q, (snapshot) => {
	  const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	  setUsers(users);
	});

	return () => {
	  unsubscribe();
	};
  }, []);

  const renderItem = ({ item }) => (
	<View style={styles.item}>
	  <Image style={styles.itemImage} source={{ uri: item.imageUrl }} />
	  <View style={styles.itemContent}>
		<Text style={styles.itemTitle}>{item.name}</Text>
		<Text style={styles.itemSubtitle}>{item.positionPlayer}</Text>
		<Text style={styles.itemSubtitle}>{item.positionPlayer}</Text>
		<Text style={styles.itemSubtitle}>{item.butPlayer}</Text>
	  </View>
	</View>
  );

  return (
	<View style={styles.container}>
	  <FlatList
		data={users}
		renderItem={renderItem}
		keyExtractor={(item) => item.id}
	  />
	</View>
  );
}

const styles = StyleSheet.create({
  container: {
	flex: 1,
	backgroundColor: '#fff',
	padding: 10,
  },
  item: {
	flexDirection: 'row',
	alignItems: 'center',
	paddingVertical: 10,
	borderBottomWidth: 1,
	borderBottomColor: '#ccc',
  },
  itemImage: {
	width: 50,
	height: 50,
	borderRadius: 25,
	marginRight: 10,
  },
  itemContent: {
	flex: 1,
	height :'auto',
  },
  itemTitle: {
	fontSize: 18,
	fontWeight: 'bold',
  },
  itemSubtitle: {
	fontSize: 16,
  },
});
