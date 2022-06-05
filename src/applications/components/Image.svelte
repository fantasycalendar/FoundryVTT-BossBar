<script>

    import { applyPosition } from '@typhonjs-fvtt/runtime/svelte/action';

    export let attributes;
    export let position;

    console.log(attributes)

</script>

<img src="{attributes.src}" use:applyPosition={position} />

<style lang="scss">

  img {
    position: absolute;
    border: 0;
  }

</style>