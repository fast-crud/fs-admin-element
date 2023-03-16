import mockUtil from "/src/mock/base";
const options: any = {
  name: "DictCloneable",
  idGenerator: 0
};
const list = [
  {
    status: "1",
    remote: "2"
  },
  {
    status: "2",
    remote: "3"
  },
  {
    status: "0"
  }
];
options.list = list;
const mock = mockUtil.buildMock(options);
export default mock;
