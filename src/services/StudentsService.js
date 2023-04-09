import HttpService from "./HttpsService";

class StudentsService extends HttpService {
  getAll = async (fetchParams) => {
    const response = await this.client.get(`students?per_page=${fetchParams.loadCount}&filter=${fetchParams.filterParameter}`);

    console.log("getAllStudents response:", response);
    return response.data;
  };
}

const studentsService = new StudentsService();

export default studentsService;
