import { HOOKS } from "./constants.js";
import BossBar from "./applications/boss-bar/boss-bar-app.js";

export default function registerHooks() {

    /**
     * Closes all boss bars for a specific actor.
     */
    Hooks.on(HOOKS.CLOSE, async (options) => {
        const actor = await getActor(options, 'close');

        const apps = Object.values(ui.windows).filter(app => app instanceof BossBar);

        for (const app of apps) {
            if (app.actor === actor) {
                await app.close();
            }
        }
    });

    /**
     * Closes all boss bars.
     */
    Hooks.on(HOOKS.CLOSE_ALL, async () => {
        const apps = Object.values(ui.windows).filter(app => app instanceof BossBar);

        for (const app of apps) {
            await app.close();
        }
    });

    /**
     * Shows a boss bar for a given actor - add `force: true` to show multiple boss bars for same actor.
     */
    Hooks.on(HOOKS.SHOW, async (options) => {
        const actor = await getActor(options, 'show');

        const force = typeof options.force === 'boolean' ? options.force : false;

        BossBar.show(actor, force);
    });

    /**
     *
     * @param {object}  options
     * @param {object}  [options.id] - Actor ID for `game.actors.get`.
     * @param {object}  [options.name] - Actor name for `game.actors.getName`.
     * @param {object}  [options.uuid] - Actor UUID for `fromUUID`.
     * @param {string}  hookName - Name of hook getActor invoked from for error messages
     *
     * @returns {Promise<foundry.abstract.Document|void>}
     */
    async function getActor(options, hookName) {
        if (options === null || typeof options !== 'object') {
            ui.notifications.error(
                `BossBar ${hookName} hook error: required 'options' is not an object.`)
            return;
        }

        let actor;
        let lookupType;

        if (typeof options.uuid === 'string') {
            try {
                const target = await fromUuid(options.uuid);
                // In case a token was given, get the actor from the token.
                actor = target?.actor ?? target;
            } catch (err) { /**/
            } // Swallow error as error message is printed below.
            lookupType = 'uuid'
        } else if (typeof options.id === 'string') {
            actor = game.actors.get(options.id);
            lookupType = 'id'
        } else if (typeof options.name === 'string') {
            actor = game.actors.getName(options.name);
            lookupType = 'name'
        } else {
            ui.notifications.error(`BossBar ${
                hookName} hook error: required 'options' does not contain an 'id', 'name', or 'uuid' string property.`);
            return;
        }

        if (actor === void 0 || actor === null) {
            ui.notifications.error(
                `BossBar ${hookName} hook error: Could not retrieve actor for 'options.${lookupType}' (${
                    options[lookupType]}).`);

            return;
        }

        return actor;
    }

}