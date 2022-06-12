<script>

    import { tweened } from "svelte/motion";
    import { cubicOut } from "svelte/easing";

    export let data;
    export let progress;

    export let progressBar = tweened(0, {
        duration: data.ease ?? 200,
        easing: cubicOut,
    });

    export let progressBarGhost = tweened(0, {
        duration: data.ghostEase ?? 1500,
        easing: cubicOut,
    });

    progressBar.set(progress);
    progressBarGhost.set(progress);

    $: {
        progressBar.set(progress);
        progressBarGhost.set(progress);
    }

    const styles = {
        ghostColor: "rgba(217, 49, 49, 0.40)",
        color: "rgba(217, 49, 49, 1)"
    }

</script>

<div class="progress-bar" style="--ghost-color:{styles.ghostColor};--color:{styles.color}">
    {#if !data.hideGhost}
        <div class="progress-ghost" style="width:{$progressBarGhost*100}%;"></div>
    {/if}
    <div class="progress" style="width:{$progressBar*100}%;"></div>
    {#if !data.hideOverlay}
        <div class="overlay"></div>
    {/if}
</div>

<style lang="scss">

  .progress-bar {
    width: 100%;
    height: 15px;
    border-radius: 9999px;
    overflow: hidden;
    position: relative;

    > div {
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }

    .progress-ghost {
      z-index: 1;
      background-color: var(--ghost-color);
    }

    .progress {
      z-index: 2;
      background-color: var(--color);
      box-shadow: -5px 0 5px 0 inset rgb(0 0 0 / 25%);
    }

    .overlay {
      z-index: 3;
      width: 100%;
      box-shadow: 0 0 2px 2px inset rgb(0 0 0 / 50%);
    }
  }

</style>