import { SvelteApplication } from '@typhonjs-fvtt/runtime/svelte/application';
import BossBar from "./BossBar.svelte";

export default class BossBarApp extends SvelteApplication {

    constructor(actor, options, dialogData) {
        super({
            svelte: {
                class: BossBar,
                target: document.body,
                props: {
                    actor
                }
            },
            ...options
        }, dialogData);
        this.actor = actor;
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            closeOnSubmit: false,
            width: 900,
            height: "auto"
        })
    }

    static show(actor){
        const windows = Object.values(ui.windows).filter(app => app instanceof this);
        return new this(actor, {
            top: 100 + (150 * windows.length)
        }).render(true);
    }

}