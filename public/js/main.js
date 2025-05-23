document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart count from server data
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cartCount.getAttribute('data-cart-count');
    }

    // Show notification function
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} notification`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Add event listeners for cart modal
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.addEventListener('show.bs.modal', () => {
            updateCartModal();
        });
    }
}); 