// $(function(){
  //declaring variables
  var width=700, height=600, pi=Math.PI;
  var canvas, ctx, keystate;
  var player, ai, ball;

  //setting up player objects
  player = {
    x: null,
    y: null,
    width: 20,
    height: 100,
    update: function() {},
    draw: function(){
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  };

  ai = {
    x: null,
    y: null,
    width: 20,
    height: 100,
    update: function() {},
    draw: function(){
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  };

  ball = {
    x: null,
    y: null,
    side: 20,
    update: function() {},
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
  }

  function update(){}

  function draw(){}

  main();
// });
