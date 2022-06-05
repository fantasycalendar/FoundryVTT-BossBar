import BossBar from "./applications/boss-bar/boss-bar-app.js";

Hooks.on("ready", () => {

    BossBar.show(game.actors.getName("King Punch, Fist of the West"));

})