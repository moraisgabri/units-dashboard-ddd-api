import { UnitRepository } from "../../infrastructure/repositories/unit.repository";
import { CreateUnitDto } from "../../application/dto/create-unit.dto";
import { Unit } from "../../infrastructure/models/unit.model";
import { UnitValidator } from "../validators/unit.validator";
import { UpdateUnitDto } from "../../application/dto/update-unit.dto";
import {
  INVALID_ID_PARAM_ERROR,
  UNIT_NOT_FOUND_ERROR,
} from "../../application/constants/errors.constant";

export class UnitService {
  static async createUnit(newUnit: CreateUnitDto): Promise<Unit> {
    const { isValid, errors } = UnitValidator.validateCreateUnitDto(newUnit);

    if (!isValid) {
      throw new Error(...errors);
    }

    const unitId = await UnitRepository.create(newUnit);
    return this.getUnitById(unitId.toHexString()) as Promise<Unit>;
  }

  static async getUnitById(id: string): Promise<Unit | null> {
    return await UnitRepository.findById(id);
  }

  static async updateUnit(
    id: string,
    updatedUnit: UpdateUnitDto
  ): Promise<any> {
    const { isValid, errors } =
      UnitValidator.validateUpdateUnitDto(updatedUnit);

    if (!isValid) {
      throw new Error(...errors);
    }

    const unit = await UnitRepository.findById(id);

    if (!unit) {
      throw new Error(UNIT_NOT_FOUND_ERROR);
    }

    return await UnitRepository.update(id, updatedUnit);
  }

  static async deleteUnit(id: string): Promise<boolean> {
    if (!id) {
      throw new Error(INVALID_ID_PARAM_ERROR);
    }

    const unit = await UnitRepository.findById(id);

    if (!unit) {
      throw new Error(UNIT_NOT_FOUND_ERROR);
    }

    return await UnitRepository.delete(id);
  }

  static async getAllUnits(): Promise<Unit[]> {
    return await UnitRepository.findAll();
  }
}
