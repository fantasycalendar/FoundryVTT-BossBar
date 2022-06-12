import API from "./api.js";

Hooks.on('init', () => {
    game.bossbar = API;
    API.initialize();
});