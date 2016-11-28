var nations;
var myFont;
var numberFont;

var inputRange = 0;
var inputMouse = 0;
//setting the variables for the inputs of the mouse

var colors = [];
//this is declaring the variable for colors

var legend;
//var animation;
var border;


function preload() {

   nations = loadJSON("nationData.json");
   myFont = loadFont("VertigoPlusFLF-Bold.ttf");
   numberFont = loadFont("LemonMilk.otf");
   legend = loadImage("assets/Legend2.png");
   //animation = loadAnimation("assets/Animation_00000.png","assets/Animation_00016.png");
  // border = loadImage("animation/Animation_00000.png");
}

function setup() {

   colors = [color(17, 177, 159, 200), color(123, 233, 10, 200), color(232, 186, 16, 200), color(255, 74, 53, 200), color(153, 0, 94, 200), color(75, 29, 177, 200)];
   //adding RGB + Alpha values to the nations

   angleMode(DEGREES);
   //puts the angle of the canvas in degrees and not radians

   createCanvas(1500, 1000);
   /*
   border = createSprite (100,500,50,50);
   border.addAnimation("border", animation);
*/
   inputRange = width / 2
      //this specifies the input of the range at 750
}

function draw() {

   background(100);
   noStroke();
   
 
   
   image(legend,100,810);
   //image(animation, 500,500);
   
   //image(border,800,600);
   

   textFont(myFont);
   textSize(35);
   //fill('white');
   
   //TITLE
   fill(255);
   stroke(4);
    textSize(65);
    text("Does Income Effect Life Expectancy?",width/2,60);


   push();
   translate(70, 300);
   rotate(-90);
   stroke(4);
   text("Life Expectancy", 0, 0);
   pop();
   //the push and pop changes the rotation and orientation of the string within

   text("Income", 1150, 875);


   inputMouse = constrain(mouseX, width / 2, width) - width / 2;
   //this constrains the mouse from moving on the xpos from 750 - 1500

   //CODE FOR SCRUBBING THROUGH YEARS 1800-2009 
   textSize(150);
   textAlign(CENTER);
   stroke('black');
   text(floor(map(inputMouse, 0, width / 2, 1800, 2009)),width * .8, height * 0.65);
   //this is to floor and map the mouseScrub to the range of years, and shows  the text on screen


   textSize(20);
   stroke('white');
   textAlign(CENTER);
   fill('white');


   for (var i = 0; i < 179; i++) {
      var tempY = dataReturn(i, "lifeExpectancy",height - 20, 0, inputMouse, inputRange);
      var tempX = dataReturn(i, "income", 150, 800, inputMouse, inputRange);
      fill(i * 2, 200 - (i * 3), i * 4, 100);
      dataEllipse(tempX, tempY, i, "population", 15, 30, inputMouse, inputRange);
      //this accesess the information from the created function, and looks as follows
      //dataEllipse(xpos, ypos, country#, "property", min circle size, max circle size, and the mapping to where the mouse starts and the range);
   }
   

   fill('white');
   line(100, 50, 100, 800); //Y-AXIS
   line(100, 800, 1250, 800); //X-AXIS

   textFont(numberFont);
   textSize(14);
   
   for (var i = 200; i < 1300; i += 50) {

      line(i, 750, i, 800);
      //this adds the tick marks starting at the 200 mark, going up to the 1000 mark on the axis, with a 100 pixel increase every tick mark

      var incomeNumber = round(map(i, 200, 1300, 3, 100));
      //this rounds, and maps the i value to the actual income

      push();
      translate(i - 5, 775);
      rotate(-90);
      text(incomeNumber + " K", 0, 0);
      pop();
      //this push pop adds the text on the income tick marks in an even number
   }
   
   //THIS IS FOR THE YEAR NUMBERS AND TICK MARKS
   textSize(12);

   for (var y = 750; y > 0; y-=50) {

      line(100, y, 150, y);
      
      var ageNumber = round(map(y,5,800,95,0));
      
      push();
      translate(135, y-5);
      rotate(0);
      text(ageNumber + " Years", 0,0);
      pop();
      //adjusting the year numbers
   }
    

    push();
   translate(85, 890);
   rotate(-90);
   stroke(4);
   textSize(35);
   text("Legend", 0, 0);
   pop();
   
   //POPULATION
   textSize(15);
   text("Population", 500,840);
   textSize(12);
   text("50 K", 415,930);
   text("100 K", 415,910);
   text("1 Million",400,890);
   
   //NATION NAMES
   textSize(20);
   textFont(myFont);
   text("America", 220,840);
   text("Sub-Saharan Africa", 220,865);
   text("South Asia",220,890);
   text("Middle East & North Africa", 240,915);
   text("Europe & Central Asia",230,935);
   text("East Asia & Pacific",230,960);
   
   
   
   

   /*
   fill('pink');
    dataEllipse(tempX,height/2,135,"population",0,400,inputMouse,inputRange);
    */



   //LABELS
   /*
    textAlign(RIGHT);
    fill(255);
    text("ANGOLA",150,height/2);
    
    textAlign(RIGHT);
    fill(255);
    text("POLAND",150,height/6);
    
       textSize(50); 
       textAlign(CENTER);
       fill(255);
       text("Population",width* .25, height* .75);
       
           
       textAlign(CENTER);
       fill(255);
       text("Life Expectancy",width* .5, height* .75);
       
       textAlign(CENTER);
       fill(255);
       text("Income",width* .75, height* .75);
    
    
    textSize(40);
    */
    drawSprites();
}

function dataEllipse(xpos, ypos, nationNumber, property, minSize, maxSize, inputPos, inputMax) {

   var category = "nations[" + nationNumber + "]." + property;
   //this is to create a shortcut access using concatenating (+) to add together strings and characters

   var inputPropLength = eval(category + ".length -1");
   //this is accessing the total number of arrays within the property

   var inputProp = map(inputPos, 0, inputMax, 0, inputPropLength);
   inputProp = floor(inputProp);
   inputProp = constrain(inputProp, 0, inputPropLength);
   //taking the value of x and mapping it to the population number,then flooring and constraining 


   var propName = "region";
   var region = eval("nations[" + nationNumber + "]." + propName);
   //this is accessing the regions within the JSON file

   switch (region) {
      //this is to put each continent into a case in order to run through and color code based on region 
      case "America":
         fill(colors[0]);
         break;
         
      case "Sub-Saharan Africa":
         fill(colors[1]);
         break;

      case "South Asia":
         fill(colors[2]);
         break;

      case "Middle East & North Africa":
         fill(colors[3]);
         break;

      case "Europe & Central Asia":
         fill(colors[4]);
         break;

      case "East Asia & Pacific":
         fill(colors[5]);
         break;

      default:
         fill(0);
         break;
   }


   var visualizeProp = eval(category + "[inputProp][1]");
   //grabbing the value from the JSON

   visualizeProp = map(visualizeProp, 0, 140000000, minSize, maxSize);
   //mapping that information to a specific range

   ellipse(xpos, ypos, visualizeProp, visualizeProp);
   //drawing of the circles

   //fill(0);
   //text(eval(category + "[inputProp][1]"),xpos,ypos);
   

}

function dataReturn(nationNumber, property, minRange, maxRange, inputPos, inputMax) {


   var category = "nations[" + nationNumber + "]." + property;
   //this is to create a shortcut access using concatenating (+) to add together strings and characters

   var inputPropLength = eval(category + ".length -1");
   //this is accessing the total number of arrays within the property

   var inputProp = map(inputPos, 0, inputMax, 0, inputPropLength);
   inputProp = floor(inputProp);
   inputProp = constrain(inputProp, 0, inputPropLength);

   var visualizeProp = eval(category + "[inputProp][1]");
   //this grabs the actual value out of the JSON table
   var propertyMax = 0;


   if (property == "lifeExpectancy") {
      propertyMax = 90;
      visualizeProp = map(visualizeProp, 0, propertyMax, minRange, maxRange);
   }

   if (property == "income") {
      propertyMax = 100000;

      var totalRange = maxRange - minRange;
      //calculates the total visual space for the income
      var lowerThird = minRange + (totalRange * .66);

      if (visualizeProp < 20000) {
         visualizeProp = map(visualizeProp, 0, 20000, minRange, lowerThird);
         //this spreads out the income over the first 2/3rds
      }
      if (visualizeProp > 20000) {
         visualizeProp = map(visualizeProp, 20000, propertyMax, lowerThird, maxRange)
      }
   }



   return visualizeProp;
}