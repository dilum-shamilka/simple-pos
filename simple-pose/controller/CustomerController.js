import {customer_db} from "../db/db.js";
import CustomerModel from "../model/CustomerModel.js";

//load customer records
function loadCustomerTable(){

    $('#customer_table').empty();

    customer_db.map((item, index) => {
        let fname = item.fname;
        let lname = item.lname;
        let email = item.email;
        let phone = item.phone;
        let address = item.address;

        let data = `<tr>
                             <td>${'C' + String(index + 1).padStart(3, '0')}</td> 
                             <td>${fname}</td>
                             <td>${lname}</td>
                             <td>${email}</td>
                             <td>${phone}</td>
                             <td>${address}</td>
                           </tr>`

        $('#customer_table').append(data);

    });
}
generateNextId();


// generate customer ids
function generateNextId() {
    const nextId = 'C' + String(customer_db.length + 1).padStart(3, '0');
    $('#customer_id').val(nextId);
}
// save customer
$('#customer_save').on('click', function () {
    let id = $(`#customer_id`).val();
    let fname = $(`#first_name`).val();
    let lname = $(`#last_name`).val();
    let email = $(`#email`).val();
    let phone = $(`#phone`).val();
    let address = $(`#address`).val();

    if (fname === '' || lname === '' || email === '' || phone === '' || address === '') {
        Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Please enter valid inputs..!"
        });
    }else{
        let customer_data = {
            id: id,
            fname: fname,
            lname: lname,
            email: email,
            phone: phone,
            address: address
        };

        customer_db.push(customer_data);
        console.log(customer_db);

        loadCustomerTable();

        Swal.fire({
            title: "Customer Added successfully..!",
            icon: "success",
            draggable: true
        });
    }
    $('#first_name').val("");
    $('#last_name').val("");
    $('#email').val("");
    $('#phone').val("");
    $('#address').val("");


    loadCustomerTable();
    generateNextId();
});

// Update customer
$('#customer_update').on('click', function () {
    let id = $('#customer_id').val();
    let fname = $('#first_name').val();
    let lname = $('#last_name').val();
    let email = $('#email').val();
    let phone = $('#phone').val();
    let address = $('#address').val();

    if (fname === '' || lname === '' || email === '' || phone === '' || address === '') {
        Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Please enter valid inputs..!"
        });
    } else if (selectedCustomerIndex !== -1) {

        customer_db[selectedCustomerIndex] = {
            id: id,
            fname: fname,
            lname: lname,
            email: email,
            phone: phone,
            address: address
        };

        loadCustomerTable();
        console.log(customer_db);

        Swal.fire({
            title: "Customer updated successfully..!",
            icon: "success"
        });

        $('#customer_reset').click();

    } else {
        Swal.fire({
            icon: "warning",
            title: "No customer selected!",
            text: "Please select a customer to update."
        });
    }
});
//Reset form
$(`#customer_reset`).on('click',function (){
    generateNextId();
    $(`#searchCustomer`).val("");
    $('#first_name').val("");
    $('#last_name').val("");
    $('#email').val("");
    $('#phone').val("");
    $('#address').val("");
});