<script>
    import {
        alwaysBlur,
        autoBlur }        from '@typhonjs-fvtt/runtime/svelte/action';

    import {
        easingFunc,
        easingList }      from '@typhonjs-fvtt/runtime/svelte/gsap';

    import { boxStore }  from './boxStore.js';

    export let controls;

    const storeValidator = boxStore.validator;
</script>

<div class="flex">
  Hi, I'm a sidebar.
</div>

<style lang="scss">
  button {
    height: fit-content;
    width: 75px;
    line-height: 20px;
  }

  div.container {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.25em;
    border: 2px solid rgba(60,60,207,0.8);
    padding: 0 0.25em;
    width: 95%;
    margin-left: 0.25em
  }

  div.header {
    background: linear-gradient(337deg, rgba(2,0,36,0.75) 0%, rgba(40,40,207,0.5) 48%, rgba(149,171,176,0.75) 100%);
    border-bottom: solid black 1px;
    white-space: nowrap;
  }

  div.group {
    display: flex;
    padding-top: 0.25em;
  }

  input { color: white; margin: 3px 3px }
  input[type=range] { max-width: 3.75em }
  input[type=text] { max-width: 2em; pointer-events: none; }

  select {
    color: white;
    margin: 3px 6px;
  }

  select option {
    background: rgba(60,60,207,0.8);
    color: inherit;
  }

  .flex {
    display: flex;
    height: fit-content;
    align-items: center;
  }

  .flex-vert {
    display: flex;
    flex-direction: column;
    height: fit-content;
    justify-content: center;
    align-items: center;
  }

  label {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  span {
    color: white;
  }
</style>