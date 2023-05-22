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

// Postcode
const postcode = document.getElementById("postcode");
const postcodeError = document.querySelector(".postcode-error");

postcode.addEventListener("change", validatePostcode);
postcode.addEventListener("input", validatePostcode);
postcode.addEventListener("focusout", validatePostcode);

function validatePostcode(e) {
    if (e.type == "change" && postcode.validity.patternMismatch == true ||
        e.type == "focusout" && postcode.validity.valueMissing == true) {
        postcodeError.innerText = "Please enter a valid UK postcode. Example: SW1A 1AA";
        document.getElementById("postcode").classList.add("invalid");
    } else if (e.type == "input" && !postcode.validity.patternMismatch) {
        postcodeError.innerText = "";
        document.getElementById("postcode").classList.remove("invalid");
    }
}
