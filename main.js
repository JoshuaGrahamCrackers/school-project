

/*Current issues
 Cacluting burger prices
 text wont remove itself from text box
 implent more upgrades maybe timer based ons?
 make order up button unhidden and picture
 make  costumer picture be UNHIDDEN
 make ingridents be balanced in shape
 make every single upgrade part of 1 hideable divison
*/



let burgerOrder = new Array(5);
let money = 0;
let songTrack= 0;
let profitUpgrade =0;
let reputation=1;
let canGetUpgrade=true
let foodUpgradePrice=5;
let decorUpgradePrice=50;


//establish array for what is used in randomly made burger it is critical for the names in array to have the EXACT same name as their correlted pictures for game to work
let ingredients = ["lettuce", "tomato", "cheddar", "patty", "bun", "onion", "pickles", "ketchup"];
//establish array for music tracks
let musicTracks = ["CountryRoads.mp3","IamTheBestAround.mp3","Amicus.mp3","SpursThatJingle.mp3"];
//establish profile images array for costumers
let profiles =["Caesar.png","graham.png","mrHouse.png","victor.png","yesMan.png"];





//make button variable for start button that waits for button to be clicked, once that happens it makes a burger and hides button
let startButton = document.getElementById("start-button");
let costumerPicture = document.getElementById("costumer-pfp"); 
let orderUpButton = document.getElementById("confirm-button"); 
startButton.addEventListener("click", function() {
//hide start button
startButton.hidden="true";
//unhide costumer profile picture
costumerPicture.hidden="false";
//unhide order up button
orderUpButton.hidden="false"
//start game
makeRandomBurger();


});

//wait for cheats button to be clicked, set new variable to await and be set to be hidden after excuting cheats mode function.
let cheatButton = document.getElementById("cheatModeButton");
cheatButton.addEventListener("click", function() {
cheatsMode();
cheatButton.hidden="true";
});

// Generate a random burger function that will make a random burger anytime a costumer arrives
function makeRandomBurger(){ 
    //make costumer profile picture appear
    generateCostumerProfile();
    //  burgerOrder  variable emptied  so it can be reused for costumers after first
    burgerOrder = [];
    //randomly assign ingridents out of the list HOWEVER the max value of I is less then ingredients so burger does not ALWAYS use every ingrident for gameplay reasons
    for (let i = 0; i < 5; i++) {
    let randomIndex = Math.floor(Math.random() * ingredients.length);
    //add the randomly assigned ingrident into the burgerOrder array via a NEVER BEFORE USED .push() function that I learnt about during the project
    burgerOrder.push(ingredients[randomIndex]);
    }
    //adds every array value in order seperating them with a , via  brand new learnt .join() function into the html of an order
    costumerOrder.innerHTML = "May you please provide me with a burger that has " + burgerOrder.join(", ");
    //follow up by changing images to fit order
    for (let i = 0; i < 5; i++) {
        let ingredientToDisplay = burgerOrder[i];
        //use newlery learnt template literal to create it so the ingredient list that is changed per i value due to the dynamic template literal,  the name is  dynamiclly changed using i+1 effectivly cycling through all picture sources
        document.getElementById(`ingredient${i+1}`).src = `${ingredientToDisplay}.png`;
    }
    alert("working");
}
function checkOrder(){
    //establish variable to count amount of proper ingridents used
    let correctCount =0;
    alert("checking")
    for (let i = 0; i < 5; i++) {
        let userInput=document.getElementById(`ingredient${i+1}-box`).value;
        if(burgerOrder[i]=userInput[i]){
            correctCount=+1;
        }
    }
    if(correctCount==0){
        alert("Terrible burger")
    }
    if(correctCount==5){
        alert("Amazing burger")
    }
    //increase amount of money by correct ingrident  + quality upgrade x reputation boost
    let profit= (correctCount + profitUpgrade) * reputation;
    money+=profit;
    emptyTextBars();
    updateMoney();
    makeRandomBurger();
}

function updateMoney(){
    //update money count with current money variable value
    document.getElementById("money-text").innerHTML="Money: $"+money;
}

//function to empty all text user typed into boxes
function emptyTextBars(){
    //empty out every bar by cycling through I value
    for (let i = 0; i < 5; i++) {
        document.getElementById(`ingredient${i+1}-box`).innerText="";
    }
}

function radioUpgrade(){
    buyItem(10);
    if(canGetUpgrade==true){
        //switch empty .src with the track song
        document.getElementById("musicBar").src= musicTracks[songTrack];
        //increase song track being played so next time upgrade happens song plays
        songTrack+=1;
        updateMoney();
    }
    if(songTrack==4){
        //hide button
        document.getElementById("musicButton").hidden= "true";
    }
    
}

function foodUpgrade(){
    buyItem(foodUpgradePrice);
    if(canGetUpgrade==true){
      //increase amount earned by food 1
      profitUpgrade+=1;
      //update money count
      updateMoney();
      //Increase price by 10% for each upgrade
      foodUpgradePrice*=1.10;
    }
}

function decorUpgrade(){
    buyItem(decorUpgradePrice);
    if(canGetUpgrade==true){
      //increase multiple of money earning by 1
      decorUpgrade+=1;
      //update money count
      updateMoney();
      //Increase price 2x for each upgrade
      foodUpgradePrice*=2;
    }
}

function cheatsMode(){
    money=10000;
    updateMoney();
}

//reduce the amount of money the user has based on the upgrade cost then return the money value
function buyItem(price){
    //check if user can buy upgrade
    if(money>=price){
        //take cost of price away from money
        money=Math.floor(money-price);
        //let game know user can get upgrade 
        canGetUpgrade=true;
        //return value of money once it has been subtractued
        return money;
    }else{
        //mock player and tell them the proper price of upgrade
        alert("Come back when you got some money B U D D Y! [$"+price+']');
        //let game know cannot get upgrade
        canGetUpgrade=false;
    }
}
//function to create profile picture of costumer
function generateCostumerProfile(){
    // Returns a random integer from 0-4
    let profileIndex=Math.floor(Math.random() * 5);
    //switch empty .src with the  random costumer
    document.getElementById("costumer-pfp").src= profiles[profileIndex];
}

