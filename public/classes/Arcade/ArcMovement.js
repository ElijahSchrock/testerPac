import * as THREE from "three";
import * as CANNON from "cannon-es";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import { Vector3 } from "three";

export default class ArcMovement {
  constructor(camera, renderer, scene, clock, box) {
    this.camera = camera;
    this.renderer = renderer;
    this.scene = scene;
    this.clock = clock;
    this.box = box;

    this.controls = new PointerLockControls(camera, this.camSphere);

    this.PhysWrld();
    this.posUpdate();

    this.camera.position.set(115, 60, 390);

    this.gameTime = 0;
    this.letGo = 0;
    this.keys = {
      up: false,
      down: false,
      right: false,
      left: false,
    };
    this.speed = 1000;
    this.delta;
    this.distance = new THREE.Vector2();

    this.locked = true;

    this.mouseDownHandler = () => {
      if (this.locked) {
        this.controls.connect();
        this.controls.lock();
      }
    };
    this.mouseDownListener = document
      .querySelector("#app")
      .addEventListener("mousedown", this.mouseDownHandler);
    /// Key Up
    this.keyUphandler = this.keyUp.bind(this);

    document.body.addEventListener("keyup", this.keyUphandler);

    this.keyDownhandler = this.keyDown.bind(this);

    document.body.addEventListener("keydown", this.keyDownhandler);
  }

  PhysWrld() {
    this.world = new CANNON.World({
      gravity: new CANNON.Vec3(0, -9.81, 0),
    });

    var solver = new CANNON.GSSolver();
    solver.iterations = 50;
    this.world.defaultContactMaterial.contactEquationStiffness = 1e7;
    this.world.defaultContactMaterial.contactEquationRelaxation = 5;
    solver.tolerance = 0.0001;
    this.world.solver = new CANNON.SplitSolver(solver);

    this.wallMesh = new THREE.Mesh(
      new THREE.BoxGeometry(20, 20, 20),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    this.wallMesh.position.set(30, 120, 30);

    this.wallBody = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Box(new CANNON.Vec3(10, 10, 10)),
      position: new CANNON.Vec3(15, 60, 15),
    });
    this.world.addBody(this.wallBody);

    // Create a sphere for camera
    this.camSphere = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Sphere(1.3),
      position: new CANNON.Vec3(115, 60, 390),
    });
    // this.camSphere.velocity.y = 90;
    this.camSphere.linearDamping = 0.9;
    this.world.addBody(this.camSphere);
    this.camSphere.velocity = this.camera.position;

    this.scene.add(this.controls.getObject(), this.wallMesh);
    console.log();
    this.collide();
  }

  collide() {
    this.camSphere.addEventListener("collide", function (e) {
      console.log("hit");
    });
  }

  posUpdate() {
    this.world.step(this.delta);
    this.wallMesh.position.copy(this.wallBody.position);
    this.wallMesh.quaternion.copy(this.wallBody.quaternion);

    this.camera.position.copy(this.camSphere.velocity);
    // this.camera.quaternion.copy(this.camSphere.quaternion);
    this.camera.updateProjectionMatrix();
  }

  //Leaving Room Collison Detect
  keyDown(event) {
    if (event.key === "w" || event.key === "W") {
      this.keys.up = true;
      this.letGo++;
    }
    if (event.key === "s" || event.key === "S") {
      this.keys.down = true;
      this.letGo++;
    }
    if (event.key === "a" || event.key === "A") {
      this.keys.left = true;
      this.letGo++;
    }
    if (event.key === "d" || event.key === "D") {
      this.keys.right = true;
      this.letGo++;
    }
  }

  keyUp(event) {
    if (event.key === "w" || event.key === "W") {
      this.keys.up = false;
      this.letGo = 0;
    }
    if (event.key === "s" || event.key === "S") {
      this.keys.down = false;
      this.letGo = 0;
    }
    if (event.key === "a" || event.key === "A") {
      this.keys.left = false;
      this.letGo = 0;
    }
    if (event.key === "d" || event.key === "D") {
      this.keys.right = false;
      this.letGo = 0;
    }
  }

  //Movement
  keyDownLoop() {
    if (this.camSphere) {
      this.delta = this.clock.getDelta();

      this.distance.x = 0;
      this.distance.y = 0;
      this.camSphere.velocity.y = 60;

      if (this.keys.left) {
        this.distance.x = -1;
      } else if (this.keys.right) {
        this.distance.x = 1;
      } else if (this.keys.up) {
        this.distance.y = -1;
      } else if (this.keys.down) {
        this.distance.y = 1;
      }

      // console.log(this.box);
      this.distance.normalize();

      this.camSphere.velocity.x += this.distance.x * this.delta * this.speed;
      this.camSphere.velocity.z += this.distance.y * this.delta * this.speed;

      this.camSphere.position.x = this.camSphere.velocity.x;
      this.camSphere.position.z = this.camSphere.velocity.z;
    }
  }

  destroy() {
    document
      .querySelector("#app")
      .removeEventListener("mousedown", this.mouseDownHandler);

    document.body.removeEventListener("keyup", this.keyUphandler);

    document.body.removeEventListener("keydown", this.keyDownhandler);

    this.world = null;
  }
}
