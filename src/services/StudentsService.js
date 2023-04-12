import HttpService from "./HttpsService";

class StudentsService extends HttpService {
  getAll = async (id) => {
    const response = await this.client.get(`students?gradebook_id=${id}`);
    return response.data;
  };

  add = async (newStudent) => {
    return await this.client.post("students", newStudent);
  }

  delete = async (id) => {
    return await this.client.delete(`students/${id}`);
  }
}

const studentsService = new StudentsService();

export default studentsService;
