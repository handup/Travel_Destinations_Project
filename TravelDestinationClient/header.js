import { userAuthValidation } from "./api/auth-proxy.js";

window.addEventListener("load", async () => {
  const token = userAuthValidation();

  if (token) {
    //console.log("There is a token");
    document.querySelector(".loginButton").classList.add("hidden");
    document.querySelector(".signupButton").classList.add("hidden");
    document.querySelector(".loginStatus").classList.remove("hidden");
  } else {
    //console.log("There is no token");
    document.querySelector(".loginButton").classList.remove("hidden");
    document.querySelector(".signupButton").classList.remove("hidden");
    document.querySelector(".loginStatus").classList.add("hidden");
  }
});
