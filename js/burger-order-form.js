// Constants for local storage
const ORDERS_STORAGE_KEY = 'burgerOrders';

// Menu data
const MENU = {
    burgers: [
        { id: 'cheese', name: 'Signature Cheese Burger', price: 12.99 },
        { id: 'bbq', name: 'BBQ Bacon Deluxe', price: 14.99 },
        { id: 'mushroom', name: 'Mushroom Swiss', price: 13.99 },
        { id: 'veggie', name: 'Gourmet Veggie Burger', price: 11.99 }
    ],
    toppings: [
        { id: 'cheese', name: 'Extra Cheese', price: 1.50 },
        { id: 'bacon', name: 'Extra Bacon', price: 2.00 },
        { id: 'avocado', name: 'Add Avocado', price: 1.50 },
        { id: 'fries', name: 'Premium Fries', price: 3.99 }
    ]
};

// Initialize the form and load orders when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeForm();
    displayOrderHistory();
});

function initializeForm() {
    const form = document.createElement('form');
    form.id = 'orderForm';
    form.innerHTML = `
        <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" required>
        </div>
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" required>
        </div>
        <div class="form-group">
            <label for="phone">Phone:</label>
            <input type="tel" id="phone" required>
        </div>
        <div class="form-group">
            <label for="burger">Select Your Gourmet Burger:</label>
            <select id="burger" required>
                <option value="">Choose your burger</option>
                ${MENU.burgers.map(burger => 
                    `<option value="${burger.id}">${burger.name} - $${burger.price.toFixed(2)}</option>`
                ).join('')}
            </select>
        </div>
        <div class="form-group">
            <label>Customize Your Burger:</label>
            ${MENU.toppings.map(topping => `
                <div class="checkbox-group">
                    <input type="checkbox" id="${topping.id}" name="toppings" value="${topping.id}">
                    <label for="${topping.id}">${topping.name} (+$${topping.price.toFixed(2)})</label>
                </div>
            `).join('')}
        </div>
        <div class="form-group">
            <label for="instructions">Special Instructions:</label>
            <textarea id="instructions"></textarea>
        </div>
        <button type="submit">Place Order</button>
    `;

    form.addEventListener('submit', handleOrderSubmission);
    
    // Add CSS styles
    const styles = `
        .form-group {
            margin-bottom: 15px;
        }
        .form-group label {
            display: block;
            margin-bottom: 5px;
        }
        .form-group input[type="text"],
        .form-group input[type="email"],
        .form-group input[type="tel"],
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        .checkbox-group {
            margin: 5px 0;
        }
        button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background-color: #45a049;
        }
        #orderHistory {
            margin-top: 30px;
        }
        .order-card {
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 15px;
            margin-bottom: 15px;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    document.body.appendChild(form);
    
    // Create order history section
    const orderHistorySection = document.createElement('div');
    orderHistorySection.id = 'orderHistory';
    document.body.appendChild(orderHistorySection);
}

function handleOrderSubmission(event) {
    event.preventDefault();
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        burger: document.getElementById('burger').value,
        toppings: Array.from(document.querySelectorAll('input[name="toppings"]:checked'))
            .map(checkbox => checkbox.value),
        instructions: document.getElementById('instructions').value,
        orderId: generateOrderId(),
        date: new Date().toISOString(),
        total: calculateTotal()
    };
    
    // Save order to local storage
    saveOrder(formData);
    
    // Reset form and update display
    event.target.reset();
    displayOrderHistory();
    
    alert('Order placed successfully!');
}

function generateOrderId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function calculateTotal() {
    let total = 0;
    
    // Add burger price
    const burgerId = document.getElementById('burger').value;
    const burger = MENU.burgers.find(b => b.id === burgerId);
    if (burger) {
        total += burger.price;
    }
    
    // Add toppings prices
    const selectedToppings = Array.from(document.querySelectorAll('input[name="toppings"]:checked'));
    selectedToppings.forEach(topping => {
        const toppingData = MENU.toppings.find(t => t.id === topping.value);
        if (toppingData) {
            total += toppingData.price;
        }
    });
    
    return total;
}

function saveOrder(orderData) {
    let orders = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]');
    orders.push(orderData);
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
}

function displayOrderHistory() {
    const orderHistory = document.getElementById('orderHistory');
    orderHistory.innerHTML = '<h2>Order History</h2>';
    
    const orders = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]');
    
    if (orders.length === 0) {
        orderHistory.innerHTML += '<p>No orders yet.</p>';
        return;
    }
    
    orders.reverse().forEach(order => {
        const orderCard = document.createElement('div');
        orderCard.className = 'order-card';
        
        const burger = MENU.burgers.find(b => b.id === order.burger);
        const toppingsText = order.toppings
            .map(t => MENU.toppings.find(topping => topping.id === t)?.name)
            .filter(Boolean)
            .join(', ');
        
        orderCard.innerHTML = `
            <h3>Order #${order.orderId}</h3>
            <p><strong>Date:</strong> ${new Date(order.date).toLocaleString()}</p>
            <p><strong>Customer:</strong> ${order.name}</p>
            <p><strong>Burger:</strong> ${burger?.name || 'N/A'}</p>
            ${toppingsText ? `<p><strong>Toppings:</strong> ${toppingsText}</p>` : ''}
            ${order.instructions ? `<p><strong>Special Instructions:</strong> ${order.instructions}</p>` : ''}
            <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
            <button onclick="reorder('${order.orderId}')">Reorder</button>
        `;
        
        orderHistory.appendChild(orderCard);
    });
}

function reorder(orderId) {
    const orders = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]');
    const order = orders.find(o => o.orderId === orderId);
    
    if (order) {
        // Fill form with order details
        document.getElementById('name').value = order.name;
        document.getElementById('email').value = order.email;
        document.getElementById('phone').value = order.phone;
        document.getElementById('burger').value = order.burger;
        document.getElementById('instructions').value = order.instructions;
        
        // Check toppings
        document.querySelectorAll('input[name="toppings"]').forEach(checkbox => {
            checkbox.checked = order.toppings.includes(checkbox.value);
        });
        
        // Scroll to form
        document.getElementById('orderForm').scrollIntoView({ behavior: 'smooth' });
    }
}

// Function to clear all orders (for testing purposes)
function clearOrders() {
    localStorage.removeItem(ORDERS_STORAGE_KEY);
    displayOrderHistory();
}
