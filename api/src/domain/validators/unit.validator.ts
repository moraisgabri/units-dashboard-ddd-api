import { MainValidator } from "./index.validator";
import { CreateUnitDto } from "../../application/dto/create-unit.dto";
import { UpdateUnitDto } from "../../application/dto/update-unit.dto";
import { ValidatorResult } from "../../../types/validator-result.type";
import { MISSING_REQUIRED_KEYS_ERROR } from "../../application/constants/errors.constant";

export class UnitValidator extends MainValidator {
  static validateCreateUnitDto(unit: CreateUnitDto): ValidatorResult {
    const requiredFields = ["name"];

    const missingKeys = this.getMissingRequiredKeys(unit, requiredFields);

    const isValid = missingKeys.length === 0;

    return {
      isValid,
      errors: !isValid
        ? [`${MISSING_REQUIRED_KEYS_ERROR}${missingKeys.join(", ")}`]
        : [],
    };
  }

  static validateUpdateUnitDto(unit: UpdateUnitDto): ValidatorResult {
    const requiredFields = ["name"];

    const missingKeys = this.getMissingRequiredKeys(unit, requiredFields);
    const isValid = missingKeys.length === 0;

    return {
      isValid,
      errors: !isValid
        ? [`${MISSING_REQUIRED_KEYS_ERROR}${missingKeys.join(", ")}`]
        : [],
    };
  }
}
