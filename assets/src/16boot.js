var _parent = "mygame";

var game = new Phaser.Game(1920, 1080, Phaser.CANVAS, _parent, {}, true);
var projectInfo = {};
Sound.on = true;

projectInfo.alertSent = false;
projectInfo.tutorialPlayed = false;

var bootState = {
    init: function () {

        window.famobi_analytics.trackScreen("SCREEN_SPLASH");

        // ✅ fix wrong variable: fenster → window
        Math.min(window.innerWidth, document.documentElement.clientWidth);
        Math.min(window.innerHeight, document.documentElement.clientHeight);

        var body = document.body;
        var container = document.getElementById("mygame");

        body.style.backgroundColor = "black";
        body.style.backgroundImage = "url(assets/img/bgLarge.png)";
        body.style.backgroundPosition = "center";
        body.style.backgroundSize = "cover";
        body.style.margin = 0;
        body.style.padding = 0;

        container.style.maxWidth = "100%";
        container.style.maxHeight = "100%";

        if (game.device.desktop) {
            if (game.device.firefox) {
                body.style.margin = 0;
                body.style.padding = 0;
                container.style.width = "99vw";
                container.style.height = "99vh";
                container.style.margin = 0;
            } else {
                game.scale.pageAlignHorizontally = true;
            }
        } else {
            container.style.minHeight = "100%";
        }

        // ✅ Phaser scale config
        game.time.advancedTiming = true;
        game.scale.windowConstraints.bottom = "visual";
        game.scale.pageAlignVertically = true;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        // ✅ Inputs & focus
        game.input.maxPointers = 1;
        game.stage.disableVisibilityChange = famobi.hasFeature("external_focus");
    },

    preload: function () {
        this.load.image("title", "assets/img/title.png");
        this.load.image("rack", "assets/img/rack.png");
        this.load.image("loaderBase", "assets/img/loaderBase.png");
        this.load.image("loaderFill", "assets/img/loaderFill.png");
        this.load.image("loaderHighlight", "assets/img/loaderHighlight.png");
    },

    create: function () {
        game.state.start("load");
    }
};

// ✅ State registration
game.state.add("load", loadState);
game.state.add("mainMenu", menuState);
game.state.add("play", playState);
game.state.add("boot", bootState);

// ✅ Start game
game.state.start("boot");