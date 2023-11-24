import { objectsAreEqual, randomColor } from "./modules/utils.js";
import {
  initialize,
  updateCanvas,
  windowResized,
} from "./modules/create-objects.js";
let lastObjCenter;
let uid = "";
let objects = {};
let color = "";

window.onload = (e) => {
  uid = crypto.randomUUID();
  color = randomColor();
  initialize();
  checkForWinChange();
};
window.onstorage = (e) => {
  updateList();
};
window.onunload = (e) => {
  window.localStorage.removeItem(uid);
};
window.onresize = (e) => windowResized(e, objects, uid);

const checkForWinChange = () => {
  setInterval(() => {
    let objCenter = { left: 0, top: 0, color: "" };
    objCenter.left =
      window.screenLeft +  window.innerWidth/ 2;
    objCenter.top =
      window.screenTop + window.outerHeight - window.innerHeight / 2;
    objCenter.color = color;
    if (!objectsAreEqual(objCenter, lastObjCenter)) {
      lastObjCenter = objCenter;
      objects[uid] = lastObjCenter;
      window.localStorage.setItem(uid, JSON.stringify(lastObjCenter));
      updateList();
    }
  }, 16);
};

const updateList = () => {
  const localStorage = window.localStorage;
  objects = {};
  for (let key of Object.keys(localStorage)) {
    let data = JSON.parse(localStorage[key]);
    objects[key] = data;
  }
  updateCanvas(objects, uid);
};
