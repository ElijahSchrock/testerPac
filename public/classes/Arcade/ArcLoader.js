import * as THREE from "three";
import { MeshBasicMaterial } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default class ArcLoader {
  constructor(scene, box) {
    this.scene = scene;
    this.box = box;
    this.positions = [
      {
        source:
          "https://pacman-port.s3.us-west-1.amazonaws.com/assets/glb/pacman.glb",
        sceneX: 150,
        sceneY: -100,
        sceneZ: -115,
        scaleX: 3,
        scaleY: 3,
        scaleZ: 3,
        rotateY: 5.7,
      },
      {
        source:
          "https://pacman-port.s3.us-west-1.amazonaws.com/assets/glb/arcade.glb",
        sceneX: 0,
        sceneY: -100,
        sceneZ: 0,
        scaleX: 100,
        scaleY: 100,
        scaleZ: 100,
      },
    ];

    this.count = 0;

    this.init();

    window.loading = true;
  }

  loader(position, scene, count) {
    const loader = new GLTFLoader();
    loader.load(
      position.source,
      (glb) => {
        const model = glb.scene;
        model.position.set(position.sceneX, position.sceneY, position.sceneZ);
        model.scale.set(position.scaleX, position.scaleY, position.scaleZ);

        if (
          position.source ===
          "https://pacman-port.s3.us-west-1.amazonaws.com/assets/glb/pacman.glb"
        ) {
          const pacLight = new THREE.SpotLight(0xffffff, 4, 2000, 0.2);
          pacLight.position.set(100, 550, 0);
          pacLight.target = model;
          model.rotateY(position.rotateY);
          scene.add(pacLight, model);
        } else {
          scene.add(model);

          this.box.setFromObject(model);
        }
      },
      function (xhr) {
        //function to give model loading  progress
        count++;
        if (count > 6) {
          window.loading = false;
          console.log("all arcade models loaded");
        }
      },
      function (error) {
        console.log(`An error occurred with ${position.source}`);
      }
    );
  }

  init() {
    for (let i = 0; i < this.positions.length; i++) {
      this.loader(this.positions[i], this.scene, this.count);
    }
  }
}
