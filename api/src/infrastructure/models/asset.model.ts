import { ObjectId } from "mongodb";
import { AssetSensorTypeEnum } from "../../domain/enums/asset-sensor-type.enum";
import { AssetStatusEnum } from "../../domain/enums/asset-status.enum";

export class Asset {
  _id: ObjectId;
  name: string;
  parentId: string | null;
  locationId: string | null;
  unitId: string;
  sensorType: AssetSensorTypeEnum | null;
  status: AssetStatusEnum | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(assets: Partial<Asset>) {
    this._id = assets?._id ?? new ObjectId();
    this.name = assets?.name ?? "";
    this.sensorType = assets?.sensorType ?? null;
    this.status = assets?.status ?? null;
    this.locationId = assets?.locationId ?? null;
    this.parentId = assets?.parentId ?? null;
    this.createdAt = assets?.createdAt ?? new Date();
    this.updatedAt = assets?.updatedAt ?? new Date();

    return this;
  }
}
