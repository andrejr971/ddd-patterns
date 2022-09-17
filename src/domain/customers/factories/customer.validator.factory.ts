import { CustomerYupValidator } from "../validations/customer.yup.validator";

export class CustomerValidatorFactory {
  static create() {
    return new CustomerYupValidator();
  }
}