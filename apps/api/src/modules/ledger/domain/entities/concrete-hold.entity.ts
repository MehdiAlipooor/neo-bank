import { Hold } from "./hold.entity";

export class ConcreteHold extends Hold {
  release(): void {
    this.status = "RELEASED";
  }

  consume(): void {
    this.status = "CONSUMED";
  }
}
