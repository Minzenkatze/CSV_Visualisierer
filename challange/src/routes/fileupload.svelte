<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    let selectedDelimiter: string;
    let availableDelimiters: string[] = [";", ","];
    let fileContent: string;

    function handleChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (!input) {
            return;
        }
        // Get the selected files from the input element
        let file = input.files[0];

        // Create a new FileReader instance
        const reader: FileReader = new FileReader();

        // Listen for the `onload` event on the FileReader instance, which will be triggered
        // when the contents of the file have been successfully read
        reader.onload = function (event: any): void {
            // The `event.target.result` property will contain the contents of the file as a string
            fileContent = event.target.result;
            split_input();
        };

        // Read the contents of the first file in the selected files
        reader.readAsText(file);
    }
    const split_input = () => {
        if (!fileContent) {
            return;
        }
        let lines = fileContent.split(/\r?\n/);
        for (let i in lines) {
            lines[i] = lines[i].split(selectedDelimiter);
        }
        dispatch("updateLabels", lines[0]);
    };
    $: if (selectedDelimiter) {
        split_input();
    }
</script>

<div class="container">
    <label for="trennzeichenLabel">Trennzeichen:</label>
    <select bind:value={selectedDelimiter}>
        {#each availableDelimiters as delimitor}
            <option value={delimitor}>
                {delimitor}
            </option>
        {/each}
    </select>
    <input type="file" accept=".csv" on:change={handleChange} />
</div>

<style lang="scss">
    .container {
        position: absolute;
        bottom: 0;
        right: 0;
        margin: 1rem 1rem;
        input {
            padding-left: 1rem;
        }
    }
</style>
