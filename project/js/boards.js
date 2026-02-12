async function showBoards() {
  app.innerHTML = `
    <h2>Публичные доски</h2>
    <button onclick="createBoard()">Создать доску</button>
    <div id="boards"></div>
  `;

  const boards = await api("/boards");
  boardsDiv.innerHTML = boards.map(b => `
    <div class="card">
      <b>${b.name}</b>
      ❤️ ${b.likes}
      <button onclick="openBoard(${b.id})">Открыть</button>
    </div>
  `).join("");
}

function openBoard(id) {
  location.hash = "#/board?id=" + id;
}
