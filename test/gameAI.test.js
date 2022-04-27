var assert = require("assert");
const mockData = {talon: {},foundation: [{"class":"As","value":1,"suit":"SPADE","color":"BLACK"},{"class":"As","value":1,"suit":"SPADE","color":"BLACK"},{"class":"Ah","value":1,"suit":"HEART","color":"RED"},
{"class":"Ac","value":1,"suit":"CLOVER","color":"BLACK"},{"class":"Ah","value":1,"suit":"HEART","color":"RED"}], 
stack: [{"topCard":{"class":"Ad","value":11,"suit":"HEART","color":"RED"},"cards":[{"class":"Ad","value":11,"suit":"HEART","color":"RED"},{"class":"Ad","value":11,"suit":"HEART","color":"RED"}]}]}
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

/*describe("#getPredictions()", function () {
  context("empty foundation and es in stack", function () {
    it("expected game move: { action: 'move', from: 'Ad', to: 'f' }", function(){
      // Arrange
      let {talon, foundation, stack} = mockData;

      let expectedMove = { action: 'move', from: 'Ad', to: 'f' };

      // Acts 
      let resultMove = gameAi({talon, foundation, stack});

      // Assert
      assert.equal(resultMove, expectedMove)

    });
  });
});*/

/*describe("#getPredictions()", function () {
  context("empty stack and movable king in stack", function () {
    it("expected game move: { action: 'move', from: 'Kh', to: 's1' }", function(){
      // Arrange
      let {talon, foundation, stack} = mockData;

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
      let {talon, foundation, stack} = mockData;

      let expectedMove = { action: 'move', from: '2h', to: 'Ah' };

      // Acts 
      let resultMove = gameAi({talon, foundation, stack});

      // Assert
      assert.equal(resultMove, expectedMove)

    });
  });
});*/

describe("#getPredictions()", function () {
  context("no more moves", function () {
    it("expected game move: { action: 'draw' }", function(){
      // Arrange

      let expectedMove = { action: 'draw'};

      // Acts 
      //let resultMove = gameAi({mockData});

      // Assert
      assert.deepStrictEqual(resultMove, expectedMove)
    });
  });
});

/*describe("#getPredictions()", function () {
  context("talon is empty", function () {
    it("expected game move: { action: 'draw' }", function(){
      // Arrange
      let {talon, foundation, stack} = mockData;

      let expectedMove = { action: 'draw'};

      // Acts 
      let resultMove = gameAi({talon, foundation, stack});

      // Assert
      assert.equal(resultMove, expectedMove)
    });
  });
});*/
