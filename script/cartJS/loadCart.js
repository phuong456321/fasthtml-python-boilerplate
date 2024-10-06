//Gọi sự kiện laod trang
document.addEventListener("DOMContentLoaded", function () {
    // Lấy giỏ hàng từ localStorage, nếu không có, khởi tạo mảng rỗng
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Lấy các phần tử HTML để hiển thị mặt hàng trong giỏ hàng và tổng số tiền
    const cartItemsDiv = document.querySelector('.cart-items');
    const totalAmountDiv = document.querySelector('.checkout span');

    // Lấy phần tiêu đề của giỏ hàng (cart-header)
    const cartHeader = document.querySelector('.cart-header').outerHTML;

    // Nếu giỏ hàng rỗng, hiển thị thông báo giỏ hàng trống
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = cartHeader + '<p>Giỏ hàng trống!</p>';
        totalAmountDiv.innerHTML = '<p>Hãy thêm sản phẩm vào giỏ hàng</p>';
    } else {
        // Nếu giỏ hàng không rỗng, hiển thị các mặt hàng trong giỏ hàng
        let cartContent = '';  // Khởi tạo biến lưu trữ nội dung của giỏ hàng
        let totalAmount = 0;  // Khởi tạo biến tổng số tiền

        // Duyệt qua từng mặt hàng trong giỏ hàng và tạo nội dung HTML để hiển thị
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;  // Tính tổng số tiền cho mặt hàng này
            cartContent += `
                <div class="cart-item">
                    <div class="select-item">
                        <input type="checkbox" class="item-checkbox" onchange="updateTotalPrice()">
                    </div>
                    <div class="item-info">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="item-title-box">
                            <p class="item-title">${item.name}</p>
                        </div>
                    </div>
                    <div class="item-price">
                        <span class="current-price">${formatCurrency(item.price)}</span>
                    </div>
                    <div class="item-quantity">
                        <input type="number" value="${item.quantity}" class="quantity" onchange="updateqty('${item.name}')">
                        <a href="#" onclick="removeFromCart('${item.id}')">Xóa</a>
                    </div>
                    <div class="item-total">${formatCurrency(itemTotal)}</div>
                </div>
            `;
            totalAmount += itemTotal;  // Cộng tổng số tiền
        });

        // Hiển thị các mặt hàng trong giỏ hàng và giữ phần tiêu đề
        cartItemsDiv.innerHTML = cartHeader + cartContent;

        // Hiển thị tổng số tiền
        totalAmountDiv.innerHTML = `<p><strong>Total: ${formatCurrency(totalAmount)}</strong></p>`;
    }
    updateTotalPrice();
});

// Hàm định dạng giá bằng đồng (VND)
function formatCurrency(amount) {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

function noneformatCurrency(amount) {
    return amount.toLocaleString('en-IN', { style: 'none', currency: 'USD' });
}

// Hàm để xóa sản phẩm khỏi giỏ hàng (thêm vào để sử dụng cho liên kết 'Xóa')
function removeFromCart(productId) {
    // Lấy giỏ hàng từ localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Xóa sản phẩm theo ID
    const updatedCart = cart.filter(item => item.id !== productId);

    // Lưu lại giỏ hàng đã cập nhật vào localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Tải lại giỏ hàng
    document.dispatchEvent(new Event('DOMContentLoaded'));
}

//Chọn tất cả checkbox
function selectAllProducts() {
    const selectAll = document.getElementById('select-all').checked;
    const checkboxes = document.querySelectorAll('.item-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAll;
    });
    updateTotalPrice();
}

function updateTotalPrice() {
    let totalPrice = 0;
    const products = document.querySelectorAll('.cart-items .cart-item');
    products.forEach(product => {
        const checkbox = product.querySelector('.item-checkbox');
        if (checkbox.checked) {
            const unitPrice = parseFloat(noneformatCurrency(product.querySelector('.current-price').textContent.replaceAll(".", "")));
            const quantity = parseInt(product.querySelector('.quantity').value);
            const productTotalPrice = unitPrice * quantity;
            product.querySelector('.item-total').textContent = formatCurrency(productTotalPrice);
            totalPrice += productTotalPrice;
        }
    });
    document.querySelector('.checkout span').innerHTML = `<p><strong>Total: ${formatCurrency(totalPrice)}</strong></p>`;
}


//Cập nhật số lượng sản phẩm trong cart
function updateqty(name) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const products = document.querySelectorAll('.cart-items .cart-item');
    products.forEach(product => {
        if (product.querySelector('.item-title').textContent === name) {
            const qty = product.querySelector('.quantity').value;
            const cartItem = cart.find(item => item.name === name);
            cartItem.quantity = qty;
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    });
    updateTotalPrice();

}

