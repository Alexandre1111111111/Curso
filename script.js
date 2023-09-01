const dropBox = document.querySelector("#Mainbtn");

dropBox.addEventListener("click", () => {
    document.getElementById("Box").classList.toggle("show");
  });
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

const topico = document.getElementById("Top");
topico.style.transitionDuration = "0.3s";
topico.style.position = "relative";
topico.addEventListener("mouseover", () =>{
  topico.style.right = "3px";
});
topico.addEventListener("mouseout", () =>{
  topico.style.right = "0px";
});
const cobraImg = document.getElementById("Snk");
const textImg = document.getElementById("Sn");
cobraImg.style.transitionDuration = "0.2s";
cobraImg.addEventListener("mouseover", () => {
  cobraImg.style.borderColor = "#d99f21";
  cobraImg.style.height = "155px";
  textImg.style.color = "#f5bd45";
});
cobraImg.addEventListener("mouseout", () => {
  cobraImg.style.borderColor = "#c8cf45";
  cobraImg.style.height = "150px";
  textImg.style.color = "#c8cf45";
});
