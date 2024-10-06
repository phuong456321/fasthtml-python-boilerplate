// Tải danh sách sản phẩm từ localStorage và hiển thị trên trang
function loadProductList() {
    // Lấy danh sách sản phẩm từ localStorage, nếu không có, khởi tạo mảng rỗng
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // Lấy phần tử HTML có id là 'productList' để hiển thị danh sách sản phẩm
    let productListDiv = document.getElementById('listGame');
    
    // Xóa nội dung hiện tại trong 'productList' để chuẩn bị hiển thị danh sách mới
    productListDiv.innerHTML = '';
    
    // Duyệt qua từng sản phẩm trong danh sách và tạo các phần tử HTML để hiển thị thông tin sản phẩm
    products.forEach(product => {
        // Tạo phần tử 'section' mới cho từng sản phẩm
        let productSection = document.createElement('section');
        productSection.className = 'product-card';
        
        // Thêm nội dung HTML vào 'section' để hiển thị thông tin sản phẩm theo cấu trúc yêu cầu
        productSection.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-details">
                <p class="game-name">${product.name}</p>
                <div class="category">
                    <span>Thể loại&nbsp;:&nbsp;</span>
                    <p class="category-name">${product.category}</p>
                </div>
                <p class="price">${product.price.toLocaleString('vi-VN')}đ</p>
                <div class="btn-edit-container">
                    <button onclick="deleteProduct('${product.id}')">Delete</button>
                    <button onclick="prepareUpdateProduct('${product.id}')">Edit</button>
                </div>
            </div>
        `;

        // Thêm phần tử sản phẩm vào 'listGame'
        productListDiv.appendChild(productSection);
    });
}

function prepareUpdateProduct(productId) {
    // Lấy danh sách sản phẩm từ localStorage
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Tìm sản phẩm trong danh sách theo ID
    const product = products.find(product => product.id === productId);
    
    // Nếu tìm thấy sản phẩm, điền thông tin vào các trường nhập liệu để chỉnh sửa
    if (product) {
        document.getElementById('productId').value = product.id;
        document.getElementById('productName').value = product.name;
        document.getElementById('productPrice').value = product.price;
        document.querySelector('.create-product select#category').selectedOptions[0].text = product.category;
        document.getElementById('productImage').src = product.image;
        // Hiển thị nút cập nhật và ẩn nút tạo mới
        document.getElementById('updateButton').style.display = 'inline';
        document.getElementById('productForm').querySelector('button[onclick="createProduct()"]').style.display = 'none';
    } else {
        // Nếu không tìm thấy sản phẩm, hiển thị thông báo lỗi
        alert('Không tìm thấy');
    }
}

loadProductList();