var emailValidForm,
  passwordValidForm,
  emailValidForm = (passwordValidForm = 0);

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

function validatorForm() {
  let inputForm = document.getElementById("inputSubmit");

  if (passwordValidForm == 1 && emailValidForm == 1) {
    inputForm.classList.add("validForm");
    inputForm.classList.remove("inValidForm");

    // Mettre le back ici
  } else {
    inputForm.classList.add("inValidForm");
    inputForm.classList.remove("validForm");
  }
}

function Test() {
  let inputEmailValue = document.getElementById("inputEmail").value;
  var inputEmail = document.getElementById("inputEmail");

  let inputPasswordValue = document.getElementById("inputPassword").value;
  var inputPassword = document.getElementById("inputPassword");

  var inputFormValue = document.getElementById("inputSubmit").value;
  var inputForm = document.getElementById("inputSubmit");

  let returnMessage = document.getElementById("inputPassword").value;
  var newPMessageCallback = document.getElementById("OUI");

  if (newPMessageCallback != null) {
    newPMessageCallback.remove();
    inputPassword.style.cssText = null;
    inputEmail.style.cssText = null;
  } else {
    console.log("il n'existe pas");
  }

  console.log(returnMessage);

  new axios.post("http://localhost:1337/api/user/login", {
    email: inputEmailValue,
    password: inputPasswordValue,
  })
    .then((res) => {
      console.log("et oui c'est moi : " + res.data.callBack);
      inputForm.innerHTML = res.data.callBack;
    })
    .catch((err) => {
      let statusRequest = err.response.status;
      console.log(err.response.data.errorMessage);

      if (statusRequest == 404) {
        /* First test if request return error 404 (email not found)*/
        newPMessageCallback = document.createElement("p");

        inputEmail.style.margin = "5% 0 0 0";
        inputEmail.parentNode.insertBefore(
          newPMessageCallback,
          inputEmail.nextSibling
        );

        newPMessageCallback.innerHTML = "* " + err.response.data.errorMessage;
        newPMessageCallback.style.margin = "0px 0 10% 10%";
        newPMessageCallback.style.color = "red";
        newPMessageCallback.id = "OUI";
      } else if (statusRequest == 500) {
        /* Then test if request return error 500 (It's not good password)*/
        newPMessageCallback = document.createElement("p");

        newPMessageCallback.innerHTML = "* " + err.response.data.errorMessage;
        newPMessageCallback.style.margin = "0px 0 10% 10%";
        newPMessageCallback.style.color = "red";
        newPMessageCallback.id = "OUI";

        inputPassword.parentNode.insertBefore(
          newPMessageCallback,
          inputPassword.nextSibling
        );
        inputPassword.style.margin = "5% 0 0 0";
      } else {
        /* And now Error not expected*/
        console.log("Error not expected ... CodeError : THEO-003");
      }
    });
}
