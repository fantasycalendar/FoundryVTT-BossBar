<script>
   import { getContext }               from 'svelte';

   import { resizeObserver }           from '@typhonjs-fvtt/runtime/svelte/action';
   import { TJSApplicationShell }      from '@typhonjs-fvtt/runtime/svelte/component/core';
   import { TJSPositionControlLayer }  from '@typhonjs-fvtt/svelte-standard/component'

   import { boxStore, validator }      from './boxStore.js';

   import Box                          from './boxes/Box.svelte';
   import BoxHeader                    from './BoxHeader.svelte';

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
   <BoxHeader {controls} />
   <main use:resizeObserver={setDimension}>
      <TJSPositionControlLayer {boundingRect} bind:controls components={$boxStore}>
      {#each $boxStore as box (box.id)}
         <svelte:component this={Box} {box} />
      {/each}
      </TJSPositionControlLayer>
   </main>
</TJSApplicationShell>

<style lang=scss>
   main {
      position: relative;
      height: 100%;
      overflow: hidden;
   }
</style>