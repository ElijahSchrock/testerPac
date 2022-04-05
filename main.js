import "./public/assets/css/style.css";

// Render
import MyScene from "./public/classes/Arcade/MyScene";
import MyScene2 from "./public/classes/Arcade/Sign/MyScene2";

// Init
let sceneA;
document.querySelector("#start").addEventListener("click", () => {
  // sceneA = new MyScene();
  // //   sceneA = new MyScene2("sceneB");
  // sceneA.init();
  console.log("start");
});
sceneA = new MyScene();
//   sceneA = new MyScene2("sceneB");
sceneA.init();
document.querySelector("#stop").addEventListener("click", () => {
  sceneA.destroy();
  sceneA = null;

  console.log("stop");
});
