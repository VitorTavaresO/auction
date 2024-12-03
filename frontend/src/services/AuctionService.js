import BaseService from "./BaseService";

class AuctionService extends BaseService {
  constructor() {
    super("auction");
  }

  async uploadImages(formData) {
    return this.api.post("/images/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

export default AuctionService;
