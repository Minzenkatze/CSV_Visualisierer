<script lang="ts">
    import { labels, tabledata, selectedDelimiter } from "./stores.js";
    import {saveAs} from "file-saver";
    import {stringify} from 'csv-stringify/browser/esm/sync';
    const handleDataChange =  (e, i: number, j: number) => {
        $tabledata[i][j] = e.target.value;
    }
    const handleLabelChange = (e, i: number) => {
        $labels[i] = e.target.value;
    }
    const saveData = () => {
        const output = stringify([$labels, ...$tabledata], {delimiter: $selectedDelimiter});
        let blob = new Blob([output], {type: "text/plain;charset=utf-8"});
        saveAs (blob, "visualisierer.csv");
    }
</script>

<div id="table-container">
    <table>
        <tr>
            {#each $labels as Kategorie,i}
                <th><input id="Kategorien" type="text" value={Kategorie} on:change={e => handleLabelChange(e, i)}/></th>
            {/each}
        </tr>
        {#each $tabledata as zeilen, i}
            <tr>
                {#each zeilen as zelle, j}
                    <td><input id="Daten" type="text" value={zelle} on:change={e => handleDataChange(e, i, j)}/></td>
                {/each}
            </tr>
        {/each}
    </table>
    <button id="savebutton" on:click={saveData}>Speichern</button>
</div>

<style lang="scss">
    #table-container {
        max-width: 100%;
        max-height: 30rem;
        overflow: scroll;
    }
    table {
        border-collapse: collapse;
    }
    th {
        padding: 5px;
        background-color: rgba(193, 255, 203);
        border: 1px solid grey;
    }
    td {
        padding: 5px;
        border: 1px solid grey;
    }
    input {
        border: none;
        &:focus {
            outline: none;
        }
    }
    #Kategorien {
        font-weight: bold;
        background-color: rgba(193, 255, 203);
    }
    #savebutton {
        position: absolute;
        bottom: 0;
        left: 0;
        margin: 1rem 1rem;
    }
</style>
