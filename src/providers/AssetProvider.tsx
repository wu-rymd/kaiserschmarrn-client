import { AssetModel } from "../models";

export class AssetProvider {
  readonly accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  async list(): Promise<{
    assets: Array<AssetModel>;
    count: number;
  }> {
    // TODO handle failures
    const res = await fetch(`http://localhost:8080/assets`, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${this.accessToken}`,
      }),
    });
    const jsonRes = await res.json();
    const assets = jsonRes.map((s: AssetModel) => new AssetModel(s));
    const count = jsonRes.count;
    return Promise.resolve({ assets, count });
  }

  async get(assetId: string): Promise<AssetModel> {
    const res = await fetch(`http://localhost:8080/assets/${assetId}`, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${this.accessToken}`,
      }),
    });
    const jsonRes = await res.json();
    const asset = new AssetModel(jsonRes);
    return asset;
  }

  // TODO: update asset price
}
