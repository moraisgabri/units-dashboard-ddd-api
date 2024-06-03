import { ObjectId, WithId } from "mongodb";
import { database } from "../database/mongo.provider";
import { LOCATIONS_COLLECTION } from "../../application/constants/collections.constant";
import { UpdateUnitDto } from "../../application/dto/update-unit.dto";
import { CreateLocationDto } from "../../application/dto/create-location.dto";
import { Location } from "../models/location.model";

export class LocationRepository {
  static async getCollection() {
    const db = await database.getDb();
    return db.collection<Location>(LOCATIONS_COLLECTION);
  }

  static async create(newLocation: CreateLocationDto): Promise<ObjectId> {
    const db = await this.getCollection();
    const result = await db.insertOne({
      _id: new ObjectId(),
      name: newLocation.name,
      parentId: newLocation.parentId ?? null,
      unitId: newLocation.unitId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return result.insertedId;
  }

  static async findById(id: string): Promise<Location | null> {
    const db = await this.getCollection();
    const location = await db.findOne({ _id: new ObjectId(id) });
    return location ? new Location(location) : null;
  }

  static async update(
    id: string,
    updatedLocation: UpdateUnitDto
  ): Promise<WithId<Location> | null> {
    const db = await this.getCollection();
    const result = await db.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updatedLocation,
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

  static async findAll(): Promise<Location[]> {
    const db = await this.getCollection();
    const locations = await db.find().toArray();
    return locations.map((location) => new Location(location));
  }
}
