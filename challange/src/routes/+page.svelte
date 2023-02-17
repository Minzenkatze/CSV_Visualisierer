<script lang="ts">
    import Chart from "./chart.svelte";
    import Checkboxes from "./checkboxes.svelte";
    import Fileupload from "./fileupload.svelte";

    let labels: string[] = [];
    let currentTab: string = "Diagramm";
    function handleUpdateLabels(event: Event) {
        labels = event.detail;
        console.log(labels);
    }
    function setTab(event: Event) {
        let button = event.target as HTMLInputElement;
        let lasttab = document.querySelector(`[name=${currentTab}]`);
        lasttab.style.zIndex = "0";
        currentTab = button.name;
        button.style.zIndex = "2";
        console.log(currentTab);
    }
</script>

<section>
    <header>
        <h1>CSV Visualisierer</h1>

        <p>
            Lade hier eine CSV Datei hoch und lass dir die einzelnen Kategorien in einem
            Kreisdiagramm darstellen.
        </p>
    </header>
    <div id="wrapper">
        <nav id="navbar">
            <button class="tab" name="Diagramm" on:click={setTab}>Diagramm</button>
            <button class="tab" name="Tabelle" on:click={setTab}>Tabelle</button>
        </nav>
        <div id="main-content">
            {#if labels.length != 0 && currentTab == "Diagramm"}
                <Checkboxes {labels} />
                <Chart />
            {/if}
            {#if labels.length != 0 && currentTab == "Tabelle"}
                <p>Hier kommt eine Tabelle hin</p>
            {/if}
            <Fileupload on:updateLabels={handleUpdateLabels} />
        </div>
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
    #wrapper {
        display: flex;
        flex-direction: column;
        margin: 5em 10em;
    }
    #main-content {
        display: flex;
        flex-direction: column;
        padding: 5em;
        width: 50vw;
        height: auto;
        border-radius: 1rem;
        box-shadow: 5px 5px 15px rgb(100, 100, 100);
        background-color: white;
        position: relative;
    }
    .tab {
        position: relative;
        border: none;
        outline: none;
        height: 1.5rem;
        width: 6rem;
        left: 1rem;
        background-color: white;
        border-radius: 1rem 1rem 0 0;
        z-index: 0;
    }
</style>
