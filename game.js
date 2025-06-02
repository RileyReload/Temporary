
/*#region Page Loading and Updating*/

//Loads Player Data  
$(document).ready(function() {
    if (localStorage.length > 0) {
        player = JSON.parse(localStorage.getItem("playerData")); // Load the player data from local storage
        generators = JSON.parse(localStorage.getItem("playerGeneratorData")); // Load the player generator data from local storage
        resets = JSON.parse(localStorage.getItem("playerResetData")); // Load the player reset data from local storage 
    }
    else{
        localStorage.setItem("playerData", JSON.stringify(player));
        localStorage.setItem("playerGeneratorData", JSON.stringify(generators)); // Save the player label data to local storage
        localStorage.setItem("playerResetData", JSON.stringify(resets));
        player = JSON.parse(localStorage.getItem("playerData")); // Load the player data from local storage
        generators = JSON.parse(localStorage.getItem("playerGeneratorData")); // Load the player generator data from local storage
        resets = JSON.parse(localStorage.getItem("playerResetData")); // Load the player reset data from local storage 
    }
        //Initialize the displayed resource vales
        updateResourceDisplay();
        //Initialize the displayed cost values
        updateCostDisplay();
        //Initialize the displayed purchase multiplier values
        updatePurchaseMultDisplay();

        //Initialize Coalescence Button
        updateCoalButton();

        //Ceck for coalescence and show/hide related elements
        coalCheck();

})

// Routine Checks and Updates
setInterval(function(){
    //Update the displayed resource values
    updateResourceDisplay();

    //Update the displayed cost values
    updateCostDisplay();

    //Update the displayed purchase multiplier values
    updatePurchaseMultDisplay();


}, 100);


//autosave player data every 30 seconds
setInterval(function() { 
    localStorage.setItem("playerData", JSON.stringify(player));
    localStorage.setItem("playerGeneratorData", JSON.stringify(generators));
    localStorage.setItem("playerResetData", JSON.stringify(resets));
}, 30000);


/*#endregion Page*/

/*#region Global Variables*/

    /*#region Player Variable */
        var player = {
            resources:{
            stars: 10, understanding: 0,
            },

            labels:{
            starLabel: "???",
            nebulaLabel: "??????",
            }
        }; 
        /*#endregion*/
        

  
        /*#region Generator Variables */
        var generators = {
            /*#region Nebulae */
            nebula1: {
                cost: 10,
                costScale: Math.pow(10,2), 
                count: 0,
                baseProduction: 0.1,
                tenCount: 0,
                tenMult: 1,
                coalMult: 1,
                coalUpgradesMult: 1,
            },
            nebula2: {
                cost: Math.pow(10,2),
                costScale: Math.pow(10,2), 
                count: 0,
                baseProduction: 0.01,
                tenCount: 0,
                tenMult: 1,
                coalMult: 1,
                coalUpgradesMult: 1,
            },
            nebula3: {
                cost: Math.pow(10,6),
                costScale: Math.pow(10,3), 
                count: 0,
                baseProduction: 0.01,
                tenCount: 0,
                tenMult: 1,
                coalMult: 1,
                coalUpgradesMult: 1,
            },
            nebula4: {
                cost: Math.pow(10,10),
                costScale: Math.pow(10,5), 
                count: 0,
                baseProduction: 0.01,
                tenCount: 0,
                tenMult: 1,
                coalMult: 1,
                coalUpgradesMult: 1,
            },
            nebula5: {
                cost: Math.pow(10,14),
                costScale: Math.pow(10,7), 
                count: 0,
                baseProduction: 0.01,
                tenCount: 0,
                tenMult: 1,
                coalMult: 1,
                coalUpgradesMult: 1,
            },
            nebula6: {
                cost: Math.pow(10,19),
                costScale: Math.pow(10,10), 
                count: 0,
                baseProduction: 0.01,
                tenCount: 0,
                tenMult: 1,
                coalMult: 1,
                coalUpgradesMult: 1,
            },
            nebula7: {
                cost: Math.pow(10,24),
                costScale: Math.pow(10,13), 
                count: 0,
                baseProduction: 0.01,
                tenCount: 0,
                tenMult: 1,
                coalMult: 1,
                coalUpgradesMult: 1,
            },
            nebula8: {
                cost: Math.pow(10,30),
                costScale: Math.pow(10,17), 
                count: 0,
                baseProduction: 0.01,
                tenCount: 0,
                tenMult: 1,
                coalMult: 1,
                coalUpgradesMult: 1,
            },
            nebula9: {
                cost: Math.pow(10,36),
                costScale: Math.pow(10,21), 
                count: 0,
                baseProduction: 0.01,
                tenCount: 0,
                tenMult: 1,
                coalMult: 1,
                coalUpgradesMult: 1,
            },
            /*#endregion Nebulae */

            purchaseMult: 2,

            /*#region Base Costs*/
            baseCost: {
                nebula1: 10,
                nebula2: Math.pow(10,2),
                nebula3: Math.pow(10,6),
                nebula4: Math.pow(10,10),
                nebula5: Math.pow(10,14),
                nebula6: Math.pow(10,19),
                nebula7: Math.pow(10,24),
                nebula8: Math.pow(10,30),
                nebula9: Math.pow(10,36),
            },
            /*#endregion */
        }
        /*#endregion */

        /*#region Prestiege Variables*/
        var resets = {
            // Coalescence Layer
            coalescence: {
            showCoalesce: false,
            currentCoalescence: 0,
            highestCoalescence: 0,
            unlockedNebula: 1,
            ninesToCoal: 11,
            coalMult: 2.5,
            },
        }
    
    /*#endregion */

/* #region Click Buttons*/

        /*#region Nebluae */
$("#nebula1").click(function() {
    //Purchase nebula1
    if(player.resources.stars >= generators.nebula1.cost) {
        player.resources.stars -= generators.nebula1.cost;
        generators.nebula1.count ++;
        generators.nebula1.tenCount ++;
        if(generators.nebula1.tenCount == 10) {
            generators.nebula1.tenMult *= generators.purchaseMult;
            generators.nebula1.tenCount = 0; // Reset the tenCount to 0 after every 10 purchases
            generators.nebula1.cost *= generators.nebula1.costScale; // Increase the cost multiplier by 1 after every 10 purchases
        } 
        updateCostDisplay(); // Update the cost display
        if(generators.nebula1.count >= 10) {
            $("#coalesceBtn").show();
        }
    }
    
}) 

$("#nebula2").click(function() {
    //Purchase nebula2
    if(player.resources.stars >= generators.nebula2.cost) {
        player.resources.stars -= generators.nebula2.cost;
        generators.nebula2.count ++;
        generators.nebula2.tenCount ++;
        if(generators.nebula2.tenCount == 10) {
            generators.nebula2.tenMult *= generators.purchaseMult;
            generators.nebula2.tenCount = 0; // Reset the tenCount to 0 after every 10 purchases
            generators.nebula2.cost *= generators.nebula2.costScale; // Increase the cost multiplier by 1 after every 10 purchases
        } 
        updateCostDisplay(); // Update the cost display
       
    }
    
}) 

$("#nebula3").click(function() {
    //Purchase nebula3
    if(player.resources.stars >= generators.nebula3.cost) {
        player.resources.stars -= generators.nebula3.cost;
        generators.nebula3.count ++;
        generators.nebula3.tenCount ++;
        if(generators.nebula3.tenCount == 10) {
            generators.nebula3.tenMult *= generators.purchaseMult;
            generators.nebula3.tenCount = 0; // Reset the tenCount to 0 after every 10 purchases
            generators.nebula3.cost *= generators.nebula3.costScale; // Increase the cost multiplier by 1 after every 10 purchases
        }
        updateCostDisplay(); // Update the cost display
    }
})

$("#nebula4").click(function() {
    //Purchase nebula4
    if(player.resources.stars >= generators.nebula4.cost) {
        player.resources.stars -= generators.nebula4.cost;
        generators.nebula4.count ++;
        generators.nebula4.tenCount ++;
        if(generators.nebula4.tenCount == 10) {
            generators.nebula4.tenMult *= generators.purchaseMult;
            generators.nebula4.tenCount = 0; // Reset the tenCount to 0 after every 10 purchases
            generators.nebula4.cost *= generators.nebula4.costScale; // Increase the cost multiplier by 1 after every 10 purchases
        } 
        updateCostDisplay(); // Update the cost display
    }
})

$("#nebula5").click(function() {
    //Purchase nebula5
    if(player.resources.stars >= generators.nebula5.cost) {
        player.resources.stars -= generators.nebula5.cost;
        generators.nebula5.count ++;
        generators.nebula5.tenCount ++;
        if(generators.nebula5.tenCount == 10) {
            generators.nebula5.tenMult *= generators.purchaseMult;
            generators.nebula5.tenCount = 0; // Reset the tenCount to 0 after every 10 purchases
            generators.nebula5.cost *= generators.nebula5.costScale; // Increase the cost multiplier by 1 after every 10 purchases
        } 
        updateCostDisplay(); // Update the cost display
    }
})

$("#nebula6").click(function() {
    //Purchase nebula6
    if(player.resources.stars >= generators.nebula6.cost) {
        player.resources.stars -= generators.nebula6.cost;
        generators.nebula6.count ++;
        generators.nebula6.tenCount ++;
        if(generators.nebula6.tenCount == 10) {
            generators.nebula6.tenMult *= generators.purchaseMult;
            generators.nebula6.tenCount = 0; // Reset the tenCount to 0 after every 10 purchases
            generators.nebula6.cost *= generators.nebula6.costScale; // Increase the cost multiplier by 1 after every 10 purchases
        } 
        updateCostDisplay(); // Update the cost display
    }
})

$("#nebula7").click(function() {
    //Purchase nebula7
    if(player.resources.stars >= generators.nebula7.cost) {
        player.resources.stars -= generators.nebula7.cost;
        generators.nebula7.count ++;
        generators.nebula7.tenCount ++;
        if(generators.nebula7.tenCount == 10) {
            generators.nebula7.tenMult *= generators.purchaseMult;
            generators.nebula7.tenCount = 0; // Reset the tenCount to 0 after every 10 purchases
            generators.nebula7.cost *= generators.nebula7.costScale; // Increase the cost multiplier by 1 after every 10 purchases
        } 
        updateCostDisplay(); // Update the cost display
    }
})

$("#nebula8").click(function() {
    //Purchase nebula8
    if(player.resources.stars >= generators.nebula8.cost) {
        player.resources.stars -= generators.nebula8.cost;
        generators.nebula8.count ++;
        generators.nebula8.tenCount ++;
        if(generators.nebula8.tenCount == 10) {
            generators.nebula8.tenMult *= generators.purchaseMult;
            generators.nebula8.tenCount = 0; // Reset the tenCount to 0 after every 10 purchases
            generators.nebula8.cost *= generators.nebula8.costScale; // Increase the cost multiplier by 1 after every 10 purchases
        } 
        updateCostDisplay(); // Update the cost display
    }
})

$("#nebula9").click(function() {
    //Purchase nebula9
    if(player.resources.stars >= generators.nebula9.cost) {
        player.resources.stars -= generators.nebula9.cost;
        generators.nebula9.count ++;
        generators.nebula9.tenCount ++;
        if(generators.nebula9.tenCount == 10) {
            generators.nebula9.tenMult *= generators.purchaseMult;
            generators.nebula9.tenCount = 0; // Reset the tenCount to 0 after every 10 purchases
            generators.nebula9.cost *= generators.nebula9.costScale; // Increase the cost multiplier by 1 after every 10 purchases
        } 
        updateCostDisplay(); // Update the cost display
    }
})



        /*#endregion Nebulae */


        /*#region Coalescence */
$("#coalesceBtn").click(function() {
if(resets.coalescence.currentCoalescence == 0)
{
    if(generators.nebula1.count > 10) {
    player.resources.stars = 10; // Reset stars to 10
    resetNebulae();
    resets.coalescence.highestCoalescence = Math.max(1,resets.coalescence.highestCoalescence);
    resets.coalescence.currentCoalescence = 1;
    resets.coalescence.unlockedNebula = 3;
    coalCheck();
    updateCoalButton();
    generators.nebula1.coalMult *= resets.coalescence.coalMult; // Increase the coal multiplier by 2.5
    }   
}
else if(resets.coalescence.currentCoalescence == 1)
{
    if(generators.nebula3.count > 10) {
    player.resources.stars = 10; // Reset stars to 10
    resetNebulae();
    resets.coalescence.highestCoalescence = Math.max(2,resets.coalescence.highestCoalescence);
    resets.coalescence.currentCoalescence = 2;
    resets.coalescence.unlockedNebula = 5;
    for(let i = 1; i <= 3; i++){
        generators["nebula"+i].coalMult *= resets.coalescence.coalMult; // Increase the coal multiplier by 2.5
    }
    coalCheck();
    updateCoalButton();
    }   
}
else if(resets.coalescence.currentCoalescence == 2)
{
    if(generators.nebula5.count > 10) {
    player.resources.stars = 10; // Reset stars to 10
    resetNebulae();
    resets.coalescence.highestCoalescence = Math.max(3,resets.coalescence.highestCoalescence);
    resets.coalescence.currentCoalescence = 3;
    resets.coalescence.unlockedNebula = 7;
    for(let i = 1; i <= 5; i++){
        generators["nebula"+i].coalMult *= resets.coalescence.coalMult; // Increase the coal multiplier by 2.5
    }
    coalCheck();
    updateCoalButton();
    }   
}
else if(resets.coalescence.currentCoalescence == 3)
{
    if(generators.nebula7.count > 10) {
    player.resources.stars = 10; // Reset stars to 10
    resetNebulae();
    resets.coalescence.highestCoalescence = Math.max(4,resets.coalescence.highestCoalescence);
    resets.coalescence.currentCoalescence = 4;
    resets.coalescence.unlockedNebula = 9;
    for(let i = 1; i <= 5; i++){
        generators["nebula"+i].coalMult *= resets.coalescence.coalMult; // Increase the coal multiplier by 2.5
    }
    coalCheck();
    updateCoalButton();
    }   
}
else if(resets.coalescence.currentCoalescence >= 4)
{
    if(generators.nebula9.count >= resets.coalescence.ninesToCoal) {
    player.resources.stars = 10; // Reset stars to 10
    resetNebulae();
    resets.coalescence.highestCoalescence ++;
    for(let i = 1; i <= 9; i++){
        generators["nebula"+i].coalMult *= resets.coalescence.coalMult; // Increase the coal multiplier by 2.5
    }
    resets.coalescence.ninesToCoal += 21;
    resets.coalescence.currentCoalescence ++;
    resets.coalescence.highestCoalescence = Math.max(resets.coalescence.highestCoalescence,resets.coalescence.currentCoalescence + 1);
    updateCoalButton();
    }

}


if(resets.coalescence.highestCoalescence == 4) resets.coalescence.showCoalesce = true;
});
        /*#endregion Coalescence */



/*#endregion*/

/*#region Bottom Buttons*/
$("#saveButton").click(function() { 
    // Save the game state to local storage
    localStorage.setItem("playerData", JSON.stringify(player));
    localStorage.setItem("playerGeneratorData", JSON.stringify(generators)); // Save the player label data to local storage
    localStorage.setItem("playerResetData", JSON.stringify(resets));
    alert("Game saved!");
})
$("#loadButton").click(function() { 
    // Load the game state from local storage
    if (localStorage.length > 0) {
        player = JSON.parse(localStorage.getItem("playerData")); // Load the player data from local storage
        generators = JSON.parse(localStorage.getItem("playerGeneratorData")); // Load the player generator data from local storage
        resets = JSON.parse(localStorage.getItem("playerResetData")); // Load the player reset data from local storage 
        alert("Save Data Loaded!");
    } else {
        alert("No saved game found!");
    }
})
$("#resetButton").click(function() { 
    // Clears local storage
    if (localStorage.length > 0) {
        localStorage.clear();    
        alert("Data Reset!");
    } 
    else {
        alert("No saved game found!");
    }
})
/*#endregion*/




/*#region Generation */
    /*#region Nebula Generation*/
    setInterval(function(){
        player.resources.stars += prodGen(generators.nebula1); // Increase stars by the nebula1 production value
        generators.nebula1.count += prodGen(generators.nebula2);
        generators.nebula2.count += prodGen(generators.nebula3);
        generators.nebula3.count += prodGen(generators.nebula4);
        generators.nebula4.count += prodGen(generators.nebula5);
        generators.nebula5.count += prodGen(generators.nebula6);
        generators.nebula6.count += prodGen(generators.nebula7);
        generators.nebula7.count += prodGen(generators.nebula8);
        generators.nebula8.count += prodGen(generators.nebula9); // Increase the nebula1 count by the nebula2 production value
    }, 100);

    export function prodGen(generator) {
        //Calculate the production of the generator
        return (generator.baseProduction * generator.count * generator.tenMult * generator.coalMult); // Calculate the production of the generator
    }
    export function getTotalMult(generator) {
        return (generator.tenMult * generator.coalMult * generator.coalUpgradesMult).toFixed(1); // Calculate the total multiplier of the generator
    }

    /*#endregion Nebula Generation */
/*#endregion */


/*#region Updater Methods */
export function updateCostDisplay() {
    $("#nebula1").text("Cost: " + generalPrint(generators.nebula1.cost) +" "+ player.labels.starLabel); // Update the nebula1 button text
    $("#nebula2").text("Cost: " + generalPrint(generators.nebula2.cost) +" "+ player.labels.starLabel); // Update the nebula2 button text
    $("#nebula3").text("Cost: " + generalPrint(generators.nebula3.cost) +" "+ player.labels.starLabel); // Update the nebula3 button text
    $("#nebula4").text("Cost: " + generalPrint(generators.nebula4.cost) +" "+ player.labels.starLabel); // Update the nebula4 button text
    $("#nebula5").text("Cost: " + generalPrint(generators.nebula5.cost) +" "+ player.labels.starLabel); // Update the nebula5 button text
    $("#nebula6").text("Cost: " + generalPrint(generators.nebula6.cost) +" "+ player.labels.starLabel); // Update the nebula6 button text
    $("#nebula7").text("Cost: " + generalPrint(generators.nebula7.cost) +" "+ player.labels.starLabel); // Update the nebula7 button text
    $("#nebula8").text("Cost: " + generalPrint(generators.nebula8.cost) +" "+ player.labels.starLabel); // Update the nebula8 button text
    $("#nebula9").text("Cost: " + generalPrint(generators.nebula9.cost) +" "+ player.labels.starLabel); // Update the nebula9 button text
}

export function updateResourceDisplay() {
    $("#starsDisplay").text("You have "+ resourcePrint(player.resources.stars) +" "+player.labels.starLabel+"."); // Update the stars display
    $("#starsPSDisplay").text("You are generating "+ resourcePrint(prodGen(generators.nebula1)*10) +" "+player.labels.starLabel+" per second."); // Update the stars per second display
}

export function updatePurchaseMultDisplay(){
    $("#nebula1PurchaseMult").text("x"+ getTotalMult(generators.nebula1) + " ("+generators.nebula1.tenCount+"/10 | " + resourcePrint(generators.nebula1.count) + " Total)" ); // Update the nebula1 purchase multiplier display
    $("#nebula2PurchaseMult").text("x"+ getTotalMult(generators.nebula2) + " ("+generators.nebula2.tenCount+"/10 | " + resourcePrint(generators.nebula2.count) + " Total)"); // Update the nebula2 purchase multiplier display
    $("#nebula3PurchaseMult").text("x"+ getTotalMult(generators.nebula3) + " ("+generators.nebula3.tenCount+"/10 | " + resourcePrint(generators.nebula3.count) + " Total)"); // Update the nebula3 purchase multiplier display
    $("#nebula4PurchaseMult").text("x"+ getTotalMult(generators.nebula4) + " ("+generators.nebula4.tenCount+"/10 | " + resourcePrint(generators.nebula4.count) + " Total)"); // Update the nebula2 purchase multiplier display
    $("#nebula5PurchaseMult").text("x"+ getTotalMult(generators.nebula5) + " ("+generators.nebula5.tenCount+"/10 | " + resourcePrint(generators.nebula5.count) + " Total)"); // Update the nebula2 purchase multiplier display
    $("#nebula6PurchaseMult").text("x"+ getTotalMult(generators.nebula6) + " ("+generators.nebula6.tenCount+"/10 | " + resourcePrint(generators.nebula6.count) + " Total)"); // Update the nebula2 purchase multiplier display
    $("#nebula7PurchaseMult").text("x"+ getTotalMult(generators.nebula7) + " ("+generators.nebula7.tenCount+"/10 | " + resourcePrint(generators.nebula7.count) + " Total)"); // Update the nebula2 purchase multiplier display
    $("#nebula8PurchaseMult").text("x"+ getTotalMult(generators.nebula8) + " ("+generators.nebula8.tenCount+"/10 | " + resourcePrint(generators.nebula8.count) + " Total)"); // Update the nebula2 purchase multiplier display
    $("#nebula9PurchaseMult").text("x"+ getTotalMult(generators.nebula9) + " ("+generators.nebula9.tenCount+"/10 | " + resourcePrint(generators.nebula9.count) + " Total)"); // Update the nebula2 purchase multiplier display


}


export function coalCheck(){
    //checks highest Coalescence and unhides related Nebulae


    if(resets.highestCoalescence > 0) {
        $(".coalesceBtn").show();
    }

if(resets.coalescence.highestCoalescence < 5) {
    if(resets.coalescence.highestCoalescence == 1) {
        $(".coalescence1").show();
    }
    if(resets.coalescence.highestCoalescence == 2) {
        $(".coalescence1").show();
        $(".coalescence2").show();

    }
    if(resets.coalescence.highestCoalescence == 3) {
        $(".coalescence1").show();
        $(".coalescence2").show();
        $(".coalescence3").show();
    }
    if(resets.coalescence.highestCoalescence == 4) {
        $(".coalescence1").show();
        $(".coalescence2").show();
        $(".coalescence3").show();
        $(".coalescence4").show();
    }
}

    if(resets.coalescence.showCoalesce){
        $(".coalescence1").show();
        $(".coalescence2").show();
        $(".coalescence3").show();
        $(".coalescence4").show();
    }

}
export function updateCoalButton(){
if(resets.coalescence.currentCoalescence <= 4) {
$("#coalesceBtn").html("COALESCE <br> <br> " + "Requires: 11 " + player.labels.nebulaLabel +" "+ resets.coalescence.unlockedNebula +". <br> <br> Gives x"+resets.coalescence.coalMult+" multiplier to all "+player.labels.nebulaLabel+"s up to "+resets.coalescence.unlockedNebula+"."); 
}
else{
$("#coalesceBtn").html("COALESCE <br> <br> " + "Requires: "+resets.coalescence.ninesToCoal+" " + player.labels.nebulaLabel +" "+ resets.coalescence.unlockedNebula +". <br> <br> Gives x"+resets.coalescence.coalMult+" multiplier to all "+player.labels.nebulaLabel+"s up to "+resets.coalescence.unlockedNebula+"."); 

}
}
/*#endregion Updater Methods */


/*#region Misc Methods */
export function generalPrint(x){
if (x<10000)
    return x.toFixed(0);
else return x.toExponential(0).replace("+", "");
}
export function resourcePrint(x){
if (x<10000)
    return x.toFixed(0);
else return x.toExponential(1).replace("+", "").replace(".0", "");
}


export function resetGens(){
    resetNebulae();
}
export function resetNebulae(){
    for(let i = 1; i < 10; i++){
    generators["nebula"+i].count = 0; // Reset the count of each nebula to 0
    generators["nebula"+i].tenCount = 0; // Reset the tenCount of each nebula to 0
    generators["nebula"+i].cost = generators.baseCost["nebula"+i]; // Reset the cost of each nebula to its initial value
    generators["nebula"+i].tenMult = 1; // Reset the tenMult of each nebula to 1
    }
}
    

/*#endregion Misc Methods */


