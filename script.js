//--------------------//
// Show/hide password //
//--------------------//

document.querySelectorAll(".visibility").forEach(button => {
    button.addEventListener("click", togglePasswordVisibility);
})

function togglePasswordVisibility() {
    if (this.previousElementSibling.getAttribute("type") == "password") {
        this.previousElementSibling.setAttribute("type", "text");
        this.innerText = "visibility";
    } else if (this.previousElementSibling.getAttribute("type") == "text") {
        this.previousElementSibling.setAttribute("type", "password");
        this.innerText = "visibility_off";
    }
}

//-----------------//
// Validate inputs //
//-----------------//

// Country
const country = document.getElementById("country");
const countryError = document.querySelector(".country-error");

country.addEventListener("change", validateCountry);
country.addEventListener("input", validateCountry);
country.addEventListener("focusout", validateCountry);

function validateCountry() {
    if (country.validity.valueMissing) {
        countryError.innerText = "Please select your country.";
        country.classList.add("invalid");
    } else if (!country.validity.valueMissing) {
        countryError.innerText = "";
        country.classList.remove("invalid");
    }
}

// Postcode
const postcode = document.getElementById("postcode");
const postcodeError = document.querySelector(".postcode-error");

postcode.addEventListener("change", validatePostcode);
postcode.addEventListener("input", validatePostcode);
postcode.addEventListener("focusout", validatePostcode);

function validatePostcode(e) {
    if (e.type == "change" && postcode.validity.patternMismatch ||
        e.type == "focusout" && postcode.validity.valueMissing) {
        postcodeError.innerText = "Please enter a valid UK postcode. Example: SW1A 1AA";
        postcode.classList.add("invalid");
    } else if (e.type == "input" && !postcode.validity.patternMismatch) {
        postcodeError.innerText = "";
        postcode.classList.remove("invalid");
    }
}

// Email
const email = document.getElementById("email");
const emailError = document.querySelector(".email-error");

email.addEventListener("change", validateEmail);
email.addEventListener("input", validateEmail);
email.addEventListener("focusout", validateEmail);

function validateEmail(e) {
    if (e.type == "change" && email.validity.typeMismatch ||
        e.type == "focusout" && email.validity.valueMissing) {
        emailError.innerText = "Please enter an email address.";
        email.classList.add("invalid");
    } else if (e.type == "input" && !email.validity.typeMismatch) {
        emailError.innerText = "";
        email.classList.remove("invalid");
    }
}

// Password
const password = document.getElementById("password");
const passwordErrorLength = document.querySelector(".length");
const passwordErrorUppercase = document.querySelector(".uppercase");
const passwordErrorLowercase = document.querySelector(".lowercase");
const passwordErrorNumber = document.querySelector(".number");

const regexUppercase = /[A-Z]/;
const regexLowercase = /[a-z]/;
const regexNumber = /\d/;

password.addEventListener("change", validatePassword);
password.addEventListener("input", validatePassword);
password.addEventListener("focusout", validatePassword);

function validatePassword(e) {
    if (e.type == "change" || e.type == "focusout") {
        if (password.validity.tooLong ||
            password.validity.tooShort ||
            password.validity.valueMissing) { // Not 8-20 chars
            passwordErrorLength.classList.add("error");
            password.classList.add("invalid");
        }
        if (regexUppercase.test(password.value) == false) { // Does not contain >0 uppercase letter(s)
            passwordErrorUppercase.classList.add("error");
            password.classList.add("invalid");
        }
        if (regexLowercase.test(password.value) == false) { // Does not contain >0 lowercase letter(s)
            passwordErrorLowercase.classList.add("error");
            password.classList.add("invalid");
        }
        if (regexNumber.test(password.value) == false) { // Does not contain >0 number(s)
            passwordErrorNumber.classList.add("error");
            password.classList.add("invalid");
        }
    } else if (e.type == "input") {
        if (!password.validity.tooLong && !password.validity.tooShort) { // 8-20 chars
            passwordErrorLength.classList.remove("error");
        }
        if (regexUppercase.test(password.value) == true) { // Contains >0 uppercase letter(s)
            passwordErrorUppercase.classList.remove("error");
        }
        if (regexLowercase.test(password.value) == true) { // Contains >0 lowercase letter(s)
            passwordErrorLowercase.classList.remove("error");
        }
        if (regexNumber.test(password.value) == true) { // Contains >0 number(s)
            passwordErrorNumber.classList.remove("error");
        }
        if (password.validity.valid) { // Complete match
            password.classList.remove("invalid");
        }
    }
}

// Confirm password
const confirmPassword = document.getElementById("confirm-password");
const confirmPasswordError = document.querySelector(".confirm-password-error");

confirmPassword.addEventListener("change", matchPasswords);
confirmPassword.addEventListener("input", matchPasswords);
confirmPassword.addEventListener("focusout", matchPasswords);
password.addEventListener("change", matchPasswords);
password.addEventListener("input", matchPasswords);
password.addEventListener("focusout", matchPasswords);

function matchPasswords(e) {
    if (e.target.id == "confirm-password" ||
        e.target.id == "password" && confirmPassword.value) {
        if (e.type == "change" && confirmPassword.value != password.value ||
        e.type == "focusout" && confirmPassword.value != password.value) {
        confirmPasswordError.innerText = "Passwords must match.";
        confirmPassword.classList.add("invalid");
        } else if (e.type == "input" && confirmPassword.value == password.value) {
            confirmPasswordError.innerText = "";
            confirmPassword.classList.remove("invalid");
        }
    }
}