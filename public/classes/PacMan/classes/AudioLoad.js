export class AudioLoad {
  constructor() {}

  //Howler js
  iconMenuAudio() {
    this.menuAudio = new Howl({
      src: [
        "https://pacman-port.s3.us-west-1.amazonaws.com/assets/sounds/glitch.wav",
      ],
      volume: 0.2,
      autoplay: false,
    });
    this.menuAudio.play();
  }

  dotAudio() {
    this.dotNoise = new Howl({
      src: [
        "https://pacman-port.s3.us-west-1.amazonaws.com/assets/sounds/dot.wav",
      ],
      volume: 0.3,
      autoplay: false,
    });
    this.dotNoise.play();
  }

  clickAudio() {
    this.clickNoise = new Howl({
      src: [
        "https://pacman-port.s3.us-west-1.amazonaws.com/assets/sounds/click.wav",
      ],
      volume: 1,
      autoplay: false,
    });
    this.clickNoise.play();
  }
}

//200 bttom right
