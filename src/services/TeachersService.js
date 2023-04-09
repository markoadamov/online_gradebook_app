import HttpService from "./HttpsService";

class TeachersService extends HttpService {
  getAll = async (fetchParams = {
    loadCount: "",
    filterParameter: "",
    onlyFree: 0
  }) => {
    // const response = await this.client.get(`teachers`);
    console.log("Fetch params:", fetchParams);
    const response = await this.client.get(`teachers?per_page=${fetchParams.loadCount}&filter=${fetchParams.filterParameter}&only_free=${fetchParams.onlyFree}`);

    //console.log("Teachers Response test:", response);
    //console.log("Teschers getAll response.data:", response.data);

    return response.data;
  };

  get = async (id) => {
    console.log("ID in teacherService:",id);
    const response = await this.client.get(`teachers/${id}`);
    console.log("response in teacherService:",response.data);
    return response.data;
  }
}

const teachersService = new TeachersService();

export default teachersService;
