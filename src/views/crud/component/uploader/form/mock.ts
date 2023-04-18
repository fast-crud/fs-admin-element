import mockUtil from "/src/mock/base";
const options: any = {
  name: "ComponentUploader",
  idGenerator: 0
};
const list = [
  {
    avatar: "http://greper.handsfree.work/extends/avatar.jpg",
    file: ["http://greper.handsfree.work/extends/avatar.jpg", "https://www.baidu.com/img/bd_logo1.png"],
    error: ["http://localhost:11111/error_image"],
    pictureCard: ["http://greper.handsfree.work/extends/avatar.jpg", "https://www.baidu.com/img/bd_logo1.png"],
    limit: ["http://greper.handsfree.work/extends/avatar.jpg", "https://www.baidu.com/img/bd_logo1.png"],
    statusRemote: "0"
  },
  {
    radio: "2"
  },
  {
    radio: "0"
  }
];
options.list = list;
const mock = mockUtil.buildMock(options);
export default mock;
