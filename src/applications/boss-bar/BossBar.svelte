<script>
    import { applyPosition, draggable } from '@typhonjs-fvtt/runtime/svelte/action';
    import { Position } from '@typhonjs-fvtt/runtime/svelte/application';
    import { getContext } from 'svelte';

    import Image from "../components/Image.svelte";
    import TilingBackground from "../components/TilingBackground.svelte";
    import Text from "../components/Text.svelte";
    import PipBar from "../components/PipBar.svelte";

    const { application } = getContext('external');
    export let elementRoot;
    export let actor;

    function closeApplication(){
        application.close();
    }

    const position = application.position;

    const components = [
        {
            class: Image,
            position: new Position({
                left: -7,
                top: -5,
                width: 15,
                height: 26
            }),
            attributes: {
                src: "modules/bossbar/src/assets/left-cap.png"
            }
        },
        {
            class: Image,
            position: new Position({
                left: position.width - 7,
                top: -5,
                width: 15,
                height: 26
            }),
            attributes: {
                src: "modules/bossbar/src/assets/right-cap.png"
            }
        },
        {
            class: TilingBackground,
            position: new Position({
                top: -5,
                left: 7,
                width: position.width - 14,
                height: 26
            }),
            attributes: {
                src: "modules/bossbar/src/assets/tiling-middle.png"
            }
        },
        {
            class: Text,
            position: new Position({
                top: -60,
                left: 0,
                width: position.width,
            }),
            attributes: {
                text: actor.name,
                style: `
                    color: white;
                    font-size: 3rem;
                    font-family: "Modesto Condensed", "Palatino Linotype", serif;
                    font-weight: 900;
                    text-align: center;
                    text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;
                `
            }
        },
        {
            class: PipBar,
            position: new Position({
                top: 0,
                left: 0
            }),
            attributes: {
                actor: actor,
                pips: 5,
                pipSrc: "modules/bossbar/src/assets/pip.png",
            }
        }
    ]

</script>

<svelte:options accessors={true}/>

<div class="root" bind:this={elementRoot} use:applyPosition={position} use:draggable={{position}}>
    <div class="container">
        {#each components as component, index (index)}
            <svelte:component this={component.class} attributes={component.attributes} position={component?.position} />
        {/each}
    </div>
    <div class="close-button" on:click|stopPropagation={closeApplication}>
        <i class="fas fa-times-circle"></i>
    </div>
</div>

<style lang="scss">

  .root {
    position: absolute;

    .container {
      position: relative;
      border-radius: 9999px;
      box-shadow: 0 10px 20px 5px rgba(0,0,0,0.5);
    }

    .close-button {
      position: absolute;
      opacity: 0;
      transition: opacity 0.15s;
      -webkit-transition: opacity 0.15s;
      top: -45px;
      font-size:1rem;
      cursor: pointer;
      z-index:20;
    }

    &:hover .close-button {
      transition: opacity 0.15s;
      -webkit-transition: opacity 0.15s;
      opacity: 1;
    }
  }

</style>