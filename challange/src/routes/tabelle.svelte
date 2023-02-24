<script lang="ts">
    import { labels, tabledata, selectedDelimiter } from "./stores.js";

    const handleDataChange =  (e, i: number, j: number) => {
        $tabledata[i][j] = e.target.value;
    }
    const handleLabelChange = (e, i: number) => {
        $labels[i] = e.target.value;
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
</style>
