import * as THREE from "three";
import PacInit from "./PacInit";

export default class MyScene3 {
  constructor(name, renderer, clock, delta, camera) {
    this.name = name;
    this.renderer = renderer;
    this.clock = clock;
    this.delta = delta;
    this.camera = camera;
    this.init();
  }

  init() {
    this.gameScene = new THREE.Scene();

  }

  pacGame() {
    this.game = new PacInit(
      "game",
      this.renderer,
      this.clock,
      this.delta,
      this.camera,
      this.gameScene
    );
    
  }
}
