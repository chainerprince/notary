import { combineReducers } from "redux";
import { bookedDatesReducer, bookingDetailsReducer, checkBookingReducer, deleteBookingReducer, myBookingReducer } from "./appointmentReducer";
import { roomDetailsReducer } from "./detailsReducer";
import { canReviewReducer, newRoomReducer, roomReviewReducer, roomsReducer, deleteRoomReducer,updateRoomReducer, reviewsReducer, deleteReviewReducer } from "./notifierReducers";
import { AllUserReducer, authReducer, forgotPasswordReducer, loginReducer, resetPasswordReducer, userDetailReducer, userReducer } from "./userReducers";

const reducers = combineReducers({
      allRooms: roomsReducer,
      roomDetails:roomDetailsReducer,
      auth:authReducer,
      login:loginReducer,
      user:userReducer,
      forgotPassword: forgotPasswordReducer,
      resetPassword: resetPasswordReducer,
      checkBooking: checkBookingReducer,
      bookedDates: bookedDatesReducer,
      bookings:myBookingReducer,
      bookingDetails: bookingDetailsReducer,
      newReview:roomReviewReducer,
      reviewPossible:canReviewReducer,
      newRoom: newRoomReducer,
      updateRoom:updateRoomReducer,
      deleteroom:deleteRoomReducer,
      deleteBooking:deleteBookingReducer,
      allUsers: AllUserReducer,
      userDetails: userDetailReducer,
      reviews:reviewsReducer,
      deleteReview:deleteReviewReducer
})

export default reducers;