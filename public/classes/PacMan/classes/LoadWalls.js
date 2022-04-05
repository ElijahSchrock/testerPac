import * as THREE from "three";
import * as CANNON from "cannon-es";
import { params } from "./Params/WallParams";

export default class LoadWalls {
  constructor(scene, world) {
    this.scene = scene;
    this.world = world;
    this.init();
  }

  loader(position, scene, world) {
    this.texture = new THREE.TextureLoader().load(
      "https://pacman-port.s3.us-west-1.amazonaws.com/assets/glb/escomputerlogo.png"
    );

    this.wall = new THREE.Mesh(
      new THREE.BoxGeometry(position.w, position.h, position.d),
      new THREE.MeshPhongMaterial(
        position.isLogo ? { map: this.texture } : { map: null }
      )
    );

    this.wall.material.color = new THREE.Color(
      position.color ? 0x000000 : 0x0000e4
    );

    this.wall.position.set(position.x / 2, position.y /2, position.z / 2);
    this.wall.castShadow = true;
    this.wall.receiveShadow = true;

    //Plane
    this.ground = new THREE.Mesh( // green plane
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshPhongMaterial({
        color: "black",
        side: THREE.DoubleSide,
      })
    );
    this.ground.position.y = 1;
    this.ground.rotateX(-Math.PI / 2);

    scene.add(this.wall, this.ground);

    this.wallBody = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Box(
        new CANNON.Vec3(position.w / 2, position.h / 2, position.d / 2)
      ),
      position: new CANNON.Vec3(position.x / 2, position.y / 2, position.z / 2),
    });
    world.addBody(this.wallBody);

    this.groundBody = new CANNON.Body({
      // shape: new CANNON.Plane(),
      mass: 0,
      shape: new CANNON.Box(new CANNON.Vec3(50, 50, 1)),
      type: CANNON.Body.STATIC,
      // material: groundPhysMat,
    });
    world.addBody(this.groundBody);
    this.groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  }

  posUpdate() {
    this.wall.position.copy(this.wallBody.position);
    this.wall.quaternion.copy(this.wallBody.quaternion);
  }

  init() {
    for (let i = 0; i < params.length; i++) {
      this.loader(params[i], this.scene, this.world);
    }
  }
}
