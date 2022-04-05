export default function timeoutGit(GitIconScreen, NeoIconImg) {
  setTimeout(() => {
    GitIconScreen.className = "card opactiy-100 bg-dark card-github";
    NeoIconImg.style.opacity = 1;
    setTimeout(() => {
      GitIconScreen.className = "d-none card card-github";
      setTimeout(() => {
        GitIconScreen.className = "d-none card card-github";
        NeoIconImg.style.opacity = 0.4;
        setTimeout(() => {
          GitIconScreen.className = "d-none card card-github";
          setTimeout(() => {
            GitIconScreen.className = "card opactiy-100 bg-dark card-github";
            NeoIconImg.style.opacity = 0.8;
            setTimeout(() => {
              GitIconScreen.className = "d-none card card-github";
              setTimeout(() => {
                GitIconScreen.className = "card opactiy-100 bg-dark card-github";
                NeoIconImg.style.opacity = 1;
                setTimeout(() => {
                  GitIconScreen.className = "d-none card card-github";
                  setTimeout(() => {
                    GitIconScreen.className =
                      "card opactiy-100 bg-dark card-github";
                    NeoIconImg.style.opacity = 0.8;
                    setTimeout(() => {
                      GitIconScreen.className = "d-none card card-github";
                      setTimeout(() => {
                        GitIconScreen.className =
                          "card opactiy-100 bg-dark card-github";
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
