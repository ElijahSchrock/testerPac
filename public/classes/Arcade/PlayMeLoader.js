import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import MyScene from "./MyScene";

export default class PlayMeLoader {
  constructor(scene, camera, cameraTarget) {
    this.scene = scene;
    this.camera = camera;
    this.cameraTarget = cameraTarget;
    this.portal = false;
    this.sceneA = new MyScene();
    this.loadIt();
  }

  loadIt() {
    const loader = new GLTFLoader();
    loader.load(
      "https://pacman-port.s3.us-west-1.amazonaws.com/assets/glb/redplayMe.glb",
      (glb) => {
        this.model = glb.scene;
        this.model.position.set(130, 15, -85);
        this.model.scale.set(10, 10, 10);
        this.model.visible = true;
        this.model.rotateX(1.55);
        this.scene.add(this.model);
      },
      function (xhr) {
        //function to give model loading  progress
        console.log((xhr.loaded / xhr.total) * 100 + `% loaded of playMe`);
      },
      function (error) {
        console.log(`An error occurred with playMe`);
      }
    );
  }

  spinIt() {
    if (!this.model) return;

    this.model.rotation.z -= 0.02;
  }

  pacPlay() {

  }
}

// camera,
//   cameraTarget,
//   gameRenderer,
//   gameScene,
//   scene,
//   renderer,
//   loadMovement;
