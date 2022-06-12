<script>
    import { applyStyles } from "@typhonjs-fvtt/runtime/svelte/action";
    export let data;
</script>

<img src="{data.src}" use:applyStyles={data.styles}/>

<style lang="scss">
  img {
    position: fixed;
    border: 0;
  }
</style>