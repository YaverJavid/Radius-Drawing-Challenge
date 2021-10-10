/**
 * Written By : Yavet Javid
 **/
const canvas = document.querySelector("canvas")
var ctx = canvas.getContext('2d')
var offset = 0
var infoDisplayStatus = "inline"
var recentColorsDisplayStatus = "inline"
var yCoordCorrecton = 38
var recentColorsP = ""
var colorsIndex = 0
canvas.height = window.innerHeight - 220
canvas.width = window.innerWidth - 12
ctx.lineWidth = "4"
ctx.strokeStyle = "white"
var recentColors = []
document.getElementById("int").addEventListener("touchmove", (e) => {
  pointerVisibiltyManager()
  document.getElementById("pointer").style.left = e.touches[0].clientX + "px"
  document.getElementById("pointer").style.top = e.touches[0].clientY - offset + "px"
  if (e.touches[0].force > 0.06 || document.getElementById("cursorOffset").value == 0) {
    ctx.beginPath()
    ctx.moveTo(canvas.width / 2, canvas.height / 2)
    ctx.lineTo(e.touches[0].clientX, e.touches[0].clientY - offset - yCoordCorrecton)
    ctx.stroke()
    document.getElementById("pointer").style.backgroundColor = "#F20B0B8F"
  } else document.getElementById("pointer").style.backgroundColor = "#F20B0B00"
})
document.getElementById("clearButton").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
})
document.getElementById("lineColor").addEventListener("input", function() {
  ctx.strokeStyle = this.value
  if (recentColors.length > 13) recentColors.shift()
  recentColors.push(this.value)
})
document.getElementById("canvasColor").addEventListener("input", function() {
  canvas.style.backgroundColor = this.value
})
document.getElementById("strokeWidth").addEventListener("input", function() {
  ctx.lineWidth = this.value
})
document.getElementById("cursorOffset").addEventListener("change", function() {
  offset = parseInt(this.value)
  pointerVisibiltyManager()
})

function pointerVisibiltyManager() {
  if (document.getElementById("cursorOffset").value == 0) document.getElementById("pointer").style.display = "none"
  else document.getElementById("pointer").style.display = "inline"
}
document.getElementById("info").addEventListener("click", () => {
  document.getElementById("infoOpen").style.display = infoDisplayStatus
  infoDisplayStatus === "none" ? infoDisplayStatus = "inline" : infoDisplayStatus = "none"
})
document.getElementById("visible").addEventListener("click", () => {
  if (infoDisplayStatus === "none") document.getElementById("infoOpen").style.display = "none";
  infoDisplayStatus = "inline"
  if (recentColorsDisplayStatus === "inline") document.getElementById("recentColorsOpen").style.display = "none"
  recentColorsDisplayStatus = "inline"

})
document.getElementById("recentColors").addEventListener("click", () => {
  document.getElementById("recentColorsOpen").style.display = recentColorsDisplayStatus
  colorsIndex = 0
  recentColorsP = ""
  for (var i in recentColors) { recentColorsP += ` <span id="cI${colorsIndex}" onclick="copy_text('cI${colorsIndex}')">${recentColors[i]}</span><span class="unselectable" style="color:${recentColors[i]};">&#9632;</span>`;
    colorsIndex++ }
  document.getElementById("recentColorsP").innerHTML = recentColorsP
})
document.getElementsByClassName('inputColorHex')[0].addEventListener("input", function() {
  ctx.strokeStyle = this.value
  document.getElementById("lineColor").value = this.value
})
document.getElementsByClassName('inputColorHex')[1].addEventListener("input", function() {
  canvas.style.backgroundColor = this.value
  document.getElementById("canvasColor").value = this.value
})

function copy_text(element) { //Before we copy, we are going to select the text.    
  var text = document.getElementById(element);
  var selection = window.getSelection();
  var range = document.createRange();
  range.selectNodeContents(text);
  selection.removeAllRanges();
  selection.addRange(range); //add to clipboard.     
  document.execCommand('copy');
}