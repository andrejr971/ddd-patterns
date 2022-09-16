import { EventHandlerInterface } from "./event-handle.interface";
import { EventInterface } from "./event.interface";

export interface EventDispatcherInterface {
  notify(event: EventInterface): void;
  register(eventName: string, eventHandler: EventHandlerInterface): void;
  unregister(eventName: string, eventHandler: EventHandlerInterface): void;
}