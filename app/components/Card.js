// Lobs
import React from "react";

// Components
import { Text, View, StyleSheet, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Config
import suitConfig from "../config/suit";

const Card = ({ rank, suit } = {}) => {
  function convertToRank(rank) {
    switch (rank) {
      case 1:
        return "A";
      case 2:
        return "2";
      case 3:
        return "3";
      case 4:
        return "4";
      case 5:
        return "5";
      case 6:
        return "6";
      case 7:
        return "7";
      case 8:
        return "8";
      case 9:
        return "9";
      case 10:
        return "10";
      case 11:
        return "J";
      case 12:
        return "D";
      case 13:
        return "K";
    }
  }

  return (
    <View>
      <View style={styles.cardWrapper}>
        {suit === suitConfig.SPADE && (
          <View style={styles.card}>
            <Text style={styles.card.rankBlack}>{convertToRank(rank)}</Text>
            <MaterialCommunityIcons
              name="cards-spade"
              size={15}
              color="black"
            />
          </View>
        )}

        {suit === suitConfig.HEART && (
          <View style={styles.card}>
            <Text style={styles.card.rankRed}>{convertToRank(rank)}</Text>
            <MaterialCommunityIcons name="heart" size={15} color="red" />
          </View>
        )}

        {suit === suitConfig.CLOVER && (
          <View style={styles.card}>
            <Text style={styles.card.rankBlack}>{convertToRank(rank)}</Text>
            <MaterialCommunityIcons name="clover" size={15} color="black" />
          </View>
        )}

        {suit === suitConfig.DIAMOND && (
          <View style={styles.card}>
            <Text style={styles.card.rankRed}>{convertToRank(rank)}</Text>
            <MaterialCommunityIcons
              name="cards-diamond"
              size={15}
              color="red"
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    marginTop: 5,
    fontWeight: "bold",
    fontSize: 12,
  },

  cardWrapper: {
    borderWidth: 1,
    borderRadius: 3,
    width: 75,
    height: 110,
  },

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
