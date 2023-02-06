<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { radioSelection } from "./stores.js";

    const dispatch = createEventDispatcher();
    let selectedDelimiter: string;
    let availableDelimiters: string[] = [";", ","];
    let fileContent: string;
    let data: Map<any, any> = new Map();
    let headerArr: string[] = [];
    let bodyArr: any[] = [];

    function handleChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (!input) {
            return;
        }
        let file = input.files[0];

        const reader: FileReader = new FileReader();
        reader.onload = function (event: any): void {
            fileContent = event.target.result;
            split_input();
        };

        reader.readAsText(file);
    }
    const split_input = () => {
        if (!fileContent) {
            return;
        }
        let [header, ...body] = fileContent.split(/\r?\n/);

        headerArr = header.split(selectedDelimiter);
        dispatch("updateLabels", headerArr);
        for (let i = 0; i < body.length; i++) {
            let newline = body[i].split(selectedDelimiter);
            bodyArr.push(newline);
        }
        console.log(bodyArr);
        createData();
    };
    const createData = () => {
        if (!data.has(headerArr[$radioSelection])) {
            data.set(headerArr[$radioSelection], new Map());
            for (let i = 0; i < bodyArr.length; i++) {
                data.get(headerArr[$radioSelection]).set(
                    bodyArr[i][$radioSelection],
                    data.get(headerArr[$radioSelection]).get(bodyArr[i][$radioSelection]) + 1 || 1
                );
            }
        }
        console.log(data);
    };
    $: $radioSelection && createData();
    $: if (selectedDelimiter) {
        data.clear();
        headerArr = [];
        bodyArr = [];
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
