// This file is for all aspects relating to core gameplay.

var Money = 0;             
var Prestige = 0.000;
var temp_prest = 0;    
var prestbasecost = 100;      
var realmult = 0.5;
var multlvl = 0;
var Upgrade1 = 0;
var Upgrade2 = 0;
var timesclicked = 0;
var timesautoclicked = 0;
var timesclickedtotal = 0;
var timesfoundtotal = 0;
var up1basecost = 10;
var up2basecost = 100;
var gpucost = 1000;
var oneSecondRate = 1000;
var InitialClickRate = 1000;
var autoclickrate = InitialClickRate;
var up2incrementby = 0;
var autoOn = false;
var CurrentHashVal = makeid(32);
var CurrentAlgorithm = "MD5";
var chancemax = 5000;
var matchchance = Math.floor((Math.random() * chancemax) + 1);
var gpu1matchchance = Math.floor((Math.random() * chancemax) + 1);

var counter = 0;
var asf = 0;
var ClearSaveFlag = false;

var Headline1 = "Thanks for tuning in to BSNBC! We Have a TON of Topics to Cover."
var Headline2 = "Gas Station Robbery Attempt in Austin TX Failed After Gunman Accidentally Shot Himself."
var Headline3 = "Florida College to Accept and Enroll World's Smartest Dog."
var Headline4 = "California Bans Sunglasses After Scientific Study Concluded That Eye Care is 'Unimportant' and That Glasses are a Waste of Plastic, Glass, and Metal."
var Headline5 = "UFO Sighting Above Arizona Desert? Spectators Swear That 'It Was Real!'"
var Headline6 = "Harvard Research Study Finds That Cyberspace is Becoming 'Increasingly More Dangerous' as Users Choose Extremely Unsecure Passwords."

updatevariables();
updatehashes();

// Initial Incremental Currency Button with Refreshes, Outputs, and Functions
var changeHashoutNextRound = false;
function mButtonClick() 
{
    Money = (Money + realmult);
    Money = Money + (Prestige * Money);

    // Delays Hash Output So User Can See Match
    if(changeHashoutNextRound == true)
    {
        changeHashoutNextRound = false;
        document.getElementsByClassName('hashout')[0].innerHTML = CurrentHashVal;
    }

    //Start Counter for Wordlist
    counter++;

    if (counter >=  matchchance)
    {
        document.getElementById('wordout').innerHTML = CurrentHashVal;
        counter = 0;
        matchchance = Math.floor((Math.random() * chancemax) + 1);
        CurrentHashVal = makeid(32);
        Money = Money + 50;
        changeHashoutNextRound = true;
        document.getElementById('found').innerHTML = "Hash Found"
        timesfoundtotal++;
        asf = 0;
    }
    else
    {
        asf++;
        document.getElementById('found').innerHTML = "Cracking...";
        updatehashes();
    }

    timesclicked ++;
    timesclickedtotal ++;
    updatevariables();
}


// ==============================================================================================
// *--------------------------------- Upgrade Section -------------------------------------------
// ==============================================================================================

// Upgrade 1 Elements, Attributes, and Functions.
document.getElementById('up1button').disabled = true;

function UpgradeWordlist(cnt1)
{
    if (Money >= up1basecost)
    {
        Upgrade1 = Upgrade1 + cnt1;
        realmult = realmult + 0.5;
        multlvl = multlvl + 1;
        Money = Money - up1basecost;
        up1basecost = up1basecost + (up1basecost * 0.25);
        chancemax = chancemax - 2;
        updatevariables();
    }
    
}

// Upgrade 2 Elements, Attributes, and Functions.
function Upgrade2Click(cnt2)
{
    // If the user has enough money to buy an auto level...
    if (Money >= up2basecost)
    {
        // If this is the first time the user has got the auto feature...
        if (!autoOn)
        {
            GPU1TaskPointer = window.setInterval(GPUTask, autoclickrate, 0, document.getElementById('found'));
            autoOn = true;
            Upgrade2 = Upgrade2 + cnt2;
            Money = Money - up2basecost;
            up2basecost = up2basecost + (up2basecost * 0.25);
            up2incrementby = 1;
            updatevariables();
        }
        // Otherwise, the user already had auto but just updated the level
        else
        {
            autoclickrate = (autoclickrate - (InitialClickRate/10));
            // If the auto rate has reached 10 times the intial click rate...
            if(autoclickrate <= (InitialClickRate/10))
            {
                // Don't let the auto click rate get faster than 10ms
                autoclickrate = 100;
                // Adds the quantity purchased to the total amount of Upgrade2
                Upgrade2 = Upgrade2 + cnt2;
                // Establishes the speed of the initial click rate
                up2incrementby = Upgrade2 - (round((InitialClickRate/100),0)) + 1;
                // Subtracts the money spent from the user
                Money = Money - up2basecost;
                // Increases the cost with each one purchased
                up2basecost = up2basecost + (up2basecost * 0.25);
                // Stop the GPUTask task
                clearInterval(GPU1TaskPointer);
                // Start the GPUTask task back up with the new interval value
                GPU1TaskPointer = window.setInterval(GPUTask, autoclickrate, 0, document.getElementById('found'));
                if(GPU1Visible)
                {
                    clearInterval(GPU2TaskPointer);
                    GPU2TaskPointer = window.setInterval(GPUTask, autoclickrate, 1, document.getElementById('gpu1found'));
                }
                if(GPU2Visible)
                {
                    clearInterval(GPU3TaskPointer);
                    GPU3TaskPointer = window.setInterval(GPUTask, autoclickrate, 2, document.getElementById('gpu2found'));
                }
            }
            // Otherwise, the rate is still being updated. So update it by 10%
            else
            {
                // Adds the quantity purchased to the total amount of Upgrade2
                Upgrade2 = Upgrade2 + cnt2;
                // Sets the amount to increment by
                up2incrementby = 1;
                // Subtracts the money spent from the user
                Money = Money - up2basecost;
                // Increases the cost with each one purchased
                up2basecost = up2basecost + (up2basecost * 0.25);
            }
            // Update all of the variables
            updatevariables();
        }
    }
}

// Prestige Button that Increases Production and Resets Progress.
function PrestigeClick()
{
    // Establish the Cost of a Prestige Level.
    if (timesfoundtotal >= 100)
    {
        $.notify("Prestige Successful", 'success');
        prestNotify = false;
        GPU1Visible = false;
        GPU2Visible = false;
        GPU3Visible = false;
        GPU4Visible = false;
        GPU5Visible = false;
        up1ButtonVisible = false;
        up2ButtonVisible = false;
        gpuupButtonVisible = false;
        document.getElementById("GPU1").style.opacity = 0;
        document.getElementById("GPU2").style.opacity = 0;
        document.getElementById("up1button").style.opacity = 0;
        document.getElementById("up2button").style.opacity = 0;
        document.getElementById("gpuup").style.opacity = 0;
        clearInterval(oneSecondTaskPtr);
        clearInterval(GPU1TaskPointer);
        clearInterval(GPU2TaskPointer);
        clearInterval(GPU3TaskPointer);
        // Establish a "Temporary" Prestige Variable Which is Displayed to the User as "Prestige Level"
        if(Prestige == 0)
        {
            // Set the "Global" Prestige Variable to 0.001.
            Prestige = 0.001;
        }
        else
        {
            // "Global" Prestige Variable is Incremented by One-Thousandths per Prestige Level.
            Prestige += 0.001;
        }
            // Set the "Temporary" Prestige to a Whole Number That Can Be Neatly Displayed to the User.
        temp_prest = Prestige * 1000;
        // Prestige Base Cost is Increased by 2 (Multiplier Levels) Every Time the User Prestiges.
        prestbasecost = prestbasecost + (prestbasecost * 0.5);
        // Reset Multiplier Upon Prestige.
        realmult = 0.5;
        // Reset Multiplier Level Upon Prestige.
        multlvl = 0;
        // Reset Money (Primary Currency) Upon Prestige.
        Money = 0;
        // Reset the Amount of "Better Wordlist(s)" That the User Currently Owns.
        Upgrade1 = 0;
        // Reset the Amount of "HashFox.exe(Auto)" That the User Currently Owns.
        Upgrade2 = 0;
        // Reset the Maximum Number Threshold for Matching Numbers.
        chancemax = 500;
        // Auto Tasks are Killed.
        clearInterval(GPU1TaskPointer);
        // The Rate of Auto Hashing is Reset Back to the Initial Value (1000ms).
        autoclickrate = InitialClickRate;
        // AutoOn Flag is Reset to False.
        autoOn = false;
        // Reset the Cost of "Better Wordlist(s)" Back Down to the Original $10.
        up1basecost = 10;
        // Reset the Cost of "Hashfox.exe(Auto)" Back Down to the Original $100.
        up2basecost = 100;
        // Calls the UpdateVariables Function.
        updatevariables();
    }
    else
    {
        // Alerts the User that They Lack the Multlvl Necessary for the Next Prestige.
        // Will be Replaced by Notify.js
        window.alert("You must increase your multiplier level first!");
    }
}


// =============================================================================================
// --------------------------------- Timed Interval Events -------------------------------------
// =============================================================================================

var oneSecondTaskCounter = 0;
var up1ButtonVisible = false;
var up2ButtonVisible = false;
var gpuupButtonVisible = false;
var prestNotify = false;

function oneSecondTasks() 
{
    if(ClearSaveFlag)
    {
        return;
    }
    // One second tasks go in this IF statement
    if((oneSecondTaskCounter % 1) == 0)
    {
        // Disable the up1button if there is not enough money to use it
        if (Money >= up1basecost)
        {
            document.getElementById('up1button').disabled = false;
            document.getElementById('upone1base').style.color = "black";
            if(!up1ButtonVisible)
            {
                myFadeIn(document.getElementById("upgrade1div"), 1000);
                up1ButtonVisible = true;
                $.notify("Wordlist Improvement Available!", "info" );
            }
        }
        // Enable the up1button if there is enough money to use it
        else
        {
            document.getElementById('up1button').disabled = true;
            document.getElementById('upone1base').style.color = "rgb(255,0,0)";

        }

        if (Money >= gpucost)
        {
            document.getElementById('gpuup').disabled = false;

            if(!gpuupButtonVisible)
            {
                myFadeIn(document.getElementById("gpubutton"), 1000);
                gpuupButtonVisible = true;
                $.notify("GPU Expansion Available!", "info" );
            }
        }
        else
        {
            document.getElementById('gpuup').disabled = true;
        }

        if (Money >= up2basecost)
        {
            document.getElementById('up2button').disabled = false;
            document.getElementById('uptwo2base').style.color = "black";

            if(!up2ButtonVisible)
            {
                myFadeIn(document.getElementById("upgrade2div"), 1000);
                up2ButtonVisible = true;
                $.notify("Automatic Hashing Available!", "info" );
            }
        }
        else
        {
            document.getElementById('up2button').disabled = true;
            document.getElementById('uptwo2base').style.color = "rgb(255,0,0)";
        }

        if (prestNotify == false && timesfoundtotal >= prestbasecost)
        {
            $.notify("You can now Prestige!", "info");
            prestNotify = true;
        }
    }
    // Two second tasks go in this IF statement
    if((oneSecondTaskCounter % 2) == 0)
    {
        // TODO
    }
    // Three second tasks go in this IF statement
    if((oneSecondTaskCounter % 3) == 0)
    {
        // TODO
    }
    // Four second tasks go in this IF statement
    if((oneSecondTaskCounter % 4) == 0)
    {
        // TODO
    }
    // Five second tasks go in this IF statement
    if((oneSecondTaskCounter % 5) == 0)
    {
        // TODO
    }
 
    oneSecondTaskCounter++;
}

// Start a one second task to handle various tasks
var oneSecondTaskPtr = window.setInterval(oneSecondTasks, oneSecondRate);

