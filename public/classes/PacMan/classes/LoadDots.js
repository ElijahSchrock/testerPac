import * as THREE from "three";
import * as CANNON from "cannon-es";
import { dotParams } from "./Params/DotParams";
import { dotMeshList } from "./MeshLists/dotMeshList";
import { dotBodyList } from "./BodyLists/dotBodyList";

export default class LoadDots {
  constructor(scene, world, dotGood) {
    this.scene = scene;
    this.world = world;
    this.dotGood = dotGood;
    this.init();
  }

  loader(position, scene, world, dotGood) {
    this.dot = new THREE.Mesh(
      new THREE.SphereGeometry(1),
      new THREE.MeshBasicMaterial({ color: 0xf00f0f })
    );
    dotMeshList.push(this.dot);

    this.dot.position.set(position.x, 3, position.z);
    this.dot.castShadow = true;
    this.dot.receiveShadow = true;

    scene.add(this.dot);

    this.dotBody = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Sphere(1),
      userData: { sphere: true },
      wakeUpAfterNarrowphase: true,
      isTrigger: true,
      position: new CANNON.Vec3(position.x, 3, position.z),
    });
    dotBodyList.push(this.dotBody);

    this.dotBody.fixedRotation = true;
    this.dotBody.updateMassProperties();

    if (dotGood) {
      world.addBody(this.dotBody);
    }
  }
  posUpdate() {
    this.dot.position.copy(this.dotBody.position);
    this.dot.quaternion.copy(this.dotBody.quaternion);
  }

  init() {
    for (let i = 0; i < dotParams.length; i++) {
      this.loader(dotParams[i], this.scene, this.world, this.dotGood);
    }
  }
}
