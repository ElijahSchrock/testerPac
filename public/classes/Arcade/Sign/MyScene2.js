import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
// import ArcLoader from "./Arcade/ArcLoader";
// import ArcMovement from "./Arcade/ArcMovement";
import ArcSign from "./ArcSign";
// import PlayMeLoader from "./Arcade/PlayMeLoader";

export default class MyScene2 {
  constructor(
    name,
    renderer,
    camera,
    scene1,
    scene3,
    clock,
    delta,
    gameCamera
  ) {
    this.name = name;
    this.renderer = renderer;
    this.scene1 = scene1;
    this.scene3 = scene3;
    this.camera = camera;
    this.clock = clock;
    this.delta = delta;
    this.gameCamera = gameCamera;
    this.raf = null;
    this.destroyed = false;
    this.init();
  }

  init() {
    /** Scene */
    this.scene = new THREE.Scene();
  }

  arcade() {
    this.sign = new ArcSign(
      this.renderer,
      this.scene,
      this.scene1,
      this.scene3,
      this.clock,
      this.delta,
      this.camera,
      this.gameCamera
    );
    this.sign.loadSign();
    this.sign.bloom();
  }
}
