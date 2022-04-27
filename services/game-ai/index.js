const gameLogik = require("./gameLogik");
const mockData = {talon: {},foundation: [{"class":"As","value":1,"suit":"SPADE","color":"BLACK"},{"class":"As","value":1,"suit":"SPADE","color":"BLACK"},{"class":"Ah","value":1,"suit":"HEART","color":"RED"},
{"class":"Ac","value":1,"suit":"CLOVER","color":"BLACK"},{"class":"Ah","value":1,"suit":"HEART","color":"RED"}], 
stack: [{"topCard":{"class":"Ad","value":11,"suit":"HEART","color":"RED"},
"cards":[{"class":"Ad","value":11,"suit":"HEART","color":"RED"},{"class":"Ad","value":11,"suit":"HEART","color":"RED"}]}]};



module.exports = function () {
  try {
    let action = gameLogik(mockData);
    console.log(action + " index");

    return action;
  } catch (error) {
    console.log(error);
  }
};
