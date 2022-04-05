export default class timeoutRest {
  constructor(RestIconScreen, NeoIconImg) {
    this.RestIconScreen = RestIconScreen;
    this.NeoIconImg = NeoIconImg;
    this.timeDown();
  }

  timeDown() {
    this.timer = setTimeout(() => {
      this.RestIconScreen.className = "card opactiy-100 bg-dark card-restrant";
      this.NeoIconImg.style.opacity = 1;
      setTimeout(() => {
        this.RestIconScreen.className = "d-none card card-restrant";
        setTimeout(() => {
          this.RestIconScreen.className = "d-none card card-restrant";
          this.NeoIconImg.style.opacity = 0.4;
          setTimeout(() => {
            this.RestIconScreen.className = "d-none card card-restrant";
            setTimeout(() => {
              this.RestIconScreen.className =
                "card opactiy-100 bg-dark card-restrant";
              this.NeoIconImg.style.opacity = 0.8;
              setTimeout(() => {
                this.RestIconScreen.className = "d-none card card-restrant";
                setTimeout(() => {
                  this.RestIconScreen.className =
                    "card opactiy-100 bg-dark card-restrant";
                  this.NeoIconImg.style.opacity = 1;
                  setTimeout(() => {
                    this.RestIconScreen.className = "d-none card card-restrant";
                    setTimeout(() => {
                      this.RestIconScreen.className =
                        "card opactiy-100 bg-dark card-restrant";
                      this.NeoIconImg.style.opacity = 0.8;
                      setTimeout(() => {
                        this.RestIconScreen.className = "d-none card card-restrant";
                        setTimeout(() => {
                          this.RestIconScreen.className =
                            "card opactiy-100 bg-dark card-restrant";
                          this.NeoIconImg.style.opacity = 1;
                        }, 100);
                      }, 100);
                    }, 100);
                  }, 300);
                }, 100);
              }, 100);
            }, 100);
          }, 100);
        }, 300);
      }, 100);
    }, 400);
    
  }
  

  clrTime() {
    clearTimeout(this.timer);
  }
}
