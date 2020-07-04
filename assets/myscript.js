// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||  
          function( callback ){
            window.setTimeout(callback, );
          };
})();
// namespace our game
var POP = {
    // set up some inital values
    m: true,
    WIDTH: 360, 
    HEIGHT:  540, 
    scale:  1,
    // the position of the canvas
    // in relation to the screen
    offset: {top: 0, left: 0},
    // store all bubble, touches, particles etc.
	colorArray:null,
	grid: new Array(8),
    // the amount of game ticks until
    // we spawn a bubble
    // for tracking player's progress
    // we'll set the rest of these
    // in the init function
    currentWidth:  null,
    currentHeight:  null,
    canvas: null,
    ctx:  null,
	numPlayers:2,
	currentPlayer:null,
	myTurn:true,
	temp:null,
	ifFinished:false,
	firstMove: new Array(),
    init: function() {
		POP.colorArray=["#ff0000","#0000ff","#976","#abff00","#c71585","#008080"];
		POP.currentPlayer=0;
		var i;
		POP.firstMove[POP.numPlayers];
		for (i=0;i<POP.numPlayers;i++){
			POP.firstMove[i]=false;
		}
		for (i=0;i<8;i=i+1){
			POP.grid[i] = [[0,7],[0,7],[0,7],[0,7],[0,7],[0,7],[0,7],[0,7]];
		};
		
        // the proportion of width to height
        POP.RATIO = POP.WIDTH / POP.HEIGHT;
        // these will change when the screen is resize
        
        // this is our canvas element
        POP.canvas = document.getElementsByTagName('canvas')[0];
        // it's important to set this
        // otherwise the browser will
        // default to 320x200
        
        // the canvas context allows us to 
        // interact with the canvas api
        POP.ctx = POP.canvas.getContext('2d');
        
		window.addEventListener('click', function(e) {
            e.preventDefault();
            POP.Input.set(e);
        },);
        // listen for touches
        
        // we're ready to resize
        POP.resize();
        POP.loop();
    },
	
	update: function() {
		var i;
		if (POP.Input.tapped) {
            // keep track of taps; 
            // set tapped back to false
            // to avoid spawning a new touch
            // in the next cycle
            POP.Input.tapped = false;
			if(POP.myTurn&&(ifValidMove(Math.floor(POP.Input.x/45),Math.floor(POP.Input.y/45)))){
				goToNextState(Math.floor(POP.Input.x/45),Math.floor(POP.Input.y/45),POP.currentPlayer,false);
				POP.currentPlayer = (POP.currentPlayer + 1)%POP.numPlayers;
			}
        }
	},
	
	render: function() {
        var i;
		POP.Draw.rect(0, 0, POP.WIDTH, POP.HEIGHT, '#000');
		POP.ctx.strokeStyle=POP.colorArray[(POP.currentPlayer)%POP.numPlayers]; 
		POP.ctx.lineWidth=2;
		for (i=0;i<=360;i=i+360/8){
			POP.ctx.moveTo(i,0);
			POP.ctx.lineTo(i,360);
			POP.ctx.stroke();
		}
		for(i=0;i<=360;i=i+360/8){
			POP.ctx.moveTo(0,i);
			POP.ctx.lineTo(360,i);
			POP.ctx.stroke();
		}
		
		for(var i=0;i<8;i++){
			for(var j=0;j<8;j++){
				if(POP.grid[i][j][0]==1){
					POP.Draw.circle(i*45+15,j*45+15,7,POP.colorArray[POP.grid[i][j][1]]);
				}
				else if(POP.grid[i][j][0]==2){
					POP.Draw.circle(i*45+10,j*45+10,7,POP.colorArray[POP.grid[i][j][1]]);
					POP.Draw.circle(i*45+15,j*45+15,7,POP.colorArray[POP.grid[i][j][1]]);
				}
				else if(POP.grid[i][j][0]==3){
					POP.Draw.circle(i*45+15,j*45+15,7,POP.colorArray[POP.grid[i][j][1]]);
					POP.Draw.circle(i*45+20,j*45+20,7,POP.colorArray[POP.grid[i][j][1]]);
					POP.Draw.circle(i*45+30,j*45+30,7,POP.colorArray[POP.grid[i][j][1]]);
				}
			}
		}
		if(POP.ifFinished){
            if(POP.m==true){
                document.getElementById('clap').play();
                POP.m=false;
            }
			POP.Draw.rect(0, 0, POP.WIDTH, POP.HEIGHT, '#000');
			POP.Draw.text("Player " + POP.currentPlayer +" Won!", 90,270,30,"#fff");
		}
		},

	
	loop: function() {
        requestAnimFrame( POP.loop );
        POP.update();
        POP.render();
    },
	resize: function() {
    
        POP.currentHeight = window.innerHeight;
        // resize the width in proportion
        // to the new height
        POP.currentWidth = POP.currentHeight * POP.RATIO;
        // set the new canvas style width & height
        // note: our canvas is still 320x480 but
        // we're essentially scaling it with CSS
        POP.canvas.style.width = POP.currentWidth + 'px';
        POP.canvas.style.height = POP.currentHeight + 'px';
        // the amount by which the css resized canvas
        // is different to the actual (480x320) size.
        POP.scale = POP.currentWidth / POP.WIDTH;
        // position of canvas in relation to
        // the screen
        POP.offset.top = POP.canvas.offsetTop;
        POP.offset.left = POP.canvas.offsetLeft;
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
    circle: function(x, y, r, col) {
        POP.ctx.fillStyle = col;
        POP.ctx.beginPath();
        POP.ctx.arc(x + 5, y + 5, r, 0,  Math.PI * 2, true);
        POP.ctx.fill();
    },
    text: function(string, x, y, size, col) {
        POP.ctx.font = 'bold '+size+'px Monospace';
        POP.ctx.fillStyle = col;
        POP.ctx.fillText(string, x, y);
    }
};
var ifCorner = function(a,b){
	if((a==0)&&(b==0)){
		return true;}
	else if((a==0)&&(b==7)){
		return true;}
	else if((a==7)&&(b==0)){
		return true;}
	else if((a==7)&&(b==7)){
		return true;}
	else{
		return false;};
	}
var ifEdge = function(a,b){
	if(!ifCorner(a,b)&&((a==0)||(b==0)||(a==7)||(b==7))){
		return true;
	}
	else{
		return false;
	}
	}
	
var ifTerminate = function(currentPlayer){
	if(POP.firstMove[currentPlayer]==false){
		POP.firstMove[currentPlayer]=true;
		return false;
	}
	else{
		var result = true;
		for(var i=0;i<8;i++){
			for(var j=0;j<8;j++){
				if(POP.grid[i][j][1]!=currentPlayer&&(!(POP.grid[i][j][0]==0))){
					result = false;
				}
			}
		}
	return result;
	}
}	
	
var ifValidMove = function(x,y){
	if((POP.grid[x][y][0]==0)||(POP.grid[x][y][1]==POP.currentPlayer)){
		return true;
	}
	else{
		return false;
	};
	
}
	
var goToNextState = function(x,y,currentPlayer,ifNuclear){
        document.getElementById('split').play();
        POP.grid[x][y][1]=currentPlayer;
		POP.grid[x][y][0]+=1;
			var ifFull = false;
			if (ifCorner(x,y)&&POP.grid[x][y][0]>1){
				ifFull = true;
			}
			else if((ifEdge(x,y))&&(POP.grid[x][y][0]>2)){
				ifFull = true;
			}
			else if(POP.grid[x][y][0]>3){
				ifFull = true;
			}
			var possible = [[x,y+1],[x,y-1],[x+1,y],[x-1,y]];
			if(ifFull){
				for(var i=0;i<4;i++){
					if((possible[i][0]>=0)&&(possible[i][0]<=7)&&(possible[i][1]>=0)&&(possible[i][1]<=7)){
						POP.grid[x][y][0] -= 1;
						goToNextState(possible[i][0],possible[i][1],currentPlayer,true);
						
					}
				}
			}
			if (ifTerminate(currentPlayer)){
			POP.render();
			POP.ifFinished=true;
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