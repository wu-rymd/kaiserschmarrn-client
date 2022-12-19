import { NftModel } from "../models";
import { SERVER_URL } from "../Config";

export class NftProvider {
  readonly accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  async list(): Promise<{
    nfts: Array<NftModel>;
    count: number;
  }> {
    // TODO handle failures
    const res = await fetch(`${SERVER_URL}/nfts`, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${this.accessToken}`,
      }),
    });
    const jsonRes = await res.json();
    const nfts = jsonRes.map((s: NftModel) => new NftModel(s));
    const count = jsonRes.count;
    return Promise.resolve({ nfts, count });
  }

  async get(nftId: string): Promise<NftModel> {
    const res = await fetch(`${SERVER_URL}/nfts/${nftId}`, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${this.accessToken}`,
      }),
    });
    const jsonRes = await res.json();
    const nft = new NftModel(jsonRes);
    return nft;
  }

  // TODO: update nft price
}
