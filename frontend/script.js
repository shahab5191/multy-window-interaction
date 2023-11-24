import { objectsAreEqual, randomColor } from "./modules/utils.js";
import {
  initialize,
  updateCanvas,
  windowResized,
} from "./modules/create-objects.js";
import three from 'three'
let lastObjCenter;
let uid = "";
let objects = {};
let color = "";

window.onload = (e) => {
  uid = crypto.randomUUID();
  color = randomColor();

  initialize();
  checkForWinChange();
  updateList();
  console.log(window.localStorage);
  console.log(uid);
};
window.onstorage = (e) => {
  console.log(window.localStorage);
  console.log(uid);
  updateList();
};
window.onunload = (e) => {
  window.localStorage.removeItem(uid);
};
window.onresize = (e) => windowResized(e, objects, uid);

const checkForWinChange = () => {
  let objCenter = { left: 0, top: 0, color: "" };
  objCenter.left = window.screenLeft + window.innerWidth / 2;
  objCenter.top =
    window.screenTop + window.outerHeight - window.innerHeight / 2;
  objCenter.color = color;
  if (!objectsAreEqual(objCenter, lastObjCenter)) {
    lastObjCenter = objCenter;
    objects[uid] = lastObjCenter;
    window.localStorage.setItem(uid, JSON.stringify(lastObjCenter));
    updateCanvas(objects, uid);
  }
  requestAnimationFrame(checkForWinChange);
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
