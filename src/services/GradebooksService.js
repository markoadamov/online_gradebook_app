import HttpService from "./HttpsService";

class GradebooksService extends HttpService {
  getAll = async (fetchParams) => {
    // const response = await this.client.get(`gradebooks`);
    const response = await this.client.get(`gradebooks?per_page=${fetchParams.loadCount}&filter=${fetchParams.filterParameter}`);

    console.log("nextLoadCount:", fetchParams.nextLoadCount);
    console.log("Response test:", response);

    return response.data;
  };

  get = async (id) => {
    console.log("ID in gradebookService:",id);
    const response = await this.client.get(`gradebooks/${id}`);
    console.log("response in gradebookService:",response.data);
    return response.data;
  }
}

const gradebooksService = new GradebooksService();

export default gradebooksService;
