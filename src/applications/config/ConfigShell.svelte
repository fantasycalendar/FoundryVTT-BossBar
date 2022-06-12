<script>

    import { ApplicationShell }   from '@typhonjs-fvtt/runtime/svelte/component/core';

    export let elementRoot;
    export let parentApp;

    let positionStore = parentApp.position;

    function updateWidth(event){
        const newWidth = Number(event.target.value);
        const newLeft = positionStore.left - (newWidth - positionStore.width)/2;
        positionStore.width = newWidth;
        positionStore.left = newLeft;
    }

</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
    <main>
        <input type="number" value="{positionStore.width}" on:change={updateWidth}>
    </main>
</ApplicationShell>