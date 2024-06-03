import { WithId } from "mongodb";
import { LocationRepository } from "../../infrastructure/repositories/location.repository";
import { UnitRepository } from "../../infrastructure/repositories/unit.repository";
import { UpdateLocationDto } from "../../application/dto/update-location.dto";
import { Location } from "../../infrastructure/models/location.model";
import {
  INVALID_ID_PARAM_ERROR,
  LOCATION_NOT_FOUND_ERROR,
  PARENT_LOCATION_NOT_FOUND_ERROR,
  UNIT_NOT_FOUND_ERROR,
} from "../../application/constants/errors.constant";
import { LocationValidator } from "../validators/location.validator";
import { CreateLocationDto } from "../../application/dto/create-location.dto";

export class LocationService {
  static async createLocation(
    newLocation: CreateLocationDto
  ): Promise<Location> {
    const { isValid, errors } =
      LocationValidator.validateCreateLocationDto(newLocation);

    if (!isValid) {
      throw new Error(...errors);
    }

    const unit = await UnitRepository.findById(newLocation.unitId);

    if (!unit) {
      throw new Error(UNIT_NOT_FOUND_ERROR);
    }

    if (newLocation.parentId) {
      const parentLocation = await LocationRepository.findById(
        newLocation.parentId
      );

      if (!parentLocation) {
        throw new Error(PARENT_LOCATION_NOT_FOUND_ERROR);
      }
    }

    const locationId = await LocationRepository.create(newLocation);
    return this.getLocationById(locationId.toHexString()) as Promise<Location>;
  }

  static async getLocationById(id: string): Promise<Location | null> {
    if (!id) {
      throw new Error(INVALID_ID_PARAM_ERROR);
    }

    const location = await LocationRepository.findById(id);

    if (!location) {
      throw new Error(LOCATION_NOT_FOUND_ERROR);
    }

    return location;
  }

  static async updateLocation(
    id: string,
    updatedLocation: UpdateLocationDto
  ): Promise<WithId<Location>> {
    if (!id) {
      throw new Error(INVALID_ID_PARAM_ERROR);
    }

    const location = await LocationRepository.findById(id);
    console.log(location);

    if (!location) {
      throw new Error(LOCATION_NOT_FOUND_ERROR);
    }

    const { isValid, errors } =
      LocationValidator.validateCreateLocationDto(location);

    if (!isValid) {
      throw new Error(...errors);
    }

    if (updatedLocation.parentId) {
      const parentLocation = await LocationRepository.findById(
        updatedLocation.parentId
      );

      if (!parentLocation) {
        throw new Error(PARENT_LOCATION_NOT_FOUND_ERROR);
      }
    }

    if (updatedLocation.unitId) {
      const unit = await UnitRepository.findById(updatedLocation.unitId);

      if (!unit) {
        throw new Error(UNIT_NOT_FOUND_ERROR);
      }
    }
    return (await LocationRepository.update(
      id,
      updatedLocation
    )) as WithId<Location>;
  }

  static async deleteLocation(id: string): Promise<boolean> {
    if (!id) {
      throw new Error(INVALID_ID_PARAM_ERROR);
    }

    const location = await LocationRepository.findById(id);

    if (!location) {
      throw new Error(LOCATION_NOT_FOUND_ERROR);
    }

    return await LocationRepository.delete(id);
  }

  static async getAllLocations(): Promise<Location[]> {
    return await LocationRepository.findAll();
  }
}
