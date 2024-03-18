/*      CREATE     */
// Open the pop-up create catagory form
document.getElementById('createCategory').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default behavior of the anchor tag
    document.getElementById('popupCreateForm').classList.add('active');
    document.getElementById('overlay').style.display = 'block'; // Show the overlay
});

// Close the pop-up form
document.querySelector('.close.createCate').addEventListener('click', function() {
    document.getElementById('popupCreateForm').classList.remove('active');
    resetForm();
    document.getElementById('overlay').style.display = 'none'; // Hide the overlay
});

// Cancel button action
document.getElementById('cancelBtn-createCate').addEventListener('click', function() {
    document.getElementById('popupCreateForm').classList.remove('active');
    resetForm();
    document.getElementById('overlay').style.display = 'none'; // Hide the overlay
});

// Function to reset the created form
function resetForm() {
    document.getElementById('categoryID').value = '';
    document.getElementById('categoryName').value = '';
}



/*      DELETE     */
// Open the pop-up delete catagory form
// Add event listeners to all delete buttons for categories
document.querySelectorAll('.delete-icon').forEach(function(button) {
    button.addEventListener('click', async function(event) {
        event.preventDefault();
        const categoryId = this.getAttribute('data-category-id');
        const category = document.getElementById(`category_${categoryId}`);

        // Get current data from .category section
        const categoryName = category.querySelector('.category-sec1 h3').innerText;
        const categoryIdText = category.querySelector('.category-id').innerText;

        const categoryIdLbl = document.getElementById('categoryId-lbl');
        const categoryNameLbl = document.getElementById('categoryName-lbl')

        categoryIdLbl.innerHTML = categoryIdText;
        categoryNameLbl.innerHTML = categoryName;
        
        document.getElementById('popupDeleteForm').classList.add('active');
        document.getElementById('overlay').style.display = 'block';
        
        // Set up event listener for confirm button
        document.getElementById('deleteBtn-category').addEventListener('click', async function() {
            try {
                // Send POST request to backend for deletion
                await fetch('/deleteCategory', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ categoryId: categoryId, btn: 'deleteBtn-category' })
                });
            } catch (error) {
                // Handle network errors or other exceptions
                console.error('Error deleting category:', error);
                // Display an error message to the user
                alert('An error occurred while deleting the category. Please try again later.');
            } finally {
                // Close the delete confirmation popup
                document.getElementById('popupDeleteForm').classList.remove('active');
                document.getElementById('overlay').style.display = 'none';
            }
        });
    });
});
// Close the pop-up form
document.querySelector('.close.deleteCate').addEventListener('click', function() {
    document.getElementById('popupDeleteForm').classList.remove('active');
    resetForm();
    document.getElementById('overlay').style.display = 'none'; // Hide the overlay
});
// Cancel button action
document.getElementById('cancelBtn-deleteCate').addEventListener('click', function() {
    document.getElementById('popupDeleteForm').classList.remove('active');
    resetForm();
    document.getElementById('overlay').style.display = 'none'; // Hide the overlay
});



/*      Edit     */
// Add event listener to edit buttons
document.querySelectorAll('.edit-icon').forEach((editBtn) => {
    editBtn.addEventListener('click', function(event) {
        event.preventDefault();
        const categoryId = this.getAttribute('data-category-id');
        const category = this.closest('.category');
        const editCategory = category.nextElementSibling;
        const editCategoryParent = editCategory.parentNode;
        
        // Toggle visibility of category and editCategory
        document.getElementById('overlay').style.display = 'block';
        category.style.display = 'none';
        editCategory.style.position = 'relative';
        editCategoryParent.style.position = 'relative';
        editCategory.style.zIndex = 1000;
        editCategoryParent.style.zIndex = 999;
        editCategory.style.display = 'block';
        editCategoryParent.style.position = 'relative';
    });
});

// Add event listener to done buttons// Add event listener to done buttons
document.querySelectorAll('.done-icon').forEach((doneBtn) => {
    doneBtn.addEventListener('click', async function(event) {
        event.preventDefault();
        const categoryId = this.getAttribute('data-category-id');
        const category = document.getElementById(`category_${categoryId}`);
        const editCategory = document.getElementById(`editCategory_${categoryId}`);
        
        // Update edit data fields with current data
        const editCategoryNameInput = editCategory.querySelector(`#edit-categoryName_${categoryId}`).value;
        const editCategoryIdInput = editCategory.querySelector(`#edit-categoryId_${categoryId}`).value;
        
        try {
            // Send POST request to backend for category update
            const response = await fetch('/editCategory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ categoryId: categoryId, newCateId: editCategoryIdInput, newCateName: editCategoryNameInput })
            });

            if (response.ok) {
                // Handle successful response
                window.location.href = "/myCategory"; // Redirect to '/myCategory'
            } else {
                // Handle server-side errors
                throw new Error('Server Error');
            }
        } catch (error) {
            // Handle errors
            console.error('Error updating category:', error);
            alert('An error occurred while updating the category. Please try again later.');
        } finally {
            // Toggle visibility of category and editCategory
            category.style.display = 'block';
            editCategory.style.display = 'none';
            document.getElementById('overlay').style.display = 'none';
        }
    });
});





