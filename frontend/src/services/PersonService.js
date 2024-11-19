import BaseService from "./BaseService";

class PersonService extends BaseService {
  constructor() {
    super("person");
  }

  async login(credentials) {
    const response = await this.api.post(`${this.endPoint}/login`, credentials);
    return response.data;
  }

  async register(data) {
    const response = await this.api.post(`${this.endPoint}`, data);
    return response.data;
  }

  async sendValidationCode(email) {
    const response = await this.api.post(
      `${this.endPoint}/send-validation-code`,
      { email }
    );
    return response.data;
  }

  async recoveryPassword(data) {
    const response = await this.api.post(
      `${this.endPoint}/recovery-password`,
      data
    );
    return response.data;
  }
}

export default PersonService;
