import { writable }   from 'svelte/store';

import { Position }        from '@typhonjs-fvtt/runtime/svelte/application';

let idCntr = 0;

let savedComponentData;

const validator = new Position.Validators.TransformBounds({ constrain: false });

function getRandomInt(min, max)
{
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor()
{
   return `rgba(${getRandomInt(100, 255)}, ${getRandomInt(100, 255)}, ${getRandomInt(100, 255)}, 0.5)`;
}

function getPosition(width, height)
{
   const bounds = getRandomInt(90, 140);

   const position = new Position({
      top: getRandomInt(0, height),
      left: getRandomInt(0, width),
      width: bounds,
      height: bounds,
      validator
   });

   // Store initial bounds to swap between `auto` and `bounds`.
   position._initialBounds = bounds;

   return position;
}

/** @type {{id: number, position: Position, color: string}[]} */
let data = [];

const boxStore = writable(data);

boxStore.validator = writable(true);

boxStore.add = (count = 1) =>
{
   const width = validator.width;
   const height = validator.height;

   boxStore.update((array) =>
   {
      for (let cntr = count; --cntr >= 0;)
      {
         array.push({ id: idCntr++, position: getPosition(width, height), color: getRandomColor() });
      }

      return array;
   });
};

boxStore.save = (componentData) =>
{
   savedComponentData = componentData;
};

boxStore.restore = () =>
{
   if (typeof savedComponentData === 'object')
   {
      const newData = [];

      for (const component of savedComponentData.components)
      {
         // Must add a new Position and a new unique ID.
         const position = new Position({ ...component.position, validator });
         newData.push({ ...component, id: idCntr++, position });
      }

      boxStore.set(newData);
      data = newData;
   }
};


boxStore.setValidatorEnabled = (enabled) =>
{
   validator.enabled = enabled;

   // When the validator is turned on and there is box data then force a set on each box position to update validation.
   if (enabled && data.length > 0)
   {
      for (const box of data) { box.position.set(); }
   }
};


export { boxStore, validator };