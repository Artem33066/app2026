function router() {
  console.log("APP START");
  const app = document.getElementById("app");
  const route = location.hash || "#/login";

  if (route.startsWith("#/login")) showLogin();
  if (route.startsWith("#/register")) showRegister();
  if (route.startsWith("#/boards")) showBoards();
  if (route.startsWith("#/board")) showBoard();
}

window.addEventListener("hashchange", router);
router();
