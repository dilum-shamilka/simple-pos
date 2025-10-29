import {item_db, order_db, customer_db} from "../db/db.js";
import orderModel from "../model/OrderModel.js";


$(document).ready(function () {
    loadCustomerIds();
    loadItemIds();
    generateNextId();
    setTodayDate();
});

//for cust_id
function loadCustomerIds() {
    $('#cust_id').empty().append('<option selected disabled>Select Customer ID</option>');

    customer_db.forEach(customer => {
        $('#cust_id').append(`<option value="${customer.id}">${customer.id}</option>`);
    });

    // Attach the change event AFTER populating
    $('#cust_id').on('change', function () {
        const selectedId = $(this).val();
        const customer = customer_db.find(c => c.id === selectedId);
        if (customer) {
            $('#name').val(customer.fname + ' ' + customer.lname);
            $('#address2').val(customer.address);
        }
    });
}


//for item_id2
function loadItemIds() {
    $('#item_id2').empty().append('<option selected disabled>Select Item ID</option>');

    item_db.forEach(item => {
        $('#item_id2').append(`<option value="${item.item_id}">${item.item_id}</option>`);
    });

    // Attach the change event AFTER populating
    $('#item_id2').on('change', function () {
        const selectedId = $(this).val();
        const item = item_db.find(i => i.item_id === selectedId);
        if (item) {
            $('#item_name2').val(item.itemName);
            $('#price2').val(item.price);
            $('#qty_on_hand').val(item.qtyInStock);
        }
    });
}



//generate ordr ids
function generateNextId() {
    const nextId = 'OD' + String(order_db.length + 1).padStart(3, '0');
    $('#order_id').val(nextId);
}

function setTodayDate() {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // yyyy-mm-dd
    $('#date').val(formattedDate);
}

//add to cart
let cart = [];

$('#add_items').on('click', function () {
    let item_id = $('#item_id2').val();
    let item_name = $('#item_name2').val();
    let price = parseInt($('#price2').val());
    let qtyOnHand = parseInt($('#qty_on_hand').val());
    let orderQty = parseInt($('#order_qty').val());

    if (!item_id || !item_name || isNaN(price) || isNaN(orderQty)) {
        Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Please enter valid inputs..!"
        });
        return; // prevent continuing
    }

    if (orderQty > qtyOnHand) {
        Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Not enough stock available!"
        });
        return; // prevent continuing
    }

    const total = price * orderQty;

    cart.push({
        item_id,
        item_name,
        price,
        orderQty,
        total
    });

    // ✅ Move this inside the click handler
    $('#order_table').append(`
        <tr>
            <td class="text-center">${item_id}</td>
            <td class="text-center">${item_name}</td>
            <td class="text-center">${price}</td>
            <td class="text-center">${orderQty}</td>
            <td class="text-center">${total}</td>
        </tr>
    `);


    // Optionally clear inputs after adding
    $('#cust_id').val('');
    $('#name').val('');
    $('#address2').val('');
    $('#item_id2').val('');
    $('#item_name2').val('');
    $('#price2').val('');
    $('#qty_on_hand').val('');
    $('#order_qty').val('');
});
