import { signUp } from "../api/auth-proxy.js";

export async function createSignup(data) {
  try {
    const response = await signUp(data.get("email"), data.get("password"));

    console.log(response);

    //We are redirectiong to index page
    //window.location.href = "../index.html";
  } catch (error) {
    console.log("error happened: ", error);
  }
}
