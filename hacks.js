const HACKS = [
  {
    category: "Quizizz",
    icon: "quiz",
    color: "#8854d0",
    hacks: [
      {
        name: "Set Points",
        description: "Set custom points per question (max 7000)",
        needsInput: true,
        inputLabel: "Points per question (max 7000):",
        inputDefault: "7000",
        code: (input) => {
          const e = parseInt(input) - 5000;
          const o = fetch;
          window.fetch = function(r, s) {
            if (["https://game.quizizz.com/play-api/v4/soloProceed",
                 "https://game.quizizz.com/play-api/v4/proceedGame"].includes(r)) {
              const o = JSON.parse(s.body);
              o.response.provisional.scores = { correct: e + 5000, incorrect: e + 5000 };
              o.response.provisional.scoreBreakups = {
                correct: { base: 5000, timer: 5000, streak: 5000, powerups: [], total: e + 5000 },
                incorrect: { base: 5000, timer: 5000, streak: 5000, powerups: [], total: e + 5000 }
              };
              s.body = JSON.stringify(o);
            }
            return o(r, s);
          };
        }
      },
      {
        name: "Flood Game",
        description: "Flood the Quizizz game lobby with bots",
        code: () => {
          fetch("https://raw.githubusercontent.com/seanv999/quizizz-flooder/main/flood.js")
            .then(res => res.text())
            .then(t => eval(t));
        }
      }
    ]
  },
  {
    category: "Quizlet",
    icon: "school",
    color: "#3867d6",
    hacks: [
      {
        name: "Unblur Solutions",
        description: "Remove paywall blur on Quizlet solutions",
        code: () => {
          document.querySelectorAll('.paywalled-section .b1xkd811')
            .forEach(c => c.style.filter = 'none');
          document.querySelectorAll('.paywalled-section .pfdaoy0')
            .forEach(c => c.parentElement.removeChild(c));
          const lw = document.querySelector('.LoginWall');
          if (lw) lw.style.display = 'none';
          document.querySelectorAll('.paywalled-section .hnqbbas')
            .forEach(c => { c.style.overflow = 'visible'; c.style.maxHeight = 'unset'; });
        }
      }
    ]
  },
  {
    category: "Edpuzzle",
    icon: "movie",
    color: "#e84393",
    hacks: [
      {
        name: "Auto Answer",
        description: "Automatically answer Edpuzzle questions (must be on edpuzzle.com)",
        code: () => {
          const host = window.location.hostname;
          if (host === "edpuzzle.com") {
            const r = new XMLHttpRequest();
            r.open("GET", "https://cdn.jsdelivr.net/gh/ading2210/edpuzzle-answers@latest/script.js", true);
            r.addEventListener("load", function() { eval(this.responseText); });
            r.send();
          } else {
            alert("Please run this on an Edpuzzle assignment (edpuzzle.com).");
          }
        }
      }
    ]
  },
  {
    category: "Google Doodles",
    icon: "sports_baseball",
    color: "#f7b731",
    hacks: [
      {
        name: "Baseball - Set High Score",
        description: "Set your Doodle Baseball high score to any value",
        needsInput: true,
        inputLabel: "Enter high score:",
        inputDefault: "999999",
        code: (input) => {
          localStorage.setItem("doodle-july4th19-score", input);
          alert("High score set! Page will reload.");
          location.reload();
        }
      },
      {
        name: "Garden Gnomes - Set High Score",
        description: "Set your Garden Gnomes high score to any value",
        needsInput: true,
        inputLabel: "Enter high score:",
        inputDefault: "999999",
        code: (input) => {
          localStorage.setItem("doodle-gnomes-high-score", input);
          alert("High score set! Page will reload.");
          location.reload();
        }
      }
    ]
  },
  {
    category: "Blooket",
    icon: "extension",
    color: "#20bf6b",
    hacks: [
      {
        name: "Anti-Ban Script",
        description: "Load the Blooket anti-ban script from GitHub",
        isLink: true,
        url: "https://github.com/hackthegamezjj/Blooket-Hacks/blob/main/Default%20Scripts/Anti%20Ban"
      },
      {
        name: "School Cheats",
        description: "Open the School Cheats Blooket page",
        isLink: true,
        url: "https://schoolcheats.net/blooket"
      },
      {
        name: "Blooket Wiki",
        description: "Open the Blooket Wiki for game info and strategies",
        isLink: true,
        url: "https://blooket.fandom.com/wiki/Blooket_Wiki"
      }
    ]
  },
  {
    category: "Fun Hacks",
    icon: "mood",
    color: "#fa8231",
    hacks: [
      {
        name: "Blur Page",
        description: "Apply a blur effect to the entire page",
        code: () => {
          document.body.style.filter = 'blur(5px)';
        }
      },
      {
        name: "Unblur Page",
        description: "Remove the blur effect from the page",
        code: () => {
          document.body.style.filter = 'none';
        }
      },
      {
        name: "Edit Page",
        description: "Make the page content editable",
        code: () => {
          document.body.contentEditable = 'true';
          document.designMode = 'on';
        }
      },
      {
        name: "Stop Editing Page",
        description: "Disable page editing mode",
        code: () => {
          document.body.contentEditable = 'false';
          document.designMode = 'off';
        }
      },
      {
        name: "Rename Tab",
        description: "Change the tab title to anything you want",
        needsInput: true,
        inputLabel: "New tab title:",
        inputDefault: "Google",
        code: (input) => {
          document.title = input;
        }
      },
      {
        name: "Show Passwords",
        description: "Reveal all password fields on the page",
        code: () => {
          document.querySelectorAll('input[type="password"]').forEach(el => {
            el.type = 'text';
          });
        }
      }
    ]
  },
  {
    category: "School Utils",
    icon: "laptop_chromebook",
    color: "#0fb9b1",
    hacks: [
      {
        name: "Disguise Tab as Google Drive",
        description: "Make the tab look like Google Drive (icon + title)",
        code: () => {
          function gcloak() {
            let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
            link.type = 'image/x-icon';
            link.rel = 'shortcut icon';
            link.href = 'https://ssl.gstatic.com/docs/doclist/images/infinite_arrow_favicon_5.ico';
            document.title = 'My Drive - Google Drive';
            document.getElementsByTagName('head')[0].appendChild(link);
          }
          gcloak();
          setInterval(gcloak, 1000);
        }
      },
      {
        name: "History Flooder",
        description: "Flood browser history with the current site",
        needsInput: true,
        inputLabel: "Number of history entries to add:",
        inputDefault: "100",
        code: (input) => {
          const num = parseInt(input);
          const url = window.location.href;
          for (let i = 1; i <= num; i++) {
            history.pushState(0, 0, i === num ? url : i.toString());
          }
          alert("History flooding successful! " + url + " now appears " + num + " time" + (num === 1 ? "" : "s") + " in your history.");
        }
      }
    ]
  },
  {
    category: "Wikis & Resources",
    icon: "menu_book",
    color: "#a55eea",
    hacks: [
      {
        name: "Prodigy Wiki",
        description: "Open the Prodigy Game Wiki",
        isLink: true,
        url: "https://prodigy-game.fandom.com/wiki/Prodigy_Game_Wiki"
      },
      {
        name: "Gimkit Wiki",
        description: "Open the Gimkit Wiki",
        isLink: true,
        url: "https://gimkit.fandom.com/wiki/Gimkit_Wiki"
      },
      {
        name: "I-Ready Wiki",
        description: "Open the I-Ready Wiki",
        isLink: true,
        url: "https://i-ready.fandom.com/wiki/I-Ready_Wiki"
      }
    ]
  }
];
