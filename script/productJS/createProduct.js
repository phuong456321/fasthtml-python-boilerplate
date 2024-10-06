//Tạo sản phẩm mới và lưu vào localStorage
function createProduct() {
    // Lấy giá trị tên sản phẩm từ trường nhập liệu có id là 'productName'
    const productName = document.getElementById('productName').value;
    // Lấy giá trị giá sản phẩm từ trường nhập liệu có id là 'productPrice' và chuyển đổi thành số thực (float)
    const productPrice = parseFloat(document.getElementById('productPrice').value);
    // Lấy giá trị danh mục sản phẩm từ trường nhập liệu có id là 'productCategory'
    const productCategory = document.querySelector('.create-product select#category').selectedOptions[0].text;

    // Lấy file hình ảnh từ input
    const productImageInput = document.getElementById('productImage');
    const file = productImageInput.files[0];

    if (!file) {
        alert("Vui lòng chọn hình ảnh!");
        return;
    }

    const reader = new FileReader();
    reader.onloadend = function() {
        const productImage = reader.result; // Base64 của hình ảnh
        // Tạo một ID duy nhất cho sản phẩm bằng cách sử dụng timestamp (số mili-giây từ 1/1/1970 đến hiện tại)
        const productId = Date.now().toString();

        // Tạo đối tượng sản phẩm mới với các thuộc tính id, name, price và category
        const newProduct = {
            id: productId,
            name: productName,
            price: productPrice,
            category: productCategory,
            image: productImage
        };

        // Lấy danh sách sản phẩm hiện có từ localStorage, nếu không có, khởi tạo mảng rỗng
        let products = JSON.parse(localStorage.getItem('products')) || [];

        // Thêm sản phẩm mới vào danh sách
        products.push(newProduct);

        // Lưu danh sách sản phẩm đã cập nhật vào localStorage
        localStorage.setItem('products', JSON.stringify(products));

        // Hiển thị thông báo sản phẩm đã được tạo thành công
        alert('Thêm sản phẩm thành công!');

    };
    reader.readAsDataURL(file);
    // Chuyển hướng người dùng đến trang managerProduct.html
    window.location.href = '../../view/admin/managerProducts.html';
}