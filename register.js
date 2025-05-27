document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let age = parseInt(document.getElementById("age").value);
    let genderChecked = document.querySelector("input[name='gender']:checked");

    if (name === "") {
        alert("Name cannot be empty.");
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        alert("Email must contain '@' and '.'.");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
    }

    if (isNaN(age) || age < 17) {
        alert("Age must be more than 17.");
        return;
    }

    if (!genderChecked) {
        alert("Please select your gender.");
        return;
    }

    alert("Registration successful!");
    this.reset();
    });
