// Libs
import React from "react";

// Components
import AntDesign from "@expo/vector-icons/AntDesign";
import { View, StyleSheet, Text } from "react-native";
import Card from "../components/Card";

// Config
import action from "../config/action";
import section from "../config/section";

const UseBestMove = ({ move }) => {
  if (!move) return null;

  // Draw a card from the stack
  if (move.action === action.draw) {
    return (
      <View style={styles}>
        <Text style={styles.title}>Træk tre kort fra bunken</Text>
      </View>
    );
  }


  // Move es to empty foundation
  if (
    move.from.card.value === 1 &&
    move.to.section === section.foundation &&
    move.to.card === null
  ) {
    const { card } = move.from;

    return (
      <View style={styles}>
        <Card rank={card.value} suit={card.suit} />
        <AntDesign style={styles.svg} name="right" size={25} />
        <Text style={styles.title}>Foundation</Text>
      </View>
    );
  }

  // Move king from column to empty column
  if (
    move.from.card.value === 13 &&
    move.to.section === section.columns &&
    move.to.card === null
  ) {
    const { card } = move.from;
    const { column } = move.to;

    return (
      <View style={styles}>
        <Card rank={card.value} suit={card.suit} />
        <AntDesign style={styles.svg} name="right" size={25} />
        <Text style={styles.title}>{`Kolonne ${column}`}</Text>
      </View>
    );
  }

  // Move from stack to stack
  const { card: fromCard } = move.from;
  const { card: toCard } = move.to;

  return (
    <View style={styles}>
      <Card rank={fromCard.value} suit={fromCard.suit} />
      <AntDesign style={styles.svg} name="right" size={25} />
      <Card rank={toCard.value} suit={toCard.suit} />
    </View>
  );
};

const styles = StyleSheet.create({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 200,

  title: {
    fontSize: 25,
    fontWeight: "bold",
  },

  svg: {
    marginRight: 20,
    marginLeft: 20,
  },
});

export default UseBestMove;
