window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame    || 
            window.oRequestAnimationFrame      || 
            window.msRequestAnimationFrame     || 
            function( callback ){
              window.setTimeout(callback, 1000 / 60);
            };
  })();
  // namespace our game
  var POP = {
      // set up some inital values
      WIDTH: 360, 
      HEIGHT:  540, 
      scale:  1,
      // the position of the canvas
      // in relation to the screen
      offset: {top: 0, left: 0},
      // store all bubble, touches, particles etc
      entities: [],
      colorArray:null,
      grid: new Array(5),
      RATIO:  null,
      currentWidth:  null,
      currentHeight:  null,
      canvas: null,
      ctx:  null,
      ua:  null,
      android: null,
      ios:  null,
      numPlayers:2,
      currentPlayer:null,
      myTurn:true,
      temp:null,
      ifFinished:false,
      firstMove: new Array(),
      init: function() {
          POP.colorArray=["#976","#0000ff","#ff0000","#abff00","#c71585","#008080"];
          POP.currentPlayer=0;
          var i;
          POP.firstMove[POP.numPlayers];
          for (i=0;i<POP.numPlayers;i++){
              POP.firstMove[i]=false;
          }
          for (i=0;i<5;i=i+1){
              POP.grid[i] = [[0,7],[0,7],[0,7],[0,7],[0,7],[0,7]];
          };
          // the proportion of width to height
          POP.RATIO = POP.WIDTH / POP.HEIGHT;
          // these will change when the screen is resize
          POP.currentWidth = POP.WIDTH;
          POP.currentHeight = POP.HEIGHT;
          // this is our canvas element
          POP.canvas = document.getElementsByTagName('canvas')[0];
          POP.canvas.width = POP.WIDTH;
          POP.canvas.height = POP.HEIGHT;
          POP.ctx = POP.canvas.getContext('2d');
          POP.ua = navigator.userAgent.toLowerCase();
          POP.android = POP.ua.indexOf('android') > -1 ? true : false;
          POP.ios = ( POP.ua.indexOf('iphone') > -1 || POP.ua.indexOf('ipad') > -1  ) ? true : false;
          window.addEventListener('click', function(e) {
              e.preventDefault();
              POP.Input.set(e);
          }, false);
          // listen for touches
          window.addEventListener('touchstart', function(e) {
              e.preventDefault();
              POP.Input.set(e.touches[0]);
          }, false);
          window.addEventListener('touchmove', function(e) {
              e.preventDefault();
          }, false);
          window.addEventListener('touchend', function(e) {
              e.preventDefault();
          }, false);
          POP.resize();
          POP.loop();
      },
      
      update: function() {
          var i;
          if (POP.Input.tapped) {
              POP.Input.tapped = false;
             /* if(POP.myTurn&&(ifValidMove(Math.floor(POP.Input.x/72),Math.floor(POP.Input.y/90)))){
                  goToNextState(Math.floor(POP.Input.x/72),Math.floor(POP.Input.y/90),POP.currentPlayer,false);
                  POP.currentPlayer = (POP.currentPlayer + 1)%POP.numPlayers;
              }*/
          }
      },
      
      render: function() {
          var i;
          POP.Draw.rect(0, 0, POP.WIDTH, POP.HEIGHT, '#000');
          POP.ctx.
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          strokeStyle=POP.colorArray[(POP.currentPlayer)%POP.numPlayers]; 
          POP.ctx.lineWidth=4;
          for (i=0;i<=360;i=i+360/5){
              POP.ctx.moveTo(i,0);
              POP.ctx.lineTo(i,540);
              POP.ctx.stroke();
          }
          for(i=0;i<=540;i=i+540/6){
              POP.ctx.moveTo(0,i);
              POP.ctx.lineTo(360,i);
              POP.ctx.stroke();
          }
          
          if(POP.ifFinished){
              POP.Draw.rect(0, 0, POP.WIDTH, POP.HEIGHT, '#000');
              POP.Draw.text("Player " + POP.currentPlayer +" Won!", 90,270,30,"#fff");                          
          }
          },
          
          pausecomp: function(millis){
              var date = new Date();
              var curDate = null;
              do { curDate = new Date(); }
              while(curDate-date < millis);
          }	,
      
      loop: function() {
          requestAnimFrame( POP.loop );
          POP.update();
          POP.render();
      },
      resize: function() {
      
          POP.currentHeight = window.innerHeight;
          POP.currentWidth = POP.currentHeight * POP.RATIO;
          if (POP.android || POP.ios) {
              document.body.style.height = (window.innerHeight + 50) + 'px';
          }
          POP.canvas.style.width = POP.currentWidth + 'px';
          POP.canvas.style.height = POP.currentHeight + 'px';
          POP.scale = POP.currentWidth / POP.WIDTH;
          POP.offset.top = POP.canvas.offsetTop;
          POP.offset.left = POP.canvas.offsetLeft;
          window.setTimeout(function() {
                  window.scrollTo(0,1);
          }, 1);
      },
      
  };	
  POP.Draw = {
      clear: function() {
          POP.ctx.clearRect(0, 0, POP.WIDTH, POP.HEIGHT);
      },
      rect: function(x, y, w, h, col) {
          POP.ctx.fillStyle = col;
          POP.ctx.fillRect(x, y, w, h);
      },
     
      text: function(string, x, y, size, col) {
          POP.ctx.font = 'bold '+size+'px Monospace';
          POP.ctx.fillStyle = col;
          POP.ctx.fillText(string, x, y);
      }
  };

  
  POP.Input = {
    x: 0,
    y: 0,
    tapped :false,
    set: function(data) {
        this.x = (data.pageX - POP.offset.left) / POP.scale;
        this.y = (data.pageY - POP.offset.top) / POP.scale;
        this.tapped = true;
    }
};
window.addEventListener('load', POP.init, false);
window.addEventListener('resize', POP.resize, false);