import { CustomerRepositoryInterface } from "../../../domain/customers/repositories/customer-repository.interface";
import { InputFindCustomerDTO, OutputFindCustomerDTO } from "./find.customer.dto";

export class FindCustomerUseCase {
  constructor(
    private customerRepository: CustomerRepositoryInterface
  ) {}

  async execute({ id }: InputFindCustomerDTO): Promise<OutputFindCustomerDTO> {
    const customer = await this.customerRepository.find(id);

    if (!customer) {
      throw new Error('Customer not found')
    }

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address.street,
        city: customer.Address.city,
        number: customer.Address.number,
        zip: customer.Address.zip,
      },
    };
  }
}