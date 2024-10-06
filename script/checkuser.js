function check() {
    const checkUser = JSON.parse(localStorage.getItem('check'));
    if (checkUser) {
        const user = document.getElementById('user-options');
        user.innerHTML = `
            <span>
                <img src="../Image/image_Index/icon_Header/icon_User.png" onerror="changeimg(this)" alt="icon_User">
            </span>
            <div class="dropdown" style="padding-left: 1em">
            <select id="" style="text-align: center">
                <option value="profile" onclick=window.location.href="/view/profile.html">${checkUser.name}</option>
                <option value="logout" onclick="logout()">Đăng xuất</option>
            </select>
        </div>
            
        `;
    }
}
function logout() {
    localStorage.removeItem('check');
    window.location.href = '/view/signUp/login.html';
}
window.onload = check;

function changeimg(img){
    img.src = '../../Image/image_Index/icon_Header/icon_User.png';
}