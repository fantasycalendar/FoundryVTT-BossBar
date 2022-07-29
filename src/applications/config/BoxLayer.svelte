<script>
   import { getContext }               from 'svelte';

   import { resizeObserver }           from '@typhonjs-fvtt/runtime/svelte/action';
   import { TJSApplicationShell }      from '@typhonjs-fvtt/runtime/svelte/component/core';

   import { boxStore, validator }      from './boxStore.js';

   import Box                          from './boxes/Box.svelte';
   import SideBar from "./SideBar.svelte";

   export let elementRoot;

   const application = getContext('external').application;

   const storeValidator = boxStore.validator;

   let component;
   let controls;

   const boundingRect = new DOMRect(0, 0, 0, 0);

   $: boxStore.setValidatorEnabled($storeValidator);

   function setDimension(offsetWidth, offsetHeight)
   {
      validator.setDimension(offsetWidth, offsetHeight);

      boundingRect.width = offsetWidth;
      boundingRect.height = offsetHeight;

      // Force validation for all Position instances.
      for (const box of $boxStore) { box.position.set(); }
   }
</script>

<svelte:options accessors={true}/>

<TJSApplicationShell bind:elementRoot stylesContent={{ padding: 0 }}>
   <SideBar {controls} />
   <main use:resizeObserver={setDimension}>
      {#each $boxStore as box (box.id)}
         <svelte:component this={Box} {box} />
      {/each}
   </main>
</TJSApplicationShell>

<style lang=scss>
   main {
      position: relative;
      height: 100%;
      overflow: hidden;
   }
</style>