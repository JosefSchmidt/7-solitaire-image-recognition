// Config
const suit = require("../../config/suits");
const colors = require("../../config/cardColors");

let standardSolitaire = {
  talon: { class: "10c", value: 10, suit: suit.CLOVER, color: colors.BLACK },
  foundation: [],
  stacks: [
    {
      column: 1,
      topCard: { class: "3d", value: 3, suit: suit.DIAMOND, color: colors.RED },
      cards: [{ class: "3d", value: 3, suit: suit.DIAMOND, color: colors.RED }],
    },
    {
      column: 2,
      topCard: { class: "6d", value: 6, suit: suit.DIAMOND, color: colors.RED },
      cards: [{ class: "6d", value: 6, suit: suit.DIAMOND, color: colors.RED }],
    },
    {
      column: 3,
      topCard: { class: "6s", value: 6, suit: suit.SPADE, color: colors.BLACK },
      cards: [{ class: "6s", value: 6, suit: suit.SPADE, color: colors.BLACK }],
    },
    {
      column: 4,
      topCard: {
        class: "10s",
        value: 10,
        suit: suit.SPADE,
        color: colors.BLACK,
      },
      cards: [
        { class: "10s", value: 10, suit: suit.SPADE, color: colors.BLACK },
      ],
    },
    {
      column: 5,
      topCard: { class: "9d", value: 9, suit: suit.DIAMOND, color: colors.RED },
      cards: [{ class: "9d", value: 9, suit: suit.DIAMOND, color: colors.RED }],
    },
    {
      column: 6,
      topCard: { class: "Ad", value: 1, suit: suit.DIAMOND, color: colors.RED },
      cards: [{ class: "Ad", value: 1, suit: suit.DIAMOND, color: colors.RED }],
    },
    {
      column: 7,
      topCard: {
        class: "Kd",
        value: 13,
        suit: suit.DIAMOND,
        color: colors.RED,
      },
      cards: [
        { class: "Kd", value: 13, suit: suit.DIAMOND, color: colors.RED },
      ],
    },
  ],
};
