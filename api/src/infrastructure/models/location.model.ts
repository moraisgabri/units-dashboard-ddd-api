import { ObjectId } from "mongodb";

export class Location {
  _id: ObjectId;
  name: string;
  parentId: string | null;
  unitId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(location: Partial<Location>) {
    this._id = location._id ?? new ObjectId();
    this.name = location.name ?? "";
    this.unitId = location.unitId ?? "";
    this.parentId = location.parentId ?? null;
    this.createdAt = location.createdAt ?? new Date();
    this.updatedAt = location.updatedAt ?? new Date();
  }
}
