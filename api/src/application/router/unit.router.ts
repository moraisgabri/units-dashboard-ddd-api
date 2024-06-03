import { Router } from "express";
import { database } from "../../infrastructure/database/mongo.provider";
import { UNIT_PATH } from "../constants/paths.constant";
import { UnitService } from "../../domain/services/unit.service";
import { UnitController } from "../controllers/unit.controller";

export function unitRouter(router: Router) {
  router.get(UNIT_PATH, UnitController.getAllUnits.bind(UnitController));
  router.get(
    `${UNIT_PATH}/:id`,
    UnitController.getUnitById.bind(UnitController)
  );
  router.post(UNIT_PATH, UnitController.createUnit.bind(UnitController));
  router.put(
    `${UNIT_PATH}/:id`,
    UnitController.updateUnit.bind(UnitController)
  );
  router.delete(
    `${UNIT_PATH}/:id`,
    UnitController.deleteUnit.bind(UnitController)
  );
}
