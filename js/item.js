let burgerItems = [];

document.addEventListener('DOMContentLoaded', function() {
    // Get form element
    const burgerForm = document.querySelector('form');

    function handleFormSubmit(event) {
        event.preventDefault();
        

        const formData = new FormData(burgerForm);
        

        const burgerItem = {
            id: Date.now(),
            name: formData.get('burgerName'),
            price: parseFloat(formData.get('price')),
            description: formData.get('description'),
            category: formData.get('category'),
            spicyLevel: formData.get('spicyLevel'),
            ingredients: Array.from(formData.getAll('ingredients')),
            dietaryOptions: Array.from(formData.getAll('dietary')),
            prepTime: parseInt(formData.get('prepTime')),
            calories: parseInt(formData.get('calories'))
        };
        
        
        burgerItems.push(burgerItem);
        
        
        console.log('New burger added:', burgerItem);
        
        
        console.log('All burger items:', burgerItems);
        
        
        burgerForm.reset();
        
        
        alert('Burger added successfully!');
    }

    burgerForm.addEventListener('submit', handleFormSubmit);
});


function getAllBurgers() {
    return burgerItems;
}

function getBurgerById(id) {
    return burgerItems.find(burger => burger.id === id);
}

function deleteBurgerById(id) {
    const index = burgerItems.findIndex(burger => burger.id === id);
    if (index !== -1) {
        burgerItems.splice(index, 1);
        return true;
    }
    return false;
}

// Function to update burger by ID
function updateBurgerById(id, updatedData) {
    const index = burgerItems.findIndex(burger => burger.id === id);
    if (index !== -1) {
        burgerItems[index] = { ...burgerItems[index], ...updatedData };
        return true;
    }
    return false;
}

// Function to filter burgers by category
function filterBurgersByCategory(category) {
    return burgerItems.filter(burger => burger.category === category);
}

// Function to sort burgers by price
function sortBurgersByPrice(ascending = true) {
    return [...burgerItems].sort((a, b) => {
        return ascending ? a.price - b.price : b.price - a.price;
    });
}

// Function to get burger statistics
function getBurgerStats() {
    return {
        totalBurgers: burgerItems.length,
        averagePrice: burgerItems.reduce((acc, curr) => acc + curr.price, 0) / burgerItems.length,
        categories: [...new Set(burgerItems.map(burger => burger.category))],
        spicyBurgers: burgerItems.filter(burger => burger.spicyLevel !== 'not').length
    };
}