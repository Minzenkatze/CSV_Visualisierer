<script lang="ts">
    import { radioSelection, daten, labels, tabledata } from "./stores.js";
    //Initialisieren einiger Variablen für den späteren gebrauch
    let selectedDelimiter: string;
    let availableDelimiters: string[] = [",", ";"];
    let fileContent: string;
    let headerArr: string[] = [];
    let bodyArr: string[][] = [];

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
        let doubleQuotes: number = 0;
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
            /*Einige der Daten sind innerhalb von Anführungszeichen eingeschlossen und gehen über mehrer Zeilen hinweg. Daher schaue ich ob ein offenes Gänsefüßchen
            in der letzten Zeile existiert, also ob die Gesamtanzahl der Gänsefüßchen ungerade ist und füge alle Daten
            bis zum schließenden Zeichen zum letzten Eintrag hinzu*/
            let stringMatches = body[i].match(/"/g);
            let quoteOccurence = stringMatches?.length;
            let quoteIndices = [];
            for (let a = 0; a < body[i].length; a++) {
                if (body[i][a] === '"') {
                    quoteIndices.push(a);
                }
            }
            if (doubleQuotes) {
                if (quoteOccurence) {
                    //Die Stelle bis zum ersten Gänsefüßchen wird an den letzten Eintrag gehängt
                    bodyArr[bodyArr.length - 1][bodyArr[bodyArr.length - 1].length - 1] = bodyArr[
                        bodyArr.length - 1
                    ][bodyArr[bodyArr.length - 1].length - 1].concat(
                        body[i].slice(0, quoteIndices[0] + 1)
                    );
                    //Dann wird der Rest geteilt und an die vorherige Zeile gehängt dabei muss das erste Komma jedoch übersprungen werden
                    let newline = body[i].slice(quoteIndices[0] + 2).split(selectedDelimiter);
                    for (let j = 0; j < newline.length; j++) {
                        if (!newline[j]) {
                            newline[j] = "NA";
                        }
                    }
                    bodyArr[bodyArr.length - 1] = bodyArr[bodyArr.length - 1].concat(newline);
                } else {
                    //Wenn kein weiteres Gänsefüßchen in der Zeile aufgetaucht ist soll die gesamte Zeile an den letzten Eintrag angehängt werden
                    bodyArr[bodyArr.length - 1][bodyArr[bodyArr.length - 1].length - 1] = bodyArr[
                        bodyArr.length - 1
                    ][bodyArr[bodyArr.length - 1].length - 1].concat(body[i]);
                }
            } else {
                //Wenn kein Gänsefüßchen offen ist soll eine neue Zeile begonnen werden
                if (quoteOccurence) {
                    /*Wenn Gänsefüßchen vorhanden sind gehören diese immer zusammen, auch wenn sie das Trennzeichen enthalten,
                    deswegen füge ich den Teil zwischen zwei Gänsefüßchen als Block ein, das letzte einzelne, falls vorhanden, ignoriere ich*/
                    for (let j = 0; j < Math.floor(quoteOccurence / 2); j++) {
                        //Not implemented
                    }
                }
                let newline = body[i].split(selectedDelimiter);
                for (let i = 0; i < newline.length; i++) {
                    if (!newline[i]) {
                        newline[i] = "NA";
                    }
                }
                bodyArr.push(newline);
            }
            doubleQuotes += quoteOccurence || 0;
            doubleQuotes %= 2;
        }
        console.log(bodyArr);
        $tabledata = bodyArr;
        /*Aus den beiden Arrays headerArr und bodyArr soll ein gemeinsames Array werden welche für jede Spalte 
        den Namen und die Anzahl an Kategorien zusammenzählt */
        let combined: any[][] = [];
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
