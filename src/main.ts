import { Customer } from "./domain/customers/entities/customer";
import { Address } from "./domain/customers/value-object/address";
import { Order } from "./domain/order/entities/order";
import { OrderItem } from "./domain/order/entities/order-item";


let customer = new Customer('123', 'André');
const address = new Address('Rua dois', 2, '1234-000', 'São Paulo');
customer.Address = address;
customer.activate();

const item1 = new OrderItem('1', 'Item 1', 10, 'productId', 1);
const item2 = new OrderItem('2', 'Item 2', 20, 'productId', 3);

const order = new Order('1', '123', [item1, item2]);