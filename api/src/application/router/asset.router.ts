import { Router } from "express";
import { ASSET_PATH } from "../constants/paths.constant";
import { AssetController } from "../controllers/asset.controller";

export function assetRouter(router: Router) {
  router.get(ASSET_PATH, AssetController.getAllAssets.bind(AssetController));
  router.get(
    `${ASSET_PATH}/:id`,
    AssetController.getAssetById.bind(AssetController)
  );
  router.post(ASSET_PATH, AssetController.createAsset.bind(AssetController));
  router.put(
    `${ASSET_PATH}/:id`,
    AssetController.updateAsset.bind(AssetController)
  );
  router.delete(
    `${ASSET_PATH}/:id`,
    AssetController.deleteAsset.bind(AssetController)
  );
}
