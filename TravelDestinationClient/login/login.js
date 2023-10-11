import { login } from "../api/auth-proxy.js";

const form = document.querySelector("#loginForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  //Get the data from the form
  const data = new FormData(form);
  //console.log(data.get("email"), data.get("password"));

  loginUser(data);
});

export async function loginUser(data) {
  //console.log(data.get("email"));
  try {
    const response = await login(data.get("email"), data.get("password"));
    console.log(response);

    localStorage.setItem("token", response.token);
    console.log(localStorage.getItem("token"));

    //We are redirectiong to index page
    //window.location.href = "../index.html";
  } catch (error) {
    console.log("error happened: ", error);
  }
}
