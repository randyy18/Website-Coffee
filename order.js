document.addEventListener('DOMContentLoaded', () => {
    // Menu items data
    const menuItems = [
        // Espresso
        {
            id: 1,
            name: 'Cappuccino',
            description: 'Rich of milk and foam',
            price: 3.99,
            category: 'espresso',
            image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772'
        },
        {
            id: 2,
            name: 'Classic Espresso',
            description: 'Espresso with steamed milk',
            price: 4.99,
            category: 'espresso',
            image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d'
        },
        {
            id: 3,
            name: 'Signature Espresso',
            description: 'Feel the taste of espresso',
            price: 5.99,
            category: 'espresso',
            image: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f'
        },
        {
            id: 4,
            name: 'Mocha',
            description: 'Feel the taste of Mocha',
            price: 5.49,
            category: 'espresso',
            image: 'https://images.unsplash.com/photo-1634976243773-733877dc6121'
        },
        // Frappe & Latte
        {
            id: 5,
            name: 'Caramel Frappe',
            description: 'Taste the sweetness of Caramel',
            price: 5.99,
            category: 'frappe',
            image: 'https://images.unsplash.com/photo-1662192511709-e75d67367638'
        },
        {
            id: 6,
            name: 'Matcha',
            description: 'Taste the taste of Matcha',
            price: 5.99,
            category: 'frappe',
            image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7'
        },
        {
            id: 7,
            name: 'Caramel Latte',
            description: 'Feel the taste of Caramel',
            price: 5.49,
            category: 'frappe',
            image: 'https://images.unsplash.com/photo-1579888071069-c107a6f79d82'
        },
        {
            id: 8,
            name: 'Marshmellow Latte',
            description: 'Taste the gummy marshmellow',
            price: 5.99,
            category: 'frappe',
            image: 'https://images.unsplash.com/photo-1578632321628-55551b185e57'
        },
        // Pastries & Bread
        {
            id: 9,
            name: 'Butter Croissant',
            description: 'Flaky and buttery croissant',
            price: 4.99,
            category: 'pastries',
            image: 'https://images.unsplash.com/photo-1681218079567-35aef7c8e7e4'
        },
        {
            id: 10,
            name: 'Blueberry Muffin',
            description: 'Fresh baked muffin with blueberries',
            price: 3.99,
            category: 'pastries',
            image: 'https://images.unsplash.com/photo-1613119719948-d53865658a88'
        },
        {
            id: 11,
            name: 'Chocolate Chip Cookie',
            description: 'Warm and gooey cookie',
            price: 3.99,
            category: 'pastries',
            image: 'https://images.unsplash.com/photo-1583743089695-4b816a340f82'
        },
        {
            id: 12,
            name: 'Cinnamon Bread',
            description: 'Sweet and spiced cinnamon bread',
            price: 4.99,
            category: 'pastries',
            image: 'https://images.unsplash.com/photo-1586765501019-cbe3973ef8fa'
        },
        // Ice Drink
        {
            id: 13,
            name: 'Blue Ocean',
            description: 'Smooth and refreshing blue ocean',
            price: 5.99,
            category: 'ice',
            image: 'https://images.unsplash.com/photo-1685156330898-88eb2fdd66aa'
        },
        {
            id: 14,
            name: 'Iced Latte',
            description: 'Espresso with cold milk and ice',
            price: 4.99,
            category: 'ice',
            image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735'
        },
        {
            id: 15,
            name: 'Iced Americano',
            description: 'Espresso with water and ice',
            price: 3.99,
            category: 'ice',
            image: 'https://images.unsplash.com/photo-1517959105821-eaf2591984ca'
        },
        {
            id: 16,
            name: 'Iced Tea',
            description: 'Refreshing black tea with ice',
            price: 3.99,
            category: 'ice',
            image: 'https://images.unsplash.com/photo-1713949215254-9769b4ad8724'
        }
    ];

    // State management
    let selectedItems = new Map();
    let currentCategory = 'all';

    // DOM Elements
    const menuItemsGrid = document.getElementById('menuItemsGrid');
    const selectedItemsList = document.getElementById('selectedItemsList');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const addonCheckboxes = document.querySelectorAll('.addon');
    const subtotalElement = document.getElementById('subtotal');
    const addonsTotalElement = document.getElementById('addonsTotal');
    const totalInput = document.getElementById('total');
    const orderForm = document.getElementById('orderForm');
    const orderBtn = document.getElementById('orderBtn');

    // Form Elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const addressInput = document.getElementById('address');
    const addonInputs = document.querySelectorAll('.addon');

    // Error containers
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const addressError = document.getElementById('addressError');
    const addonsError = document.getElementById('addonsError');

    // Modal elements
    const orderSuccessModal = document.getElementById('orderSuccessModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    // Initialize menu items with animation
    function initializeMenuItems() {
        menuItemsGrid.innerHTML = '';
        const filteredItems = currentCategory === 'all' 
            ? menuItems 
            : menuItems.filter(item => item.category === currentCategory);

        filteredItems.forEach((item, index) => {
            const menuItemElement = createMenuItemElement(item);
            // Add animation delay based on index
            menuItemElement.style.animationDelay = `${index * 0.1}s`;
            menuItemsGrid.appendChild(menuItemElement);
        });
    }

    // Create menu item element with enhanced styling
    function createMenuItemElement(item) {
        const div = document.createElement('div');
        div.className = 'menu-item';
        div.innerHTML = `
            <div class="menu-item-image">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
            </div>
            <div class="item-info">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="item-footer">
                    <span class="price">$${item.price.toFixed(2)}</span>
                    <button class="add-to-order">Add to Order</button>
                </div>
            </div>
        `;
        
        // Add click event to the entire item
        div.addEventListener('click', () => addToOrder(item));
        
        // Add hover effect
        div.addEventListener('mouseenter', () => {
            div.style.transform = 'translateY(-5px)';
            div.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
        });
        
        div.addEventListener('mouseleave', () => {
            div.style.transform = 'translateY(0)';
            div.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        });

        return div;
    }

    // Add item to order with animation
    function addToOrder(item) {
        if (selectedItems.has(item.id)) {
            const currentItem = selectedItems.get(item.id);
            currentItem.quantity++;
            selectedItems.set(item.id, currentItem);
        } else {
            selectedItems.set(item.id, {
                ...item,
                quantity: 1
            });
        }
        updateSelectedItemsList();
        updatePriceSummary();
        
        // Show success message
        showNotification(`${item.name} added to order!`);
    }

    // Show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        // Trigger animation
        setTimeout(() => notification.classList.add('show'), 100);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Update selected items list with enhanced styling
    function updateSelectedItemsList() {
        selectedItemsList.innerHTML = '';
        selectedItems.forEach((item, id) => {
            const div = document.createElement('div');
            div.className = 'selected-item';
            div.innerHTML = `
                <div class="item-details">
                    <span class="item-name">${item.name}</span>
                    <span class="item-price">$${item.price.toFixed(2)}</span>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn minus" aria-label="Decrease quantity">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" aria-label="Increase quantity">+</button>
                    <button class="remove-item" aria-label="Remove item">×</button>
                </div>
            `;

            // Add event listeners for quantity controls
            const minusBtn = div.querySelector('.minus');
            const plusBtn = div.querySelector('.plus');
            const removeBtn = div.querySelector('.remove-item');

            minusBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                updateQuantity(id, -1);
            });
            plusBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                updateQuantity(id, 1);
            });
            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                removeItem(id);
            });

            selectedItemsList.appendChild(div);
        });
    }

    // Update item quantity with validation
    function updateQuantity(id, change) {
        const item = selectedItems.get(id);
        const newQuantity = item.quantity + change;
        
        if (newQuantity <= 0) {
            removeItem(id);
        } else if (newQuantity <= 10) { // Maximum quantity limit
            item.quantity = newQuantity;
            selectedItems.set(id, item);
            updateSelectedItemsList();
            updatePriceSummary();
        } else {
            showNotification('Maximum quantity limit reached!');
        }
    }

    // Remove item from order with confirmation
    function removeItem(id) {
        const item = selectedItems.get(id);
        selectedItems.delete(id);
        updateSelectedItemsList();
        updatePriceSummary();
        showNotification(`${item.name} removed from order`);
    }

    // Update price summary with tax calculation
    function updatePriceSummary() {
        let subtotal = 0;
        selectedItems.forEach(item => {
            subtotal += item.price * item.quantity;
        });

        let addonsTotal = 0;
        addonCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                addonsTotal += parseFloat(checkbox.dataset.price);
            }
        });

        const total = subtotal + addonsTotal;
        if (totalInput) {
            totalInput.value = `$${total.toFixed(2)}`;
        }
        // Enable/disable order button
        orderBtn.disabled = total === 0;
    }

    // Validation functions with enhanced error messages
    function validateName() {
        const value = nameInput.value.trim();
        if (!value) {
            nameError.textContent = 'Please enter your name';
            return false;
        }
        if (value.length < 2) {
            nameError.textContent = 'Name must be at least 2 characters';
            return false;
        }
        nameError.textContent = '';
        return true;
    }

    function validateEmail() {
        const value = emailInput.value.trim();
        if (!value) {
            emailError.textContent = 'Please enter your email';
            return false;
        }
        let at = false, dot = false;
        for (let i = 0; i < value.length; i++) {
            if (value[i] === '@') at = true;
            if (value[i] === '.') dot = true;
        }
        if (!at || !dot || value.length < 5) {
            emailError.textContent = 'Please enter a valid email address';
            return false;
        }
        emailError.textContent = '';
        return true;
    }

    function validateAddress() {
        const value = addressInput.value.trim();
        if (!value) {
            addressError.textContent = 'Please enter your delivery address';
            return false;
        }
        if (value.length < 5) {
            addressError.textContent = 'Please enter a complete address';
            return false;
        }
        addressError.textContent = '';
        return true;
    }

    function validateAddons() {
        let checked = 0;
        addonInputs.forEach(addon => { if (addon.checked) checked++; });
        if (checked === 0) {
            addonsError.textContent = 'Please select at least one add-on';
            return false;
        }
        addonsError.textContent = '';
        return true;
    }

    function validateForm() {
        const validName = validateName();
        const validEmail = validateEmail();
        const validAddress = validateAddress();
        const validAddons = validateAddons();
        const allValid = validName && validEmail && validAddress && validAddons;
        orderBtn.disabled = !allValid;
        return allValid;
    }

    // Event listeners with error handling
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            initializeMenuItems();
        });
    });

    addonCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updatePriceSummary();
            validateForm();
        });
    });

    // Form validation event listeners with debouncing
    const debounce = (func, delay) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    };

    nameInput.addEventListener('input', debounce(validateForm, 300));
    emailInput.addEventListener('input', debounce(validateForm, 300));
    addressInput.addEventListener('input', debounce(validateForm, 300));

    // Show modal
    function showOrderSuccessModal() {
        orderSuccessModal.style.display = 'flex';
    }
    // Hide modal
    function hideOrderSuccessModal() {
        orderSuccessModal.style.display = 'none';
        // Reset order state after closing
        selectedItems.clear();
        updateSelectedItemsList();
        updatePriceSummary();
        orderForm.reset();
    }
    // Close modal on button click
    closeModalBtn.addEventListener('click', hideOrderSuccessModal);
    // Close modal on outside click
    orderSuccessModal.addEventListener('click', function(e) {
        if (e.target === orderSuccessModal) hideOrderSuccessModal();
    });

    // In form submission, show modal instead of alert
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm()) {
            orderBtn.disabled = true;
            orderBtn.textContent = 'Processing...';
            setTimeout(() => {
                showOrderSuccessModal();
                orderBtn.disabled = false;
                orderBtn.textContent = 'Place Order';
            }, 1000);
        }
    });

    // Navigation functionality
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Initialize the page
    initializeMenuItems();
    validateForm();
});