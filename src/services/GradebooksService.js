import HttpService from "./HttpsService";

class GradebooksService extends HttpService {
  getAll = async (fetchParams) => {
    const response = await this.client.get(`gradebooks?per_page=${fetchParams.loadCount}&filter=${fetchParams.filterParameter}`);
    return response.data;
  };

  get = async (id) => {
    const response = await this.client.get(`gradebooks/${id}`);
    return response.data;
  }

  add = async (newGradebook) => {
    return await this.client.post("gradebooks", newGradebook);
  }

  edit = async (data) => {
    return await this.client.put(`gradebooks/${data.gradebook_id}`, data.gradebookToAdd);
  }

  delete = async (id) => {
    return await this.client.delete(`gradebooks/${id}`);
  }
}

const gradebooksService = new GradebooksService();

export default gradebooksService;
