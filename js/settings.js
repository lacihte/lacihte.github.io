// This file is relating to all aspects of the Settings tab

var newstogglecounter = false;
function newstoggle()
{
    if (!newstogglecounter)
    {
        myFadeOut(document.getElementById("newsdiv"), 1000);
        newstogglecounter = true;
    }
    else
    {
        myFadeIn(document.getElementById("newsdiv"), 1000);
        newstogglecounter = false;
    }
}


//===============================================================================================
//-----------------------------------AUTOSAVE----------------------------------------------------
//===============================================================================================


window.setInterval(autosave, 300000);
// Autosaves every 5 minutes.
function autosave()
{
    $.notify("Autosave Complete.", "success", { position:"right" });
    save();
}


//================================================================================================
//-----------------------------------Save/Load----------------------------------------------------


function save() {
    localStorage.setItem('Money', JSON.stringify(Money));
    localStorage.setItem('Prestige', JSON.stringify(Prestige));
    localStorage.setItem('prestbasecost', JSON.stringify(prestbasecost));
    localStorage.setItem('realmult', JSON.stringify(realmult));
    localStorage.setItem('multlvl', JSON.stringify(multlvl));
    localStorage.setItem('Upgrade1', JSON.stringify(Upgrade1));
    localStorage.setItem('Upgrade2', JSON.stringify(Upgrade2));
    localStorage.setItem('timesclicked', JSON.stringify(timesclicked));
    localStorage.setItem('timesautoclicked', JSON.stringify(timesautoclicked));
    localStorage.setItem('timesclickedtotal', JSON.stringify(timesclickedtotal));
    localStorage.setItem('timesfoundtotal', JSON.stringify(timesfoundtotal));
    localStorage.setItem('up1basecost', JSON.stringify(up1basecost));
    localStorage.setItem('up2basecost', JSON.stringify(up2basecost));
    localStorage.setItem('InitialClickRate', JSON.stringify(InitialClickRate));
    localStorage.setItem('autoclickrate', JSON.stringify(autoclickrate));
    localStorage.setItem('up2incrementby', JSON.stringify(up2incrementby));
    localStorage.setItem('autoOn', JSON.stringify(autoOn));
    localStorage.setItem('chancemax', JSON.stringify(chancemax));
    localStorage.setItem('matchchance', JSON.stringify(matchchance));
    localStorage.setItem('asf', JSON.stringify(asf));
    localStorage.setItem('GPU1Visible', JSON.stringify(GPU1Visible));
}

function load() {
    Money = JSON.parse(localStorage.getItem('Money'));
    Prestige = JSON.parse(localStorage.getItem('Prestige'));
    prestbasecost = JSON.parse(localStorage.getItem('prestbasecost'));
    realmult= JSON.parse(localStorage.getItem('realmult'));
    multlvl= JSON.parse(localStorage.getItem('multlvl'));
    Upgrade1= JSON.parse(localStorage.getItem('Upgrade1'));
    Upgrade2= JSON.parse(localStorage.getItem('Upgrade2'));
    timesclicked= JSON.parse(localStorage.getItem('timesclicked'));
    timesautoclicked= JSON.parse(localStorage.getItem('timesautoclicked'));
    timesclickedtotal= JSON.parse(localStorage.getItem('timesclickedtotal'));
    timesfoundtotal= JSON.parse(localStorage.getItem('timesfoundtotal'));
    up1basecost= JSON.parse(localStorage.getItem('up1basecost'));
    up2basecost= JSON.parse(localStorage.getItem('up2basecost'));
    InitialClickRate= JSON.parse(localStorage.getItem('InitialClickRate'));
    autoclickrate= JSON.parse(localStorage.getItem('autoclickrate'));
    up2incrementby= JSON.parse(localStorage.getItem('up2incrementby'));
    autoOn= JSON.parse(localStorage.getItem('autoOn'));
    chancemax= JSON.parse(localStorage.getItem('chancemax'));
    matchchance= JSON.parse(localStorage.getItem('matchchance'));
    asf= JSON.parse(localStorage.getItem('asf'));
    GPU1Visible = JSON.parse(localStorage.getItem('GPU1Visible'));
    if(GPU1Visible)
    {
        myFadeIn(document.getElementById("GPU1"), 1000);
    }
    up1ButtonVisible = false;
    gpuupButtonVisible = false;
    if(autoOn)
    {
        GPU1TaskPointer = window.setInterval(GPUTask, autoclickrate, 0, document.getElementById('found'));
    }
    updatevariables();
    updatehashes();
}



//--------------------------------------ClearSave-------------------------------------------------



function clearsave()
{
    // Set the global ClearSaveFlag variable to true so that the automated tasks will
    // know to stop running.
    ClearSaveFlag = true;

    // Stop all tasks
    clearInterval(oneSecondTaskPtr);
    clearInterval(GPU1TaskPointer);
    clearInterval(GPU2TaskPointer);
    clearInterval(GPU3TaskPointer);

    localStorage.setItem('Money', JSON.stringify(0));
    localStorage.setItem('Prestige', JSON.stringify(0));
    localStorage.setItem('prestbasecost', JSON.stringify(5));
    localStorage.setItem('realmult', JSON.stringify(0.5));
    localStorage.setItem('multlvl', JSON.stringify(0));
    localStorage.setItem('Upgrade1', JSON.stringify(0));
    localStorage.setItem('Upgrade2', JSON.stringify(0));
    localStorage.setItem('timesclicked', JSON.stringify(0));
    localStorage.setItem('timesautoclicked', JSON.stringify(0));
    localStorage.setItem('timesclickedtotal', JSON.stringify(0));
    localStorage.setItem('timesfoundtotal', JSON.stringify(0));
    localStorage.setItem('up1basecost', JSON.stringify(10));
    localStorage.setItem('up2basecost', JSON.stringify(100));
    localStorage.setItem('InitialClickRate', JSON.stringify(1000));
    localStorage.setItem('autoclickrate', JSON.stringify(InitialClickRate));
    localStorage.setItem('up2incrementby', JSON.stringify(0));
    localStorage.setItem('autoOn', JSON.stringify(false));
    localStorage.setItem('chancemax', JSON.stringify(500));
    localStorage.setItem('matchchance', JSON.stringify(Math.floor((Math.random() * chancemax) + 1)));
    localStorage.setItem('asf', JSON.stringify(0));
    up1ButtonVisible = false;
    GPU1Visible = false;
    GPU2Visible = false;
    GPU3Visible = false;
    GPU4Visible = false;
    GPU5Visible = false;
    gpuupButtonVisible = false;

    Money = 0;
    Prestige = 0;
    prestbasecost = 5;
    realmult = 0.5;
    multlvl = 0;
    Upgrade1 = 0;
    Upgrade2 = 0;
    timesclicked = 0;
    timesautoclicked = 0;
    timesclickedtotal = 0;
    timesfoundtotal = 0;
    up1basecost = 10;
    up2basecost = 100;
    InitialClickRate = 1000;
    autoclickrate = InitialClickRate;
    up2incrementby = 0;
    autoOn = false;
    chancemax = 500;
    matchchance = Math.floor((Math.random() * chancemax) + 1);
    asf = 0;
    document.getElementById("upgrade1div").style.opacity = 0;
    document.getElementById("gpuup").style.opacity = 0;
    document.getElementById("GPU1").style.opacity = 0;

    updatevariables();
    ClearSaveFlag = false;
}
