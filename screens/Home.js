import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import colors from '../colors';
import { Entypo } from '@expo/vector-icons';
import Tabs from '../navigation/tabs';

import { auth } from '../config/firebase'

const Home = () => {

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <FontAwesome name="bars" size={24} color={'#0f3b7a'} style={{marginLeft: 15}} />
            ),
            headerRight: () => (
                <FontAwesome name="sign-out" size={24} color={'#0f3b7a'} style={{marginRight: 15}} onPress={handleSignOut}/>
            ),
        });
    }, [navigation]);
    const handleSignOut = () => {
        auth
          .signOut()
          .then(() => {
            navigation.replace("Login")
          })
          .catch(error => alert(error.message))
      }
      

    return (   
             <NavigationContainer independent={true}>
             <Tabs />
             </NavigationContainer>
    );
    };

    export default Home;

 