//  bike sharing dataset format
function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="bike-tabcontent" and hide them
    tabcontent = document.getElementsByClassName("bike-tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="bike-tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("bike-tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Open the default tab when the page loads
document.getElementById("defaultOpen").click();