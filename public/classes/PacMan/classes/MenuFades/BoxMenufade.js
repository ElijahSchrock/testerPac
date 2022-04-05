export default function timeoutBox(BoxIconScreen, NeoIconImg) {
  setTimeout(() => {
    BoxIconScreen.className = "card opactiy-100 bg-dark card-box";
    NeoIconImg.style.opacity = 1;
    setTimeout(() => {
      BoxIconScreen.className = "d-none card card-box";
      setTimeout(() => {
        BoxIconScreen.className = "d-none card card-box";
        NeoIconImg.style.opacity = 0.4;
        setTimeout(() => {
          BoxIconScreen.className = "d-none card card-box";
          setTimeout(() => {
            BoxIconScreen.className = "card opactiy-100 bg-dark card-box";
            NeoIconImg.style.opacity = 0.8;
            setTimeout(() => {
              BoxIconScreen.className = "d-none card card-box";
              setTimeout(() => {
                BoxIconScreen.className = "card opactiy-100 bg-dark card-box";
                NeoIconImg.style.opacity = 1;
                setTimeout(() => {
                  BoxIconScreen.className = "d-none card card-box";
                  setTimeout(() => {
                    BoxIconScreen.className =
                      "card opactiy-100 bg-dark card-box";
                    NeoIconImg.style.opacity = 0.8;
                    setTimeout(() => {
                      BoxIconScreen.className = "d-none card card-box";
                      setTimeout(() => {
                        BoxIconScreen.className =
                          "card opactiy-100 bg-dark card-box";
                        NeoIconImg.style.opacity = 1;
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
