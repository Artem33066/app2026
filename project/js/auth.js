function showLogin() {
  app.innerHTML = `
    <div class="card">
      <h2>Вход</h2>
      <input id="email" placeholder="Email">
      <input id="pass" type="password" placeholder="Пароль">
      <button onclick="login()">Войти</button>
      <a href="#/register">Регистрация</a>
    </div>
  `;
}

function showRegister() {
  app.innerHTML = `
    <div class="card">
      <h2>Регистрация</h2>
      <input id="email" placeholder="Email">
      <input id="name" placeholder="Имя">
      <input id="pass" type="password" placeholder="Пароль">
      <button onclick="register()">Создать</button>
      <a href="#/login">Вход</a>
    </div>
  `;
}
