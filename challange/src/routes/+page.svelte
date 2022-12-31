<script lang="ts">
    import Chart from "./chart.svelte";
    import { createEventDispatcher } from "svelte";
    import Checkboxes from "./checkboxes.svelte";
    import Fileupload from "./fileupload.svelte";

    let labels: string[] = [];
    const dispatch = createEventDispatcher();
    function handleUpdateLabels(event) {
        labels = event.detail;
    }
    let daten = {
        labels: ["Red", "Blue", "Yellow"],
        data: [
            ["A", "C", "B"],
            ["B", "C", "B"],
            ["A", "A", "C"],
            ["B", "A", "C"]
        ]
    };
</script>

<section>
    <header>
        <h1>CSV Visualisierer</h1>

        <p>
            Lade hier eine CSV Datei hoch und lass dir die einzelnen Kategorien in einem
            Kreisdiagramm darstellen.
        </p>
    </header>
    <div id="main-content">
        {#if labels.length != 0}
        <Checkboxes {labels} />
        <Chart {daten} />
        {/if}
        <Fileupload on:updateLabels={handleUpdateLabels} />
    </div>
</section>

<style lang="scss">
    :global(body) {
        background: linear-gradient(
            180deg,
            rgb(8, 158, 45) 5%,
            rgba(76, 226, 100, 0.5816527294511555) 40%,
            rgba(255, 255, 255, 1) 100%
        );
    }
    section {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 100vh;
        font-family: Arial, Helvetica, sans-serif;
    }
    header {
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 50vw;
        margin: 0.5em 1em;
        padding: 1em;
        border-radius: 1rem;
        box-shadow: 5px 5px 15px rgb(100, 100, 100);
        background-color: rgba(14, 124, 32, 0.582);
        h1 {
            font-size: 2rem;
            font-weight: bold;
        }
    }
    #main-content {
        display: flex;
        flex-direction: column;
        margin: 5em 10em;
        padding: 5em;
        width: 50vw;
        height: auto;
        border-radius: 1rem;
        box-shadow: 5px 5px 15px rgb(100, 100, 100);
        background-color: white;
        position: relative;
    }
</style>
