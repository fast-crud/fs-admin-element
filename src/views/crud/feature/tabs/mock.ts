import mockUtil from "/src/mock/base";
const options: any = {
  name: "FeatureTabs",
  idGenerator: 0
};
const list = [
  {
    radio: "1"
  },
  {
    radio: "2"
  },
  {
    radio: "3"
  }
];
options.list = list;
const mock = mockUtil.buildMock(options);
export default mock;
