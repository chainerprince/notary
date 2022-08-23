import { combineReducers } from "redux";
import { bookedDatesReducer, bookingDetailsReducer, checkBookingReducer, deleteBookingReducer, myAppointmentReducer } from "./appointmentReducer";
import { notifierDetailsReducer } from "./detailsReducer";
import { canReviewReducer, newNotifierReducer, roomReviewReducer, notifiersReducer, updateNotifierReducer, reviewsReducer, deleteReviewReducer, deleteNotifierReducer } from "./notifierReducers";
import { AllUserReducer, authReducer, forgotPasswordReducer, loginReducer, resetPasswordReducer, userDetailReducer, userReducer } from "./userReducers";

const reducers = combineReducers({
      allNotifiers: notifiersReducer,
      notifierDetails:notifierDetailsReducer,
      auth:authReducer,
      login:loginReducer,
      user:userReducer,
      forgotPassword: forgotPasswordReducer,
      resetPassword: resetPasswordReducer,
      checkBooking: checkBookingReducer,
      bookedDates: bookedDatesReducer,
      bookings:myAppointmentReducer,
      bookingDetails: bookingDetailsReducer,
      newReview:roomReviewReducer,
      reviewPossible:canReviewReducer,
      newNotifier: newNotifierReducer,
      updateNotifier:updateNotifierReducer,
      deleteNotifier:deleteNotifierReducer,
      deleteBooking:deleteBookingReducer,
      allUsers: AllUserReducer,
      userDetails: userDetailReducer,
      reviews:reviewsReducer,
      deleteReview:deleteReviewReducer
})

export default reducers;