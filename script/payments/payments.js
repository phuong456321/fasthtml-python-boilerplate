function checkout() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartpayment = JSON.parse(localStorage.getItem("cartpayment")) || [];
    const products = document.querySelectorAll('.cart-items .cart-item');
    const updatedCart = [...cart];

    products.forEach(product => {
        let checkbox = product.querySelector('.item-checkbox');
        if (checkbox.checked) {
            console.log(checkbox.checked);
            let name = product.querySelector('.item-title').textContent;
            let item = cart.find(product => product.name === name);

            if (item) {
                cartpayment.push(item);
                // Remove item from updatedCart
                const index = updatedCart.findIndex(product => product.name === name);
                if (index !== -1) {
                    updatedCart.splice(index, 1);
                }
            }
        }
    });

    //Cập nhật cart và cartpayment
    localStorage.setItem("cartpayment", JSON.stringify(cartpayment));
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    if (cartpayment.length === 0) {
        alert('Cart is empty!');
        return false;
    }
    const totalAmount = cartpayment.reduce((total, item) => total + item.price * item.quantity, 0);
    alert(`Total amount: ${formatCurrency(totalAmount)}`);
    generrateInvoice(cartpayment, totalAmount);
    localStorage.removeItem("cartpayment");
    alert('Payment successful!');
    document.dispatchEvent(new Event('DOMContentLoaded'));
    return false;
}

function generrateInvoice(cart, totalAmount) {
    const user = JSON.parse(localStorage.getItem("check"));
    let invoiceContent = "Invoice:\n";

    if (user && user.name) {
        invoiceContent += `Customer: ${user.name}\n`;
    }

    cart.forEach((item) => {
        invoiceContent += `
        ${item.name} - $${formatCurrency(item.price)} x ${item.quantity} = ${formatCurrency(item.price * item.quantity)}
        `;
    });

    invoiceContent += `\nTotal: ${formatCurrency(totalAmount)}`;
    invoiceContent += "\nThank you for your purchase!";

    //Create Blob
    const blob = new Blob([invoiceContent], { type: "text/plain" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "invoice.txt";
    link.click();
}

