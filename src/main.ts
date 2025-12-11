import * as core from '@actions/core';
import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
import { promises as fs } from 'fs';
import { parse } from 'csv-parse/sync';

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

        const configuration: any = {
            type: graphType,
            data: {
                labels: labels,
                datasets: [
                    {
                        label: title || 'Data',
                        data: dataPoints,
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                plugins: {
                    title: {
                        display: !!title,
                        text: title
                    }
                }
            },
        };

        // Initialize Chart.js plugins if needed (not needed for basic)

        // Generate Image
        core.info(`Generating ${graphType} chart...`);
        const imageBuffer = await chartJSNodeCanvas.renderToBuffer(configuration);

        // Write to file
        await fs.writeFile(outputPath, imageBuffer);
        core.info(`Graph saved to ${outputPath}`);

    } catch (error) {
        if (error instanceof Error) core.setFailed(error.message);
    }
}

run();
