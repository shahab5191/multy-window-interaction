let canvas, ctx;
const objSize = 50;
export const initialize = () => {
  canvas = document.getElementById("canvas");
  if (!canvas.getContext) return;
  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

export const updateCanvas = (objects, current) => {
  if (!ctx) return;
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  let absLeft = 0;
  let absTop = 0;
  for (let key in objects) {
    if (key === current) {
      absLeft = window.innerWidth / 2;
      absTop = window.innerHeight / 2;
    } else {
      absLeft = objects[key].left - window.screenX;
      absTop =
        objects[key].top -
        (window.screenY + window.outerHeight - window.innerHeight);
    }
    ctx.fillStyle = objects[key].color;
    ctx.fillRect(absLeft - objSize / 2, absTop - objSize / 2, objSize, objSize);
  }
};

export const windowResized = (e, objects, current) => {
  if (!ctx) return;
  canvas.width = e.target.innerWidth
  canvas.height = e.target.innerHeight
  updateCanvas(objects, current);
};
