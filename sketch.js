//Create variables here
var dog,dogImg1, dogImg2, dogHappy , foodS, foodStock; 
var database; 
function preload()
{
  //load images here
  dogImg1 = loadImage("dogImg.png"); 
  dogImg2 = loadImage("dogImg1.png"); 
}

function setup() {
  createCanvas(500, 500);
  dog = createSprite(250,300,100,100); 
  dog.addImage(dogImg1); 
  dog.scale = 0.2 ; 
  database = firebase.database();
  foodStock = database.ref("food"); 
  foodStock.on("value", readStock);  
  
}


function draw() {  
  background(46,137,86); 
  if(keyWentDown(UP_ARROW)){ 
    writeStock(foodS); 
    dog.addImage(dogImg2); 
  }
  drawSprites();
  //add styles here
  fill(0); 
  text("Food remaining: "+ foodS, 200, 200); 
  text("Press UP to feed the dog milk",150,400); 


}

function readStock(data){ 
  foodS = data.val(); 
}

function writeStock(x){ 
  if(x <= 0 ){ 
    x = 0; 
  }

  else { 
    x = x-1; 
  }
  database.ref("/").update({
    food: x 
  })
}


