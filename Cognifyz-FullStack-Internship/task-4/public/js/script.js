const fullname = document.getElementById("fullname");
const nameError = document.getElementById("nameError");

fullname.addEventListener("keyup", () => {

const regex = /^[A-Za-z ]+$/;  

if(fullname.value === ""){  

    nameError.innerHTML = "";  

}  
else if(!regex.test(fullname.value)){  

    nameError.innerHTML = "Only alphabets are allowed.";  

}  
else{  

    nameError.innerHTML = "";  
}

});

const email = document.getElementById("email");
const emailError = document.getElementById("emailError");

email.addEventListener("keyup", () => {

const regex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;  

if(email.value === ""){  

    emailError.innerHTML = "";  

}  
else if(!regex.test(email.value)){  

    emailError.innerHTML = "Enter a valid email.";  

}  
else{  

    emailError.innerHTML = "";  

}

});

const phone = document.getElementById("phone");
const phoneError = document.getElementById("phoneError");

phone.addEventListener("keyup", () => {

const regex = /^[0-9]{10}$/;  

if(phone.value === ""){  

    phoneError.innerHTML = "";  

}  
else if(!regex.test(phone.value)){  

    phoneError.innerHTML = "Phone number must contain 10 digits.";  

}  
else{  

    phoneError.innerHTML = "";  

}

});

const password = document.getElementById("password");
const strengthMessage = document.getElementById("strengthMessage");

password.addEventListener("keyup", () => {

let pass = password.value;  

if(pass.length < 6){  

    strengthMessage.innerHTML = "Weak Password";  
    strengthMessage.style.color = "red";  

}  

else if(pass.length < 10){  

    strengthMessage.innerHTML = "Medium Password";  
    strengthMessage.style.color = "orange";  

}  

else{  

    strengthMessage.innerHTML = "Strong Password";  
    strengthMessage.style.color = "green";  

}

});

const confirmPassword = document.getElementById("confirmPassword");
const confirmMessage = document.getElementById("confirmMessage");

confirmPassword.addEventListener("keyup", () => {

if(confirmPassword.value === ""){  

    confirmMessage.innerHTML = "";  

}  

else if(password.value !== confirmPassword.value){  

    confirmMessage.innerHTML = "Passwords do not match";  
    confirmMessage.style.color = "red";  

}  

else{  

    confirmMessage.innerHTML = "Passwords matched";  
    confirmMessage.style.color = "green";  

}

});

const showPassword = document.getElementById("showPassword");

showPassword.addEventListener("change", () => {

if(showPassword.checked){  

    password.type = "text";  
    confirmPassword.type = "text";  

}  

else{  

    password.type = "password";  
    confirmPassword.type = "password";  

}

});

document.getElementById("registrationForm").addEventListener("submit", function(e){

if(nameError.innerHTML !== "" ||  
   emailError.innerHTML !== "" ||  
   phoneError.innerHTML !== "" ||  
   confirmMessage.innerHTML === "Passwords do not match"){  

    e.preventDefault();  

    alert("Please correct the errors before submitting.");  

}

});
