function validateAge(dob) {
  const currentDate = new Date();
  const age = currentDate.getFullYear() - dob.getFullYear();
  return age >= 18;
}

function validatePassword(password) {
  let hasUpperCase = false;
  let hasLowerCase = false;
  let hasNumber = false;
  let hasSymbol = false;

  for (let i = 0; i < password.length; i++) {
    let character = password.charAt(i);
    if (character >= "A" && character <= "Z") {
      hasUpperCase = true;
    } else if (character >= "a" && character <= "z") {
      hasLowerCase = true;
    } else if (character >= "0" && character <= "9") {
      hasNumber = true;
    } else {
      hasSymbol = true;
    }
  }

  return hasUpperCase && hasLowerCase && hasNumber && hasSymbol;
}

function addErrorMessage(element, message) {
  element.innerHTML = message;
}

const form = document.getElementById("form");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const dob = document.getElementById("dob");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const errors = new Array(6);

const registeredEmails =
  JSON.parse(localStorage.getItem("registeredEmails")) || [];

firstName.addEventListener("change", () => {
  const fnValue = firstName.value.trim();
  const fnError = document.getElementById("firstName-error");
  if (!fnValue) {
    addErrorMessage(fnError, "First Name can not be empty");
    errors[0] = true;
    return;
  }
  errors[0] = false;
  addErrorMessage(fnError, "");
});

lastName.addEventListener("change", () => {
  const lnValue = lastName.value.trim();
  const lnError = document.getElementById("lastName-error");
  if (!lnValue) {
    addErrorMessage(lnError, "Last Name can not be empty");
    errors[1] = true;
    return;
  }
  errors[1] = false;
  addErrorMessage(lnError, "");
});

email.addEventListener("input", () => {
  const emailValue = email.value.trim();
  const emailError = document.getElementById("email-error");
  if (!emailValue) {
    addErrorMessage(emailError, "email can not be empty");
    errors[2] = true;
    return;
  }
  if (registeredEmails.includes(emailValue)) {
    addErrorMessage(emailError, "email already registered");
    errors[2] = true;
    return;
  }
  errors[2] = false;
  addErrorMessage(emailError, "");
});

dob.addEventListener("change", () => {
  const dobValue = new Date(dob.value.trim());
  const dobError = document.getElementById("dob-error");
  if (!validateAge(dobValue)) {
    addErrorMessage(dobError, "you must be greater than 18 to sign up");
    errors[3] = true;
    return;
  }
  errors[3] = false;
  addErrorMessage(dobError, "");
});

password.addEventListener("change", () => {
  const passValue = password.value.trim();
  const passError = document.getElementById("password-error");
  if (!passValue) {
    addErrorMessage(passError, "password can not be empty");
    errors[4] = true;
    return;
  }
  if (passValue > 8) {
    addErrorMessage(passError, "password must be of 8 character");
    errors[4] = true;
    return;
  }
  if (!validatePassword(passValue)) {
    addErrorMessage(passError, "Password should contain given character");
    errors[4] = true;
    return;
  }
  errors[4] = false;
  addErrorMessage(passError, "");
});

confirmPassword.addEventListener("change", () => {
  const confirmPasswordValue = confirmPassword.value.trim();
  const confirmPasswordError = document.getElementById("confirmPassword-error");
  if (confirmPasswordValue !== password.value.trim()) {
    addErrorMessage(
      confirmPasswordError,
      "Confirm Password do not match password"
    );
    errors[5] = true;
    return;
  }
  errors[5] = false;
  addErrorMessage(confirmPasswordError, "");
});

form.addEventListener("submit", (e) => {
  if (errors.includes(true)) return;

  document.getElementById("modal-text").innerHTML =
    "you have succesfully registered";
  $("#simpleModal").modal("show");
  registeredEmails.push(email.value.trim());
  localStorage.setItem("registeredEmails", JSON.stringify(registeredEmails));
  e.preventDefault();
});

// Password@11
// password
