// register user
function userRegister() {
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirm_password = document.getElementById('confirm-password').value;

    if (accounts.some(account => account.email === email)) {
        alert('Email already exists!');
        return;
    }
    if (password !== confirm_password) {
        alert('Password and confirm password do not match!');
        return;
    }
    else {
        const account = {
            name: name,
            email: email,
            password: password,
            role: role
        };

        // localStorage.setItem(role, JSON.stringify(account));
        accounts.push(account);
        localStorage.setItem("accounts", JSON.stringify(accounts));

        alert(role + ' registered successfully!');
        window.location.href = '/view/signUp/login.html';
    } 
}
var role;
function toggleUserType(type){
    const heading = document.getElementById('user-heading');

    heading.innerHTML = type + " Registration";
    role = type;
}

window.onload = toggleUserType("User");