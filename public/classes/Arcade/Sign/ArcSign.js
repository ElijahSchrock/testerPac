import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { ClearPass } from "three/examples/jsm/postprocessing/ClearPass";
import { CopyShader } from "three/examples/jsm/shaders/CopyShader";

export default class ArcSign {
  constructor(
    renderer,
    scene,
    scene1,
    scene3,
    clock,
    delta,
    camera,
    gameCamera
  ) {
    this.renderer = renderer;
    this.scene2 = scene;
    this.scene1 = scene1;
    this.scene3 = scene3;
    this.clock = clock;
    this.delta = delta;
    this.camera = camera;
    this.gameCamera = gameCamera;
    this.done = 0;

    this.params = {
      exposure: 1,
      bloomStrength: 1.5,
      bloomThreshold: 0,
      bloomRadius: 0,
    };

    this.params2 = {
      exposure: 1,
      bloomStrength: 0.01,
      bloomThreshold: 0,
      bloomRadius: 1,
    };
  }

  loadSign() {
    this.glbLoader = new GLTFLoader();
    this.glbLoader.load(
      "https://pacman-port.s3.us-west-1.amazonaws.com/assets/glb/NeonEli.glb",
      (glb) => {
        this.neonSign = glb.scene;
        //Sign Mesh Color
        this.neoMesh = this.neonSign.children[0].material;
        this.neoMesh.color.set(0x00ff00);
        //Sign Lights
        this.neonLight = new THREE.SpotLight(0xffffff, 42, 600, 1);
        this.neonLight.position.set(100, 0, 0);
        this.neonLight.target = this.neonSign;
        //Light 2
        this.neonLight2 = new THREE.SpotLight(0xffffff, 42, 600, 1);
        this.neonLight2.position.set(0, 100, 0);
        this.neonLight2.target = this.neonSign;
        //Light 3
        this.neonLight3 = new THREE.SpotLight(0xffffff, 42, 600, 1);
        this.neonLight3.position.set(0, 0, 100);
        this.neonLight3.target = this.neonSign;
        //Light 4
        this.neonLight4 = new THREE.DirectionalLight(0xffffff, 4200, 600, 100);
        this.neonLight4.position.set(0, -100, 0);
        this.neonLight4.target = this.neonSign;

        this.neonSign.position.set(-275, 50, 350);
        this.neonSign.scale.set(60, 60, 60);
        this.neonSign.rotateY(Math.PI / 2);

        this.scene2.add(this.neonSign);
        this.scene2.add(
          this.neonLight,
          this.neonLight2,
          this.neonLight3,
          this.neonLight4
        );
      },
      (xhr) => {
        //function to give obj loading  progress
        console.log(`Neon Eli loaded`);
        this.done++;
      },
      (error) => {
        console.log(`An error occurred with Neon Eli`);
      }
    );
  }

  bloom() {
    this.clearPass = new ClearPass();

    this.renderPass = new RenderPass(this.scene3, this.gameCamera);


    this.renderPass1 = new RenderPass(this.scene2, this.camera);
    this.renderPass1.clear = false;

    this.renderPass2 = new RenderPass(this.scene1, this.camera);
    this.renderPass2.clear = false;

    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    this.bloomPass.threshold = this.params.bloomThreshold;
    this.bloomPass.strength = this.params.bloomStrength;
    this.bloomPass.radius = this.params.bloomRadius;

    this.bloomPass2 = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    this.bloomPass2.threshold = this.params2.bloomThreshold;
    this.bloomPass2.strength = this.params2.bloomStrength;
    this.bloomPass2.radius = this.params2.bloomRadius;

    this.outputPass = new ShaderPass(CopyShader);
    this.outputPass.renderToScreen = true;

    this.composer = new EffectComposer(this.renderer);

    this.composer.setSize(window.innerWidth, window.innerHeight);
    this.composer.addPass(this.clearPass);
    // this.composer.addPass(this.renderPass);
    // this.composer.addPass(this.bloomPass2);
    this.composer.addPass(this.renderPass1);
    this.composer.addPass(this.bloomPass);
    this.composer.addPass(this.renderPass2);
    this.composer.addPass(this.outputPass);
  }

  bloomInit() {
    this.renderer.autoClear = true;
    // console.log(this.delta)
    this.composer.render(this.delta);
  }
}
