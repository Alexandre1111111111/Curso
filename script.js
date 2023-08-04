function Dropbox() {
    document.getElementById("Box").classList.toggle("show");
  }
    window.onclick = function(event) {
    if (!event.target.matches('.Eng img')) {
      var dropdowns = document.getElementsByClassName("drop");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }