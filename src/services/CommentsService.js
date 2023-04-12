import HttpService from "./HttpsService";

class CommentsService extends HttpService {
  getAll = async (id) => {
    const response = await this.client.get(`comments?gradebook_id=${id}`);
    return response.data;
  };

  add = async (newComment) => {
    return await this.client.post("comments", newComment);
  }

  delete = async (id) => {
    return await this.client.delete(`comments/${id}`);
  }
}

const commentsService = new CommentsService();

export default commentsService;
