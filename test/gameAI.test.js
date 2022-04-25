var assert = require("assert");
const mockData = {stack: [], talon: {}, foundation: []}
const gameAi = require("../services/game-ai");

// Example unit test
describe("Array", function () {
  describe("#unshift()", function () {
    it("should add element to the front of the array", function () {
      // Arrange
      let myArray = [1, 2, 3];

      // Acts
      myArray.unshift(4);

      // Assert
      assert.equal(myArray[0], 4);
    });
  });
});

describe("#getPredictions()", function () {
  context("empty foundation and es in stack", function () {
    it("expected game move: { action: 'move', from: 'Ad', to: 'f' }", function(){
      // Arrange
      let {talon, stack, foundation} = mockData;

      let expectedMove = { action: 'move', from: 'Ad', to: 'f' };

      // Acts 
      let resultMove = gameAi({talon, foundation, stack});

      // Assert
      assert.equal(resultMove, expectedMove)

    });
  });
});

describe("#getPredictions()", function () {
  context("empty stack and movable king in stack", function () {
    it("expected game move: { action: 'move', from: 'Kh', to: 's1' }", function(){
      // Arrange
      let {talon, stack, foundation} = mockData;

      let expectedMove = { action: 'move', from: 'kh', to: 's1' };

      // Acts 
      let resultMove = gameAi({talon, foundation, stack});

      // Assert
      assert.equal(resultMove, expectedMove)

    });
  });
});

describe("#getPredictions()", function () {
  context("ace heart in foundation and movable heart 2 in stack", function () {
    it("expected game move: { action: 'move', from: '2h', to: 'Ah' }", function(){
      // Arrange
      let {talon, stack, foundation} = mockData;

      let expectedMove = { action: 'move', from: '2h', to: 'Ah' };

      // Acts 
      let resultMove = gameAi({talon, foundation, stack});

      // Assert
      assert.equal(resultMove, expectedMove)

    });
  });
});

describe("#getPredictions()", function () {
  context("talon is empty", function () {
    it("expected game move: { action: 'draw' }", function(){
      // Arrange
      let {talon, stack, foundation} = mockData;

      let expectedMove = { action: 'draw'};

      // Acts 
      let resultMove = gameAi({talon, foundation, stack});

      // Assert
      assert.equal(resultMove, expectedMove)
    });
  });
});
