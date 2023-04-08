import HttpService from "./HttpsService";

class TeachersService extends HttpService {
  getAll = async (fetchParams) => {
    // const response = await this.client.get(`teachers`);
    const response = await this.client.get(`teachers?per_page=${fetchParams.loadCount}&filter=${fetchParams.filterParameter}`);

    //console.log("Teachers Response test:", response);
    //console.log("Teschers getAll response.data:", response.data);

    return response.data;
  };
}

const teachersService = new TeachersService();

export default teachersService;
