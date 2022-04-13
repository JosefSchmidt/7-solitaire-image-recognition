var assert = require("assert");

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
  describe("empty foundation and es in stack", function () {
    it("expected game move: { action: 'move', from: 'Ad', to: 'f' }");
  });
});

describe("#getPredictions()", function () {
  describe("empty stack and movable king in stack", function () {
    it("expected game move: { action: 'move', from: 'Kh', to: 's1' }");
  });
});

describe("#getPredictions()", function () {
  describe("ace heart in foundation and movable heart 2 in stack", function () {
    it("expected game move: { action: 'move', from: '2h', to: 'Ah' }");
  });
});

describe("#getPredictions()", function () {
  describe("talon is empty", function () {
    it("expected game move: { action: 'draw' }");
  });
});
