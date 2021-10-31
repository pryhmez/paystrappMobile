/**
 * Created by stan229 on 5/27/16.
 */
import { combineReducers } from "redux";
import user from "./user";
import countdown from "./countdown";

export default function getRootReducer(navReducer) {
    return combineReducers({
        // nav: navReducer,
        user: user,
        countdown: countdown
    });
}
