/* eslint-disable no-unused-vars */
import APIMethods from "../../APIMethods";
import END_POINTS from "../../EndPoints";
/**
 * A class that provides static methods for authentication-related API requests.
 */
class InventoryAPIManager {
	static async getInventoryItems(body = {}) {
		return await APIMethods.get(END_POINTS.GET_INVENTORY_ITEMS(), body);
	}
	static async getInventoryItem(body = {}) {
		return await APIMethods.post(END_POINTS.GET_INVENTORY_ITEM(), body);
	}
	static async getInventoryGroups(body = {}) {
		return await APIMethods.get(END_POINTS.GET_INVENTORY_GROUPS(), body);
	}
	static async getInventoryGroupsWithQuantity(body = {}) {
		return await APIMethods.get(END_POINTS.GET_INVENTORY_GROUPS_WITH_QUANTITY(), body);
	}
	static async postAddItem(body = {}) {
		return await APIMethods.post(END_POINTS.POST_ADD_ITEM(), body);
	}
	static async postEditItem(body = {}) {
		return await APIMethods.post(END_POINTS.POST_UPDATE_ITEM(), body);
	}
	static async postDeleteItem(body = {}) {
		return await APIMethods.post(END_POINTS.POST_DELETE_ITEM(), body);
	}

	static async postAddGroup(body = {}) {
		return await APIMethods.post(END_POINTS.POST_ADD_GROUP(), body);
	}
	static async postDeleteGroup(body = {}) {
		return await APIMethods.post(END_POINTS.POST_DELETE_GROUP(), body);
	}
}

export default InventoryAPIManager;
