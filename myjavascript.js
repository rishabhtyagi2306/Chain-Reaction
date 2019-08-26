
//create 1-d array
var arr = new Array(8); 

//create 2d array using 1d array
for(var i = 0; i<arr.length; i++){
    arr[i]=new Array(8);
}

// Loop to initilize 2D array elements. 
for (var i = 0; i < 8; i++) { 
    for (var j = 0; j < 8; j++) { 
        arr[i][j] = 0; 
    } 
} 


var c = document.getElementById("mycanvas");
mycanvas.width = window.innerWidth;
mycanvas.height = window.innerHeight;
var ctx= c.getContext("2d");





function gameboard(){
    console.log("a");
    var rows = 8;
    var cols = 8;
    for(var i = 0; i<cols; i++){
        for(var j = 0; j<rows; j++){
            console.log("d");
            var x = i*80;
            var y =j*80;
            ctx.rect(x,y,80,80);
            ctx.stroke();
        }
    }}
           
            
    
            
    
 var turn = 1;
 var cursorX, cursorY;





document.onmousedown = function(e){
    cursorX = e.pageX;
    cursorY = e.pageY;
    console.log(cursorX);
    console.log(cursorY)


var p = Math.floor(cursorX/80);
var q = Math.floor(cursorY/80);


if(turn == 1 && arr[p][q]<5){
arr[p][q]+=1;
drawcircle();}
else if (turn==2){
    if(arr[p][q]==0)
    {
        arr[p][q]=5;
        drawcircle();
    }
    else if (arr[p][q]>=5){
        arr[p][q]+=1;
        drawcircle();
    }
}
console.log(arr);


function drawcircle(){

ctx.beginPath();

if(arr[p][q]==1 || arr[p][q]==5){
    
    ctx.arc(p*80+40,q*80+40,20,0,2*Math.PI);
    
}
if(arr[p][q]==2 ||arr[p][q]==6){
  
    ctx.arc(p*80+30,q*80+30,20,0,2*Math.PI);
    
  
}
if(arr[p][q]==3 ||arr[p][q]==7){
    
  ctx.arc(p*80+30,q*80+40,20,0,2*Math.PI);
 
}

if(arr[p][q]==4 || arr[p][q]==8){
  split();
  console.log("z");
  arr[p][q]=0;

}

if(turn==1){
    ctx.fillStyle = "red";

}
else{
    ctx.fillStyle = "blue";
}
ctx.fill();
ctx.stroke();
console.log("g");
if(turn==1)
turn=2;
else
turn=1;   
    
}

function split()

{
    //for q-1 column , p row
    if(arr[p][q-1]<3){
       arr[p][q-1]+=1;
       // drawcircle();
    }
    


    if(arr[p][q-1]>=5)
    {

 
      if(arr[p][q-1]==5){
         arr[p][q-1]=1;}  
      if(arr[p][q-1]==6){
          arr[p][q-1]=2;}
      if(arr[p][q-1]==7){
         arr[p][q-1]=3;}
                
      if(arr[p][q-1]>=1){
         arr[p][q-1]+=1;
        //drawcircle();
      }
     // drawcircle();
    }


    //for q+1 column , p row
    if(arr[p][q+1]<3){
        arr[p][q+1]+=1;
        // drawcircle();
     }
     
 
 
     if(arr[p][q+1]>=5)
     {
 
  
       if(arr[p][q+1]==5){
          arr[p][q+1]=1;}  
       if(arr[p][q+1]==6){
           arr[p][q+1]=2;}
       if(arr[p][q+1]==7){
          arr[p][q+1]=3;}
                 
       if(arr[p][q+1]>=1){
          arr[p][q+1]+=1;
         //drawcircle();
       }
       // drawcircle();
     }


     //for p-1 row , q column
     if(arr[p-1][q]<3){
        arr[p-1][q]+=1;
        // drawcircle();
     }
     
 
 
     if(arr[p-1][q]>=5)
     {
 
  
       if(arr[p-1][q]==5){
          arr[p-1][q]=1;}  
       if(arr[p-1][q]==6){
           arr[p-1][q]=2;}
       if(arr[p-1][q]==7){
          arr[p-1][q]=3;}
                 
       if(arr[p-1][q]>=1){
          arr[p-1][q]+=1;
         //drawcircle();
       }
      // drawcircle();
     }


     //for p+1 row , q column
     if(arr[p+1][q]<3){
        arr[p+1][q]+=1;
        // drawcircle();
     }
     
 
 
     if(arr[p+1][q]>=5)
     {
 
  
       if(arr[p+1][q]==5){
          arr[p+1][q]=1;}  
       if(arr[p+1][q]==6){
           arr[p+1][q]=2;}
       if(arr[p+1][q]==7){
          arr[p+1][q]=3;}
                 
       if(arr[p+1][q]>=1){
          arr[p+1][q]+=1;
         //drawcircle();
       }
      // drawcircle();
     }

    
   
}
}


   
 











