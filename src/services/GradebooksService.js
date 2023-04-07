import HttpService from "./HttpsService";

class GradebooksService extends HttpService {
  getAll = async (nextLoadCount) => {
    // const response = await this.client.get(`gradebooks`);
    const response = await this.client.get(`gradebooks?per_page=${nextLoadCount}`);

    console.log("nextLoadCount:", nextLoadCount);
    console.log("Response test:", response);

    return response.data;
  };
}

const gradebooksService = new GradebooksService();

export default gradebooksService;
