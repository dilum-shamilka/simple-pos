// File: ../model/ItemModel.js

export default class ItemModel {
    constructor(item_id, itemName, category, price, qtyInStock, description) {
        // FIX: Using 'item_id' parameter to set the property.
        this.item_id = item_id;
        this.itemName = itemName;
        this.category = category;
        this.price = price;
        this.qtyInStock = qtyInStock;
        this.description = description;
    }
}