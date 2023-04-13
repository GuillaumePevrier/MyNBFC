import React from 'react';
import {Animated, Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRef, useCallback, useState } from 'react';

import HomeScreen from '../screens/HomeScreen';
import ModalScreen from '../screens/ModalScreen';
import FindScreen from '../screens/FindScreen';
import ChatScreen from '../screens/ChatScreen';
import PostScreen from '../screens/PostScreen';
import SettingScreen from '../screens/SettingScreen';
import Profil from '../screens/Profil';

import { createDrawerNavigator } from '@react-navigation/drawer';

import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

import plus from '../assets/plus.png'

const Drawer = createDrawerNavigator();

const Tab = createBottomTabNavigator();
const Tabs = () => {	
const tabOffsetValue = useRef(new Animated.Value(0)).current;	

const sheetRef = useRef(null);
const [isOpen, setIsOpen] = useState(true);

const snapPoints = ["1%", "50%", "90%"];

function handleSnapPress() {
	sheetRef.current?.snapToIndex(1);
	setTimeout(() => {
	  setIsOpen(true);
	}, 100);
}

const handleSignOut = () => {
	auth
	  .signOut()
	  .then(() => {
		navigation.replace("Login")
	  })
	  .catch(error => alert(error.message))
  }
	
	return(
		<NavigationContainer independent={true} >
		
		<Tab.Navigator 
		 
		  screenOptions={{
			headerShown: false,
			tabBarShowLabel:false,
			tabBarStyle: {
				  position: 'absolute',
				  bottom: 40,
				  marginHorizontal: 20,
				  backgroundColor: '#0f3b7a',
				  borderRadius: 10,
				  height: 60,
				  ...styles.shadow
			  }
			  
					
		  }}>
			<Tab.Screen name="Home" component={HomeScreen} options={{
				tabBarIcon: ({ focused }) => (
					<View style={{
						position: 'absolute',
						top: '50%'
					}}>
					<FontAwesome5
					name="users"
					size={25}
					color={focused ? '#d4163a' : '#ffffff'}
					></FontAwesome5>
					</View>
				)
			}}listeners={({ navigation, route }) => ({
			  // Onpress Update....
			  tabPress: e => {
				Animated.spring(tabOffsetValue, {
				  toValue: 0,
				  useNativeDriver: true
				}).start();
			  }
			})}></Tab.Screen>
			<Tab.Screen name="search" component={FindScreen} options={{
				tabBarIcon: ({ focused }) => (
					<View style={{
						position: 'absolute',
						top: '50%'
					}}>
					<FontAwesome5
					name="trophy"
					size={25}
					color={focused ? '#d4163a' : '#ffffff'}
					></FontAwesome5>
					</View>
				)
			}}listeners={({ navigation, route }) => ({
			  // Onpress Update....
			  tabPress: e => {
				Animated.spring(tabOffsetValue, {
				  toValue: getWidth(),
				  useNativeDriver: true
				}).start();
			  }
			})}></Tab.Screen>
				<Tab.Screen name={"Post"} component={PostScreen} options={{
				  tabBarIcon: ({ focused }) => (
				
					<TouchableOpacity 
					onPress={() => handleSnapPress(0)}>
					  <View style={{
						width: 55,
						height: 55,
						backgroundColor: '#d4163a',
						borderRadius: 30,
						justifyContent: 'center',
						alignItems: 'center',
						marginBottom: Platform.OS == "android" ? 50 : 30
					  }}>
						<Image source={plus} style={{
						  width: 25,
						  height: 25,
						  tintColor: 'white',
						}}
						></Image>
					  </View>
					</TouchableOpacity>
				  )
				}}></Tab.Screen>
			<Tab.Screen name="Setting" component={SettingScreen} options={{
				tabBarIcon: ({ focused }) => (
					<View style={{
						position: 'absolute',
						top: '50%'
					}}>
					<FontAwesome5
					name="futbol"
					size={25}
					color={focused ? '#d4163a' : '#ffffff'}
					></FontAwesome5>
					</View>
				)
			}}listeners={({ navigation, route }) => ({
			  // Onpress Update....
			  tabPress: e => {
				Animated.spring(tabOffsetValue, {
				  toValue: getWidth() * 3,
				  useNativeDriver: true
				}).start();
			  }
			})}></Tab.Screen>
			<Tab.Screen name="Chat" component={ChatScreen} options={{
				tabBarIcon: ({ focused }) => (
					<View style={{
						position: 'absolute',
						top: '50%'
					}}>
					<FontAwesome5
					name="user"
					size={25}
					color={focused ? '#d4163a' : '#ffffff'}
					></FontAwesome5>
					</View>
				)
			}}listeners={({ navigation, route }) => ({
			  // Onpress Update....
			  tabPress: e => {
				Animated.spring(tabOffsetValue, {
				  toValue: getWidth() * 4,
				  useNativeDriver: true
				}).start();
			  }
			})}></Tab.Screen>
			</Tab.Navigator>
			<Animated.View style={{
				width: getWidth() - 10,
				height: 3,
				backgroundColor: '#d4163a',
				position: 'absolute',
				bottom: 98,
				// Horizontal Padding = 20...
				left: 45,
				borderRadius: 20,
				transform: [
				  { translateX: tabOffsetValue }
				]
			  }}>
			
			  </Animated.View>
			  <BottomSheet
			  	ref={sheetRef}
				snapPoints={snapPoints}
				enablePanDownToClose={true}
				onClose={() => setIsOpen(false)}
				
				>
			  <BottomSheetView style={
				styles.container} >
				<ModalScreen>
			  </ModalScreen>
			  </BottomSheetView>
			  </BottomSheet>
			  
		</NavigationContainer>

	);
}

function getWidth() {
  let width = Dimensions.get("window").width
  width = width - 80
  return width / 5
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0f3b7a",
		alignItems: "center",
		justifyContent: "center",
		
	  },
	shadow: {
		shadowColor: '#000',
		shadowOffset: {
			width: 10,
			height: 10,
		},
		shadowOpacity: 0.06,
		shadowRadius: 3.5,
		elevation: 5
	}
});

export default Tabs;