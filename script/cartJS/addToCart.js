//Thêm vào giỏ hàng
function addToCart(productId) {
    // Lấy dữ liệu giỏ hàng từ localStorage, nếu không có, khởi tạo mảng rỗng
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Lấy danh sách sản phẩm từ localStorage
    let products = JSON.parse(localStorage.getItem('products')) || [];
    
    // Tìm sản phẩm dựa trên productId
    const product = products.find(product => product.id === productId);

    if (product) {
        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        const cartItem = cart.find(item => item.id === productId);

        if (cartItem) {
            // Nếu đã có, tăng số lượng sản phẩm trong giỏ hàng
            cartItem.quantity += 1;
        } else {
            // Nếu chưa có, thêm sản phẩm vào giỏ hàng với số lượng là 1
            cart.push({ ...product, quantity: 1 });
        }

        // Cập nhật giỏ hàng trong localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Đã thêm vào giỏ hàng');
    } else {
        // Thông báo nếu sản phẩm không tồn tại
        alert('không tìm thấy sản phẩm');
    }
}