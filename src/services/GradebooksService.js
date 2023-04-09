import HttpService from "./HttpsService";

class GradebooksService extends HttpService {
  getAll = async (fetchParams) => {
    //const response = await this.client.get(`gradebooks`);
    const response = await this.client.get(`gradebooks?per_page=${fetchParams.loadCount}&filter=${fetchParams.filterParameter}`);

    console.log("Response test GradebooksService getAll:", response);

    return response.data;
  };

  get = async (id) => {
    console.log("ID in gradebookService:",id);
    const response = await this.client.get(`gradebooks/${id}`);
    console.log("response in gradebookService:",response.data);
    return response.data;
  }

  add = async (newGradebook) => {
    console.log("GradbooksService add test:",newGradebook);
    return await this.client.post("gradebooks", newGradebook);
  }
}

const gradebooksService = new GradebooksService();

export default gradebooksService;
