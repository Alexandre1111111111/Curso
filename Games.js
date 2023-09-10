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