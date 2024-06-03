import { ObjectId, WithId } from "mongodb";
import { database } from "../database/mongo.provider";
import { ASSETS_COLLECTION } from "../../application/constants/collections.constant";
import { CreateAssetDto } from "../../application/dto/create-asset.dto";
import { UpdateAssetDto } from "../../application/dto/update-asset.dto";
import { Asset } from "../models/asset.model";

export class AssetRepository {
  static async getCollection() {
    const db = await database.getDb();
    return db.collection<Asset>(ASSETS_COLLECTION);
  }

  static async create(newAsset: CreateAssetDto): Promise<ObjectId> {
    const db = await this.getCollection();
    const result = await db.insertOne({
      _id: new ObjectId(),
      name: newAsset.name,
      unitId: newAsset.unitId,
      parentId: newAsset?.parentId ?? null,
      locationId: newAsset?.locationId ?? null,
      sensorType: newAsset?.sensorType ?? null,
      status: newAsset.status ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return result.insertedId;
  }

  static async findById(id: string): Promise<Asset | null> {
    const db = await this.getCollection();
    const unit = await db.findOne({ _id: new ObjectId(id) });
    return unit ? new Asset(unit) : null;
  }

  static async update(
    id: string,
    updatedAsset: UpdateAssetDto
  ): Promise<WithId<Asset> | null> {
    const db = await this.getCollection();
    const result = await db.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updatedAsset,
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

  static async findAll(): Promise<Asset[]> {
    const db = await this.getCollection();
    const assets = await db.find().toArray();
    return assets.map((unit) => new Asset(unit));
  }
}
