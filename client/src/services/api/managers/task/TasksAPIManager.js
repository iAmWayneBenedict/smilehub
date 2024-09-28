/* eslint-disable no-unused-vars */
import APIMethods from "../../APIMethods";
import END_POINTS from "../../EndPoints";
import { queryHandler } from "../../utils";
/**
 * A class that provides static methods for authentication-related API requests.
 */
class TasksAPIManager {
	static async postAddTask(body = {}) {
		return await APIMethods.post(END_POINTS.POST_ADD_NEW_TASK(), body);
	}
	static async postEditTask(body = {}) {
		return await APIMethods.post(END_POINTS.POST_EDIT_TASK(), body);
	}
	static async postDeleteTask(body = {}) {
		return await APIMethods.post(END_POINTS.POST_DELETE_TASK(), body);
	}
	static async getTask(body = {}) {
		return await APIMethods.post(END_POINTS.GET_TASK(), body);
	}
	static async getTasks(body = {}) {
		return await APIMethods.get(END_POINTS.GET_TASKS(queryHandler(body)));
	}
}

export default TasksAPIManager;
