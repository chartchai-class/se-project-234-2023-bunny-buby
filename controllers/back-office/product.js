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
document.querySelectorAll('#deleteProduct').forEach(function(button) {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('popupDeleteForm').classList.add('active');
        document.getElementById('overlay').style.display = 'block'; 
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
    alert('Delete product button clicked!');
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