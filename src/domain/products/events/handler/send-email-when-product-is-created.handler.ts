import { EventHandlerInterface } from "../../../shared/events/event-handle.interface";
import ProductCreatedEvent from "../product-created.event";


export class SendEmailWhenProductIsCreatedHandler
  implements EventHandlerInterface<ProductCreatedEvent>
{
  handle(event: ProductCreatedEvent): void {
    console.log(`Sending email to .....`); 
  }
}