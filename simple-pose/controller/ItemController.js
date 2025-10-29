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
