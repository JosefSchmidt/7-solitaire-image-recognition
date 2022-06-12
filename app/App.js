// Libs
import { useEffect, useRef, useState } from "react";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import * as MediaLibrary from "expo-media-library";

// Components
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import CardTemplateSvg from "./svgs/SvgTest";
import { Camera } from "expo-camera";
import BestMove from "./components/BestMove";

export default function App() {
  let cameraRef = useRef();

  const [hasCameraPermissions, setHasCameraPermissions] = useState(undefined);
  const [hasMediaLibraryPermissions, setHasMediaLibraryPermissions] =
    useState(undefined);
  const [photo, setPhoto] = useState(undefined);
  const [bestMove, setBestMove] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function requestPermissions() {
    const cameraPermissions = await Camera.requestCameraPermissionsAsync();
    const mediaLibraryPermissions =
      await MediaLibrary.requestPermissionsAsync();
    setHasCameraPermissions(cameraPermissions.status === "granted");
    setHasMediaLibraryPermissions(mediaLibraryPermissions.status === "granted");
  }

  async function takePicture() {
    let options = {
      quality: 1,
      base64: true,
      exit: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  }

  function resetPicture() {
    setLoading(false);
    setError(false);
    setBestMove(false);
    setPhoto(undefined);
  }

  useEffect(() => {
    requestPermissions();
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

  if (photo) {
    let sharePic = async () => {
      try {
        setLoading(true);

        let localUri = photo.uri;

        let filename = localUri.split("/").pop();

        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        let formData = new FormData();
        formData.append("file", { uri: localUri, name: filename, type });

        const data = await fetch("http://192.168.0.107:3000/api/7-solitaire", {
          method: "PUT",
          body: formData,
          headers: {
            Accept: "application/json",
            "content-type": "multipart/form-data",
          },
        });

        const result = await data.json();

        console.log(result);

        setBestMove(result);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (photo && (loading || bestMove || error)) {
      return (
        <BestMove
          move={bestMove}
          error={error}
          loading={loading}
          onResetPicture={resetPicture}
        />
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.cameraWrapper}>
          <ImageBackground
            style={styles.preview}
            source={{ uri: "data:image/jpg;base64," + photo.base64 }}
          >
            <CardTemplateSvg />
          </ImageBackground>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonContainer.button}
            onPress={sharePic}
          >
            <Text style={styles.buttonContainer.button.title}>
              Udregn bedste træk
            </Text>
            <Ionicons
              style={styles.buttonContainer.button.svg}
              name="md-checkmark-circle"
              color="white"
              size={25}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer.button}
            onPress={resetPicture}
          >
            <Text style={styles.buttonContainer.button.title}>
              Tag et nyt billede
            </Text>
            <Feather
              style={styles.buttonContainer.button.svg}
              name="trash"
              color="white"
              size={25}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraWrapper}>
        <Camera ref={cameraRef}>
          <CardTemplateSvg />
        </Camera>
      </View>
      <View style={styles.cameraButtonContainer}>
        <TouchableOpacity style={styles.takePicture} onPress={takePicture} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,

    button: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      marginTop: 5,
      borderWidth: "0.5",
      textColor: "white",
      borderRadius: 2,
      borderColor: "white",
      padding: 15,
      marginRight: 15,
      marginLeft: 15,

      title: {
        fontSize: 18,
        textAlign: "center",
        color: "white",
        fontWeight: "500",
      },

      svg: {
        marginLeft: 10,
      },
    },
  },

  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black",
  },

  cameraWrapper: {
    height: 600,
    width: "100%",
  },

  cameraButtonContainer: {
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    backgroundColor: "black",
  },

  preview: {
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
