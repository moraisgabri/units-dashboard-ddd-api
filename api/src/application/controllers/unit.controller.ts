import { Request, Response } from "express";
import { UnitService } from "../../domain/services/unit.service";
import { CreateUnitDto } from "../dto/create-unit.dto";
import { Error } from "../../../types/erro.type";

export class UnitController {
  static async createUnit(req: Request, res: Response) {
    try {
      const unitData: CreateUnitDto = req.body;
      const unit = await UnitService.createUnit(unitData);
      res.status(201).json(unit);
    } catch (error) {
      res.status(400).json({ error: (error as Error)?.message });
    }
  }

  static async getAllUnits(_req: Request, res: Response) {
    try {
      const units = await UnitService.getAllUnits();
      res.status(200).json(units);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  static async getUnitById(req: Request, res: Response) {
    try {
      const unit = await UnitService.getUnitById(req.params.id);
      res.status(200).json(unit);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  static async updateUnit(req: Request, res: Response) {
    try {
      const unit = await UnitService.updateUnit(req.params.id, req.body);
      res.status(200).json(unit);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  static async deleteUnit(req: Request, res: Response) {
    try {
      await UnitService.deleteUnit(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}
