let ws, objects = [];

function showBoard() {
  app.innerHTML = `
    <div class="toolbar">
      <button onclick="addRect()">⬛</button>
      <button onclick="addCircle()">⚪</button>
      <button onclick="addText()">T</button>
    </div>
    <canvas id="canvas" width="1600" height="900"></canvas>
  `;

  initWS();
}

function initWS() {
  ws = new WebSocket("ws://localhost:3000");

  ws.onmessage = e => {
    objects = JSON.parse(e.data);
    draw();
  };
}

function draw() {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0,0,1600,900);
  objects.forEach(o => {
    if(o.type==="rect") ctx.fillRect(o.x,o.y,o.w,o.h);
  });
}

function addRect() {
  ws.send(JSON.stringify({type:"rect",x:100,y:100,w:120,h:70}));
}
