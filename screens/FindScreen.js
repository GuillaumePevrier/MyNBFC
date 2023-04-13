import React, { useState } from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample() {
  const [imageUrl, setImageUrl] = useState(null);

  const pickImage = async () => {
	let result = await ImagePicker.launchImageLibraryAsync({
	  mediaTypes: ImagePicker.MediaTypeOptions.All,
	  allowsEditing: true,
	  aspect: [4, 3],
	  quality: 1,
	});

	console.log(result);

	if (!result.cancelled) {
	  setImageUrl(result.uri);
	}
  };

  return (
	<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
	  <Button title="Pick an image from camera roll" onPress={pickImage} />
	  {imageUrl && (
		<Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }} />
	  )}
	</View>
  );
}
