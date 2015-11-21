  //testing by removing anonymous function
describe("pong game", function(){
  describe("game size", function(){
    it("should have size of 700 by 600", function(){
      expect(width).toEqual(700);
      expect(height).toEqual(600);
    });
  });

  describe("main play function", function(){
    it("should be defined to play", function(){
      expect(main()).toBe();
    });
  });

  describe("variables defined", function(){
    it("should have methods for the player, ai, and ball", function(){
      expect(typeof player).toEqual('object');
      expect(typeof ai).toBe('object');
      expect(typeof ball).toEqual('object');
    });
  });
});
