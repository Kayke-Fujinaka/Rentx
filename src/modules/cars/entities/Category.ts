import { randomUUID } from "node:crypto";
import { Entity } from "typeorm";

@Entity("categories")
class Category {
  id?: string;
  name: string;
  description: string;
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}

export { Category };
