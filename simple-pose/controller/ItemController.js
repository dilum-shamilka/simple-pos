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

//update item
$(`#item_update`).on('click',function (){
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
    }else if(selectedItemIndex !== -1){

        item_db[selectedItemIndex] = {
            item_id: item_id,
            itemName: itemName,
            category: category,
            price: price,
            qtyInStock: qtyInStock,
            description: description
        };

        loadItemTable();
        console.log(item_db);

        Swal.fire({
            title: "Item updated successfully..!",
            icon: "success"
        });

        $('#item_cancel').click();

    }else{
        Swal.fire({
            icon: "warning",
            title: "No item selected!",
            text: "Please select a item to update."
        });
    }
});

// Clear Form
$(`#item_cancel`).on('click',function () {
    generateNextId();
    $('#item_search').val("");
    $('#item_name').val("");
    $('#category').val("");
    $('#price').val("");
    $('#qty_in_stock').val("");
    $('#description').val("");
});

//delete item
$(`#item_delete`).on('click',function (){
    if(selectedItemIndex !== -1) {
        item_db.splice(selectedItemIndex, 1);

        loadItemTable();
        Swal.fire({
            title: "Deleted!",
            text: "Item has been deleted successfully.",
            icon: "success"
        });

        $('#item_name').val("");
        $('#category').val("");
        $('#price').val("");
        $('#qty_in_stock').val("");
        $('#description').val("");

        generateNextId();

        selectedItemIndex = -1;
    }else {
        Swal.fire({
            icon: "warning",
            title: "No Selection",
            text: "Please select a item to delete."
        });
    }
});

// Select a item by clicking on a table row
$('#item_table').on('click', 'tr', function () {
    selectedItemIndex = $(this).index();
    const selectedItem = item_db[selectedItemIndex];

    $('#item_id').val(selectedItem.item_id);
    $('#item_name').val(selectedItem.itemName);
    $('#category').val(selectedItem.category);
    $('#price').val(selectedItem.price);
    $('#qty_in_stock').val(selectedItem.qtyInStock);
    $('#description').val(selectedItem.description);
});

// Search Item by Name
$('#searchItemButton').on('click', function () {
    const searchTerm = $('#item_search').val();
    let found = false;

    item_db.forEach((item, index) => {
        if (item.itemName === searchTerm) {
            // Match found – fill the form
            $('#item_id').val(item.item_id);
            $('#item_name').val(item.itemName);
            $('#category').val(item.category);
            $('#price').val(item.price);
            $('#qty_in_stock').val(item.qtyInStock);
            $('#description').val(item.description);

            selectedItemIndex = index;
            found = true;
            return;
        }
    });

    if (!found) {
        Swal.fire({
            icon: "error",
            title: "Not Found!",
            text: "No item found with that name."
        });

        // Optionally clear fields
        $('#item_cancel').click();
        selectedItemIndex = -1;
    }
});



