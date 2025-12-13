import * as core from '@actions/core';
import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
import { promises as fs } from 'fs';
import { parse } from 'csv-parse/sync';
import * as path from 'path';

async function run(): Promise<void> {
    try {
        // Inputs
        const csvPath = core.getInput('csv-file');
        const outputPath = core.getInput('output-file');
        const graphType = core.getInput('graph-type');
        const title = core.getInput('title');

        // Read CSV
        core.info(`Reading CSV file from: ${csvPath}`);
        const csvContent = await fs.readFile(csvPath, 'utf8');

        // Parse CSV (Foundational implementation: assumes header row, simple structure)
        // TODO: Make this robust for different CSV structures
        const records = parse(csvContent, {
            columns: true,
            skip_empty_lines: true
        });

        if (records.length === 0) {
            throw new Error('CSV file is empty or invalid.');
        }

        // Prepare Data for Chart.js
        // Assumption: First column is Label, Second column is Value
        const labels = records.map((row: any) => Object.values(row)[0] as string);
        const dataPoints = records.map((row: any) => parseFloat(Object.values(row)[1] as string));

        if (dataPoints.some((val: number) => isNaN(val))) {
            core.warning('Some data points could not be parsed as numbers.');
        }

        core.info(`Found ${records.length} records.`);

        // Chart Configuration
        const width = 800;
        const height = 600;
        const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, backgroundColour: 'white' });

        // Generate colors for Pie/Doughnut charts
        const backgroundColors = [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)'
        ];
        const borderColors = [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ];

        let bg: string | string[] = 'rgba(54, 162, 235, 0.5)';
        let bd: string | string[] = 'rgba(54, 162, 235, 1)';

        if (graphType === 'pie' || graphType === 'doughnut') {
            bg = dataPoints.map((_: any, index: number) => backgroundColors[index % backgroundColors.length]);
            bd = dataPoints.map((_: any, index: number) => borderColors[index % borderColors.length]);
        }

        const configuration: any = {
            type: graphType,
            data: {
                labels: labels,
                datasets: [
                    {
                        label: title || 'Data',
                        data: dataPoints,
                        backgroundColor: bg,
                        borderColor: bd,
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                plugins: {
                    title: {
                        display: !!title,
                        text: title
                    },
                    legend: {
                        display: true
                    }
                }
            },
        };

        // Initialize Chart.js plugins if needed (not needed for basic)

        // Generate Image
        core.info(`Generating ${graphType} chart...`);
        const imageBuffer = await chartJSNodeCanvas.renderToBuffer(configuration);

        // Ensure directory exists
        const dir = path.dirname(outputPath);
        await fs.mkdir(dir, { recursive: true });

        // Write to file
        await fs.writeFile(outputPath, imageBuffer);
        core.info(`Graph saved to ${outputPath}`);

    } catch (error) {
        if (error instanceof Error) core.setFailed(error.message);
    }
}

run();
