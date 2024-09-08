/* eslint-disable no-unused-vars */
import APIMethods from "../../APIMethods";
import END_POINTS from "../../EndPoints";
/**
 * A class that provides static methods for authentication-related API requests.
 */
class EmployeesAPIManager {
	static async postAddEmployee(body = {}) {
		return await APIMethods.post(END_POINTS.POST_ADD_EMPLOYEE(), body);
	}
    static async getAllEmployee(body = {}) {
		return await APIMethods.post(END_POINTS.GET_ALL_EMPLOYEE(), body);
	}
    static async postChangeEmployeeStatus(body = {}) {
		return await APIMethods.post(END_POINTS.POST_CHANGE_EMPLOYEE_STATUS(), body);
	}
    static async getEmployeeDetails(body = {}) {
		return await APIMethods.post(END_POINTS.GET_EMPLOYEE_DETAILS(), body);
	}
    static async postUpdateEmployeeInfo(body = {}) {
		return await APIMethods.post(END_POINTS.POST_UPDATE_EMPLOYEE(), body);
	}
    static async postUpdateEmployeePassword(body = {}) {
		return await APIMethods.post(END_POINTS.POST_UPDATE_PASSWORD(), body);
	}
}

export default EmployeesAPIManager;
