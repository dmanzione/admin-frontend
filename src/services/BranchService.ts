import Branch from "../types/Branch";
import ApiService, { RequestType } from "./ApiService";

export default class BranchService extends ApiService {
  private static instance: ApiService | null = null;

  private constructor() {
    super();
  }

  static getInstance(): BranchService {
    if (this.instance) return this.instance as BranchService;

    this.instance = new BranchService();
    return this.instance as BranchService;
  }

  async getBranches(): Promise<Branch[]> {
    return this.request("branches");
  }

  async getBranch(uid: string): Promise<Branch> {
    return this.request("branches/" + uid);
  }

  async sortBranches(sort: string, asc: boolean): Promise<Branch[]> {
    let sortUrl;
    if (sort == " ") {
      sortUrl = "branches";
    } else {
      sortUrl = "branches?sort=" + sort + (asc ? "" : "&order=2");
    }
    return this.request(sortUrl);
  }

  async postBranch(bran: Branch): Promise<Branch> {
    return this.request("branches", bran, RequestType.POST);
  }

  async putBranch(bran: Branch) {
    return this.request("branches/" + bran.uid, bran, RequestType.PUT);
  }

  async delBranch(bran: Branch) {
    return this.request("branches/" + bran.uid, {}, RequestType.DELETE);
  }
}
