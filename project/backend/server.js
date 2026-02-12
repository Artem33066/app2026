const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { WebSocketServer } = require("ws");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 3000;

// ======= FAKE DATABASE =======

let users = [];
let boards = [
  { id: 1, name: "Демо доска", likes: 2, objects: [] }
];

// ======= AUTH =======

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({ error: "Заполните все поля" });
  }

  users.push({ id: Date.now(), email, name, password });

  res.json({ ok: true });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) return res.status(401).json({ error: "Неверные данные" });

  res.json({ token: "demo-token-" + user.id });
});

// ======= BOARDS =======

app.get("/boards", (req, res) => {
  res.json(boards);
});

app.post("/boards", (req, res) => {
  const id = boards.length + 1;
  boards.push({ id, name: "Новая доска " + id, likes: 0, objects: [] });
  res.json({ ok: true });
});

// ======= SERVER =======

const server = app.listen(PORT, () => {
  console.log("REST API: http://localhost:" + PORT);
});

// ======= WEBSOCKET =======

const wss = new WebSocketServer({ server });

wss.on("connection", ws => {
  ws.send(JSON.stringify(boards[0].objects));

  ws.on("message", msg => {
    const obj = JSON.parse(msg);

    boards[0].objects.push(obj);

    wss.clients.forEach(client => {
      if (client.readyState === 1) {
        client.send(JSON.stringify(boards[0].objects));
      }
    });
  });
});
