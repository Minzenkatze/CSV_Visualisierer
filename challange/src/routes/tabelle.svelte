<script lang="ts">
    import { labels, tabledata } from "./stores.js";
</script>

<div id="table-container">
    <table>
        <tr>
            {#each $labels as Kategorie}
                <th>{Kategorie}</th>
            {/each}
        </tr>
        {#each $tabledata as zeilen}
            <tr>
                {#each zeilen as zelle}
                    <td>{zelle}</td>
                {/each}
            </tr>
        {/each}
    </table>
</div>

<style>
    #table-container {
        max-width: 100%;
        max-height: 30rem;
        overflow: scroll;
    }
    table {
        border-collapse: collapse;
    }
    th {
        background-color: rgba(193, 255, 203, 0.582);
        border: 1px solid grey;
    }
    td {
        padding: 5px;
        border: 1px solid grey;
    }
</style>
