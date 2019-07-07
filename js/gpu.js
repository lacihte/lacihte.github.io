// This file is for all aspects relating to GPU functionality.

var GPU1TaskPointer;
var GPU2TaskPointer;
var GPU3TaskPointer;

var GPUCounter = 0;
var GPUCount = 1;
var gpu1Temp = 20;
var gpu1Overheated = false;

var GPU1Visible = false;
var GPU2Visible = false;
var GPU3Visible = false;
var GPU4Visible = false;
var GPU5Visible = false;

document.getElementById('gpu1found').innerHTML = "Cracking...";
document.getElementById('gpu2found').innerHTML = "Cracking...";

var GPUMatchChance=[0,1,2,3,4,5,6,7,8,9];
function resetMatchChance()
{
    GPUMatchChance[0] = Math.floor((Math.random() * chancemax) + 1);
    GPUMatchChance[1] = Math.floor((Math.random() * chancemax) + 1);
    GPUMatchChance[2] = Math.floor((Math.random() * chancemax) + 1);
    GPUMatchChance[3] = Math.floor((Math.random() * chancemax) + 1);
    GPUMatchChance[4] = Math.floor((Math.random() * chancemax) + 1);
    GPUMatchChance[5] = Math.floor((Math.random() * chancemax) + 1);
    GPUMatchChance[6] = Math.floor((Math.random() * chancemax) + 1);
    GPUMatchChance[7] = Math.floor((Math.random() * chancemax) + 1);
    GPUMatchChance[8] = Math.floor((Math.random() * chancemax) + 1);
    GPUMatchChance[9] = Math.floor((Math.random() * chancemax) + 1);
}

// Create a GPU Task function that can be spawned by all GPU's
function GPUTask(GPUNumber, GPUStatusID)
{
    if(ClearSaveFlag)
    {
        return;
    }

    if((autoOn) || (GPUNumber == 0))
    {
        Money = (Money + realmult);
        Money = Money + (Prestige * Money);
        gpu1Temp = gpu1Temp + (up2incrementby * 0.01);
        timesautoclicked = timesautoclicked + up2incrementby;
        timesclickedtotal = timesclickedtotal + up2incrementby;

        // Start Counter for Wordlist
        counter = counter + up2incrementby;

        if (counter >=  GPUMatchChance[GPUNumber])
        {
            counter = 0;
            resetMatchChance();
            AppendToTextBox("Hash Found (GPU " + GPUNumber + "): " + CurrentHashVal);
            GPUStatusID.innerHTML = "Hash Found!";
            CurrentHashVal = makeid(32);
            document.getElementById("logbox").scrollTop = document.getElementById("logbox").scrollHeight 
            Money = Money + 100;
            timesfoundtotal++;
            asf = 0;
            console.log(GPUMatchChance[0]);
            console.log(GPUMatchChance[1]);
            console.log(GPUMatchChance[2]);
        }
        else
        {
            asf += up2incrementby;
            GPUStatusID.innerHTML = "Cracking...";
        }
        updatehashes();
        updatevariables();
    }
}

function GPUClick()
{
    // On First Click GPU1 is Shown and Math is Completed
    if (Money >= gpucost)
    {
        switch(GPUCounter)
        {
            // The Second GPU is Introduced Upon Purchase.
            case 0:
                myFadeIn(document.getElementById("GPU1"), 1000);
                Money = Money - gpucost;
                gpucost = gpucost + (gpucost * 0.5);
                GPUCounter++;
                GPUCount++;
                GPU1Visible = true;       
                GPU2TaskPointer = window.setInterval(GPUTask, autoclickrate, 1, document.getElementById('gpu1found'));
                updatevariables();
                break;
            // The Third GPU is Introduced Upon Purchase.
            case 1:
                myFadeIn(document.getElementById("GPU2"), 1000);
                Money = Money - gpucost;
                gpucost = gpucost + (gpucost * 0.5);
                GPUCounter++;
                GPUCount++; 
                GPU2Visible = true;
                GPU3TaskPointer = window.setInterval(GPUTask, autoclickrate, 2, document.getElementById('gpu2found'));
                updatevariables();
                break;
            // Subsequent GPUs Established and Programmed Below.
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
            case 5:
                break;
            case 6:
                break;
            case 7:
                break;
            case 8:
                break;
            case 9:
                break;
            default:
                // Tell user they have reached max GPU limit.
                break;                                                                                                                                                                                                                                                                                                                                                                                      
        }
    }
}

