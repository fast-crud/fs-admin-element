// @ts-ignore
import mockUtil from "/src/mock/base";
import _ from "lodash-es";
const options: any = {
  name: "AdvancedCard",
  idGenerator: 0
};
const list = [
  {
    title: "fast-crud怎么样",
    content: "很好用"
  },
  {
    title: "大环境不好呀",
    content: "好好学习提升自己吧"
  },
  {
    title: "Certd是什么",
    content: "Certd是一款开源的证书全自动管理系统"
  }
];

options.list = list;
options.copyTimes = 100;
const mock = mockUtil.buildMock(options);

export default mock;
