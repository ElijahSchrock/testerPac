import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as CANNON from "cannon-es";
import { dotBodyList } from "./BodyLists/dotBodyList";
import { dotMeshList } from "./MeshLists/dotMeshList";
import { iconBodyList } from "./BodyLists/iconBodyList";
import { iconMeshList } from "./MeshLists/iconMeshList";
import timeoutNeo from "./MenuFades/NeoMenuFade";
import { AudioLoad } from "./AudioLoad";
import timeoutBox from "./MenuFades/BoxMenufade";
import timeoutGit from "./MenuFades/GitMenuFade";
import timeoutRest from "./MenuFades/RestMenuFade";

export default class CharLoader {
  constructor(scene, clock, boxPhysMat, world, delta) {
    this.scene = scene;
    this.clock = clock;
    this.boxPhysMat = boxPhysMat;
    this.world = world;

    this.charStatus = 0;
    this.speed = 5250;
    this.delta = delta;
    this.distance = new THREE.Vector3();

    this.starsCollided = 0;

    this.iconUp = false;
    this.dotGone = false;

    // //Howler js
    this.glitch = new AudioLoad();

    //Preview cards
    this.NeoIconScreen = document.querySelector(".card-neo");
    this.NeoIconImg = document.getElementById("pic-neo");

    this.RestIconScreen = document.querySelector(".card-restrant");
    this.RestIconImg = document.getElementById("pic-rest");

    this.BoxIconScreen = document.querySelector(".card-box");
    this.BoxIconImg = document.getElementById("pic-box");

    this.GitIconScreen = document.querySelector(".card-github");
    this.GitIconImg = document.getElementById("pic-git");
    console.log(this.NeoIconScreen);

    //Card Buttons
    this.buttons = [];

    this.closeBtn = document.getElementsByClassName("xout");
    this.doubleAppBtns = document.querySelector(".appButton");
    this.singleAppBtns = document.querySelector(".appBtnSingle");
    this.gitBtn = document.querySelector(".gitBtn");
    this.buttons.push(this.doubleAppBtns, this.singleAppBtns, this.gitBtn);

    this.keys = {
      up: false,
      down: false,
      right: false,
      left: false,
    };
    this.pacLoader();
  }
  pacLoader() {
    //Cannon
    this.player = new CANNON.Body({
      mass: 5,
      userData: { player: true },
      shape: new CANNON.Sphere(2),
      position: new CANNON.Vec3(0, 2.5, 15),
      material: this.boxPhysMat,
    });

    //Cannon Collide
    this.player.addEventListener("collide", (e) => {
      for (let i = 0; i < dotBodyList.length; i++) {
        if (dotBodyList[i] === e.body) {
          this.dotGone = true;

          this.scene.remove(dotMeshList[i]);
          // delete dotBodyList[i];

          if (this.dotGone) {
            this.glitch.dotAudio();
            !this.dotGone;
          }

          setTimeout(() => {
            this.scene.add(dotMeshList[i]);
          }, 2000);
        }
      }

      //Icons
      for (let i = 0; i < iconBodyList.length; i++) {
        if (iconBodyList[i] === e.body) {
          this.starsCollided = i;
          this.player.velocity.y = 0;

          if (e.body.id === 199) {
            timeoutBox(this.BoxIconScreen, this.NeoIconImg);
          } else if (e.body.id === 200) {
            this.rest = new timeoutRest(this.RestIconScreen, this.RestIconImg);
          } else if (e.body.id === 201) {
            timeoutNeo(this.NeoIconScreen, this.BoxIconImg);
          } else if (e.body.id === 202) {
            timeoutGit(this.GitIconScreen, this.GitIconImg);
          }
          iconBodyList[i].isTrigger = false;

          this.glitch.iconMenuAudio();
          this.iconUp = true;

          this.scene.remove(iconMeshList[i]);
        }
      }
    });

    this.player.fixedRotation = true;
    this.player.updateMassProperties();
    this.world.addBody(this.player);

    this.buttonEvntLstnr();

    this.loader = new GLTFLoader();
    this.loader.load(
      "https://pacman-port.s3.us-west-1.amazonaws.com/assets/glb/pac.glb",
      (glb) => {
        this.model = glb.scene;
        this.model.position.set(0, 5, 30);
        this.model.scale.set(0.03, 0.03, 0.03);
        this.model.castShadow = true;
        this.model.receiveShadow = true;

        this.scene.add(this.model);
        this.meshes = this.scene.children[199];
      },
      (xhr) => {
        //function to give model loading  progress
        console.log("char loaded");
        this.charStatus++;
      },
      (error) => {
        console.log(`An error occurred with ${position.source}`);
      }
    );
    this.keyMoves();
  }


  keyMoves() {
    //Keydown event Listneners
    document.addEventListener("keydown", (e) => {
      if (e.key === "w" || e.key === "W") {
        this.keys.up = true;
      }
      if (e.key === "s" || e.key === "S") {
        this.keys.down = true;
      }
      if (e.key === "a" || e.key === "A") {
        this.keys.left = true;
      }
      if (e.key === "d" || e.key === "D") {
        this.keys.right = true;
      }
    });

    document.addEventListener("keyup", (e) => {
      if (e.key === "w" || e.key === "W") {
        this.keys.up = false;
      }
      if (e.key === "s" || e.key === "S") {
        this.keys.down = false;
      }
      if (e.key === "a" || e.key === "A") {
        this.keys.left = false;
      }
      if (e.key === "d" || e.key === "D") {
        this.keys.right = false;
      }
    });
  }

  buttonEvntLstnr() {
    // loop array for mult query selector
    document.querySelectorAll(".xout").forEach((el) => {
      el.addEventListener("click", () => {
        this.glitch.clickAudio();
        console.log("lol");
        this.NeoIconScreen.className = "d-none card card-neo";
        this.RestIconScreen.className = "d-none card card-restrant";
        this.BoxIconScreen.className = "d-none card card-box";
        this.GitIconScreen.className = "d-none card card-github";

        this.iconUp = false;

        setTimeout(() => {
          this.scene.add(iconMeshList[this.starsCollided]);
          iconBodyList[this.starsCollided].isTrigger = true;
          console.log(iconMeshList[this.starsCollided]);
        }, 1000);
      });
    });

    this.buttons.forEach((b) =>
      b.addEventListener("click", () => {
        this.glitch.clickAudio();
      })
    );
  }

  animate() {
    // dotHit = false;

    if (this.meshes && this.charStatus > 0) {
      this.meshes.position.copy(this.player.position);
      this.meshes.quaternion.copy(this.player.quaternion);

      if (!this.iconUp) {

        this.distance.x = 0;
        this.distance.z = 0;
        this.player.position.y = 2;
        this.player.velocity.y = 0;

        if (this.keys.left) {
          this.model.rotateY(Math.PI / 2);
          this.distance.x = -1;
        } else if (this.keys.right) {
          this.distance.x = 1;
          this.model.rotateY(-Math.PI / 2);
        } else if (this.keys.up) {
          this.distance.z = -1;
        } else if (this.keys.down) {
          this.model.rotateY(Math.PI);
          this.distance.z = 1;
        } else {
          this.model.rotateY(Math.PI);
        }

        this.distance.normalize();

        this.player.velocity.x = this.distance.x * this.delta * this.speed;
        this.player.velocity.z = this.distance.z * this.delta * this.speed;
      }
    }
  }
}
