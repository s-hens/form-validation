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
    } else return;
}