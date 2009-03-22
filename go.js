function draw() {
    var canvas = document.getElementById("gocanvas")
    var ctx = canvas.getContext("2d")
    
    drawGrid(40,40,15,ctx)
}

function drawGrid(width, height, boxes, canv) {
    for (var i = 1; i <= boxes; i++) {
        for (var j = 1; j <= boxes; j++) {
            canv.strokeRect(i*width, j*height, width, height)
        }
    }
    
}
