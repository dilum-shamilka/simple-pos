import {item_db} from "../db/db.js";
import ItemModel from "../model/ItemModel.js";

let selectedItemIndex = -1;

// Load Items into Table
function loadItemTable() {

    $('#item_table').empty();

    item_db.map((item, index) => {
        let itemName = item.itemName;
        let category = item.category;
        let price = item.price;
        let qtyInStock = item.qtyInStock;
        let description = item.description;

        let data = `<tr>

                <td>${'I' + String(index + 1).padStart(3, '0')}</td>
                <td>${itemName}</td>
                <td>${category}</td>
                <td>${price}</td>
                <td>${qtyInStock}</td>
                <td>${description}</td>
            </tr>`

        $('#item_table').append(data)
    });
}

generateNextId();

//generate item ids
function generateNextId() {
    const nextId = 'I' + String(item_db.length + 1).padStart(3, '0');
    $('#item_id').val(nextId);
}

//save Item
$('#item_register').on('click', function () {
    let item_id = $('#item_id').val();
    let itemName = $('#item_name').val();
    let category = $('#category').val();
    let price = parseInt($('#price').val());
    let qtyInStock = parseInt($('#qty_in_stock').val());
    let description = $('#description').val();

    if (itemName === '' || category === '' || price === '' || qtyInStock === '' || description ===''){
        Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Please enter valid inputs..!"
        });
    }else{
        let item_data = {
            item_id: item_id,
            itemName: itemName,
            category: category,
            price: price,
            qtyInStock: qtyInStock,
            description: description
        };

        item_db.push(item_data);
        console.log(item_db);

        loadItemTable();

        Swal.fire({
            title: "Item Added successfully..!",
            icon: "success",
            draggable: true
        });
    };
    $('#item_name').val("");
    $('#category').val("");
    $('#price').val("");
    $('#qty_in_stock').val("");
    $('#description').val("");

    loadItemTable();
    generateNextId();

});
