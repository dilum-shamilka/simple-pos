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