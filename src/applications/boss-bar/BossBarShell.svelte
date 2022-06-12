<script>
    import { getContext }   from 'svelte';
    import { scale }        from 'svelte/transition';

    import {
       applyPosition,
       draggable }          from '@typhonjs-fvtt/runtime/svelte/action';

    import {
       Image,
       PipBar,
       Text,
       TilingBackground,
       AttributeText }   from '../components';

    import ConfigApp from "../config/config-app.js";

    export let elementRoot;
    export let actor;

    const { application } = getContext('external');

    const position = application.position;

    let components = [];

    function loadComponents(){

        components = [
            {
                class: Image,
                position: position,
                src: "modules/bossbar/src/assets/left-cap.png",
                styles: {
                    "left": -7,
                    "top": -5
                }
            },
            {
                class: Image,
                position: position,
                src: "modules/bossbar/src/assets/right-cap.png",
                styles: {
                    "left": position.width - 7,
                    "top": -5,
                    "width": 15,
                    "height": 26
                }
            },
            {
                class: TilingBackground,
                position: position,
                src: "modules/bossbar/src/assets/tiling-middle.png",
                styles: {
                    "top": -5,
                    "left": 7,
                    "width": position.width - 14,
                    "height": 26
                }
            },
            {
                class: Text,
                position: position,
                text: "Static Text",
                styles: {
                    "top": -55,
                    "left": 0,
                    "width": position.width,
                    "color": "white",
                    "font-size": "3rem",
                    "font-family": `"Modesto Condensed", "Palatino Linotype", serif`,
                    "font-weight": "900",
                    "text-align": "center",
                    "text-shadow": "-1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000"
                }
            },
            {
                class: AttributeText,
                position: position,
                actor: actor,
                attribute: "name",
                styles: {
                    "top": 50,
                    "left": 0,
                    "width": position.width,
                    "color": "white",
                    "font-size": "3rem",
                    "font-family": `"Modesto Condensed", "Palatino Linotype", serif`,
                    "font-weight": "900",
                    "text-align": "center",
                    "text-shadow": "-1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000"
                }
            },
            {
                class: PipBar,
                position: position,
                actor: actor,
                pips: 5,
                pipSrc: "modules/bossbar/src/assets/pip.png",
                styles: {
                    top: 0,
                    left: 0
                }
            }
        ]

        const dimensionKeys = ["top", "left", "width", "height"];
        components = components.map(component => {
            dimensionKeys.forEach(key => {
                if(component?.styles?.[key]){
                    component.styles[key] += "px";
                }
            })
            return component;
        })
    }

    loadComponents();

    $: {
        $position;
        loadComponents();
    }

</script>

<svelte:options accessors={true}/>

<div class="root"
     bind:this={elementRoot}
     use:applyPosition={position}
     use:draggable={{position}}
     transition:scale>
    <div class="container">
        {#each components as data, index (index)}
            <svelte:component this={data.class} bind:data={data}/>
        {/each}
    </div>
    <div class="button-container">
        <div class="ui-button"
             on:click|stopPropagation={() => { application.close() }}
             on:pointerdown|preventDefault|stopPropagation={()=>null}>
            <i class="fas fa-times-circle"></i>
        </div>
        <div class="ui-button"
             on:click|stopPropagation={() => { ConfigApp.show(application) }}
             on:pointerdown|preventDefault|stopPropagation={()=>null}>
            <i class="fas fa-cog"></i>
        </div>
    </div>
</div>

<style lang="scss">

  .root {
    position: absolute;

    .container {
      position: relative;
    }

    .button-container{
      position: absolute;
      display: flex;
      top: -45px;
      z-index: 20;
      opacity: 0;
      padding: 5px 7px;
      background-color: rgba(255, 255, 255, 0.75);
      border-radius: 5px;
    }

    &:hover .button-container {
      transition: opacity 0.15s;
      -webkit-transition: opacity 0.15s;
      opacity: 1;
    }

    .ui-button {
      position: relative;
      transition: opacity 0.15s;
      -webkit-transition: opacity 0.15s;
      opacity: 0.6;
      font-size:1rem;
      cursor: pointer;

      &:not(:last-child){
        margin-right:0.5rem;
      }

      &:hover{
        opacity: 1.0;
        transition: opacity 0.15s;
        -webkit-transition: opacity 0.15s;
      }
    }
  }

</style>
