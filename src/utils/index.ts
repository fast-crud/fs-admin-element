import * as envs from "./util.env";
import * as sites from "./util.site";
import * as storages from "./util.storage";
import { common } from "./util.common";
import * as mitt from "./util.mitt";
export const util = {
  ...envs,
  ...sites,
  ...storages,
  common,
  ...mitt
};
