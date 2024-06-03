import { Router } from "express";
import { LOCATION_PATH } from "../constants/paths.constant";
import { LocationController } from "../controllers/location.controller";

export function locationRouter(router: Router) {
  router.get(
    LOCATION_PATH,
    LocationController.getAllLocations.bind(LocationController)
  );
  router.get(
    `${LOCATION_PATH}/:id`,
    LocationController.getLocationById.bind(LocationController)
  );
  router.post(
    LOCATION_PATH,
    LocationController.createLocation.bind(LocationController)
  );
  router.put(
    `${LOCATION_PATH}/:id`,
    LocationController.updateLocation.bind(LocationController)
  );
  router.delete(
    `${LOCATION_PATH}/:id`,
    LocationController.deleteLocation.bind(LocationController)
  );
}
