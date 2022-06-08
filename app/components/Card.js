import React from "react";
import { Text, View, StyleSheet } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const Card = ({ rank, suit } = {}) => {


  function convertToRank(rank) {
    if(rank === 1) return "A";
    if(rank === 11) return "J"
    if(rank === 12) return "D"
    if(rank === 13) return "K"
    return rank;
  }

  return (
    <View style={styles}>
      {suit === "SPADE" && (
        <View style={styles.card}>
          <Text style={styles.card.rankBlack}>{convertToRank(rank)}</Text>
          <MaterialCommunityIcons name="cards-spade" size={15} color="black" />
        </View>
      )}

      {suit === "HEART" && (
        <View style={styles.card}>
          <Text style={styles.card.rankRed}>{convertToRank(rank)}</Text>
          <MaterialCommunityIcons name="heart" size={15} color="red" />
        </View>
      )}

      {suit === "CLOVER" && (
        <View style={styles.card}>
          <Text style={styles.card.rankBlack}>{convertToRank(rank)}</Text>
          <MaterialCommunityIcons name="clover" size={15} color="black" />
        </View>
      )}

      {suit === "DIAMOND" && (
        <View style={styles.card}>
          <Text style={styles.card.rankRed}>{convertToRank(rank)}</Text>
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
