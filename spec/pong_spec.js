describe("pong game", function(){
  describe("game size", function(){
    it("should have size of 700 by 600", function(){
      expect($('canvas').width()).toEqual(700);
      expect($('canvas').height()).toEqual(600);
    })
  });
});
