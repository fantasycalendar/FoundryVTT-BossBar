<script>

    import { applyPosition } from '@typhonjs-fvtt/runtime/svelte/action';

    export let position;
    export let attributes;
    export let tiling = "repeat-x";

</script>

<div
    style="background-image: url({attributes.src}); background-repeat: {tiling};"
    use:applyPosition={position}
></div>

<style lang="scss">

  div {
    position: absolute;
  }

</style>