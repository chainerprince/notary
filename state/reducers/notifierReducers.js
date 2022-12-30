import { NOTIFIER_SUCCESS, NOTIFIER_FAIL, CLEAR_ERRORS, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_REVIEW_FAIL, NEW_REVIEW_RESET, NEW_NOTIFIER_REQUEST, NEW_NOTIFIER_SUCCESS, NEW_NOTIFIER_FAIL, NEW_NOTIFIER_RESET, UPDATE_NOTIFIER_REQUEST, UPDATE_NOTIFIER_SUCCESS, UPDATE_NOTIFIER_FAIL, UPDATE_NOTIFIER_RESET, DELETE_NOTIFIER_REQUEST, DELETE_NOTIFIER_SUCCESS, DELETE_NOTIFIER_FAIL, DELETE_NOTIFIER_RESET, CAN_REVIEW_REQUEST, CAN_REVIEW_SUCCESS, CAN_REVIEW_FAIL, ADMIN_NOTIFIERS_REQUEST, ADMIN_NOTIFIERS_SUCCESS, ADMIN_NOTIFIERS_FAIL, GET_REVIEWS_REQUEST, GET_REVIEWS_SUCCESS, GET_REVIEWS_FAIL, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, DELETE_REVIEW_FAIL, DELETE_REVIEW_RESET } from "../constants/notifierConstants";

export const notifiersReducer = (state = { notifiers: [] }, action) => {
	switch (action.type) {
		case NOTIFIER_SUCCESS:
			return {
				notifiersCount: Number(action.payload.totalDocuments),
				resPerPage: action.payload.resPerPage,
				filteredNotifiersCount: action?.payload?.filteredNotifiersCount,
				notifiers: action.payload.notifiers,
			};
		case ADMIN_NOTIFIERS_REQUEST:
			return {
				loading: true,
			};
		case ADMIN_NOTIFIERS_SUCCESS:
			return {
				notifiers: action.payload.notifiers,
			};

		case NOTIFIER_FAIL:
		case ADMIN_NOTIFIERS_FAIL:
			return {
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};

export const roomReviewReducer = (state = { error: null }, action) => {
	switch (action.type) {
		case NEW_REVIEW_REQUEST:
			return {
				loading: true,
			};

		case NEW_REVIEW_SUCCESS:
			return {
				loading: false,

				success: action.payload,
			};
		case NEW_REVIEW_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case NEW_REVIEW_RESET:
			return {
				success: false,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};

export const updateNotifierReducer = (state = { error: null }, action) => {
	switch (action.type) {
		case UPDATE_NOTIFIER_REQUEST:
			return {
				loading: true,
			};

		case UPDATE_NOTIFIER_SUCCESS:
			return {
				loading: false,

				isUpdated: action.payload,
			};
		case UPDATE_NOTIFIER_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case UPDATE_NOTIFIER_RESET:
			return {
				success: false,
				isUpdated: false,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
				isUpdated: false,
			};

		default:
			return state;
	}
};
export const deleteNotifierReducer = (state = { error: null }, action) => {
	switch (action.type) {
		case DELETE_NOTIFIER_REQUEST:
			return {
				loading: true,
			};

		case DELETE_NOTIFIER_SUCCESS:
			return {
				loading: false,

				isDeleted: action.payload,
			};
		case DELETE_NOTIFIER_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case DELETE_NOTIFIER_RESET:
			return {
				success: false,
				isDeleted: false,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};

export const deleteReviewReducer = (state = { error: null }, action) => {
	switch (action.type) {
		case DELETE_REVIEW_REQUEST:
			return {
				loading: true,
			};

		case DELETE_REVIEW_SUCCESS:
			return {
				loading: false,

				isDeleted: action.payload,
			};
		case DELETE_REVIEW_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case DELETE_REVIEW_RESET:
			return {
				success: false,
				isDeleted: false,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};

export const newNotifierReducer = (state = { error: null, notifier: {} }, action) => {
	switch (action.type) {
		case NEW_NOTIFIER_REQUEST:
			return {
				loading: true,
			};

		case NEW_NOTIFIER_SUCCESS:
			return {
				loading: false,
				success: action.payload.success,
				notifier: action.payload.notifier,
			};
		case NEW_NOTIFIER_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case NEW_NOTIFIER_RESET:
			return {
				success: false,
				isUpdated: true,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
				isUpdated: false,
			};

		default:
			return state;
	}
};

export const canReviewReducer = (state = { canRev: null }, action) => {
	switch (action.type) {
		case CAN_REVIEW_REQUEST:
			return {
				loading: true,
			};

		case CAN_REVIEW_SUCCESS:
			return {
				loading: false,
				canRev: action.payload,
			};
		case CAN_REVIEW_FAIL:
			return {
				loading: false,
				error: action.payload,
			};

		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};

export const reviewsReducer = (state = { reviews: [] }, action) => {
	switch (action.type) {
		case GET_REVIEWS_REQUEST:
			return {
				loading: true,
			};

		case GET_REVIEWS_SUCCESS:
			return {
				loading: false,

				reviews: action.payload,
			};
		case GET_REVIEWS_FAIL:
			return {
				loading: false,
				error: action.payload,
			};

		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};
