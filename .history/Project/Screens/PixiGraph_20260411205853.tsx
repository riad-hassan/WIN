import React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";

export default function PixiGraph({ onMessage, width=380, height=240, webRef }) {

const html = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/7.2.4/pixi.min.js"></script>

<style>
body{
margin:0;
background:#0f172a;
overflow:hidden;
}
</style>
</head>

<body>

<script>

(async()=>{

const app = new PIXI.Application({
width: ${width},
  height: ${height},   // 🔥 auto fit screen
backgroundColor: 0x0f172a,
antialias: true
})

document.body.appendChild(app.view)

// ---------- CAMERA ----------
const camera = new PIXI.Container()
app.stage.addChild(camera)

// ---------- GRID ----------
const grid = new PIXI.Graphics()
camera.addChild(grid)

// ---------- PARTICLES ----------
const particlesBack = []
const particlesMid = []
const particlesFront = []
const particleGraphics = new PIXI.Graphics()
camera.addChild(particleGraphics)

// ---------- DEPTH PARTICLES ----------
function spawnParticle(){
  return {
    x: Math.random() * app.screen.width,
    y: Math.random() * app.screen.height,
    life: 0
  }
}

// initial fill
for(let i=0;i<20;i++) particlesBack.push(spawnParticle())
for(let i=0;i<30;i++) particlesMid.push(spawnParticle())
for(let i=0;i<40;i++) particlesFront.push(spawnParticle())

let gridOffsetX = 0
let gridOffsetY = 0





// ---------- GRAPH ----------
const line = new PIXI.Graphics()
const glow = new PIXI.Graphics()
const area = new PIXI.Graphics()

camera.addChild(area)
camera.addChild(glow)
camera.addChild(line)


// ---------- PLANE ----------
const planeTexture = PIXI.Texture.from("https://i.ibb.co/Y7PRfv0N/plane.png")
const plane = new PIXI.Sprite(planeTexture)

plane.anchor.set(0.5, 0.5)

const s = Math.min(app.screen.width / 450, 1.5);
plane.scale.set(s);

camera.addChild(plane)

// ---------- BLAST ----------
const blastTexture = PIXI.Texture.from("https://i.ibb.co/BKdVTvxj/blast.png")
const blast = new PIXI.Sprite(blastTexture)
blast.anchor.set(0.5)
blast.width = 100
blast.height = 100
blast.visible = false
camera.addChild(blast)

// ---------- TEXT ----------
const text = new PIXI.Text("1.00x",{
  fill:"#ffffff",
  fontSize:48,
  fontWeight:"bold",
  dropShadow:true,
  dropShadowColor:"#ff4d6d",
  dropShadowBlur:20,
  dropShadowDistance:0
})
text.anchor.set(0.5)
text.x = app.screen.width/2
text.y = 60 + Math.sin(Date.now()*0.005) * 3  // multiplier er lyka upore nice
app.stage.addChild(text)

const resultText = new PIXI.Text("",{
fill:"#f0f7faff",
fontSize:26,
fontWeight:"bold"
})
resultText.anchor.set(0.5)
resultText.x = app.screen.width/2
resultText.y = 100
resultText.visible = false
app.stage.addChild(resultText)




// ---------- CRASH OVERLAY ----------
const crashOverlay = new PIXI.Container()
crashOverlay.visible = false
app.stage.addChild(crashOverlay)

// dark background
const overlayBg = new PIXI.Graphics()
overlayBg.beginFill(0x000000, 0.85)
overlayBg.drawRect(0, 0, app.screen.width, app.screen.height)
overlayBg.endFill()
crashOverlay.addChild(overlayBg)

// FLEW AWAY text
const flewText = new PIXI.Text("FLEW AWAY!", {
  fill: "#faf5f5ff",
  fontSize: 32,
  fontWeight: "bold",
  // 🔥 GLOW EFFECT
  dropShadow: true,
  dropShadowColor: "#ffffff",
  dropShadowBlur: 25,
  dropShadowDistance: 0
})
flewText.anchor.set(0.5)
flewText.x = app.screen.width / 2
flewText.y = app.screen.height / 2 - 20
crashOverlay.addChild(flewText)

// crash multiplier text
const crashValueText = new PIXI.Text("", {
  fill: "#ff1717ff",
  fontSize: 40,              // 🔥 একটু বড় করলাম
  fontWeight: "900",         // 🔥 extra bold
  stroke: "#000000",         // 🔥 outline
  strokeThickness: 2          // 🔥 thickness
})
crashValueText.anchor.set(0.5)
crashValueText.x = app.screen.width / 2
crashValueText.y = app.screen.height / 2 + 25
crashOverlay.addChild(crashValueText)




const loseText = new PIXI.Text("", {
  fill: "#ff1d1dff",
  fontSize: 22,
  fontWeight: "bold",
});
loseText.anchor.set(0.5);
loseText.x = app.screen.width / 2;
loseText.y = app.screen.height / 2 + 70;
crashOverlay.addChild(loseText);







// ---------- STATE ----------
let points = []
let planeX = 0
let y = app.screen.height - 40
let startY = y
let multiplier = 1
let phase = "takeoff"
let crashPoint = 2 ;
let crashed = false


let isWaiting = false
let waitTime = 14 //waiting time 
let waitStart = 0


const targetY = 80


function start(){

window.ReactNativeWebView.postMessage(JSON.stringify({
  type: "ROUND_START"
}));

crashOverlay.visible = false

line.alpha = 1
area.alpha = 1
glow.alpha = 1

text.visible = true

text.style.fill = "#ffffff"


  points = []
  planeX = 0
  multiplier = 1
  phase = "takeoff"
  y = startY

 plane.x = app.screen.width * 0.75

// 🔥 keep inside visible area
plane.y = Math.min(targetY, app.screen.height * 0.45)

  crashed = false
 

  plane.visible = true
  blast.visible = false
  resultText.visible = false
}
start()





document.addEventListener("message", (event) => {
  try {
    const data = JSON.parse(event.data);

    if(data.type === "SET_CRASH"){
      crashPoint = data.value;
    }

    if (data.type === "LOSE_MESSAGE") {
      loseText.text = data.text;
    }

    if (data.type === "CLEAR_LOSE") {
      loseText.text = "";
    }

  } catch (e) {}
});






app.ticker.add(()=>{

// ⏳ WAITING SYSTEM
if(isWaiting){

  let now = Date.now()
  let elapsed = (now - waitStart) / 1000

  let remaining = Math.max(0, waitTime - elapsed)

if(crashOverlay.visible){
  const glowPulse = Math.sin(Date.now() * 0.008) * 10 + 25
  flewText.style.dropShadowBlur = glowPulse
}

  if(elapsed >= waitTime){
    isWaiting = false
    start()
  }

  return
}




// ---------- CAMERA ZOOM ----------
let zoom = 1 + Math.log(multiplier) * 0.010
zoom = Math.min(zoom, 1.3)   // 🔥 clamp hard

// 🔥 ONLY during cruise (plane top এ গেলে)
if(phase === "cruise" && !crashed){

  let pulse = Math.sin(Date.now() * 0.007) * 0.02
  zoom += pulse

}

camera.scale.set(zoom)




// keep center
camera.x = -(app.screen.width * (zoom - 1)) / 2
camera.y = -(app.screen.height * (zoom - 1)) / 2

  app.stage.x = 0
  app.stage.y = 0

if(crashed) return

line.clear()
glow.clear()
area.clear()




// ---------- TAKEOFF ----------
if(phase === "takeoff"){

  let targetX = app.screen.width * 0.75
  let progress = planeX / targetX

  // smooth slow start
  let speed = 0.35 + (1 - progress) * 0.5
  planeX += speed

  // REAL curve (aviator style)
  let curve = 1 - Math.cos(progress * Math.PI / 2)
  curve = Math.pow(curve, 1.4)

  y = startY - curve * (startY - targetY)


  if(points.length === 0){
    points.push({ x: 0, y: startY })
    return
  }
 // ❌ NO wave here
  points.push({x:planeX, y: y})

  plane.x = planeX
  plane.y = y

  const margin = 2;

plane.x = Math.max(margin, Math.min(app.screen.width - margin, plane.x));
plane.y = Math.max(margin, Math.min(app.screen.height - margin, plane.y));

let targetRotation = -0.05 + Math.pow(progress, 1.5) * 0.25

// smooth interpolation (VERY IMPORTANT)
plane.rotation += (targetRotation - plane.rotation) * 0.1

  if(planeX >= targetX){
    planeX = targetX
    lastY = y
    phase = "cruise"
  }
}




// ---------- CRUISE ----------
else {

  let t = multiplier - 1

  // curve থাকবে same
  let curve = Math.pow(t, 1.4)

  // 👉 target position (but not directly applied)
  let targetY = lastY - curve * 5

  // 🔥 HARD LIMIT (plane বেশি উপরে যাবে না)
  targetY = Math.max(60, targetY)

  // 🔥 SMOOTH FOLLOW (MAIN FIX)
   y += (targetY - y) * 0.900

  points.push({ x: plane.x, y: y })
  plane.y = y

  // rotation same
  let targetRotation = -0.2 + Math.min(0.30, Math.pow(t, 0.5) * 0.2)
  plane.rotation += (targetRotation - plane.rotation) * 0.04
}






// ---------- GRID ----------
grid.clear()

gridOffsetX -= 1 + multiplier * 0.5
gridOffsetY += 5 + Math.pow(multiplier,1.5)*1.5

grid.lineStyle(1,0x1f2937)

for(let i=-40;i<app.screen.width;i+=40){
let xPos = i + (gridOffsetX % 40)
grid.moveTo(xPos,0)
grid.lineTo(app.screen.width,app.screen.height)
}

for(let j=-40;j<app.screen.height;j+=40){
let yPos = j + (gridOffsetY % 40)
grid.moveTo(0,yPos)
grid.lineTo(app.screen.width,yPos)
}




// ---------- PARTICLES (REAL STYLE) ----------
particleGraphics.clear()
function drawLayer(arr, speed, size, alphaBase, layerType){

  arr.forEach((p,i)=>{

   p.y += speed * (1 + multiplier * 0.2)

if(layerType === "back"){
  p.x += speed * 0.2
}else if(layerType === "mid"){
  p.x += speed * 0.4
}else{
  p.x += speed * 0.6
}
    p.life++
    p.x += Math.sin(p.life * 0.05) * 0.3

    let alpha = alphaBase * (1 - p.life/100)

    particleGraphics.beginFill(0xffffff, alpha)
    particleGraphics.drawCircle(p.x, p.y, size)
    particleGraphics.endFill()
    if(p.life > 100){
      arr[i] = spawnParticle()
    }
  })

}



// draw layers (depth effect)
drawLayer(particlesBack, 0.3, 1, 0.2, "back")
drawLayer(particlesMid, 0.6, 1.5, 0.3, "mid")
drawLayer(particlesFront, 1.2, 2, 0.5, "front")



// ---------- DRAW GRAPH ----------
if(points.length > 1){

glow.lineStyle(10,0xff3b30,0.2)
glow.moveTo(points[0].x,points[0].y)
points.forEach(p=>glow.lineTo(p.x,p.y))

line.lineStyle(3,0xff3b30)
line.moveTo(points[0].x,points[0].y)
points.forEach(p=>line.lineTo(p.x,p.y))

area.beginFill(0xff1f1f, 0.45)  // ray er colour
area.moveTo(points[0].x,points[0].y)
points.forEach(p=>area.lineTo(p.x,p.y))
area.lineTo(points[points.length-1].x,app.screen.height)
area.lineTo(points[0].x,app.screen.height)
area.endFill()
}



// ---------- MULTIPLIER ----------
let growth = 1.002 + Math.pow(multiplier, 1.2) * 0.00015

multiplier *= growth

// 🔥 SEND CONTINUOUSLY
window.ReactNativeWebView.postMessage(JSON.stringify({
  type: "MULTIPLIER",
  value: multiplier
}));



text.text = multiplier.toFixed(2) + "x"






// ---------- CRASH ----------
if(multiplier >= crashPoint){

window.ReactNativeWebView.postMessage(JSON.stringify({
  type: "CRASH",
  crashPoint: crashPoint
}));

crashed = true

text.text = crashPoint.toFixed(2)+"x"


isWaiting = true
waitStart = Date.now()

text.style.fill = "#ff3b30"

blast.x = plane.x
blast.y = plane.y
blast.visible = true

plane.visible = false

// show overlay
crashOverlay.visible = true
crashValueText.text = crashPoint.toFixed(2) + "x"
loseText.text = ""   // default empty



// hide normal UI
plane.visible = false
blast.visible = true
text.visible = false
line.alpha = 0.3
area.alpha = 0.2

return

}

})

})()

</script>

</body>
</html>
`

return (
<View style={{height:240, borderRadius:20, overflow:"hidden"}}>
<WebView
ref={webRef}
  originWhitelist={['*']}
  source={{ html: html}}
  javaScriptEnabled={true}
  domStorageEnabled={true}
  mixedContentMode="always"
  allowFileAccess={true}
  allowUniversalAccessFromFileURLs={true}
  scrollEnabled={false}
   style={{ backgroundColor: 'transparent' }}   // 🔥 important

   onMessage={(event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);

      if (onMessage) {
        onMessage(event);   // 🔥 send to parent
      }

    } catch (e) {}
  }}
/>
</View>
);
}