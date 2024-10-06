// login user
function userLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const storeAccounts = JSON.parse(localStorage.getItem('accounts'));

    if (storeAccounts) {
        storeAccounts.forEach(account => {
            if (account.email === email && account.password === password) {
                const name = account.name;
                const check = {
                    name: name,
                    email: email,
                };
                localStorage.setItem('check', JSON.stringify(check));

                alert('Login successfully!');
                if (account.role === "User") {
                    window.location.href = "/view/index.html";
                }
                else if (account.role === "Admin") {
                    window.location.href = "/view/admin/managerProducts.html";
                }
            }
        });
    }
    else {
        alert('Invalid email or password!');
    }
};

// toggle password
function showhidePassword() {
    const password = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    // Toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);

    // Toggle the button text
    this.textContent = type === 'password' ? 'Show' : 'Hide';
}

function check() {
    const storeUser = JSON.parse(localStorage.getItem('user'));
    const user = document.getElementById('user-options');
    user.innerHTML = `<span><img src="../Image/image_Index/icon_Header/icon_User.png" alt="icon_User"></span>
                <span>${storeUser.name}</span>`
}