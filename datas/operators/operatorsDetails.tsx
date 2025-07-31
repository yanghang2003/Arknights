
const contentData :any = {
  '1': {
    // 基础信息
    mainContent:'/one.png',
    backgroundContent: '/one-bg.png',
    extraContent: '陈'
  },
  '2': {
    // 战斗形态
    mainContent: '/two.png',
    backgroundContent: '/two-bg.png',
    extraContent: '德克萨斯'
  },
  '3': {
    // 休闲装扮
    mainContent: './three.png',
    backgroundContent: '/three-bg.png',
    extraContent: '白面鸽'
  },
  '4': {
    // 特殊形态
    mainContent: '/for.png',
    backgroundContent: '/fore-bg.png',
    extraContent: '能天使'
  }
};

const tabs = [
  { id: '1', label: '角色信息' ,role:'/one-small.png',},
  { id: '2', label: '技能详情' ,role:'/two-small.png',},
  { id: '3', label: '背景故事' ,role:'/three-small.png',},
  { id: '4', label: '狗屁故事' ,role:'/fore-small.png',}
];

export default { contentData, tabs }
