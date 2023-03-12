import React from 'react';
import {Animated, Dimensions, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRef } from 'react';

import HomeScreen from '../screens/HomeScreen';
import FindScreen from '../screens/FindScreen';
import ChatScreen from '../screens/ChatScreen';
import PostScreen from '../screens/PostScreen';
import SettingScreen from '../screens/SettingScreen';


import plus from '../assets/plus.png'

const Tab = createBottomTabNavigator();

const Tabs = () => {
	
const tabOffsetValue = useRef(new Animated.Value(0)).current;	
	
	return(
		<NavigationContainer independent={true}>
		<Tab.Navigator 
		  screenOptions={{
			headerShown: false,
			tabBarShowLabel:false,
			tabBarStyle: {
				  position: 'absolute',
				  bottom: 40,
				  marginHorizontal: 20,
				  backgroundColor: '#ffffff',
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
					name="home"
					size={20}
					color={focused ? '#d4163a' : '#0f3b7a'}
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
					name="search"
					size={20}
					color={focused ? '#d4163a' : '#0f3b7a'}
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
				
					<TouchableOpacity>
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
						  width: 22,
						  height: 22,
						  tintColor: 'white',
						}}></Image>
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
					name="cog"
					size={20}
					color={focused ? '#d4163a' : '#0f3b7a'}
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
					name="user-alt"
					size={20}
					color={focused ? '#d4163a' : '#0f3b7a'}
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
		</NavigationContainer>
	);
}

function getWidth() {
  let width = Dimensions.get("window").width

  // Horizontal Padding = 20...
  width = width - 80

  // Total five Tabs...
  return width / 5
}


const styles = StyleSheet.create({
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