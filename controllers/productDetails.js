document.querySelectorAll('.product-box-card').forEach(function (product) {
    product.addEventListener('mouseover', function (event) {
        this.style.textDecoration = "underline";
        this.style.cursor = "pointer";
    });
    product.addEventListener('mouseout', function (event) {
        this.style.textDecoration = "none";
        this.style.cursor = "default";
    });

    product.addEventListener('click', async function (event) {
        const productId = this.getAttribute('data-product-id');

        fetch(`/WebStore/product_detail?productId=${productId}`)
            .then(response => {
                response.json();
                window.location.href = `/WebStore/product_detail?productId=${productId}`;
            })
            .catch(error => console.error('Error:', error));
    })
});