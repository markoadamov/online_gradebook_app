import HttpService from "./HttpsService";

class TeachersService extends HttpService {
  getAll = async (
    fetchParams = {
      loadCount: "",
      filterParameter: "",
      onlyFree: 0,
    }
  ) => {
    const response = await this.client.get(
      `teachers?per_page=${fetchParams.loadCount}&filter=${fetchParams.filterParameter}&only_free=${fetchParams.onlyFree}`
    );
    return response.data;
  };

  get = async (id) => {
    const response = await this.client.get(`teachers/${id}`);
    return response.data;
  };
}

const teachersService = new TeachersService();

export default teachersService;
