import { Request, Response } from "express";
import { AssetService } from "../../domain/services/asset.service";
import { ASSET_COULD_NOT_BE_DELETED } from "../constants/errors.constant";
import { CreateAssetDto } from "../dto/create-asset.dto";
import { UpdateAssetDto } from "../dto/update-asset.dto";

export class AssetController {
  static async createAsset(req: Request, res: Response): Promise<void> {
    try {
      const assetData: CreateAssetDto = req.body;
      const newAsset = await AssetService.createAsset(assetData);
      res.status(201).json(newAsset);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  static async getAssetById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const asset = await AssetService.getAssetById(id);
      res.status(200).json(asset);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  static async updateAsset(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const assetData: UpdateAssetDto = req.body;
      const updatedAsset = await AssetService.updateAsset(id, assetData);
      res.status(200).json(updatedAsset);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  static async deleteAsset(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const success = await AssetService.deleteAsset(id);
      if (success) {
        res.status(200).json();
      } else {
        res.status(500).json({ error: ASSET_COULD_NOT_BE_DELETED });
      }
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  static async getAllAssets(_req: Request, res: Response): Promise<void> {
    try {
      const Assets = await AssetService.getAllAssets();
      res.status(200).json(Assets);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
