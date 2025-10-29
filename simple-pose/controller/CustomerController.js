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
