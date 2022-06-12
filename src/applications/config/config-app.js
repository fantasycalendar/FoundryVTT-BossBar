import { SvelteApplication } from '@typhonjs-fvtt/runtime/svelte/application';
import ConfigShell from "./ConfigShell.svelte";

export default class ConfigApp extends SvelteApplication {

    constructor(parentApp, options) {
        super(options);
        this.parentApp = parentApp;
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
                class: ConfigShell,
                target: document.body,
                intro: true,
                props: function() {       // You can use a function with `this` as the application.
                    return { parentApp: this.parentApp };
                }
            }
        })
    }

    /**
     * Show the config UI for a given bos bar.
     *
     * @param {BossBarApp} parentApp - Actor document.
     * @param {boolean} force - When true a multiple boss bars will show even for the same actor.
     *
     * @returns {BossBarApp}
     */
    static show(parentApp, force = false) {

        const apps = Object.values(ui.windows).filter(app => app instanceof ConfigApp);

        for (const app of apps) {
            if (!force && app.parentApp === app) {
                app.render(true, { focus: true });
                return this;
            }
        }

        return new this(parentApp).render(true);
    }
}
