import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as CANNON from "cannon-es";
import { IconParams } from "./Params/IconParams";
import { iconBodyList } from "./BodyLists/iconBodyList";
import { iconMeshList } from "./MeshLists/iconMeshList";

export default class IconLoader {
  constructor(scene, world) {
    this.scene = scene;
    this.world = world;
    this.starStatus = 0;
    this.init();
  }

  loader(pos, scene, world) {
    this.starBody = new CANNON.Body({
      mass: 0,
      userData: { icon: true },
      shape: new CANNON.Sphere(1),
      isTrigger: true,
      position: new CANNON.Vec3(pos.x, 2.5, pos.z),
    });

    iconBodyList.push(this.starBody);

    this.starBody.fixedRotation = true;
    this.starBody.updateMassProperties();
    world.addBody(this.starBody);

    const glbLoader = new GLTFLoader();
    glbLoader.load(
      "https://pacman-port.s3.us-west-1.amazonaws.com/assets/glb/star.glb",
      (glb) => {
        this.star = glb.scene;
        this.star.position.set(pos.x, 5, pos.z);
        this.star.scale.set(10, 10, 10);
        this.star.castShadow = true;
        this.star.receiveShadow = true;
        scene.add(this.star);

        this.star1 = scene.children[scene.children.length - 1];
        iconMeshList.push(this.star1);
      },
      (xhr) => {
        //function to give star loading  progress
        console.log("star loaded");
        this.starStatus++;
      },
      (error) => {
        console.log(`An error occurred with ${position.source}`);
      }
    );
  }

  posUpdate() {
    if (this.star1 && this.starStatus > 0) {
      this.star1.position.copy(this.starBody.position);
      this.star1.quaternion.copy(this.starBody.quaternion);
    }
  }

  init() {
    for (let i = 0; i < IconParams.length; i++) {
      this.loader(IconParams[i], this.scene, this.world);
    }
  }
}
