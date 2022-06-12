<script>
    import { applyStyles } from "@typhonjs-fvtt/runtime/svelte/action";
    export let data;

</script>

<div use:applyStyles={data.styles}>{data.text}</div>

<style lang="scss">
  div {
    position: fixed;
  }
</style>