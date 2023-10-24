const cobraImg = document.getElementById("Snk");
const textImg = document.getElementById("Sn");
const pgimg = document.getElementById("pgimg");
const pong = document.getElementById("pong");

cobraImg.style.transitionDuration = "0.2s";
cobraImg.addEventListener("mouseover", () => {
  cobraImg.style.borderColor = "#d99f21";
  textImg.style.color = "#f5bd45";
});
cobraImg.addEventListener("mouseout", () => {
  cobraImg.style.borderColor = "#c8cf45";
  textImg.style.color = "#c8cf45";
});

pgimg.style.transitionDuration = "0.2s";
pgimg.addEventListener("mouseover", () => {
  pgimg.style.borderColor = "#d99f21";
  pong.style.color = "#f5bd45";
});
pgimg.addEventListener("mouseout", () => {
  pgimg.style.borderColor = "#c8cf45";
  pong.style.color = "#c8cf45";
});