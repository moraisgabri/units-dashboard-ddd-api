import { ValidatorResult } from "../../../types/validator-result.type";
import {
  INVALID_SENSOR_TYPE,
  INVALID_STATUS,
  MISSING_REQUIRED_KEYS_ERROR,
} from "../../application/constants/errors.constant";
import { AssetSensorTypeEnum } from "../enums/asset-sensor-type.enum";
import { CreateAssetDto } from "../../application/dto/create-asset.dto";
import { UpdateAssetDto } from "../../application/dto/update-asset.dto";
import { AssetStatusEnum } from "../enums/asset-status.enum";
import { MainValidator } from "./index.validator";

export class AssetValidator extends MainValidator {
  static validateCreateAssetDto(newAsset: CreateAssetDto): ValidatorResult {
    let isValid = true;
    const errors = [];
    const requiredKeys = ["name", "unitId"];
    const missingRequiredKeys = this.getMissingRequiredKeys(
      newAsset,
      requiredKeys
    );

    if (missingRequiredKeys.length > 0) {
      errors.push(
        `${MISSING_REQUIRED_KEYS_ERROR}${missingRequiredKeys.join(", ")}`
      );
      isValid = false;
    }

    if (
      newAsset.sensorType &&
      !Object.values(AssetSensorTypeEnum).includes(newAsset.sensorType)
    ) {
      errors.push(INVALID_SENSOR_TYPE);
      isValid = false;
    }

    if (
      newAsset.status &&
      !Object.values(AssetStatusEnum).includes(newAsset.status)
    ) {
      errors.push(INVALID_STATUS);
      isValid = false;
    }

    return { isValid, errors };
  }

  static validateUpdateAssetDto(newAsset: UpdateAssetDto): ValidatorResult {
    let isValid = true;
    const errors = [];

    if (
      newAsset.sensorType &&
      !Object.values(AssetSensorTypeEnum).includes(newAsset.sensorType)
    ) {
      errors.push(INVALID_SENSOR_TYPE);
      isValid = false;
    }

    if (
      newAsset.status &&
      !Object.values(AssetStatusEnum).includes(newAsset.status)
    ) {
      errors.push(INVALID_SENSOR_TYPE);
      isValid = false;
    }

    return { isValid, errors };
  }
}
