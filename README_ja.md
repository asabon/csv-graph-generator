![GitHub release (latest by date)](https://img.shields.io/github/v/release/asabon/csv-graph-generator)
![GitHub license](https://img.shields.io/github/license/asabon/csv-graph-generator)
[![Test Action](https://github.com/asabon/csv-graph-generator/actions/workflows/test-action.yml/badge.svg)](https://github.com/asabon/csv-graph-generator/actions/workflows/test-action.yml)

# CSV Graph Generator (日本語)

[English](./README.md)


CSVファイルからグラフ画像を自動生成する GitHub Action です。入力されたCSVデータを解析し、Chart.js を使用して視覚化（棒グラフや折れ線グラフなど）を行い、画像ファイルとして保存します。IssueコメントやPull Requestの説明、レポートファイルなどに動的なデータ視覚化を含めたい場合に便利です。

## 特徴

*   **CSV解析**: 指定されたCSVファイルからデータを読み込みます。
*   **グラフ生成**: Chart.js を使用して、様々な種類のグラフ（棒グラフ、折れ線グラフなど）を生成します。
*   **カスタマイズ可能**: 出力ファイルパス、グラフの種類、タイトルなどを設定できます。
*   **簡単な統合**: 任意の GitHub Actions ワークフローに簡単に追加できます。

## 実行例
 
入力された CSV データがどのようにグラフ画像に変換されるかを示します。
 
### 入力データ (CSV)
 
このアクションは、1行目がヘッダーである単純な CSV フォーマットを想定しています。デフォルトでは、**1列目がラベル（X軸）**、**2列目がデータ値（Y軸）** として使用されます。
 
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
 
### 生成されるグラフ
 
上記のデータ構造から生成されるグラフの例です：
 
**棒グラフ (Bar Chart)**
<p><img src="assets/bar-chart-sample.png" width="400" alt="Bar Chart Sample"></p>
 
**折れ線グラフ (Line Chart)**
<p><img src="assets/line-chart-sample.png" width="400" alt="Line Chart Sample"></p>
 
**円グラフ (Pie Chart)**
<p><img src="assets/pie-chart-sample.png" width="400" alt="Pie Chart Sample"></p>
 
**ドーナツグラフ (Doughnut Chart)**
<p><img src="assets/doughnut-chart-sample.png" width="400" alt="Doughnut Chart Sample"></p>
 
**レーダーチャート (Radar Chart)**
<p><img src="assets/radar-chart-sample.png" width="400" alt="Radar Chart Sample"></p>
 
**ポーラーエリアチャート (Polar Area Chart)**
<p><img src="assets/polar-area-chart-sample.png" width="400" alt="Polar Area Chart Sample"></p>
 
## 使い方

## 貢献について

貢献を歓迎します！このプロジェクトへの貢献方法の詳細については、[CONTRIBUTING_ja.md](./CONTRIBUTING_ja.md) をご覧ください。

## ライセンス

このプロジェクトは MIT ライセンスの下でライセンスされています。詳細については [LICENSE](./LICENSE) ファイルをご覧ください。
