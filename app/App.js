import { StatusBar } from "expo-status-bar";
import {
  Button,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useEffect, useRef, useState } from "react";

import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

export default function App() {
  let cameraRef = useRef();
  const [hasCameraPermissions, setHasCameraPermissions] = useState(undefined);
  const [hasMediaLibraryPermissions, setHasMediaLibraryPermissions] =
    useState(undefined);
  const [photo, setPhoto] = useState(undefined);

  const [text, setText] = useState("");

  useEffect(() => {
    (async function () {
      const cameraPermissions = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermissions =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermissions(cameraPermissions.status === "granted");
      setHasMediaLibraryPermissions(
        mediaLibraryPermissions.status === "granted"
      );
    })();
  }, []);

  if (hasCameraPermissions === undefined) {
    return <Text>Request permissions...</Text>;
  } else if (!hasCameraPermissions) {
    return (
      <Text>
        Permission for camera not granted. PLease change this in settings.
      </Text>
    );
  }

  async function takePic() {
    let options = {
      quality: 1,
      base64: true,
      exit: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  }

  function DataURIToBlob(dataURI) {
    const splitDataURI = dataURI.split(",");
    const byteString =
      splitDataURI[0].indexOf("base64") >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
  }

  if (photo) {
    let sharePic = async () => {
      try {
        // ImagePicker saves the taken photo to disk and returns a local URI to it
        let localUri = photo.uri;
        let filename = localUri.split("/").pop();

        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        let formData = new FormData();
        formData.append("file", { uri: localUri, name: filename, type });

        const data = await fetch(
          "http://192.168.0.105:3000/api/7-solitaire",
          {
            method: "POST",
            body: formData,
            header: {
              'Accept': 'application/json',
              "content-type": "multipart/form-data",
            },
          }
        );

        console.log(JSON.stringify(data))

        // setText(data);
      } catch (error) {
        console.log(error);
      }
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <Text>{text}</Text>
        <Image
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        <Button title="Share" onPress={sharePic} />
        {hasMediaLibraryPermissions ? (
          <Button title="Save" onPress={savePhoto} />
        ) : undefined}
        <Button title="Discard" onPress={() => setPhoto(undefined)} />
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.takePicture} onPress={takePic} />
      </View>
      <StatusBar style="auto" />
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  buttonContainer: {
    width: 80,
    height: 80,
    borderRadius: 100,
    display: "flex",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },

  preview: {
    alignSelf: "stretch",
    flex: 1,
  },

  takePicture: {
    width: 75,
    height: 75,
    borderRadius: 100,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
  },
});
