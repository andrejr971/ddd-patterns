import { Sequelize } from "sequelize-typescript";
import { Customer } from "../../../domain/customers/entities/customer";
import { Address } from "../../../domain/customers/value-object/address";
import { CustomerModel } from "../../../infra/customers/typeorm/customer.model";
import { CustomerRepository } from "../../../infra/customers/typeorm/customer.repository";
import { FindCustomerUseCase } from "./find.customer.usecase";

describe("Test find customer use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const usecase = new FindCustomerUseCase(customerRepository);

    const customer = new Customer("123", "John");
    const address = new Address("Street", 123, "Zip", "City");
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const input = {
      id: "123",
    };

    const output = {
      id: "123",
      name: "John",
      address: {
        street: "Street",
        city: "City",
        number: 123,
        zip: "Zip",
      },
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});