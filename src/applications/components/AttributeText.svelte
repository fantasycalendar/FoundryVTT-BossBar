<script>
    import { applyStyles } from "@typhonjs-fvtt/runtime/svelte/action";
    import { TJSDocument } from '@typhonjs-fvtt/runtime/svelte/store';
    export let data;

    let text = getProperty(data.actor.data, data.attribute);

    const doc = new TJSDocument(data.actor);
    $: {
        $doc;
        const attributeUpdate = getProperty(doc.updateOptions, "data." + data.attribute);
        if (attributeUpdate) {
            text = getProperty(data.actor.data, data.attribute);
        }
    }

</script>

<div use:applyStyles={data.styles}>{text}</div>

<style lang="scss">
  div {
    position: fixed;
  }
</style>