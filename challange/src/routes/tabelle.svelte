<script lang="ts">
    import { labels, tabledata } from "./stores.js";
</script>

<div id="table-container">
    <table>
        <tr>
            {#each $labels as Kategorie}
                <th><input id="Kategorien" type="text" value={Kategorie} /></th>
            {/each}
        </tr>
        {#each $tabledata as zeilen}
            <tr>
                {#each zeilen as zelle}
                    <td><input id="Daten" type="text" value={zelle} /></td>
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
