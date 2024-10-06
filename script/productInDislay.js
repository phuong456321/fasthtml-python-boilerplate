// Sự kiện này được kích hoạt khi toàn bộ nội dung trang đã được tải xong
document.addEventListener('DOMContentLoaded', function() {
    // Lấy danh sách sản phẩm từ localStorage, nếu không có, khởi tạo mảng rỗng
    const products = JSON.parse(localStorage.getItem('products')) || [];
    // Hiển thị các sản phẩm lên trang bằng cách sử dụng hàm displayProducts
    displayProducts(products);
});

//Hàm hiện thị theo yêu cầu
function displayProducts(products) {
    // Lấy phần tử HTML có id 'productContainer', nơi các sản phẩm sẽ được hiển thị
    const productContainer = document.getElementById('list-game');
    
    // Xóa nội dung hiện tại của 'productContainer' để chuẩn bị hiển thị các sản phẩm mới
    productContainer.innerHTML = '';

    // Duyệt qua danh sách sản phẩm và tạo các phần tử HTML để hiển thị từng sản phẩm
    products.forEach(product => {
        const productElement = document.createElement('section');
        productElement.className = 'product-card';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-details">
                <p class="game-name">${product.name}</p>
                <div class="category">
                    <span>Thể loại&nbsp;:&nbsp;</span>
                    <p class="category-name">${product.category}</p>
                </div>
                <p class="price">${product.price.toLocaleString('vi-VN')}đ</p>
                <div class="add-to-cart-container">
                    <button class="add-to-cart" onclick="addToCart('${product.id}')">Thêm vào giỏ</button>
                </div>
            </div>
        `;
        // Thêm phần tử sản phẩm vào 'productContainer'
        productContainer.appendChild(productElement);
    });
}

// Tìm kiếm và lọc sản phẩm dựa trên từ khóa tìm kiếm
function searchProducts(searchTerm) {
    // Lấy danh sách sản phẩm từ localStorage, nếu không có, khởi tạo mảng rỗng
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Lọc sản phẩm dựa trên từ khóa tìm kiếm
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Hiển thị các sản phẩm đã lọc trên trang
    displayProducts(filteredProducts);
}

//Hàm thu thập dữ liệu lọc sản phẩm
function getFilter() {
    return {
        // Lấy giá trị của trường chọn danh mục (category)
        category: document.getElementById('category').selectedOptions[0].text,
        // Lấy giá trị của trường nhập liệu giá tối thiểu (min-value) hoặc đặt giá trị mặc định là 0 nếu không có giá trị
        minPrice: parseFloat(document.getElementById('min-value').value) || 0,
        // Lấy giá trị của trường nhập liệu giá tối đa (max-value) hoặc đặt giá trị mặc định là giá trị tối đa có thể nếu không có giá trị
        maxPrice: parseFloat(document.getElementById('max-value').value) || Number.MAX_VALUE
    }
}

// Lọc sản phẩm dựa trên danh mục và khoảng giá
function filterProducts(filterCriteria) {
    // Lấy danh sách sản phẩm từ localStorage, nếu không có, khởi tạo mảng rỗng
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Lọc sản phẩm dựa trên tiêu chí lọc (danh mục và khoảng giá)
    const filteredProducts = products.filter(product => {
        // Kiểm tra danh mục (nếu có chọn danh mục)
        const matchesCategory = filterCriteria.category === 'Tất cả' || product.category === filterCriteria.category;
        // Kiểm tra khoảng giá (nếu có chọn khoảng giá)
        const matchesMinPrice = !filterCriteria.minPrice || product.price >= filterCriteria.minPrice;
        const matchesMaxPrice = !filterCriteria.maxPrice || product.price <= filterCriteria.maxPrice;

        // Trả về true nếu tất cả các tiêu chí đều đúng
        return matchesCategory && matchesMinPrice && matchesMaxPrice;
    });

    // Hiển thị các sản phẩm đã lọc trên trang
    displayProducts(filteredProducts);
}
