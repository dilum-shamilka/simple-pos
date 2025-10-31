// File: model/OrderModel.js

export default class OrderModel{
    // Simplified the model, removing the redundant qtyInStock field
    constructor(order_id, date, cust_id, cust_name, address ,item_id, item_name ,price, orderQty){
        this.order_id = order_id;
        this.date = date;
        this.cust_id = cust_id;
        this.cust_name = cust_name;
        this.address = address;
        this.item_id = item_id;
        this.item_name = item_name;
        this.price = price;       // Price at the time of order
        this.orderQty = orderQty; // Quantity ordered
    }
}