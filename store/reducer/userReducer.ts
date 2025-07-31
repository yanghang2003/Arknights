// 定义用户状态的类型
interface UserState {
  name: string;
  age: number;
  isLogin: boolean;
}

// 初始状态
const initialState: UserState = {
  name: "Guest", // 默认用户名
  age: 0,        // 默认年龄
  isLogin: false, // 默认未登录
};

// Action 类型
type UserAction =
  | { type: "user/login"; payload: { name: string; age: number } }
  | { type: "user/logout" }
  | { type: "user/updateAge"; payload: number };

// Reducer 函数
const userReducer = (
  state: UserState = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case "user/login":
      return {
        ...state,
        name: action.payload.name,
        age: action.payload.age,
        isLogin: true,
      };
    case "user/logout":
      return { ...state, isLogin: false, name: "Guest" };
    case "user/updateAge":
      return { ...state, age: action.payload };
    default:
      return state;
  }
};

// Action Creators（可选，用于生成 action）
export const loginUser = (name: string, age: number): UserAction => ({
  type: "user/login",
  payload: { name, age },
});

export const logoutUser = (): UserAction => ({
  type: "user/logout",
});

export const updateUserAge = (age: number): UserAction => ({
  type: "user/updateAge",
  payload: age,
});

export default userReducer;