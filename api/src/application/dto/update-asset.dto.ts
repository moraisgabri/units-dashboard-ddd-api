import { AssetSensorTypeEnum } from "../../domain/enums/asset-sensor-type.enum";
import { AssetStatusEnum } from "../../domain/enums/asset-status.enum";

export interface UpdateAssetDto {
  name: string;
  unitId: string;
  locationId: string | null;
  parentId: string | null;
  sensorType: AssetSensorTypeEnum | null;
  status: AssetStatusEnum | null;
}
