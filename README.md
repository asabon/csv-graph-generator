![GitHub release (latest by date)](https://img.shields.io/github/v/release/asabon/csv-graph-generator)
![GitHub license](https://img.shields.io/github/license/asabon/csv-graph-generator)
[![Test Action](https://github.com/asabon/csv-graph-generator/actions/workflows/test-action.yml/badge.svg)](https://github.com/asabon/csv-graph-generator/actions/workflows/test-action.yml)

# CSV Graph Generator

[Japanese (日本語)](./README_ja.md)


A GitHub Action that automatically generates graph images from CSV files. It parses the input CSV data and creates visualizations (like bar charts or line charts) using Chart.js, saving them as image files. This is useful for including dynamic data visualizations in your issue comments, pull request descriptions, or report files.


## Features

*   **CSV Parsing**: Reads data from a specified CSV file.
*   **Graph Generation**: Generates various types of charts (bar, line, etc.) using Chart.js.
*   **Customizable**: Supports configuration for output file path, graph type, and title.
*   **Easy Integration**: Can be easily added to any GitHub Actions workflow.

## Examples
 
Here shows how the input CSV data is transformed into graph images.
 
### Input Data (CSV)
 
The action expects a simple CSV format where the first row contains headers. By default, the first column is used as **labels** (X-axis) and the second column as **data values** (Y-axis).
 
```csv
Label,Value
January,25
February,40
March,35
April,50
May,45
June,60
July,55
August,70
September,65
October,80
November,75
December,90
```
 
### Generated Graphs
 
Here are the graphs generated from the data structure above:
 
**Bar Chart**
<p><img src="assets/bar-chart-sample.png" width="400" alt="Bar Chart Sample"></p>
 
**Line Chart**
<p><img src="assets/line-chart-sample.png" width="400" alt="Line Chart Sample"></p>
 
**Pie Chart**
<p><img src="assets/pie-chart-sample.png" width="400" alt="Pie Chart Sample"></p>
 
**Doughnut Chart**
<p><img src="assets/doughnut-chart-sample.png" width="400" alt="Doughnut Chart Sample"></p>
 
**Radar Chart**
<p><img src="assets/radar-chart-sample.png" width="400" alt="Radar Chart Sample"></p>
 
**Polar Area Chart**
<p><img src="assets/polar-area-chart-sample.png" width="400" alt="Polar Area Chart Sample"></p>
 
## Usage

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details on how to contribute to this project.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.