function draw() {
   var canvas = document.getElementById("gocanvas")
   var ctx = canvas.getContext("2d")
   
   ctx.fillStyle = "orange"
   ctx.fillRect (10, 10, 55, 50)

   ctx.fillStyle = "purple"
   ctx.fillRect(30, 30, 55, 50)
}
