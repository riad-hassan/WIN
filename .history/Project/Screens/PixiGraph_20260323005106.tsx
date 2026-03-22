import React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";

export default function PixiGraph({ onMessage, waiting }) {

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
width:380,
height:240,
backgroundColor:0x0f172a,
antialias:true
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



let isWaiting = true;
window.addEventListener("message", (e) => {
  try {
    const data = JSON.parse(e.data);
    if(data.type === "WAITING"){
      isWaiting = data.value;
    }
  } catch(e){}
});



// ---------- GRAPH ----------
const line = new PIXI.Graphics()
const glow = new PIXI.Graphics()
const area = new PIXI.Graphics()

camera.addChild(area)
camera.addChild(glow)
camera.addChild(line)


// ---------- PLANE ----------
const planeTexture = PIXI.Texture.from("https://i.ibb.co/7NV6Nh3v/plane.png")
const plane = new PIXI.Sprite(planeTexture)
plane.anchor.set(0.5)
plane.width = 90
plane.height = 54
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
fontSize:40,
fontWeight:"bold"
})
text.anchor.set(0.5)
text.x = app.screen.width/2
text.y = 40
app.stage.addChild(text)

const resultText = new PIXI.Text("",{
fill:"#4cc9ff",
fontSize:24,
fontWeight:"bold"
})
resultText.anchor.set(0.5)
resultText.x = app.screen.width/2
resultText.y = 80
resultText.visible = false
app.stage.addChild(resultText)

// ---------- STATE ----------
let points = []
let planeX = 0
let y = app.screen.height - 40
let startY = y
let multiplier = 1
let phase = "takeoff"

let crashPoint = 2 + Math.random()*20
let crashed = false

const targetY = 80

function start(){
  points = []
  planeX = 0
  multiplier = 1
  phase = "takeoff"
  y = startY

  plane.x = app.screen.width * 0.75

// 🔥 keep inside visible area
plane.y = Math.min(targetY, app.screen.height * 0.45)

  crashed = false
  crashPoint = 1.5 + Math.random()*20

  plane.visible = true
  blast.visible = false
  resultText.visible = false
}
start()



app.ticker.add(()=>{

if(window.isWaiting){
  return; // ⛔ game pause
}
  

// ---------- CAMERA ZOOM ----------
let zoom = 1 + Math.log(multiplier) * 0.015   // 🔥 reduced zoom

// clamp zoom so it never goes too big
zoom = Math.min(zoom, 2.2)

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
// ---------- TAKEOFF ----------
if(phase === "takeoff"){

  let targetX = app.screen.width * 0.75
  let progress = planeX / targetX

  let speed = 0.8 + (1 - progress) * 1.2
  planeX += speed

  let curve = Math.pow(progress, 1.6)
  let nextY = startY - curve * (startY - targetY)
  y = nextY

  if(points.length === 0){
    points.push({ x: 0, y: startY })
    return
  }

  // ❌ NO wave here
  points.push({x:planeX, y: y})

  plane.x = planeX
  plane.y = y
  plane.rotation = -0.05 + multiplier * 0.003

  if(planeX >= targetX){
    planeX = targetX
    y = targetY
    phase = "cruise"
  }
}


// ---------- CRUISE ----------
else{

  const speed = 0.6 + Math.pow(multiplier,1.2)*0.05

  

  // ❗ clamp (so it doesn't go outside bottom)
  if(points.length > 0 && points[0].y > app.screen.height){
    points.shift()
  }

  // ✅ plane stays FIXED
  plane.x = app.screen.width * 0.75
  plane.y = targetY
}

// limit points
if(points.length > 120){
  points.splice(1,1)   // 🔥 index 0 বাদ দিয়ে 1 নম্বর থেকে remove
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

area.beginFill(0x4cc9ff,0.1)
area.moveTo(points[0].x,points[0].y)
points.forEach(p=>area.lineTo(p.x,p.y))
area.lineTo(points[points.length-1].x,app.screen.height)
area.lineTo(points[0].x,app.screen.height)
area.endFill()
}



// ---------- MULTIPLIER ----------
let baseSpeed = 0.002
let acceleration = 0.0005 * multiplier

multiplier += baseSpeed + acceleration
text.text = multiplier.toFixed(2)+"x"




// ---------- CRASH ----------
if(multiplier >= crashPoint){

window.ReactNativeWebView.postMessage(JSON.stringify({
  type: "CRASH",
  crashPoint: crashPoint
}));

crashed = true

text.text = crashPoint.toFixed(2)+"x"


window.ReactNativeWebView.postMessage(JSON.stringify({
  type: "MULTIPLIER",
  value: multiplier
}));


text.style.fill = "#ff3b30"

blast.x = plane.x
blast.y = plane.y
blast.visible = true

plane.visible = false

resultText.text = "FLEW AWAY! " + crashPoint.toFixed(2) + "x"
resultText.visible = true

setTimeout(()=>{
text.style.fill="#ffffff"
start()
},4000)

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
  originWhitelist={['*']}
  source={{ html: html}}
  javaScriptEnabled={true}
  domStorageEnabled={true}
  mixedContentMode="always"
  allowFileAccess={true}
  allowUniversalAccessFromFileURLs={true}
  scrollEnabled={false}
   style={{ backgroundColor: 'transparent' }}   // 🔥 important

  injectedJavaScript={`
    window.isWaiting = ${waiting};
    true;
  `}

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