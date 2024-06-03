import { ObjectId } from "mongodb";

export class Unit {
  _id: ObjectId;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(unit: Partial<Unit>) {
    this._id = unit._id ?? new ObjectId();
    this.name = unit.name ?? "";
    this.createdAt = unit.createdAt ?? new Date();
    this.updatedAt = unit.updatedAt ?? new Date();
  }
}
