import { createStore } from "redux";
import rootReducer from "../reducers/index";
import { State } from "../store/types";

const store = createStore(rootReducer);
export default store;