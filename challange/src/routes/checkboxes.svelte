<script lang="ts">
    import { radioSelection } from "./stores.js";
    export let labels: string[];
    let Choice: number = 0;
    $: radioSelection.set(Choice);
</script>

<fieldset>
    <legend>Kategorien: </legend>

    {#each labels as label, i}
        <span id="check">
            <input type="radio" value={i} name="choice" bind:group={Choice} />
            <label for={label}>{label}</label>
        </span>
    {/each}
</fieldset>

<style>
    #check {
        display: block;
        margin: 0.5rem 0.5rem;
        float: left;
    }
</style>
