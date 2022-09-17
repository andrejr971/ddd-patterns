import { CustomerRepositoryInterface } from "../../../domain/customers/repositories/customer-repository.interface";
import { Address } from "../../../domain/customers/value-object/address";
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from "./update.customer.dto";

export class UpdateCustomerUseCase {
  private CustomerRepository: CustomerRepositoryInterface;
  constructor(CustomerRepository: CustomerRepositoryInterface) {
    this.CustomerRepository = CustomerRepository;
  }

  async execute(
    input: InputUpdateCustomerDto
  ): Promise<OutputUpdateCustomerDto> {
    const customer = await this.CustomerRepository.find(input.id);

    if (!customer) {
      throw new Error('Customer not found');
    }

    customer.changeName(input.name);
    customer.changeAddress(
      new Address(
        input.address.street,
        input.address.number,
        input.address.zip,
        input.address.city
      )
    );
    await this.CustomerRepository.update(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address.street,
        number: customer.Address.number,
        zip: customer.Address.zip,
        city: customer.Address.city,
      },
    };
  }
}