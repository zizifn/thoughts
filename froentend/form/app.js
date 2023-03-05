// There are many ways to pick a DOM node; here we get the form itself and the email
// input box, as well as the span element into which we will place the error message.
const form = document.getElementsByTagName("form")[0];

/** @type {HTMLInputElement} */
const email = document.getElementById("mail");
const emailError = document.querySelector("#mail + span.error");

email.addEventListener("blur", (event) => {
  email.reportValidity();
  // showError();
});

email.addEventListener("invalid", (event) => {
  console.log("invalid------------", event);
  email.setCustomValidity("");
  console.log(email.validity.valid);
});
email.addEventListener("input", function (event) {
  // Each time the user types something, we check if the
  // form fields are valid.
  // email.setCustomValidity("");
  console.log(email.validity.valid);
  if (event.target.value.length > 15) {
    console.log(event.target.value.length);
    email.setCustomValidity("error greater than " + event.target.value.length);
    console.log("setCustomValidity", email.validity.valid);
  }
  // if (event.target.value.length > 20) {
  //   email.setCustomValidity("");
  //   console.log("setCustomValidity", email.validity.valid);
  // }

  if (email.validity.valid) {
    email.setAttribute("aria-invalid", false);
    email.setCustomValidity("");

    // In case there is an error message visible, if the field
    // is valid, we remove the error message.
    emailError.innerHTML = ""; // Reset the content of the message
    emailError.className = "error"; // Reset the visual state of the message
  } else {
    // If there is still an error, show the correct error
    email.setAttribute("aria-invalid", true);
    email.setCustomValidity("error less than 8");
    showError();
  }
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  // if the form contains valid data, we let it submit
  // if (!email.validity.valid) {
  //   // If it isn't, we display an appropriate error message
  //   showError();
  //   // Then we prevent the form from being sent by canceling the event
  //   event.preventDefault();
  // }
});

function showError() {
  console.log(email.validity);
  console.log(email.validationMessage);
  // emailError.textContent = email.validationMessage;

  // emailError.textContent = "You need to enter an e-mail address.";
  // if (email.validity.valueMissing) {
  //   // If the field is empty
  //   // display the following error message.
  //   emailError.textContent = "You need to enter an e-mail address.";
  // } else if (email.validity.typeMismatch) {
  //   // If the field doesn't contain an email address
  //   // display the following error message.
  //   emailError.textContent = "Entered value needs to be an e-mail address.";
  // } else if (email.validity.tooShort) {
  //   // If the data is too short
  //   // display the following error message.
  //   emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
  // }

  // Set the styling appropriately
  emailError.className = "error active";
}
