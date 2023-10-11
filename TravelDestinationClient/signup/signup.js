import { signUp } from "../api/auth-proxy.js";

export async function createSignup(data) {
  try {
    const response = await signUp(data.get("email"), data.get("password"));

    console.log(response);

    localStorage.setItem("token", JSON.stringify(response.token));
    console.log(localStorage.getItem("token"));

    //We are redirectiong to index page
    //window.location.href = "../index.html";
  } catch (error) {
    console.log("error happened: ", error);
  }
}
