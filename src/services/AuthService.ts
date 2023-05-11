import ApiService from "./ApiService";

class AuthService extends ApiService {
  private static instance: ApiService | null = null;

  private constructor() {
    super();
  }

  static getInstance(): AuthService {
    if (this.instance) return this.instance as AuthService;

    this.instance = new AuthService();
    return this.instance as AuthService;
  }

  async authenticateUser(username: string, password: string): Promise<{ token: string }> {
    return { token: "THIS IS NOT A TOKEN" }
  };
}

export default AuthService