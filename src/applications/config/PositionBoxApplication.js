import { SvelteApplication }  from '@typhonjs-fvtt/runtime/svelte/application';

import BoxLayer               from './BoxLayer.svelte';

export default class PositionBoxApplication extends SvelteApplication
{
   /**
    * @inheritDoc
    */
   constructor(options = {}) { super(options); }

   /**
    * Default Application options
    *
    * @returns {object} options - Application options.
    * @see https://foundryvtt.com/api/Application.html#options
    */
   static get defaultOptions()
   {
      return foundry.utils.mergeObject(super.defaultOptions, {
         id: 'position-boxs',
         title: 'Position (Box)',
         width: 860,
         height: 800,
         resizable: true,
         minimizable: true,

         svelte: {
            class: BoxLayer,
            target: document.body
         }
      });
   }

   /*async close(...args){
       debugger;
       return super.close(...args);
   }*/
}