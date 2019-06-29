function init() {
	var websocket = conn();
  var mousedown = false;
  var prevX;
  var prevY;

  var canvas = document.getElementById('canvas');

  canvas.addEventListener("mousemove", function (e) {
    currX = e.offsetX;
    currY = e.offsetY;
    if (mousedown) {
			if (!prevX) {
				prevX = currX;
				prevY = currY;
			}
			websocket.send(JSON.stringify({
				prevX: prevX,
				prevY: prevY,
				currX: currX,
				currY: currY
			}));
      draw(prevX, prevY, currX, currY);
    }
    prevX = currX;
    prevY = currY;
  });
  canvas.addEventListener("mousedown", function (e) {
    mousedown = true;
  });
  canvas.addEventListener("mouseup", function (e) {
    mousedown = false
  });

	
}

function draw(prevX, prevY, currX, currY) {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(currX, currY);
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();
}

var conn = function webSockets() {
  var websocket = new WebSocket("ws://drawinggame1.herokuapp.com:5001", "protocolOne");
  return websocket;
}