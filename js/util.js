// This file is for all aspects relating to utility functions.

// Function that appends the proper suffixes for various amounts of money (K, M, B, T, Qa, Qi, Sx, Sp).
var SI_SYMBOL = ["", " K", " M", " B", " T", " Qa", " Qi", " Sx", " Sp"];
function abbreviateNumber(value){

    // what tier? (determines SI symbol)
    var tier = Math.log10(value) / 3 | 0;

    // if zero, we don't need a suffix
    if(tier == 0) return value;

    // get suffix and determine scale
    var suffix = SI_SYMBOL[tier];
    var scale = Math.pow(10, tier * 3);

    // scale the value
    var scaled = value / scale;

    // format value and add suffix
    return scaled.toFixed(3) + suffix;
}





// Function to display a random 32 character Hash string.
function makeid(length) 
{
    var result = '';
    var characters = 'ABCDEF0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) 
    {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}





// Function that rounds (value/element) to the nearest (decimals) decimal.
function round(value, decimals) 
{
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}





// Function That Updates ALL Variables At Once
function updatevariables()
{
    //document.getElementById('inc').innerHTML = round(number, 3);
    document.getElementById('inc').innerHTML = abbreviateNumber((round(Money, 3)));
    document.getElementById('realprest').innerHTML = round(Prestige, 3);
    document.getElementById('clicked').innerHTML = timesclicked;
    document.getElementById('multiplier').innerHTML = realmult;
    document.getElementById('multiplierlvl').innerHTML = multlvl;
    document.getElementById('upone1base').innerHTML = abbreviateNumber((round(up1basecost, 3)));
    document.getElementById('uptwo2').innerHTML = Upgrade2;
    document.getElementById('uptwo2base').innerHTML = abbreviateNumber((round(up2basecost, 3)));
    document.getElementById('clicked').innerHTML = timesclicked;
    document.getElementById('autoclicked').innerHTML = timesautoclicked;
    document.getElementById('totalclicked').innerHTML = timesclickedtotal;
    document.getElementById('asincef').innerHTML = asf;
    document.getElementById('prestbase').innerHTML = prestbasecost;
    document.getElementById('totalfound').innerHTML = timesfoundtotal;
    document.getElementById('algorithm').innerHTML = CurrentAlgorithm;
    document.getElementById('tempvar').innerHTML = round(gpu1Temp, 2);
    document.getElementById('gpucount').innerHTML = GPUCount;
    document.getElementById('tempprest').innerHTML = round(temp_prest, 0);
}

function updatehashes()
{
    document.getElementsByClassName('hashout')[0].innerHTML = CurrentHashVal;
    document.getElementsByClassName('hashout')[1].innerHTML = CurrentHashVal;
    document.getElementsByClassName('hashout')[2].innerHTML = CurrentHashVal;
    document.getElementById('wordout').innerHTML = makeid(32);
    document.getElementById('gpu1wordout').innerHTML = makeid(32);
    document.getElementById('gpu2wordout').innerHTML = makeid(32);
}








// Fade in an element, taking "howLong" to get from 0 to 1
function myFadeIn(element, howLong)
{
    // Creates the Animation Which Carries the Element from Opacity 0 to Opacity 1.
    element.animate([
        {opacity: 0}, 
        {opacity: 1}
    ], { 
    // How long the Element's Transition from Opacity 0 to Opacity 1 Should Take.
        duration: howLong,
    // Amount of Times to Produce the Animation.
        iterations: 1
    });
    up1ButtonVisible = true;
    element.style.opacity = 1;
}





// Fade out an element, taking "howLong" to get from 1 to 0
function myFadeOut(element, howLong)
{
    // Creates the Animation Which Carries the Element from Opacity 1 to Opacity 0.
    element.animate([
        {opacity: 1}, 
        {opacity: 0}
    ], { 
    // How long the Element's Transition from Opacity 1 to Opacity 0 Should Take.
        duration: howLong,
    // Amount of Times to Produce the Animation.
        iterations: 1
    });
    up1ButtonVisible = true;
    element.style.opacity = 0;
}





// Establishes the "Cheat" Buttons for Developmental Purposes.
// Adds 1 Trillion Dollars ($1,000,000,000,000)
function numcheatt() { Money += 1000000000000; updatevariables(); }
// Adds 1 Billion Dollars ($1,000,000,000)
function numcheatb() { Money += 1000000000; updatevariables(); }
// Adds 1 Million Dollars ($1,000,000)
function numcheatm() { Money += 1000000; updatevariables(); }
// Adds 1 Thousand Dollars ($1,000)
function numcheatk() { Money += 1000; updatevariables(); }
// Adds 1 Hundred Dollars ($100)
function numcheath() { Money += 100; updatevariables(); }
// Adds 10 Dollars
function numcheatd() { Money += 10; updatevariables(); }





// Creation of the output Drag feature

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV: 
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
