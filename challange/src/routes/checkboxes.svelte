<script lang="ts">
    export let labels: string[];
    let chosen: number = 0;
</script>

<fieldset>
    <legend>Kategorien: </legend>

    {#each labels as label, i}
        <span id="check">
            <input type="radio" value={i} name="choice" bind:group={chosen} />
            <label for={label}>{label}</label>
        </span>
    {/each}
</fieldset>
<p>{chosen}</p>

<style>
    #check {
        display: block;
        margin: 0.5rem 0.5rem;
        float: left;
    }
</style>
