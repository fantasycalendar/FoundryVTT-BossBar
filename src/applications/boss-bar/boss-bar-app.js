import { SvelteApplication } from '@typhonjs-fvtt/runtime/svelte/application';
import BossBarShell from "./BossBarShell.svelte";

export default class BossBarApp extends SvelteApplication {

    constructor(actor, options) {
        super(options);
        this.actor = actor;
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            closeOnSubmit: false,
            width: 500,
            height: "auto",
            defaultCloseAnimation: false, // Allow Svelte outro transition
            transformOrigin: 'center',    // Rotation / scale from center
            positionOrtho: false,         // Required for intro transition to take.

            svelte: {
                class: BossBarShell,
                target: document.body,
                intro: true,
                props: function() {       // You can use a function with `this` as the application.
                    return { actor: this.actor };
                }
            },
        })
    }

    /**
     * Show a boss bar for the given actor. By default, if there is an existing boss bar for the given actor
     * it will be rendered unless `force` option is true then multiple bars for the same actor will be shown.
     *
     * @param {foundry.abstract.Document} actor - Actor document.
     *
     * @param {boolean} force - When true a multiple boss bars will show even for the same actor.
     *
     * @returns {BossBarApp}
     */
    static show(actor, force = false) {
        const apps = Object.values(ui.windows).filter(app => app instanceof this);

        let existingLeft = null;
        let existingTop = 100;

        for (const app of apps) {
            if (!force && app.actor === actor) {
                app.render(true, { focus: true });
                return this;
            }

            const appTop = app.position.top;

            if (appTop >= existingTop)
            {
                existingTop = app.position.top + 150;
                existingLeft = app.position.left;
            }
        }

        // Reset boss bar to top / center as it is lower than 75% of the browser window.
        // Note: all further boss bars will be in the top center position.
        if (existingTop > globalThis.innerHeight * 0.75)
        {
            existingLeft = null;
            existingTop = 100;
        }

        return new this(actor, {
            top: existingTop,
            left: existingLeft
        }).render(true);
    }
}
