<script lang="ts">
    import { onMount } from "svelte";
    import { daten, radioSelection } from "./stores.js";
    import Chart from "chart.js/auto";

    let ctx: CanvasRenderingContext2D | null;
    let canvas: HTMLCanvasElement;
    let mychart: Chart<"pie", number[], string>;

    const availableColors = [
        "rgb(255, 99, 132)",
        "rgb(201, 203, 207)",
        "rgb(255, 205, 86)",
        "rgb(153, 102, 255)",
        "rgb(255, 159, 64)",
        "rgb(54, 162, 235)"
    ];
    let size = availableColors.length;

    // Läuft wenn sich entweder die Daten oder die Selektion ändern und die Daten nicht leer sind und mychart existiert
    $: if (radioSelection && daten && mychart) {
        console.log("Chart");
        mychart.data.labels = [...$daten[$radioSelection][1].keys()];
        mychart.data.datasets[0].data = [...$daten[$radioSelection][1].values()];
        mychart.data.datasets[0].backgroundColor = [];
        for (let i = 0; i < mychart.data.labels.length; i++) {
            mychart.data.datasets[0].backgroundColor.push(availableColors[i % size]);
        }
        mychart.update();
        console.log($daten);
    }

    onMount((): void => {
        ctx = canvas.getContext("2d");

        mychart = new Chart(ctx, {
            type: "pie",
            data: {
                labels: [],
                datasets: [
                    {
                        data: [],
                        backgroundColor: [],
                        hoverOffset: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true
            }
        });
    });
</script>

<div class="chart-container">
    <canvas bind:this={canvas} id="myChart" />
</div>