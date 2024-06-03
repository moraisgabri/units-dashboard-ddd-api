import { ObjectId, WithId } from "mongodb";
import { database } from "../database/mongo.provider";
import { CreateUnitDto } from "../../application/dto/create-unit.dto";
import { Unit } from "../models/unit.model";
import { UNITS_COLLECTION } from "../../application/constants/collections.constant";
import { UpdateUnitDto } from "../../application/dto/update-unit.dto";

export class UnitRepository {
  static async getCollection() {
    const db = await database.getDb();
    return db.collection<Unit>(UNITS_COLLECTION);
  }

  static async create(unit: CreateUnitDto): Promise<ObjectId> {
    const db = await this.getCollection();
    const result = await db.insertOne({
      _id: new ObjectId(),
      name: unit.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return result.insertedId;
  }

  static async findById(id: string): Promise<Unit | null> {
    const db = await this.getCollection();
    const unit = await db.findOne({ _id: new ObjectId(id) });
    return unit ? new Unit(unit) : null;
  }

  static async update(
    id: string,
    updatedUnit: UpdateUnitDto
  ): Promise<WithId<Unit> | null> {
    const db = await this.getCollection();
    const result = await db.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          name: updatedUnit.name,
          updatedAt: new Date(),
        },
      }
    );
    return result;
  }

  static async delete(id: string): Promise<boolean> {
    const db = await this.getCollection();
    const result = await db.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  }

  static async findAll(): Promise<Unit[]> {
    const db = await this.getCollection();
    const units = await db.find().toArray();
    return units.map((unit) => new Unit(unit));
  }
}
