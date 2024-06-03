import { Request, Response } from "express";
import { LocationService } from "../../domain/services/location.service";
import { UpdateLocationDto } from "../dto/update-location.dto";
import { LOCATION_COULD_NOT_BE_DELETED } from "../constants/errors.constant";
import { CreateLocationDto } from "../dto/create-location.dto";

export class LocationController {
  static async createLocation(req: Request, res: Response): Promise<void> {
    try {
      const locationData: CreateLocationDto = req.body;
      const newLocation = await LocationService.createLocation(locationData);
      res.status(201).json(newLocation);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  static async getLocationById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const location = await LocationService.getLocationById(id);
      res.status(200).json(location);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  static async updateLocation(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const locationData: UpdateLocationDto = req.body;
      const updatedLocation = await LocationService.updateLocation(
        id,
        locationData
      );
      res.status(200).json(updatedLocation);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  static async deleteLocation(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const success = await LocationService.deleteLocation(id);
      if (success) {
        res.status(200).json();
      } else {
        res.status(500).json({ error: LOCATION_COULD_NOT_BE_DELETED });
      }
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  static async getAllLocations(req: Request, res: Response): Promise<void> {
    try {
      const locations = await LocationService.getAllLocations();
      res.status(200).json(locations);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
