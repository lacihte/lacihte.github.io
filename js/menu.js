// Tab Creation, Integration, and Operational Features

function openPage(pageName, elmnt, color) 
{
    // Hides all of the content for the non-default tabs by default
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Removes background color of buttons
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }
  
    // Show the content in each specific tab
    document.getElementById(pageName).style.display = "block";
  
    // Add the specific color to the button that opens the tab
    elmnt.style.backgroundColor = color;
}
  
// Get the element with id="opendefault" and click on it
document.getElementById("opendefault").click();



//=============================================================
//-------------------------Logbox Stuff------------------------
//=============================================================

//Allow dragging of the logbox.

dragElement(document.getElementById("logbox"));

//Toggle between hiding the log box and showing it.

var HashLog = document.getElementById("logbox");
document.getElementById("showlog").click();

function LogShow() 
{
    if (HashLog.style.display === "none") 
    {
      HashLog.style.display = "block";
    }
    else 
    {
      HashLog.style.display = "none";
    }
}

function WriteToTextBox(Text, Color)
{
    HashLog.innerHTML = ("<p>" + Text + "</p>");
} 
function AppendToTextBox(Text, Color)
{
    HashLog.innerHTML += ("<p>" + Text + "</p>");
} 

function ClearTextBox()
{
    HashLog.innerHTML = "";
} 
