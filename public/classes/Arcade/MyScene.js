import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import ArcLoader from "./ArcLoader";
import ArcMovement from "./ArcMovement";
import ArcSign from "./Sign/ArcSign";
import PlayMeLoader from "./PlayMeLoader";
import MyScene2 from "./Sign/MyScene2";
import PacInit from "../PacMan/PacInit";
import MyScene3 from "../PacMan/Scene3";

export default class MyScene {
  constructor(name) {
    this.name = name;
    this.raf = null;
    this.destroyed = false;
  }

  init() {
    this.el = document.createElement("div");
    this.el.classList.add("renderer");
    document.querySelector("#app").appendChild(this.el);
    this.bbox = this.el.getBoundingClientRect();
    this.box = new THREE.Box3();
    this.update = this.update.bind(this);
    /** Renderer */
    this.clock = new THREE.Clock();
    this.delta = this.clock.getDelta();
    console.log(this.delta, "delta ");
    this.renderer = new THREE.WebGLRenderer({
      powerPreference: "high-performance",
      antialias: false,
      alpha: true,
      stencil: false,
      depth: false,
    });
    this.renderer.autoClear = false;
    this.renderer.toneMapping = THREE.ReinhardToneMapping;
    this.renderer.setSize(this.bbox.width / 2, this.bbox.height / 2);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.el.appendChild(this.renderer.domElement);

    /** Watch renderer resize */
    const Observer = new ResizeObserver(() => {
      this.resize();
    });
    Observer.observe(this.el);

    /** Scene */
    this.scene = new THREE.Scene();

    /** Camera */
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.bbox.width / this.bbox.height,
      0.1,
      1000
    );

    this.cameraTarget = new THREE.Vector3(this.scene); // camera target for LERP EFFECT

    /** Game Camera */
    this.gameCamera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      20000
    );

    this.gameCamera.position.set(
      43.760156625443635,
      44.59947391450916,
      81.33989545082194
    );

    this.gameCamera.lookAt(0, 0, 0);
    this.gameCamera.parent = this.pacScene;

    // this.camera.position.set(-200, 90, 440);
    // this.camera.lookAt(this.scene.position);
    // /** Controls */
    // this.locked = true;

    // // this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // document.body.addEventListener("mousedown", () => {
    //   if (this.locked) {
    //     this.controls.connect();
    //     this.controls.lock();
    //   }
    // });

    /** Ambient Light */
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.2));
  
    this.arcade();
    this.update();
  }

  arcade() {
    new ArcLoader(this.scene, this.box);
    this.playMe = new PlayMeLoader(this.scene, this.camera, this.cameraTarget);
    this.movement = new ArcMovement(
      this.camera,
      this.renderer,
      this.scene,
      this.clock,
      this.box
    );
    this.neonSign = new MyScene2(
      "name",
      this.renderer,
      this.camera,
      this.scene,
      this.pacScene,
      this.clock,
      this.delta,
      this.gameCamera
    );
    this.neonSign.arcade();

    this.pacScene = new MyScene3(
      "game",
      this.renderer,
      this.clock,
      this.delta,
      this.gameCamera
    );
    this.pacScene.pacGame();
    // console.log(this.pac.renderIt());
  }

  resize() {
    this.bbox = this.el.getBoundingClientRect();
    this.camera.aspect = this.bbox.width / this.bbox.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.bbox.width, this.bbox.height);
  }

  update(timestamp) {
    if (this.destroyed) return;
    this.raf = requestAnimationFrame(() => this.update());

    this.renderIt();
  }

  renderIt() {
    // composer.render is now rendering project through bloomInit
    this.neonSign.sign.bloomInit();
    // console.log(this.clock);
    this.pacScene.game.renderIt();
    this.movement.collide();
    this.movement.posUpdate();
    this.movement.keyDownLoop();

    //Arcade Camera lerp to start Pac Game
    if (
      this.camera.position.x >= 76 &&
      this.camera.position.x <= 172 &&
      this.camera.position.z >= -100 &&
      this.camera.position.z <= -35
    ) {
      this.cameraTarget.set(135, 40, -90);
      this.camera.position.lerp(this.cameraTarget, 0.05);
      // this.destroy();
      this.pacScene.pacGame();
    }
    //Spin Play Me Model
    if (!window.loading) {
      this.playMe.spinIt();
    }
  }

  destroy() {
    // cancelAnimationFrame(this.raf);
    this.destroyed = true;
    this.scene.traverse((object) => {
      if (!object.isMesh) return;

      console.log("dispose geometry!");
      object.geometry.dispose();
    });
    this.movement.destroy();

    document.querySelector("#app").removeChild(this.el);
    console.log(this.name + " destroyed.");
  }
}
