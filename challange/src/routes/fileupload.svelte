<script lang="ts">
    import { radioSelection, daten, labels, tabledata, selectedDelimiter } from "./stores.js";
    import { parse } from 'csv-parse/browser/esm/sync';
    //Initialisieren einiger Variablen für den späteren gebrauch
    let availableDelimiters: string[] = [",", ";"];
    let fileContent: string;


    function handleChange(event: Event): void {
        // Handler für den Hochladebutton
        const input = event.target as HTMLInputElement;
        //radioSelection wird auf 0 zurückgesetzt da nicht garantiert ist, dass die neue Datei die gleiche Anzahl an Kategorien hat
        radioSelection.set(0);
        let file = input.files[0];
        const reader: FileReader = new FileReader();
        //Sobald der reader bereit ist wird die Datei verarbeitet
        reader.onload = function (event: any): void {
            fileContent = event.target.result;
            splitInput();
        };
        if (file){
            reader.readAsText(file);
        }
    }
    const splitInput = () => {
        const csv = parse(fileContent, {delimiter: $selectedDelimiter, skipRecordsWithError: true, skipEmptyLines: true});
        [$labels, ... $tabledata] = csv;
        combineData();
    };
    const combineData = () => {
        /*Aus den beiden Arrays $labels und $tabledata soll ein gemeinsames Array werden welche für jede Spalte 
        den Namen und die Anzahl an Kategorien zusammenzählt */
        $daten = [];
        for (let i = 0; i < $labels.length; i++) {
            $daten.push([$labels[i], new Map()]);
        //Geht die Spalte durch und fügt entweder 1 zu jeder existierenden Kategorie hinzu falls diese existiert, oder setzt diese auf 1 falls nicht
            for (let j = 0; j < $tabledata.length; j++) {
                $daten[i][1].set($tabledata[j][i], $daten[i][1].get($tabledata[j][i]) + 1 || 1);
            }
        }
    }

    //Läuft wenn selectedDelimiter sich ändert
    $: if ($selectedDelimiter != "" && fileContent) {
        radioSelection.set(0);
        splitInput();
    }
    $: if ($labels || $tabledata){
        combineData();
        console.log($daten);
    }
</script>

<div class="container">
    <label for="trennzeichenLabel">Trennzeichen:</label>
    <select bind:value={$selectedDelimiter}>
        {#each availableDelimiters as delimiter}
            <option value={delimiter}>
                {delimiter}
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
