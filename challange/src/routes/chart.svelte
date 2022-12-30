<script lang="ts">
    import { afterUpdate } from "svelte";
    import Chart from "chart.js/auto";
    import type { dataset } from "./dataset";

    export let daten: dataset;

    let createChart = () => {
        const canvas: HTMLCanvasElement = document.getElementById("myChart")!;
        const ctx = canvas.getContext("2d");
        const availableColors = [
            "rgb(255, 99, 132)",
            "rgb(201, 203, 207)",
            "rgb(255, 205, 86)",
            "rgb(153, 102, 255)",
            "rgb(255, 159, 64)",
            "rgb(54, 162, 235)"
        ];
        let mychart = new Chart(ctx, {
            type: "pie",
            data: {
                labels: ["One", "Two", "Three"],
                datasets: [
                    {
                        label: "My First Dataset",
                        data: [300, 50, 100],
                        backgroundColor: [],
                        hoverOffset: 4
                    },
                    {
                        label: "My Second Dataset",
                        labels: ["A", "B", "C", "D"],
                        data: [250, 40, 30, 20],
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
        mychart.data.datasets.forEach(dataset => {
            let size = availableColors.length;
            for (let i = 0; i < dataset.data.length; i++) {
                dataset.backgroundColor.push(availableColors[i % size]);
            }
            mychart.update();
        });
    };
    afterUpdate(createChart);
</script>

<div class="chart-container" style="position: relative; height:50%; width:50%">
    <canvas id="myChart" />
</div>
