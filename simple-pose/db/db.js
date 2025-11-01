// Database Arrays (Consistent with Model properties)
export const customer_db = [
    { id: 'C001', fname: 'dilum', lname: 'shamilka', email: 'dilum@gmail.com', phone: '0711234567', address: 'Colombo' },
    { id: 'C002', fname: 'Amal', lname: 'Perera', email: 'amal@gmail.com', phone: '0779876543', address: 'Kandy' }
];

export const item_db = [
    { item_id: 'I001', itemName: 'Milk', category: 'Dairy', price: 500, qtyInStock: 10, description: 'Fresh full cream milk' },
    { item_id: 'I002', itemName: 'Biscuit', category: 'Snacks', price: 450, qtyInStock: 20, description: 'Chocolate chip biscuits' }
];

export const order_db = []; // This will store instances of OrderModel