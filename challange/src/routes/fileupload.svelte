<script lang="ts">
    import { radioSelection, daten, labels, tabledata, selectedDelimiter } from "./stores.js";
    import { parse } from 'csv-parse/browser/esm/sync';
    import {saveAs} from "file-saver";
    import {stringify} from 'csv-stringify/browser/esm/sync';
    //Initialisieren einiger Variablen für den späteren gebrauch
    let availableDelimiters: string[] = [",", ";"];
    let fileContent: string;
    //Variablen für das erstellen der leeren Tabelle
    let rows: number;
    let columns: number;


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
    }
    const saveData = () => {
        //Speichere die Daten
        const output = stringify([$labels, ...$tabledata], {delimiter: $selectedDelimiter});
        let blob = new Blob([output], {type: "text/plain;charset=utf-8"});
        saveAs (blob, "visualisierer.csv");
    }
    const createNewTable = () => {
        // Erstellen einer neuen leeren Tabelle mit gewünschten Dimensionen
        if (columns < 0 || rows < 0 ){
            return;
        }
        let newTable = [];
        for (let i = 0; i < rows + 1; i++){
            let line = [];
            for (let j = 0; j < columns; j++){
                line.push("");
            }
            newTable.push(line);
        }
        [$labels, ...$tabledata] = newTable;
    }
    const validate = () => {
        //Überprüft ob die Eingabe beider Inputs valide ist. Wenn nicht, wird der Button deaktiviert.
        let tabellenbutton = document.getElementById("neue-tabelle-button") as HTMLInputElement;
        let columnfield = document.getElementById("spalten") as HTMLInputElement;
        let rowfield = document.getElementById("reihen") as HTMLInputElement;
        if (columnfield.checkValidity() && columnfield.value !== "" && rowfield.checkValidity() && rowfield.value !== ""){
            tabellenbutton.disabled = false;
        } else {
            tabellenbutton.disabled = true;
        }
    }
    
</script>

<div class="container">
    {#if $daten.length > 0}
    <button class="linker-button" on:click={saveData}>Speichern</button>
    {:else}
    <div class="linker-button">
        <input class=input-dimension id="spalten" on:input={validate} bind:value={columns} type="number" min="1" max="50" placeholder="Spalten">
        <input class=input-dimension id="reihen" on:input={validate} bind:value={rows} type="number" min="1" max="1000" placeholder="Reihen">
        <button id="neue-tabelle-button" on:click={createNewTable} disabled>Neue Tabelle</button>
    </div>
    {/if}
    <div class="rechter-button">
    <label for="trennzeichen" style="margin-right: 0.5rem">Trennzeichen:</label>
    <select id="trennzeichen" bind:value={$selectedDelimiter}>
        {#each availableDelimiters as delimiter}
            <option value={delimiter}>
                {delimiter}
            </option>
        {/each}
    </select> 
    <input id="fileupload" type="file" accept=".csv" on:change={handleChange} />
    </div>
</div>

<style lang="scss">
    .container {
        display: flex;
    }
    .linker-button {
        margin:0.5rem;
        justify-content: right;
    }
    .rechter-button {
        margin:0.5rem;
        display:flex;
        flex-grow: 1;
        justify-content: end;
    }
    #fileupload {
        padding-left: 1rem;
    }
    .input-dimension{
        width: 4rem;
        &:invalid{
            color: red;
        }
    }
</style>
