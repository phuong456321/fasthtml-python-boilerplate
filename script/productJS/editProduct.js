
// Hàm tải danh sách sản phẩm từ localStorage
function loadProductList() {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    const listGame = document.getElementById('listGame');
    listGame.innerHTML = ''; // Xóa sản phẩm cũ trước khi thêm sản phẩm mới

    products.forEach(product => {
        const productElement = createProductElement(product);
        listGame.appendChild(productElement);
    });
    window.location.href = '../../view/admin/managerProducts.html';
}

// Hàm hiển thị ảnh xem trước khi người dùng chọn tệp mới
function previewImage(event) {
    const file = event.target.files[0]; // Lấy tệp đã chọn
    if (file) {
        const reader = new FileReader(); // Sử dụng FileReader để đọc file

        reader.onload = function(e) {
            // Khi tệp được đọc, hiển thị hình ảnh
            const preview = document.getElementById('previewImage');
            preview.src = e.target.result;
            preview.style.display = 'block'; // Hiển thị ảnh xem trước
        };

        reader.readAsDataURL(file); // Đọc tệp dưới dạng URL
    }
}

// Hàm cập nhật sản phẩm
function updateProduct(productId) {
    let products = JSON.parse(localStorage.getItem('products')) || [];

    const productIndex = products.findIndex(product => product.id === productId);
    if (productIndex === -1) {
        alert('Không tìm thấy sản phẩm để cập nhật');
        return;
    }

    const fileInput = document.getElementById('productImage');
    const file = fileInput.files[0]; // Lấy tệp ảnh mới (nếu có)
    const reader = new FileReader();

    reader.onload = function(e) {
        // Tạo đối tượng sản phẩm đã cập nhật
        const updatedProduct = {
            id: productId,
            name: document.getElementById('productName').value,
            price: parseFloat(document.getElementById('productPrice').value),
            category: document.getElementById('category').value,
            image: e.target.result || products[productIndex].image // Nếu có ảnh mới thì lấy, không thì giữ ảnh cũ
        };

        // Cập nhật sản phẩm trong danh sách
        products[productIndex] = updatedProduct;
        alert('Cập nhật sản phẩm thành công');

        // Lưu danh sách vào localStorage
        localStorage.setItem('products', JSON.stringify(products));

        // Làm mới giao diện và form
        loadProductList();
        clearForm();
    };

    if (file) {
        // Nếu có tệp mới, đọc tệp đó
        reader.readAsDataURL(file);
    } else {
        // Nếu không có tệp mới, chỉ cần cập nhật thông tin khác
        const updatedProduct = {
            id: productId,
            name: document.getElementById('productName').value,
            price: parseFloat(document.getElementById('productPrice').value),
            category: document.getElementById('category').value,
            image: products[productIndex].image // Giữ nguyên ảnh cũ
        };

        products[productIndex] = updatedProduct;
        localStorage.setItem('products', JSON.stringify(products));
        loadProductList();
        clearForm();
    } 
 }
 function clearForm() {
    document.getElementById('productId').value = ''; // Xóa ID sản phẩm
    document.getElementById('productName').value = ''; // Xóa tên sản phẩm
    document.getElementById('productPrice').value = ''; // Xóa giá sản phẩm
    document.getElementById('category').value = ''; // Reset thể loại
    document.getElementById('productImage').value = ''; // Reset input file
    
    // Hiển thị lại nút "Thêm" và ẩn nút "Cập nhật"
    document.getElementById('addButton').style.display = 'inline'; 
    document.getElementById('updateButton').style.display = 'none';
}
//xóa sản phẩm
function deleteProduct(productId) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products = products.filter(product => product.id !== productId);
    localStorage.setItem('products', JSON.stringify(products));

    // Cập nhật danh sách sản phẩm trên giao diện
    loadProductList();
}