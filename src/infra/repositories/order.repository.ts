import { Order } from "../../domain/order/entities/order";
import { OrderItem } from "../../domain/order/entities/order-item";
import { OrderRepositoryInterface } from "../../domain/order/repositories/order-repository.interface";
import {OrderItemModel} from "../typeorm/sequelize/models/order-item.model";
import { OrderModel } from "../typeorm/sequelize/models/order.model";

export class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    console.log(entity);
    await OrderModel.update(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        where: { id: entity.id },
      }
    );
  }

  async find(id: string): Promise<Order | null> {
    const orderFind = await OrderModel.findOne({ where: { id }, include: [{
      model: OrderItemModel
    }]})

    return new Order(
        orderFind!.id, 
        orderFind!.customer_id, 
        orderFind!.items.map(item => new OrderItem(
          item.id, 
          item.name,
          item.price,
          item.product_id,
          item.quantity
        )));
  }

  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({ include: [{
      model: OrderItemModel
    }]})

    return orders.map(order => new Order(
      order!.id, 
      order!.customer_id, 
      order!.items.map(item => new OrderItem(
        item.id, 
        item.name,
        item.price,
        item.product_id,
        item.quantity
      )))
    );
  }
}