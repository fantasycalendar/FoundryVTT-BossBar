<script>

    import { TJSDocument } from '@typhonjs-fvtt/runtime/svelte/store';
    import ProgressBar from "./ProgressBar.svelte";

    export let data;

    let progress;
    let HP = getProperty(data.actor.data, 'data.attributes.hp');

    const doc = new TJSDocument(data.actor);
    $: {
        $doc;
        const hpUpdate = getProperty(doc.updateOptions, "data.data.attributes.hp");
        if (hpUpdate) {
            HP = getProperty(data.actor.data, 'data.attributes.hp');
        }
    }

    $: progress = HP.value / HP.max;

</script>

<ProgressBar attributes={data} bind:progress="{progress}"></ProgressBar>