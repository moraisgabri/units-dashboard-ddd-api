import { CreateUnitDto } from "../../../src/application/dto/create-unit.dto";
import { UnitValidator } from "../../../src/domain/validators/unit.validator";

describe("Unit Validator", () => {
  it("should pass", () => {
    const dto: CreateUnitDto = {
      name: "teste",
    };

    const { isValid, errors } = UnitValidator.validateCreateUnitDto(dto);

    expect(isValid).toBe(true);
    expect(errors).toHaveLength(0);
  });
});
