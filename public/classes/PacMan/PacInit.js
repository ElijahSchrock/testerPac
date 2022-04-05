import * as THREE from "three";
import * as CANNON from "cannon-es";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import LoadWalls from "./classes/LoadWalls";
import LoadDots from "./classes/LoadDots";
import CharLoader from "./classes/CharLoad";
import IconLoader from "./classes/IconLoader";
import ArcSign from "../Arcade/Sign/ArcSign";

export default class PacInit {
  constructor(name, renderer, clock, delta, camera, scene) {
    this.name = name;
    this.renderer = renderer;
    this.clock = clock;
    this.delta = delta;
    this.camera = camera;
    this.scene = scene;
    this.raf = null;
    this.destroyed = false;
    this.timeStep = 1 / 60;
    this.dotGood = true;
    this.init();
  }

  init() {
    //Cannon
    this.world = new CANNON.World({
      gravity: new CANNON.Vec3(0, -9.81, 0),
    });

    this.solver = new CANNON.GSSolver();
    this.solver.iterations = 50;
    this.world.defaultContactMaterial.contactEquationStiffness = 1e7;
    this.world.defaultContactMaterial.contactEquationRelaxation = 5;
    this.solver.tolerance = 0.0001;
    this.world.solver = new CANNON.SplitSolver(this.solver);

    const groundPhysMat = new CANNON.Material();

    this.groundBody = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Box(new CANNON.Vec3(50, 50, 1)),
      type: CANNON.Body.STATIC,
      material: groundPhysMat,
    });
    this.world.addBody(this.groundBody);
    this.groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);

    this.boxPhysMat = new CANNON.Material();

    this.groundBoxContactMat = new CANNON.ContactMaterial(
      groundPhysMat,
      this.boxPhysMat
    );

    this.world.addContactMaterial(this.groundBoxContactMat);

    /** Scene */
    // this.scene = new THREE.Scene();
    //this.scene.fog = new THREE.FogExp2(0xFFFFFF, 0.03);

    // /** Controls */
    // const controls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.locked = true;

    // // this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // document.body.addEventListener("mousedown", () => {
    //   if (this.locked) {
    //     this.controls.connect();
    //     this.controls.lock();
    //   }
    // });

    /** Infinite Grid */

    // const grid = new InfiniteGridHelper(this.scene, 100, 1, null, null);

    /** Hemisphere Light */
    console.log(this.scene);

    this.scene.add(new THREE.HemisphereLight(0xffffbb, 0x080820, 0.1));

    this.light = new THREE.DirectionalLight(0xffffff, 0.1, 50);
    this.light.position.set(1, 2, -1);
    this.light.castShadow = true;
    this.scene.add(this.light);

    this.game();

  }

  game() {
    //pac man game
    this.loadWalls = new LoadWalls(this.scene, this.world);
    this.loadDots = new LoadDots(this.scene, this.world, this.dotGood);
    this.loadChar = new CharLoader(
      this.scene,
      this.clock,
      this.boxPhysMat,
      this.world,
      this.delta
    );
    this.loadStars = new IconLoader(this.scene, this.world);
  }

  renderIt() {
    this.world.step(this.timeStep);

    // this.renderer.render(this.scene, this.camera);
    // this.bloom.bloomInit();
    this.loadWalls.posUpdate();
    this.loadDots.posUpdate();
    this.loadChar.animate();
    this.loadStars.posUpdate();
  }

  destroy() {
    cancelAnimationFrame(this.raf);
    this.destroyed = true;
    this.scene.traverse((object) => {
      if (!object.isMesh) return;

      console.log("dispose geometry!");
      object.geometry.dispose();
    });

    document.querySelector("#app").removeChild(this.el);
    console.log(this.name + " destroyed.");
  }
}
