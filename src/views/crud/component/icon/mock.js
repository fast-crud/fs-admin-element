import mockUtil from "/src/mock/base";
const options = {
  name: "ComponentIcon",
  idGenerator: 0
};
const list = [
  {
    icon: "ri:24-hours-fill"
  },
  {
    icon: "ion:add-circle-outline"
  },
  {
    icon: "ion:american-football-sharp"
  }
];
options.list = list;
const mock = mockUtil.buildMock(options);
export default mock;
