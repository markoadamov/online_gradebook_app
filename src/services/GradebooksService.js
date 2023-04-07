import HttpService from "./HttpsService";

class GradebooksService extends HttpService {
  getAll = async () => {
    const response = await this.client.get(`gradebooks`);

    console.log("Response test:", response);

    return response.data;
  };
}

const gradebooksService = new GradebooksService();

export default gradebooksService;
