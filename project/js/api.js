const API = "http://localhost:3000";

async function api(url, method = "GET", body) {
  const token = localStorage.getItem("token");

  const res = await fetch(API + url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token || ""
    },
    body: body ? JSON.stringify(body) : null
  });

  return res.json();
}
