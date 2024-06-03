import { WithId } from "mongodb";
import { Asset } from "../../infrastructure/models/asset.model";
import { Location } from "../../infrastructure/models/location.model";
import { AssetRepository } from "../../infrastructure/repositories/asset.repository";
import { LocationRepository } from "../../infrastructure/repositories/location.repository";
import { UnitRepository } from "../../infrastructure/repositories/unit.repository";
import {
  ASSET_NOT_FOUND_ERROR,
  INVALID_ID_PARAM_ERROR,
  PARENT_ASSET_NOT_FOUND_ERROR,
  PARENT_LOCATION_NOT_FOUND_ERROR,
  UNIT_NOT_FOUND_ERROR,
} from "../../application/constants/errors.constant";
import { AssetValidator } from "../validators/asset.validator";
import { CreateAssetDto } from "../../application/dto/create-asset.dto";
import { UpdateAssetDto } from "../../application/dto/update-asset.dto";

export class AssetService {
  static async createAsset(newAsset: CreateAssetDto) {
    const { isValid, errors } = AssetValidator.validateCreateAssetDto(newAsset);

    if (!isValid) {
      throw new Error(...errors);
    }

    if (newAsset.parentId) {
      const parentAsset = await AssetRepository.findById(newAsset.parentId);

      if (!parentAsset) {
        throw new Error(PARENT_ASSET_NOT_FOUND_ERROR);
      }
    }

    if (newAsset.locationId) {
      const parentLocation = await LocationRepository.findById(
        newAsset.locationId
      );

      if (!parentLocation) {
        throw new Error(PARENT_LOCATION_NOT_FOUND_ERROR);
      }
    }

    const insertedId = await AssetRepository.create(newAsset);
    return AssetRepository.findById(insertedId.toHexString());
  }

  static async getAssetById(id: string): Promise<Asset | null> {
    if (!id) {
      throw new Error(INVALID_ID_PARAM_ERROR);
    }

    const asset = await AssetRepository.findById(id);

    if (!asset) {
      throw new Error(ASSET_NOT_FOUND_ERROR);
    }

    return asset;
  }

  static async updateAsset(
    id: string,
    updatedAsset: UpdateAssetDto
  ): Promise<WithId<Asset>> {
    if (!id) {
      throw new Error(INVALID_ID_PARAM_ERROR);
    }

    const { isValid, errors } =
      AssetValidator.validateCreateAssetDto(updatedAsset);

    if (!isValid) {
      throw new Error(...errors);
    }

    const asset = await AssetRepository.findById(id);

    if (!asset) {
      throw new Error(ASSET_NOT_FOUND_ERROR);
    }

    if (!isValid) {
      throw new Error(...errors);
    }

    if (updatedAsset.parentId) {
      const parentAsset = await AssetRepository.findById(updatedAsset.parentId);

      if (!parentAsset) {
        throw new Error(PARENT_ASSET_NOT_FOUND_ERROR);
      }
    }

    if (updatedAsset.locationId) {
      const parentLocation = await LocationRepository.findById(
        updatedAsset.locationId
      );

      if (!parentLocation) {
        throw new Error(PARENT_LOCATION_NOT_FOUND_ERROR);
      }
    }

    if (updatedAsset.unitId) {
      const unit = await UnitRepository.findById(updatedAsset.unitId);

      if (!unit) {
        throw new Error(UNIT_NOT_FOUND_ERROR);
      }
    }

    return (await AssetRepository.update(id, updatedAsset)) as WithId<Asset>;
  }

  static async deleteAsset(id: string): Promise<boolean> {
    if (!id) {
      throw new Error(INVALID_ID_PARAM_ERROR);
    }

    const asset = await AssetRepository.findById(id);

    if (!asset) {
      throw new Error(ASSET_NOT_FOUND_ERROR);
    }

    return await AssetRepository.delete(id);
  }

  static async getAllAssets(): Promise<Asset[]> {
    return await AssetRepository.findAll();
  }
}
