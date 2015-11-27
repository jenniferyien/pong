$(function(){
  //declaring variables
  var width=700, height=600, pi=Math.PI;
  var canvas, ctx, keystate;
  var player, ai, ball;
  var upArrow = 38, downArrow = 40;

  //setting up player objects
  player = {
    x: null,
    y: null,
    width: 20,
    height: 100,
    //key functions for player
    update: function() {
      if (keystate[upArrow]){
        this.y -= 7;
      }
      if (keystate[downArrow]) {
        this.y += 7;
      }
    },
    draw: function(){
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  };

  ai = {
    x: null,
    y: null,
    width: 20,
    height: 100,
    update: function() {
      //computer follows the ball position
      var destination = ball.y - (this.height - ball.side) * 0.5;
      this.y += (destination - this.y) * 0.1;
    },
    draw: function(){
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  };

  ball = {
    x: null,
    y: null,
    //velocity
    vel: null,
    side: 20,
    //ball speed
    speed: 12,
    update: function() {
      //position of ball
      this.x += this.vel.x;
      this.y += this.vel.y;

      if (0 > this.y || this.y + this.side > height) {
        //offset vall
        var offset = this.vel.y < 0 ? 0 - this.y : height - (this.y + this.side);
        this.y += 2 * offset;
        this.vel.y *= -1;
      }

      //ball intersection a = first intersect b = second intersect
      var intersect = function(ax, ay, aw, ah, bx, by, bw, bh){
        return ax < (bx + bw) && ay < (by + bh) && bx < (ax + aw) && by < (ay + ah);
      }

      //paddle
      var paddle = this.vel.x < 0 ? player: ai;
      if(intersect(paddle.x, paddle.y, paddle.width, paddle.height, this.x, this.y, this.side, this.side)) {
        //creating an offset
        this.x = paddle === player ? player.x + player.width : ai.x - this.side;
        //height of paddle
        var n = (this.y + this.side - paddle.y)/ (paddle.height + this.side);
        //giving paddle ball interaction a angle in degrees
        var phi = 0.25 * pi * (2 * n - 1);
        // if statement within the equal
        this.vel.x = (paddle === player ? 1 : -1) * this.speed * Math.cos(phi);
        this.vel.y = this.speed * Math.sin(phi);
      }

    },
    draw: function(){
      ctx.fillRect(this.x, this.y, this.side, this.side);
    }
  };

  //main play function
  function main(){
    //setting up html canvas
    canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext("2d");
    document.body.appendChild(canvas)

    //listening for key control
    keystate = {};
    document.addEventListener("keydown", function(evt) {
      keystate[evt.keyCode] = true;
    });
    document.addEventListener("keyup", function(evt) {
      delete keystate[evt.keyCode];
    });

    //call the initize play function
    init();

    //loop to update status of game
    var loop = function() {
      update();
      draw();

      window.requestAnimationFrame(loop, canvas);
    };
    window.requestAnimationFrame(loop, canvas);
  }

  //setting up the x y position of player ai and ball
  function init(){
    player.x = player.width;
    player.y = (height - player.height)/2;

    ai.x = width - (player.width + ai.width);
    ai.y = (height - ai.height)/2;

    ball.x = (width - ball.side)/2;
    ball.y = (height - ball.side)/2;

    //inital ball velocity
    ball.vel = {
      x: ball.speed,
      y: 0
    }
  }

  //calling update functions
  function update(){
    player.update();
    ball.update();
    ai.update();
  }

  function draw(){
    //changing the canvas contexts
    ctx.fillRect(0,0, width, height);
    ctx.save();
    ctx.fillStyle = "#fff";


    //calling the function draw
    player.draw();
    ball.draw();
    ai.draw();

    //setting position
    var w = 4;
    var x = (width - w)* 0.5;
    var y = 0;
    var step = height/20;

    //dashed line creation
    while(y < height){
      ctx.fillRect(x, y+step*0.25, w, step*0.5);
      y += step;
    }

    ctx.restore();

  }

  main();
});
