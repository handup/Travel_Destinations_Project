import { signUp } from "../api/auth-proxy.js";

export async function createSignup(data) {
  console.log(data.get("email"));
  try {
    const response = await signUp(data.get("email"), data.get("password"));

    console.log(response);

    /* const body = await response.json();
        console.log(body);
    
        localStorage.setItem("userObject", JSON.stringify(response));
    
        console.log(response); */

    //We are redirectiong to index page
    //window.location.href = "../index.html";
  } catch (error) {
    console.log("error happened: ", error);
  }
}
