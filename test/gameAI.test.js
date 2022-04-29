// Libs
const assert = require("assert");

// Services
const gameAi = require("../services/game-ai");

describe("#aiService()", function () {
  context("empty foundation and es in stack", function () {
    it("expected game move: { action: 'move', from: 'Ad', to: 'f' }", function(){
      // Arrange
      const mockData = {
        talon: { class: "As", value: 1, suit: "SPADE", color: "BLACK" },
        foundation: [
          { class: "As", value: 1, suit: "SPADE", color: "BLACK" },
          { class: "Ah", value: 1, suit: "HEART", color: "RED" },
          { class: "Ac", value: 1, suit: "CLOVER", color: "BLACK" },
          { class: "Ah", value: 1, suit: "HEART", color: "RED" },
        ],
        stacks: [
          {
            topCard: { class: "Ad", value: 1, suit: "DIAMOND", color: "RED" },
            cards: [
              { class: "Ad", value: 1, suit: "DIAMOND", color: "RED" },
              { class: "Ad", value: 1, suit: "DIAMOND", color: "RED" },
            ],
          },
        ],
      };

      const { talon, foundation, stacks } = mockData;
      let expectedMove = { action: 'move', from: 'Ad', to: 'f' };

      // Acts 
      let resultMove = gameAi({talon, foundation, stacks});

      // Assert
      assert.deepStrictEqual(resultMove, expectedMove)

    });
  });
});

describe("#aiService()", function () {
  context("empty stack and movable king in stack", function () {
    it("expected game move: { action: 'move', from: 'Kh', to: 's1' }", function(){
      // Arrange
      const mockData = {
        talon: {class: "3s", value: 3, suit: "SPADE", color: "BLACK"},
        foundation: [
          { class: "As", value: 1, suit: "SPADE", color: "BLACK" },
          { class: "Ah", value: 1, suit: "HEART", color: "RED" },
          { class: "Ac", value: 1, suit: "CLOVER", color: "BLACK" },
          { class: "Ah", value: 1, suit: "HEART", color: "RED" },
        ],
        stacks: [
          {
            topCard: {},
            cards: []
          },
          {
            topCard: {class: "3h", value: 3, suit: "HEART", color: "RED" },
            cards: [
              { class: "3h", value: 3, suit: "HEART", color: "RED" },
            ],
          },
          {
            topCard: {class: "Kh", value: 13, suit: "HEART", color: "RED" },
            cards: [
              { class: "Kh", value: 13, suit: "HEART", color: "RED" },
            ],
          },
          {
            topCard: { class: "8s", value: 8, suit: "SPADE", color: "BLACK" },
            cards: [{ class: "8s", value: 8, suit: "SPADE", color: "BLACK" }]
          },
          {
            topCard: { class: "8s", value: 8, suit: "SPADE", color: "BLACK" },
            cards: [{ class: "8s", value: 8, suit: "SPADE", color: "BLACK" }]
          },
          {
            topCard: {class: "8s", value: 8, suit: "SPADE", color: "BLACK" },
            cards: [{ class: "8s", value: 8, suit: "SPADE", color: "BLACK" }]
          },
          {
            topCard: {class: "8s", value: 8, suit: "SPADE", color: "BLACK" },
            cards: [
              { class: "8s", value: 8, suit: "SPADE", color: "BLACK" },
            ]
          },
        ],
      };



      const {talon, foundation, stacks} = mockData;

      let expectedMove = { action: 'move', from: 'Kh', to: 's1' };

      // Acts 
      let resultMove = gameAi({talon, foundation, stacks});

      // Assert
      assert.deepStrictEqual(resultMove, expectedMove);

    });
  });
});

describe("#aiService()", function () {
  context("ace heart in foundation and movable heart 2 in stack", function () {
    it("expected game move: { action: 'move', from: '2h', to: 'Ah' }", function(){
      // Arrange
      const mockData = {
        talon: {class: "3s", value: 3, suit: "SPADE", color: "BLACK"},
        foundation: [
          { class: "As", value: 1, suit: "SPADE", color: "BLACK" },
          { class: "Ah", value: 1, suit: "HEART", color: "RED" },
          { class: "Ac", value: 1, suit: "CLOVER", color: "BLACK" },
          { class: "Ah", value: 1, suit: "HEART", color: "RED" },
        ],
        stacks: [
          {
            topCard: {class: "2h", value: 2, suit: "HEART", color: "RED" },
            cards: [
              { class: "2h", value: 2, suit: "HEART", color: "RED" },
            ],
          }
        ],
      };
      let expectedMove = { action: 'move', from: '2h', to: 'Ah' };
      const { talon, foundation, stacks } = mockData;

      // Acts 
      let resultMove = gameAi({talon, foundation, stacks});

      // Assert
      assert.deepStrictEqual(resultMove, expectedMove)

    });
  });
});

describe("#aiService()", function () {
  context("no more moves", function () {
    it("expected game move: { action: 'draw' }", function () {
      // Mockdata
      const mockData = {
        talon: {class: "As", value: 1, suit: "SPADE", color: "BLACK"},
        foundation: [
          { class: "As", value: 1, suit: "SPADE", color: "BLACK" },
          { class: "Ah", value: 1, suit: "HEART", color: "RED" },
          { class: "Ac", value: 1, suit: "CLOVER", color: "BLACK" },
          { class: "Ah", value: 1, suit: "HEART", color: "RED" },
          { class: "Ad", value: 1, suit: "DIAMOND", color: "RED" }
        ],
        stacks: [],
      };

      // Arrange
      const { talon, foundation, stacks } = mockData;
      let expectedMove = { action: "draw" };

      // Acts
      let resultMove = gameAi({ talon, foundation, stacks });

      // Assert
      assert.deepStrictEqual(resultMove, expectedMove);
    });
  });
});

describe("#aiService()", function () {
  context("talon is empty", function () {
    it("expected game move: { action: 'draw' }", function(){
      // Arrange
      const mockData = {
        talon: {},
        foundation: [
          { class: "As", value: 1, suit: "SPADE", color: "BLACK" },
          { class: "Ah", value: 1, suit: "HEART", color: "RED" },
          { class: "Ac", value: 1, suit: "CLOVER", color: "BLACK" },
          { class: "Ah", value: 1, suit: "HEART", color: "RED" },
          
        ],
        stacks: [
          {
            topCard: { class: "Ad", value: 1, suit: "DIAMOND", color: "RED" },
            cards: [
              { class: "Ad", value: 1, suit: "DIAMOND", color: "RED" },
              { class: "Ad", value: 1, suit: "DIAMOND", color: "RED" },
            ],
          },
          {
            topCard: { class: "Ad", value: 1, suit: "DIAMOND", color: "RED" },
            cards: [
              { class: "Ad", value: 1, suit: "DIAMOND", color: "RED" },
              { class: "Ad", value: 1, suit: "DIAMOND", color: "RED" },
            ],
          },
          {
            topCard: { class: "Ad", value: 1, suit: "DIAMOND", color: "RED" },
            cards: [
              { class: "Ad", value: 1, suit: "DIAMOND", color: "RED" },
              { class: "Ad", value: 1, suit: "DIAMOND", color: "RED" },
            ],
          },
          {
            topCard: { class: "Ad", value: 1, suit: "DIAMOND", color: "RED" },
            cards: [
              { class: "Ad", value: 1, suit: "DIAMOND", color: "RED" },
              { class: "Ad", value: 1, suit: "DIAMOND", color: "RED" },
            ],
          },
        ],
      };
      let {talon, foundation, stack} = mockData;

      let expectedMove = { action: 'draw'};

      // Acts 
      let resultMove = gameAi({talon, foundation, stack});

      // Assert
      assert.deepStrictEqual(resultMove, expectedMove)
    });
  });
});