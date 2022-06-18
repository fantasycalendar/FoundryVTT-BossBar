import API from "./api.js";
import PositionBoxApplication from "./applications/config/PositionBoxApplication.js";

Hooks.on('init', () => {
    game.bossbar = API;
    API.initialize();
});

Hooks.once("ready", () => {
    console.log("wat")
    new PositionBoxApplication().render(true);
})