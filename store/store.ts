import { combineReducers , legacy_createStore } from "redux";

import directionReducer from "./reducer/directionReducer";
import userReducer from './reducer/userReducer';
import themeReducer from './reducer/themeReducer';
const rootReducer = combineReducers({
  direction: directionReducer, // 管理方向状态
  user: userReducer,          // 管理用户数据
  theme: themeReducer,        // 管理主题设置
});
export const store = legacy_createStore(rootReducer);