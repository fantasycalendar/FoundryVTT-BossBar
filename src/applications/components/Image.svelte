<script>

    import { applyPosition } from '@typhonjs-fvtt/runtime/svelte/action';

    export let attributes;
    export let position;

</script>

<img src="{attributes.src}" use:applyPosition={position} />

<style lang="scss">

  img {
    position: fixed;
    border: 0;
  }

</style>