//All code related to authentication of our users
//NOTE: Do we need await?
export async function signUp(email, password) {
  const response = await fetch("http://localhost:3000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
  });
  console.log(response);
  return response;
}

export async function login(username, password) {
  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const jsonResponse = await response.json();

  console.log(jsonResponse);

  return jsonResponse;
}

export async function logout() {
  //Do something
}

//A function, to retrieve the stored user infromation
export function userAuthValidation() {
  const token = localStorage.getItem("token");
  return token;
}
