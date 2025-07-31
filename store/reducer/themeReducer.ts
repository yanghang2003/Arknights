// 定义主题状态的类型
interface ThemeState {
  mode: "light" | "dark";
  primaryColor: string;
}

// 初始状态
const initialState: ThemeState = {
  mode: "light",      // 默认浅色主题
  primaryColor: "#1890ff", // 默认蓝色
};

// Action 类型
type ThemeAction =
  | { type: "theme/switchMode" }
  | { type: "theme/setColor"; payload: string };

// Reducer 函数
const themeReducer = (
  state: ThemeState = initialState,
  action: ThemeAction
): ThemeState => {
  switch (action.type) {
    case "theme/switchMode":
      return {
        ...state,
        mode: state.mode === "light" ? "dark" : "light",
      };
    case "theme/setColor":
      return { ...state, primaryColor: action.payload };
    default:
      return state;
  }
};

// Action Creators（可选）
export const switchThemeMode = (): ThemeAction => ({
  type: "theme/switchMode",
});

export const setPrimaryColor = (color: string): ThemeAction => ({
  type: "theme/setColor",
  payload: color,
});

export default themeReducer;