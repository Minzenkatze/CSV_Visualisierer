<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { radioSelection, daten, labels, tabledata } from "./stores.js";
    const dispatch = createEventDispatcher();
    //Initialisieren einiger Variablen für den späteren gebrauch
    let selectedDelimiter: string;
    let availableDelimiters: string[] = [",", ";"];
    let fileContent: string;
    let headerArr: string[] = [];
    let bodyArr: string[] = [];

    function handleChange(event: Event): void {
        // Handler für den Hochladebutton
        const input = event.target as HTMLInputElement;
        bodyArr = [];
        //radioSelection wird auf 0 zurückgesetzt da nicht garantiert ist, dass die neue Datei die gleiche Anzahl an Kategorien hat
        radioSelection.set(0);
        let file = input.files[0];
        const reader: FileReader = new FileReader();
        //Sobald der reader bereit ist wird die Datei verarbeitet
        reader.onload = function (event: any): void {
            fileContent = event.target.result;
            split_input();
        };
        reader.readAsText(file);
    }
    const split_input = () => {
        // bricht ab falls die Datei leer ist
        if (!fileContent) {
            return;
        }
        //Die erste Zeile ist der Header, die restlichen Zeilen die Daten
        let [header, ...body] = fileContent.split(/\r?\n/);

        headerArr = header.split(selectedDelimiter);
        // Wenn ein Eintrag fehlt wird stattdessen ein Platzhalter benutzt
        for (let i = 0; i < headerArr.length; i++) {
            if (!headerArr[i]) {
                headerArr[i] = `NA_${i}`;
            }
        }
        $labels = headerArr;
        for (let i = 0; i < body.length; i++) {
            let newline = body[i].split(selectedDelimiter);
            for (let i = 0; i < newline.length; i++) {
                if (!newline[i]) {
                    newline[i] = "NA";
                }
            }
            bodyArr.push(newline);
        }
        $tabledata = bodyArr;
        /*Aus den beiden Arrays headerArr und bodyArr soll ein gemeinsames Array werden welche für jede Spalte 
        den Namen und die Anzahl an Kategorien zusammenzählt */
        let combined = [];
        for (let i = 0; i < headerArr.length; i++) {
            combined.push([headerArr[i], new Map()]);
            //Geht die Spalte durch und fügt entweder 1 zu jeder existierenden Kategorie hinzu falls diese existiert, oder setzt diese auf 1 falls nicht
            for (let j = 0; j < bodyArr.length; j++) {
                combined[i][1].set(bodyArr[j][i], combined[i][1].get(bodyArr[j][i]) + 1 || 1);
            }
            $daten = combined;
        }
    };
    //Läuft wenn selectedDelimiter sich ändert
    $: if (selectedDelimiter) {
        radioSelection.set(0);
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
