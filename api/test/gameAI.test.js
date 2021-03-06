// Libs
const assert = require("assert");

// Services
const gameAi = require("../services/game-ai");

describe("#aiService()", function () {
  context("empty foundation and ace diamond in the top of one of the stacks",
    function () {
      it("expected game move: { action: 'move', from: 'Ad', to: 'f' }", function () {
        // Arrange
        const mockData = {
          talon: { class: "2s", value: 2, suit: "SPADE", color: "BLACK" },
          foundation: [
            { class: "As", value: 1, suit: "SPADE", color: "BLACK" },
            { class: "Ah", value: 1, suit: "HEART", color: "RED" },
            { class: "Ac", value: 1, suit: "CLOVER", color: "BLACK" },
          ],
          stacks: [
            {
              topCard: { class: "Ad", value: 1, suit: "DIAMOND", color: "RED" },
              cards: [{ class: "Ad", value: 1, suit: "DIAMOND", color: "RED" }],
            },
            {
              topCard: { class: "4d", value: 4, suit: "DIAMOND", color: "RED" },
              cards: [{ class: "4d", value: 4, suit: "DIAMOND", color: "RED" }],
            },
            {
              topCard: { class: "5s", value: 5, suit: "SPADE", color: "BLACK" },
              cards: [{ class: "5s", value: 5, suit: "SPADE", color: "BLACK" }],
            },
            {
              topCard: { class: "6s", value: 6, suit: "SPADE", color: "BLACK" },
              cards: [{ class: "6s", value: 6, suit: "SPADE", color: "BLACK" }],
            },
            {
              topCard: { class: "7d", value: 7, suit: "DIAMOND", color: "RED" },
              cards: [{ class: "7d", value: 7, suit: "DIAMOND", color: "RED" }],
            },
            {
              topCard: { class: "5d", value: 5, suit: "DIAMOND", color: "RED" },
              cards: [{ class: "5d", value: 5, suit: "DIAMOND", color: "RED" }],
            },
            {
              topCard: {
                class: "6c",
                value: 6,
                suit: "CLOVER",
                color: "BLACK",
              },
              cards: [
                { class: "6c", value: 6, suit: "CLOVER", color: "BLACK" },
              ],
            },
          ],
        };

        const { talon, foundation, stacks } = mockData;
        let expectedMove = { 
          action: "move", 
          from: {section: "columns", column: "s1", card: { class: "Ad", value: 1, suit: "DIAMOND", color: "RED" }}, 
          to: { section: "foundation", card: null} };

        // Acts
        let resultMove = gameAi({ talon, foundation, stacks });

        // Assert
        assert.deepStrictEqual(resultMove, expectedMove);
      });
    }
  );
});

describe("#aiService()", function () {
  context("stack 1 is empty and there is a movable king in one of the stacks", function () {
    it("expected game move: { action: 'move', from: 'Kh', to: 's1' }", function () {
      // Arrange
      const mockData = {
        talon: { class: "3s", value: 3, suit: "SPADE", color: "BLACK" },
        foundation: [
          { class: "As", value: 1, suit: "SPADE", color: "BLACK" },
          { class: "Ah", value: 1, suit: "HEART", color: "RED" },
          { class: "Ac", value: 1, suit: "CLOVER", color: "BLACK" },
        ],
        stacks: [
          {
            topCard: null,
            cards: [],
          },
          {
            topCard: { class: "3h", value: 3, suit: "HEART", color: "RED" },
            cards: [{ class: "3h", value: 3, suit: "HEART", color: "RED" }],
          },
          {
            topCard: { class: "Kh", value: 13, suit: "HEART", color: "RED" },
            cards: [{ class: "Kh", value: 13, suit: "HEART", color: "RED" }],
          },
          {
            topCard: { class: "8s", value: 8, suit: "SPADE", color: "BLACK" },
            cards: [{ class: "8s", value: 8, suit: "SPADE", color: "BLACK" }],
          },
          {
            topCard: {class: "9h", value: 9, suit: "HEART", color: "RED" },
            cards: [{class: "9h", value: 9, suit: "HEART", color: "RED"  }],
          },
          {
            topCard: { class: "4h", value: 4, suit: "HEART", color: "RED"  },
            cards: [{ class: "4h", value: 4, suit: "HEART", color: "RED" },
                    { class: "5s", value: 5, suit: "SPADE", color: "BLACK" }],
          },
          {
            topCard: {  class: "6s", value: 6, suit: "SPADE", color: "BLACK" },
            cards: [{ class: "6s", value: 6, suit: "SPADE", color: "BLACK" }],
          },
        ],
      };

      const { talon, foundation, stacks } = mockData;

      let expectedMove = { 
        action: "move", 
      from: { card: {class: "Kh", value: 13, suit: "HEART", color: "RED"}, column: "s3", section: "columns" }, 
      to: {card: null, column: "s1", section: "columns" }};
      //let expectedMove = { action: "move", from: "Kh", to: "s1" };

      // Acts
      let resultMove = gameAi({ talon, foundation, stacks });

      // Assert
      assert.deepStrictEqual(resultMove, expectedMove);
    });
  });
});

describe("#aiService()", function () {
  context("there is a ace heart in foundation and their is heart 2 in the top of one of the stacks",
    function () {
      it("expected game move: { action: 'move', from: '2h', to: 'Ah' }", function () {
        // Arrange
        const mockData = {
          talon: { class: "3s", value: 3, suit: "SPADE", color: "BLACK" },
          foundation: [
            { class: "As", value: 1, suit: "SPADE", color: "BLACK" },
            { class: "Ah", value: 1, suit: "HEART", color: "RED" },
            { class: "Ac", value: 1, suit: "CLOVER", color: "BLACK" },
          ],
          stacks: [
            {
              topCard: { class: "2h", value: 2, suit: "HEART", color: "RED" },
              cards: [{ class: "2h", value: 2, suit: "HEART", color: "RED" }],
            },
            {
              topCard: { class: "3h", value: 3, suit: "HEART", color: "RED" },
              cards: [{ class: "3h", value: 3, suit: "HEART", color: "RED" }],
            },
            {
              topCard: { class: "Kh", value: 13, suit: "HEART", color: "RED" },
              cards: [{ class: "Kh", value: 13, suit: "HEART", color: "RED" }],
            },
            {
              topCard: { class: "8s", value: 8, suit: "SPADE", color: "BLACK" },
              cards: [{ class: "8s", value: 8, suit: "SPADE", color: "BLACK" }],
            },
            {
              topCard: { class: "9h", value: 9, suit: "HEART", color: "RED" },
              cards: [{ class: "9h", value: 9, suit: "HEART", color: "RED" }],
            },
            {
              topCard: { class: "4h", value: 4, suit: "HEART", color: "RED" },
              cards: [
                { class: "4h", value: 4, suit: "HEART", color: "RED" },
                { class: "5s", value: 5, suit: "SPADE", color: "BLACK" },
              ],
            },
            {
              topCard: { class: "6s", value: 6, suit: "SPADE", color: "BLACK" },
              cards: [{ class: "6s", value: 6, suit: "SPADE", color: "BLACK" }],
            },
          ],
        };

        let expectedMove = { 
          action: "move", 
          from: { card: {class: "2h", value: 2, suit: "HEART", color: "RED"}, column: "s1", section: "columns"}, 
          to: { card: {class: "Ah", value: 1, suit: "HEART", color: "RED" }, section: "foundation"} 
        }
        //let expectedMove = { action: "move", from: "2h", to: "Ah" };

        const { talon, foundation, stacks } = mockData;

        // Acts
        let resultMove = gameAi({ talon, foundation, stacks });

        // Assert
        assert.deepStrictEqual(resultMove, expectedMove);
      });
    }
  );
});

describe("#aiService()", function () {
  context("no more moves", function () {
    it("expected game move: { action: 'draw' }", function () {
      // Mockdata
      const mockData = {
        talon: { class: "2d", value: 2, suit: "DIAMOND", color: "RED" },
        foundation: [
          { class: "As", value: 1, suit: "SPADE", color: "BLACK" },
          { class: "Ac", value: 1, suit: "CLOVER", color: "BLACK" },
        ],
        stacks: [
          {
            topCard: { class: "2h", value: 2, suit: "HEART", color: "RED" },
            cards: [{ class: "2h", value: 2, suit: "HEART", color: "RED" }],
          },
          {
            topCard: { class: "3h", value: 3, suit: "HEART", color: "RED" },
            cards: [{ class: "3h", value: 3, suit: "HEART", color: "RED" }],
          },
          {
            topCard: { class: "Kh", value: 13, suit: "HEART", color: "RED" },
            cards: [{ class: "Kh", value: 13, suit: "HEART", color: "RED" }],
          },
          {
            topCard: { class: "8h", value: 8, suit: "HEART", color: "RED" },
            cards: [{ class: "8h", value: 8, suit: "HEART", color: "RED" }],
          },
          {
            topCard: { class: "9h", value: 9, suit: "HEART", color: "RED" },
            cards: [{ class: "9h", value: 9, suit: "HEART", color: "RED" }],
          },
          {
            topCard: { class: "4h", value: 4, suit: "HEART", color: "RED" },
            cards: [
              { class: "4h", value: 4, suit: "HEART", color: "RED" },
              { class: "5s", value: 5, suit: "SPADE", color: "BLACK" },
            ],
          },
          {
            topCard: { class: "6s", value: 6, suit: "SPADE", color: "BLACK" },
            cards: [{ class: "6s", value: 6, suit: "SPADE", color: "BLACK" }],
          },
        ],
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
  context("the talon is empty", function () {
    it("expected game move: { action: 'draw' }", function () {
      // Arrange
      const mockData = {
        talon: null,
        foundation: [
          { class: "As", value: 1, suit: "SPADE", color: "BLACK" },
          { class: "Ah", value: 1, suit: "HEART", color: "RED" },
          { class: "Ac", value: 1, suit: "CLOVER", color: "BLACK" },
        ],
        stacks: [
          {
            topCard: {},
            cards: [],
          },
          {
            topCard: { class: "3h", value: 3, suit: "HEART", color: "RED" },
            cards: [{ class: "3h", value: 3, suit: "HEART", color: "RED" }],
          },
          {
            topCard: { class: "Kh", value: 13, suit: "HEART", color: "RED" },
            cards: [{ class: "Kh", value: 13, suit: "HEART", color: "RED" }],
          },
          {
            topCard: { class: "8h", value: 8, suit: "HEART", color: "RED" },
            cards: [{ class: "8h", value: 8, suit: "HEART", color: "RED" }],
          },
          {
            topCard: { class: "9h", value: 9, suit: "HEART", color: "RED" },
            cards: [{ class: "9h", value: 9, suit: "HEART", color: "RED" }],
          },
          {
            topCard: { class: "4h", value: 4, suit: "HEART", color: "RED" },
            cards: [
              { class: "4h", value: 4, suit: "HEART", color: "RED" },
              { class: "5s", value: 5, suit: "SPADE", color: "BLACK" },
            ],
          },
          {
            topCard: { class: "6s", value: 6, suit: "SPADE", color: "BLACK" },
            cards: [{ class: "6s", value: 6, suit: "SPADE", color: "BLACK" }],
          },
        ],
      };
      let { talon, foundation, stacks } = mockData;

      let expectedMove = { action: "draw" };

      // Acts
      let resultMove = gameAi({ talon, foundation, stacks });

      // Assert
      assert.deepStrictEqual(resultMove, expectedMove);
    });
  });
});

describe("#aiService()", function () {
  context("move between stacks", function () {
    it("expected game move: { action: 'move', from: '3s', to '4h' }", function () {
      // Arrange
      const mockData = {
        talon: { class: "5s", value: 5, suit: "SPADE", color: "BLACK" },
        foundation: [
          { class: "As", value: 1, suit: "SPADE", color: "BLACK" },
          { class: "Ah", value: 1, suit: "HEART", color: "RED" },
          { class: "Ac", value: 1, suit: "CLOVER", color: "BLACK" },
          { class: "Ad", value: 1, suit: "DIAMOND", color: "RED" },
        ],
        stacks: [
          {
            topCard: {},
            cards: [],
          },
          {
            topCard: { class: "3s", value: 3, suit: "SPADE", color: "BLACK" },
            cards: [
              { class: "3s", value: 3, suit: "SPADE", color: "BLACK" },
              { class: "4d", value: 4, suit: "DIAMOND", color: "RED" },
            ],
          },
          {
            topCard: { class: "4h", value: 4, suit: "HEART", color: "RED" },
            cards: [{ class: "4h", value: 4, suit: "HEART", color: "RED" }],
          },
          {
            topCard: { class: "7s", value: 7, suit: "SPADE", color: "BLACK" },
            cards: [{ class: "7s", value: 7, suit: "SPADE", color: "BLACK" }],
          },
          {
            topCard: { class: "6s", value: 6, suit: "SPADE", color: "BLACK" },
            cards: [{ class: "6s", value: 6, suit: "SPADE", color: "BLACK" }],
          },
          {
            topCard: { class: "8s", value: 8, suit: "SPADE", color: "BLACK" },
            cards: [{ class: "8s", value: 8, suit: "SPADE", color: "BLACK" }],
          },
          {
            topCard: { class: "9s", value: 9, suit: "SPADE", color: "BLACK" },
            cards: [{ class: "9s", value: 9, suit: "SPADE", color: "BLACK" }],
          },
        ],
      };
      let { talon, foundation, stacks } = mockData;

      let expectedMove = { 
        action: "move", 
        from: { card: {class: "3s", value: 3, suit: "SPADE", color: "BLACK" }, column: "s2", section: "columns"}, 
        to: { card: {class: "4h", value: 4, suit: "HEART", color: "RED"  }, column: "s3", section: "columns" } };
      

      // Acts
      let resultMove = gameAi({ talon, foundation, stacks });

      // Assert
      assert.deepStrictEqual(resultMove, expectedMove);
    });
  });
});

describe("#aiService()", function () {
  context("move from talon to stack", function () {
    it("expected game move: { action: 'move', from: '3c', to '4d' }", function () {
      // Arrange
      const mockData = {
        talon: { class: "6h", value: 6, suit: "HEART", color: "RED" },
        foundation: [
          { class: "As", value: 1, suit: "SPADE", color: "BLACK" },
          { class: "Ah", value: 1, suit: "HEART", color: "RED" },
          { class: "Ac", value: 1, suit: "CLOVER", color: "BLACK" },
          { class: "Ad", value: 1, suit: "DIAMOND", color: "RED" },
        ],
        stacks: [
          {
            topCard: { class: "4h", value: 4, suit: "HEART", color: "RED" },
            cards: [{ class: "4h", value: 4, suit: "HEART", color: "RED" }],
          },
          {
            topCard: {},
            cards: [],
          },
          {
            topCard: { class: "7s", value: 7, suit: "SPADE", color: "BLACK" },
            cards: [{ class: "7s", value: 7, suit: "SPADE", color: "BLACK" }],
          },
          {
            topCard: { class: "6s", value: 6, suit: "SPADE", color: "BLACK" },
            cards: [{ class: "6s", value: 6, suit: "SPADE", color: "BLACK" }],
          },
          {
            topCard: { class: "8s", value: 8, suit: "SPADE", color: "BLACK" },
            cards: [{ class: "8s", value: 8, suit: "SPADE", color: "BLACK" }],
          },
          {
            topCard: { class: "9s", value: 9, suit: "SPADE", color: "BLACK" },
            cards: [{ class: "9s", value: 9, suit: "SPADE", color: "BLACK" }],
          },
          {
            topCard: {},
            cards: [],
          },
        ],
      };
      let { talon, foundation, stacks } = mockData;

      let expectedMove = { action: "move", from: {section: "talon" , card: { class: "6h", value: 6, suit: "HEART", color: "RED" }}, to: {card: { class: "7s", value: 7, suit: "SPADE", color: "BLACK" }, section: "columns", column: "s3"}};

      // Acts
      let resultMove = gameAi({ talon, foundation, stacks });

      // Assert
      assert.deepStrictEqual(resultMove, expectedMove);
    });
  });
});

describe("#aiService()", function () {
  context("move from talon to empty foundation", function () {
    it("expected game move: { action: 'move', from: 'Ad', to 'f' }", function () {
      // Arrange
      const mockData = {
        talon: { class: "Ad", value: 1, suit: "DIAMOND", color: "RED" },
        foundation: [
          { class: "As", value: 1, suit: "SPADE", color: "BLACK" },
          { class: "Ah", value: 1, suit: "HEART", color: "RED" },
          { class: "Ac", value: 1, suit: "CLOVER", color: "BLACK" },
        ],
        stacks: [
          {
            topCard: { class: "4d", value: 4, suit: "DIAMOND", color: "RED" },
            cards: [{ class: "4d", value: 4, suit: "DIAMOND", color: "RED" }],
          },
          {
            topCard: null,
            cards: [],
          },
          {
            topCard: { class: "7s", value: 7, suit: "SPADE", color: "BLACK" },
            cards: [{ class: "7s", value: 7, suit: "SPADE", color: "BLACK" }],
          },
          {
            topCard: { class: "6s", value: 6, suit: "SPADE", color: "BLACK" },
            cards: [{ class: "6s", value: 6, suit: "SPADE", color: "BLACK" }],
          },
          {
            topCard: { class: "8s", value: 8, suit: "SPADE", color: "BLACK" },
            cards: [{ class: "8s", value: 8, suit: "SPADE", color: "BLACK" }],
          },
          {
            topCard: { class: "9s", value: 9, suit: "SPADE", color: "BLACK" },
            cards: [{ class: "9s", value: 9, suit: "SPADE", color: "BLACK" }],
          },
          {
            topCard: {},
            cards: [],
          },
        ],
      };
      let { talon, foundation, stacks } = mockData;

      let expectedMove = { action: "move", from: { section: "talon", card: {class:"Ad", value: 1, suit: "DIAMOND", color: "RED" }}, to: { section: "foundation", card: null }};

      // Acts
      let resultMove = gameAi({ talon, foundation, stacks });

      // Assert
      assert.deepStrictEqual(resultMove, expectedMove);
    });
  });
});

describe("#aiService()", function () {
  context("to foundation, under two is prio", function () {
    it("expected game move: { action: 'move', from: '2s', to 'As' }", function () {
      // Arrange
      const mockData = {
        talon: { class: "2s", value: 2, suit: "SPADE", color: "BLACK" },
        foundation: [
          { class: "As", value: 1, suit: "SPADE", color: "BLACK" },
          { class: "3h", value: 3, suit: "HEART", color: "RED" },
          { class: "Ac", value: 1, suit: "CLOVER", color: "BLACK" },
          { class: "Ah", value: 1, suit: "HEART", color: "RED" },
        ],
        stacks: [
          {
            topCard: { class: "4h", value: 4, suit: "HEART", color: "RED" },
            cards: [{ class: "4h", value: 4, suit: "HEART", color: "RED" }],
          },
          {
            topCard: { class: "7s", value: 7, suit: "SPADE", color: "BLACK" },
            cards: [{ class: "7s", value: 7, suit: "SPADE", color: "BLACK" }],
          },
          {
            topCard: { class: "6s", value: 6, suit: "SPADE", color: "BLACK" },
            cards: [{ class: "6s", value: 6, suit: "SPADE", color: "BLACK" }],
          },
          {
            topCard: { class: "8s", value: 8, suit: "SPADE", color: "BLACK" },
            cards: [{ class: "8s", value: 8, suit: "SPADE", color: "BLACK" }],
          },
          {
            topCard: { class: "9s", value: 9, suit: "SPADE", color: "BLACK" },
            cards: [{ class: "9s", value: 9, suit: "SPADE", color: "BLACK" }],
          },
          {
            topCard: {},
            cards: [],
          },
          {
            topCard: { class: "3s", value: 3, suit: "SPADE", color: "BLACK" },
            cards: [
              { class: "3s", value: 3, suit: "SPADE", color: "BLACK" },
              { class: "4d", value: 4, suit: "DIAMOND", color: "RED" },
            ],
          },
        ],
      };
      let { talon, foundation, stacks } = mockData;

      let expectedMove = { 
        action: "move", 
        from: { card: {class: "2s", value: 2, suit: "SPADE", color: "BLACK"}, section: "talon" }, 
        to: { card: {class: "As", value: 1, suit: "SPADE", color: "BLACK" }, section: "foundation"} 
      };

      // Acts
      let resultMove = gameAi({ talon, foundation, stacks });

      // Assert
      assert.deepStrictEqual(resultMove, expectedMove);
    });
  });
});

describe("#aiService()", function () {
  context("Stack is prio to talon", function () {
    it("expected game move: { action: 'move', from: '4h', to '5s' }", function () {
      // Arrange
      const mockData = {
        talon: { class: "4d", value: 4, suit: "DIAMOND", color: "RED" },
        foundation: [
          { class: "As", value: 1, suit: "SPADE", color: "BLACK" },
          { class: "Ac", value: 1, suit: "CLOVER", color: "BLACK" },
          { class: "Ah", value: 1, suit: "HEART", color: "RED" },
        ],
        stacks: [
          {
            topCard: { class: "4h", value: 4, suit: "HEART", color: "RED" },
            cards: [{ class: "4h", value: 4, suit: "HEART", color: "RED" }],
          },
          {
            topCard: { class: "5s", value: 5, suit: "SPADE", color: "BLACK" },
            cards: [{ class: "5s", value: 5, suit: "SPADE", color: "BLACK" }],
          },
          {
            topCard: { class: "7s", value: 7, suit: "SPADE", color: "BLACK" },
            cards: [{ class: "7s", value: 7, suit: "SPADE", color: "BLACK" }],
          },
          {
            topCard: { class: "6s", value: 6, suit: "SPADE", color: "BLACK" },
            cards: [{ class: "6s", value: 6, suit: "SPADE", color: "BLACK" }],
          },
          {
            topCard: { class: "8s", value: 8, suit: "SPADE", color: "BLACK" },
            cards: [{ class: "8s", value: 8, suit: "SPADE", color: "BLACK" }],
          },
          {
            topCard: { class: "9s", value: 9, suit: "SPADE", color: "BLACK" },
            cards: [{ class: "9s", value: 9, suit: "SPADE", color: "BLACK" }],
          },
          {
            topCard: {},
            cards: [],
          },
        ],
      };
      let { talon, foundation, stacks } = mockData;

      let expectedMove = { 
        action: "move", 
        from: { card: {class: "4h", value: 4, suit: "HEART", color: "RED"}, section: "columns", column: "s1" }, 
        to:  { card: {class: "5s", value: 5, suit: "SPADE", color: "BLACK"}, section: "columns", column: "s2" }};

      // Acts
      let resultMove = gameAi({ talon, foundation, stacks });

      // Assert
      assert.deepStrictEqual(resultMove, expectedMove);
    });
  });
});

describe("#aiService()", function () {
  context("King from talon to stack", function () {
    it("expected game move: { action: 'move', from: 'kh', to 's1' }", function () {
      // Arrange
      const mockData = {
        talon: { class: "Kh", value: 13, suit: "HEART", color: "RED" },
        foundation: [
          { class: "As", value: 1, suit: "SPADE", color: "BLACK" },
          { class: "Ac", value: 1, suit: "CLOVER", color: "BLACK" },
          { class: "Ah", value: 1, suit: "HEART", color: "RED" },
        ],
        stacks: [
          {
            topCard: { class: "4h", value: 4, suit: "HEART", color: "RED" },
            cards: [{ class: "4h", value: 4, suit: "HEART", color: "RED" }],
          },
          {
            topCard: { class: "5s", value: 5, suit: "SPADE", color: "BLACK" },
            cards: [{ class: "5s", value: 5, suit: "SPADE", color: "BLACK" }],
          },
          {
            topCard: { class: "7s", value: 7, suit: "SPADE", color: "BLACK" },
            cards: [{ class: "7s", value: 7, suit: "SPADE", color: "BLACK" }],
          },
          {
            topCard: { class: "6s", value: 6, suit: "SPADE", color: "BLACK" },
            cards: [{ class: "6s", value: 6, suit: "SPADE", color: "BLACK" }],
          },
          {
            topCard: { class: "8s", value: 8, suit: "SPADE", color: "BLACK" },
            cards: [{ class: "8s", value: 8, suit: "SPADE", color: "BLACK" }],
          },
          {
            topCard: { class: "9s", value: 9, suit: "SPADE", color: "BLACK" },
            cards: [{ class: "9s", value: 9, suit: "SPADE", color: "BLACK" }],
          },
          {
            topCard: null,
            cards: [],
          },
        ],
      };
      let { talon, foundation, stacks } = mockData;

      let expectedMove = { 
        action: "move", 
        from: { card: {class: "Kh", value: 13, suit: "HEART", color: "RED"}, section: "talon" }, 
        to:  { card: null, section: "columns", column: "s7" }};

      // Acts
      let resultMove = gameAi({ talon, foundation, stacks });

      // Assert
      assert.deepStrictEqual(resultMove, expectedMove);
    });
  });
});

describe("#aiService()", function () {
  context("win condition", function () {
    it("expected game move: { action: 'win'}", function () {
      // Arrange
      const mockData = {
        talon: null,
        foundation: [
          {  class: "Kh", value: 13, suit: "HEART", color: "RED" },
          {  class: "Ks", value: 13, suit: "SPADE", color: "BLACK" },
          {  class: "Kc", value: 13, suit: "CLOVER", color: "BLACK" },
          {  class: "Kd", value: 13, suit: "DIAMOND", color: "RED" }
        ],
        stacks: [
          {
            topCard: null,
            cards: [],
          },
          {
            topCard: null,
            cards: [],
          },
          {
            topCard: null,
            cards: [],
          },
          {
            topCard: null,
            cards: [],
          },
          {
            topCard: null,
            cards: [],
          },
          {
            topCard: null,
            cards: [],
          },
          {
            topCard: null,
            cards: [],
          },
        ],
      };
      let { talon, foundation, stacks } = mockData;

      let expectedMove = { 
        action: "win"};

      // Acts
      let resultMove = gameAi({ talon, foundation, stacks });

      // Assert
      assert.deepStrictEqual(resultMove, expectedMove);
    });
  });
});