export const objectsAreEqual = (obj1, obj2) => {
  if(typeof obj1 !== typeof obj2) return false
  for (let key in obj1) {
    if (obj1[key] !== obj2[key]) return false;
  }
  return true;
};

export const randomColor = () => {
  const R = Math.floor(Math.random() * 255)
  const G = Math.floor(Math.random() * 255)
  const B = Math.floor(Math.random() * 255)
  return `rgb(${R},${G},${B})`
}