var emailValidForm,
  passwordValidForm,
  pseudoValidForm,
  emailValidForm = (passwordValidForm = pseudoValidForm = 0);

function validatorEmail() {
  let inputEmail = document.getElementById("inputEmail");
  let inputEmailValue = document.getElementById("inputEmail").value;

  let paternEmail = /^[^ ]+@+[^ ]+\.[a-z]{2,10}$/;

  if (inputEmailValue.match(paternEmail)) {
    inputEmail.classList.add("validAdressEmail");
    inputEmail.classList.remove("inValidAdressEmail");
    emailValidForm = 1;
  } else {
    inputEmail.classList.add("inValidAdressEmail");
    inputEmail.classList.remove("validAdressEmail");
    emailValidForm = 0;
  }
  validatorForm();
}

function validatorpassword() {
  let inputPassword = document.getElementById("inputPassword");
  let inputPasswordValue = document.getElementById("inputPassword").value;
  let inputPasswordList = inputPasswordValue.split("");

  if (inputPasswordList.length >= 8 && inputPasswordList.length < 32) {
    inputPassword.classList.add("validPassword");
    inputPassword.classList.remove("inValidPassword");
    passwordValidForm = 1;
  } else {
    inputPassword.classList.add("inValidPassword");
    inputPassword.classList.remove("validPassword");
    passwordValidForm = 0;
  }
  validatorForm();
}

function validatorpseudo() {
  let inputPseudo = document.getElementById("inputPseudo");
  let inputPseudoValue = document.getElementById("inputPseudo").value;

  if (inputPseudoValue.length >= 2 && inputPseudoValue.length < 40) {
    inputPseudo.classList.add("validPseudo");
    inputPseudo.classList.remove("invalidPseudo");
    pseudoValidForm = 1;
  } else {
    inputPseudo.classList.add("invalidPseudo");
    inputPseudo.classList.remove("validPseudo");
    pseudoValidForm = 0;
  }
  validatorForm();
}

function validatorForm() {
  let inputForm = document.getElementById("inputSubmit");

  if (passwordValidForm == 1 && emailValidForm == 1 && pseudoValidForm == 1) {
    inputForm.classList.add("validForm");
    inputForm.classList.remove("inValidForm");
  } else {
    inputForm.classList.add("inValidForm");
    inputForm.classList.remove("validForm");
  }
}

function sendData() {
  let inputEmailValue = document.getElementById("inputEmail").value;
  let inputPasswordValue = document.getElementById("inputPassword").value;
  let inputPseudoValue = document.getElementById("inputPseudo").value;
  let inputColorValue = document.getElementById("inputColor").value;
  let statusInput = document.getElementById("inputJordan").checked;

  if (statusInput) statusInput = "Jordan";
  else statusInput = "Admin";

  axios
    .post("http://localhost:1337/api/user/test", {
      pseudo: inputPseudoValue,
      email: inputEmailValue,
      password: inputPasswordValue,
      colorAdmin: inputColorValue,
      status: statusInput,
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err.response.data));
}
