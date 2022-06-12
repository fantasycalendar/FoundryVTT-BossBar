<script>

    import { applyStyles } from "@typhonjs-fvtt/runtime/svelte/action";
    export let data;

    let styles;

    $: {
        styles = {
            "background-image": `url(${data.src})`,
            "background-repeat": "repeat-x",
            ...data.styles
        }
    }

</script>

<div use:applyStyles={styles}></div>

<style lang="scss">

  div {
    position: fixed;
  }

</style>