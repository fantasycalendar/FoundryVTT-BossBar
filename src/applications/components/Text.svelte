<script>

    import { applyPosition } from '@typhonjs-fvtt/runtime/svelte/action';

    export let position;
    export let attributes;

</script>

<div use:applyPosition={position} style="{attributes.style}">{attributes.text}</div>

<style lang="scss">

  div {
    position: absolute;
  }

</style>