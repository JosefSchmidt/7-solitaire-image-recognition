import React from "react";
import { Text, View, StyleSheet } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const Card = ({ rank, suit } = {}) => {
  return (
    <View style={styles}>
      {suit === "S" && (
        <View style={styles.card}>
          <Text style={styles.card.rankBlack}>A</Text>
          <MaterialCommunityIcons name="cards-spade" size={15} color="black" />
        </View>
      )}

      {suit === "H" && (
        <View style={styles.card}>
          <Text style={styles.card.rankRed}>A</Text>
          <MaterialCommunityIcons name="heart" size={15} color="red" />
        </View>
      )}

      {suit === "C" && (
        <View style={styles.card}>
          <Text style={styles.card.rankBlack}>A</Text>
          <MaterialCommunityIcons name="clover" size={15} color="black" />
        </View>
      )}

      {suit === "D" && (
        <View style={styles.card}>
          <Text style={styles.card.rankRed}>A</Text>
          <MaterialCommunityIcons name="cards-diamond" size={15} color="red" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  borderWidth: 1,
  borderRadius: 3,
  width: 75,
  height: 110,

  card: {
    display: "flex",
    width: 20,
    alignItems: "center",

    rankBlack: {
      fontSize: 15,
      fontWeight: "bold",
    },

    rankRed: {
      color: "red",
      fontSize: 15,
      fontWeight: "bold",
    },
  },
});

export default Card;
