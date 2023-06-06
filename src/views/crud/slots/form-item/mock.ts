import mockUtil from "/src/mock/base";
const options: any = {
  name: "SlotsFormItem",
  idGenerator: 0
};
const list = [
  {
    multiField: "1+2",
    numBe: "1",
    operator: "+",
    numAf: "2",
    topics: ["fast-crud 666", "fast-crud真好用"]
  }
];
options.list = list;
const mock = mockUtil.buildMock(options);
export default mock;
