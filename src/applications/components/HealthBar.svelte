<script>

    import { TJSDocument } from '@typhonjs-fvtt/runtime/svelte/store';
    import ProgressBar from "./ProgressBar.svelte";

    export let attributes;

    let progress;
    let HP = getProperty(attributes.actor.data, 'data.attributes.hp');

    const doc = new TJSDocument(attributes.actor);
    $: {
        $doc;
        const hpUpdate = getProperty(doc.updateOptions, "data.data.attributes.hp");
        if (hpUpdate) {
            HP = getProperty(attributes.actor.data, 'data.attributes.hp');
        }
    }

    $: progress = HP.value / HP.max;

</script>

<ProgressBar attributes={attributes} bind:progress="{progress}"></ProgressBar>