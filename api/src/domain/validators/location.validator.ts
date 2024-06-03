import { MISSING_REQUIRED_KEYS_ERROR } from "../../application/constants/errors.constant";
import { ValidatorResult } from "../../../types/validator-result.type";
import { MainValidator } from "./index.validator";

export class LocationValidator extends MainValidator {
  static validateCreateLocationDto(location: any): ValidatorResult {
    const requiredKeys = ["name", "unitId"];
    const missingKeys = this.getMissingRequiredKeys(
      location,
      requiredKeys
    ) as string[];
    const errors: string[] = [];
    let isValid = true;

    if (!missingKeys.length) {
      isValid = false;
      errors.push(MISSING_REQUIRED_KEYS_ERROR + missingKeys.join(", "));
    }

    return {
      isValid,
      errors,
    };
  }

  static validateUpdateLocationDto(location: any): ValidatorResult {
    const requiredKeys = ["name", "unitId"];
    const missingKeys = this.getMissingRequiredKeys(location, requiredKeys);
    const errors: string[] = [];
    let isValid = true;

    if (!missingKeys.length) {
      isValid = false;
      errors.push(MISSING_REQUIRED_KEYS_ERROR + missingKeys.join(", "));
    }

    return {
      isValid,
      errors,
    };
  }
}
