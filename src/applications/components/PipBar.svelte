<script>

    import { TJSDocument } from '@typhonjs-fvtt/runtime/svelte/store';
    import ProgressBar from "./ProgressBar.svelte";

    export let attributes;

    let progress;
    let HP = getProperty(attributes.actor.data, 'data.attributes.hp');
    let pips = attributes.pips ?? 10;

    const doc = new TJSDocument(attributes.actor);
    $: {
        $doc;
        const hpUpdate = getProperty(doc.updateOptions, "data.data.attributes.hp");
        if (hpUpdate) {
            HP = getProperty(attributes.actor.data, 'data.attributes.hp');
        }
    }

    $: {
        const rawProgress = HP.value / HP.max;
        progress = Math.ceil(rawProgress * pips) / pips;
    }

    const numPips = Array.from(Array(pips-1).keys())

</script>

<div>
    <div class="container">
    {#each numPips as pip, index (index)}
        <img src="{attributes.pipSrc}" style="position:absolute; left: calc({100/(pips/(index+1))}% - 9px);">
    {/each}
    </div>
    <ProgressBar attributes={attributes} bind:progress="{progress}"></ProgressBar>
</div>

<style lang="scss">
    .container{
      position:relative;
      width:100%;
      z-index:10;
    }
    img {
      border: 0;
    }
</style>