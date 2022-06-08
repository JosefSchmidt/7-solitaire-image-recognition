// Components
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// Hooks
import useBestMove from "../hooks/useBestMove";

const BestMove = ({ loading, move, error, onResetPicture }) => {
  const bestMove  = useBestMove({ move });

  if (loading) {
    return (
      <View style={loadingStyles}>
        <ActivityIndicator size={"large"} />
        <Text style={loadingStyles.title}>Udregner bedste træk...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles}>
        <View style={styles.header}>
          <MaterialIcons name="error" size={40} color={"red"} />
          <Text style={styles.header.title}>Ingen træk fundet</Text>
          <Text style={styles.header.description}>
            Vi kunne desvære ikke finde nogen træk ud fra det angivet billede
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={onResetPicture}>
          <Text style={styles.button.title}>Prøv igen</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles}>
      <View style={styles.header}>
        <AntDesign name="checkcircle" size={40} color={"green"} />
        <Text style={styles.header.title}>Bedste træk</Text>
        <Text style={styles.header.description}>
          Vi har ud fra det pågældende billede vurderet, at det bedstre træk at
          foretage er
        </Text>
      </View>

      {bestMove}

      <TouchableOpacity style={styles.button} onPress={onResetPicture}>
        <Text style={styles.button.title}>Ok</Text>
      </TouchableOpacity>
    </View>
  );
};

const loadingStyles = StyleSheet.create({
  flex: 1,
  justifyContent: "center",

  title: {
    marginTop: 5,
    fontSize: 17,
    textAlign: "center",
  },
});

const styles = StyleSheet.create({
  paddingTop: 80,
  flex: 1,
  justifyContent: "space-between",

  header: {
    alignItems: "center",

    title: {
      color: "black",
      textAlign: "center",
      fontSize: 22,
      fontWeight: "bold",
      marginTop: 8,
    },

    description: {
      color: "black",
      textAlign: "center",
      fontSize: 17,
      marginTop: 5,
      paddingLeft: 15,
      paddingRight: 15,
    },
  },

  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 50,
    borderWidth: "1",
    textColor: "black",
    borderRadius: 2,
    borderColor: "black",
    padding: 15,
    marginRight: 15,
    marginLeft: 15,

    title: {
      fontSize: 18,
      textAlign: "center",
      color: "black",
      fontWeight: "500",
    },

    svg: {
      marginLeft: 10,
    },
  },
});

export default BestMove;
