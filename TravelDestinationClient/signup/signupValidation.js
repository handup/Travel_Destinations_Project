import { createSignup } from "./signup.js";

const form = document.querySelector("#signupForm");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirm-password");

//FORM VALIDATION
//validity states
let emailDomain;
let passwordCriteria;
let matchingPasswords;

//for error messages
const emailErrorMessage = document.querySelector("#email + .error-message");
const passwordErrorMessage = document.querySelector("#password + .error-message");
const confirmPasswordErrorMessage = document.querySelector("#confirm-password + .error-message");

// Function to show the error message
function showError(inputElement, errorMessageElement) {
  errorMessageElement.style.display = "block";
}

// Function to hide the error message
function hideError(errorMessageElement) {
  errorMessageElement.style.display = "none";
}

//Email validity
emailInput.addEventListener("blur", () => {
  const emailValue = emailInput.value;

  document.querySelector(".button-error").style.display = "none";

  //The email should be a Cph business email.
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(emailValue)) {
    //Email valid. Procees to test if it's from the right domain (Second argument is to check that the string ENDS with this domain, and that it doesn't just contain it)
    if (emailValue.indexOf("@cphbusiness.dk", emailValue.length - "@cphbusiness.dk".length) !== -1) {
      //VALID
      console.log("email is valid");
      hideError(emailErrorMessage);
      emailDomain = "valid";
    } else {
      console.log("email is not valid");
      showError(emailInput, emailErrorMessage);
      emailDomain = "invalid";
    }
  }
});

//Password validity
/* The password should:
 - have at least 8 characters
 - have a combination of uppercase letters, lowercase letters, and numbers
  */
// Function to check if the password meets the criteria
function isValidPassword(password) {
  // Check if the password has at least 8 characters
  if (password.length < 8) {
    return false;
  }

  // Check if the password contains at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return false;
  }

  // Check if the password contains at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return false;
  }

  // Check if the password contains at least one number
  if (!/\d/.test(password)) {
    return false;
  }

  return true;
}

passwordInput.addEventListener("blur", function () {
  const password = passwordInput.value;

  document.querySelector(".button-error").style.display = "none";

  if (isValidPassword(password)) {
    // Password is valid, hide the error message
    console.log("password is valid");
    hideError(passwordErrorMessage);
    passwordCriteria = "valid";
  } else {
    // Password is invalid, show the error message
    console.log("password is invalid");
    showError(passwordInput, passwordErrorMessage);
    passwordCriteria = "invalid";
  }
});

//Confirm password validity

confirmPasswordInput.addEventListener("blur", function () {
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  document.querySelector(".button-error").style.display = "none";

  if (password !== confirmPassword) {
    //Confirm password is invalid, show the error message
    console.log("confirm password is invalid");
    showError(confirmPasswordInput, confirmPasswordErrorMessage);
    matchingPasswords = "invalid";
  } else {
    //Confirm password is valid, hide the error message
    console.log("confirm password is valid");
    hideError(confirmPasswordErrorMessage);
    matchingPasswords = "valid";
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  //Get the data from the form
  const data = new FormData(form);
  console.log(form);
  console.log(data.get("email"), data.get("password"), data.get("confirm-password"));

  //validate form
  validateForm(data);
});

function validateForm(data) {
  console.log(emailDomain, passwordCriteria, matchingPasswords);

  if (emailDomain === "valid" && passwordCriteria === "valid" && matchingPasswords === "valid") {
    console.log("everything is valid");
    console.log(data);
    createSignup(data);
  } else {
    console.log("something is not valid");
    document.querySelector(".button-error").style.display = "block";
  }
}
