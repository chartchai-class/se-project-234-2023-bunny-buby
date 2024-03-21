/*      CREATE     */
// Open the pop-up form
document.getElementById('createProduct').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default behavior of the anchor tag
    document.getElementById('popupCreateForm').classList.add('active');
    document.getElementById('overlay').style.display = 'block'; // Show the overlay
});

// Close the pop-up form
document.querySelector('.close.createProd').addEventListener('click', function() {
    document.getElementById('popupCreateForm').classList.remove('active');
    resetForm();
    document.getElementById('overlay').style.display = 'none'; // Hide the overlay
});

// Cancel button action
document.getElementById('cancelBtn-createProd').addEventListener('click', function() {
    document.getElementById('popupCreateForm').classList.remove('active');
    resetForm();
    document.getElementById('overlay').style.display = 'none'; // Hide the overlay
});

// Create button action (Add your functionality here)
document.getElementById('createBtn-product').addEventListener('click', function() {
    alert('Create product button clicked!');
});

// Function to reset the created form
const optionMenu = document.querySelector(".select-menu"),
        selectBtn = optionMenu.querySelector(".select-btn"),
        options = optionMenu.querySelectorAll(".option"),
        sBtn_text = optionMenu.querySelector(".sBtn-text");
    
selectBtn.addEventListener("click", () => optionMenu.classList.toggle("active"));
    
options.forEach(option => {
    option.addEventListener("click", ()=>{
        let selectedOption = option.querySelector(".option-text").innerText;
        sBtn_text.innerText = selectedOption;
        optionMenu.classList.remove("active");
    });
});

// File upload
    let inputFile = document.getElementById('product-image');
    let fileNameField = document.getElementById('img-file');
    inputFile.addEventListener('change', function(event) {
    if (inputFile.value) {
        const filename = inputFile.files[0].name;
        fileNameField.innerHTML = filename;
        fileNameField.style.color = 'black';
    } else {
        fileNameField.innerHTML = 'No file Chosen';
        fileNameField.style.color = '#827575';
    }
})

// Function to reset the form
function resetForm() {
    const inputs = document.querySelectorAll('#popupForm input');
    inputs.forEach(input => {
        input.value = '';
    });

    const imgFile = document.getElementById('img-file');
    imgFile.innerHTML = 'No file Chosen';
    imgFile.style.color = '#827575';
}



/*      DELETE     */
// Open the pop-up delete product form
// Add event listeners to all delete buttons for products
document.querySelectorAll('.delete-icon').forEach(function(button) {
    button.addEventListener('click', async function (event) {
        event.preventDefault();
        const productId = this.getAttribute('data-product-id');
        const product = document.getElementById(`product_${productId}`);

        // Get current data from .category section
        const productName = product.querySelector('.product-sec2 .product-data h3').innerText;
        const productImage = product.querySelector('.product-sec2 .product-img #product-img').getAttribute('src');

        const productNameLbl = document.getElementById('productName-lbl');
        const productImgDeleted = document.getElementById('deletedProduct-img');

        productNameLbl.innerHTML = productName;
        productImgDeleted.src = productImage;

        document.getElementById('popupDeleteForm').classList.add('active');
        document.getElementById('overlay').style.display = 'block';

        // Set up event listener for confirm button
        document.getElementById('deleteBtn-product').addEventListener('click', async function () {
            try {
                const response = await fetch('/deleteProduct', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ productId: productId, btn: 'deleteBtn-product' })
                });
                
                if (response.ok) {
                    // Redirect to /myProduct after successful deletion
                    window.location.href = '/myProduct';
                } else {
                    alert('An error occurred while deleting the product. Please try again later.');
                }
            } catch (error) {
                // Handle network errors or other exceptions
                console.error('Error deleting product:', error);
                // Display an error message to the user
                alert('An error occurred while deleting the product. Please try again later.');
            } finally {
                // Close the delete confirmation popup
                document.getElementById('popupDeleteForm').classList.remove('active');
                document.getElementById('overlay').style.display = 'none';
            }
        });
    });
});
// Close the pop-up form
document.querySelector('.close.deleteProd').addEventListener('click', function() {
    document.getElementById('popupDeleteForm').classList.remove('active');
    resetForm();
    document.getElementById('overlay').style.display = 'none'; // Hide the overlay
});
// Cancel button action
document.getElementById('cancelBtn-deleteProd').addEventListener('click', function() {
    document.getElementById('popupDeleteForm').classList.remove('active');
    resetForm();
    document.getElementById('overlay').style.display = 'none'; // Hide the overlay
});
// Delete button action
document.getElementById('deleteBtn-product').addEventListener('click', function() {
    document.getElementById('popupEditForm')
});



/*      EDIT     */
document.querySelectorAll('#editProduct').forEach(function(button) {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('popupEditForm').classList.add('active');
        document.getElementById('overlay').style.display = 'block'; 
    });
});
// Close the pop-up form
document.querySelector('.close.editProd').addEventListener('click', function() {
    document.getElementById('popupEditForm').classList.remove('active');
    resetForm();
    document.getElementById('overlay').style.display = 'none'; // Hide the overlay
});
// Cancel button action
document.getElementById('cancelBtn-editProd').addEventListener('click', function() {
    document.getElementById('popupEditForm').classList.remove('active');
    resetForm();
    document.getElementById('overlay').style.display = 'none'; // Hide the overlay
});
// Edit button action
document.getElementById('editBtn-product').addEventListener('click', function() {
    alert('Edit product button clicked!');
});

// File upload
let inputEditFile = document.getElementById('product-image-edit');
let fileNameFieldEdit = document.getElementById('img-file-edit');
inputEditFile.addEventListener('change', function(event) {
    if (inputEditFile.value) {
        const filename = inputEditFile.files[0].name;
        fileNameFieldEdit.innerHTML = filename;
        fileNameFieldEdit.style.color = 'black';
    } else {
        fileNameFieldEdit.innerHTML = 'No file Chosen';
        fileNameFieldEdit.style.color = '#827575';
    }
})

// Function to reset the form
function resetForm() {
    const inputs = document.querySelectorAll('#popupEditForm input');
    inputs.forEach(input => {
        input.value = '';
    });

    const imgFile = document.getElementById('img-file-edit');
    imgFile.innerHTML = 'No file Chosen';
    imgFile.style.color = '#827575';
}


/*   CHOOSE CATEGORY   */
// Add an event listener to the category options
document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', function() {
        const categoryId = this.getAttribute('data-category-id');

        fetch(`/myProduct?categoryId=${categoryId}`)
            .then(response => {
                response.json();
                window.location.href = `/myProduct?categoryId=${categoryId}`;
            })
            .catch(error => console.error('Error:', error));
    });
});
