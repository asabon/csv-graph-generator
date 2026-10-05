---
name: check-ci
description: >-
  Inspect, monitor, and analyze GitHub Actions workflow runs, summaries,
  annotations (warnings/notices), and failure logs using GitHub CLI (gh).
---

# GitHub Actions ログ確認・分析スキル (check-ci)

GitHub Actions（CI、Test Action、Release Drafter 等）の実行状況、サマリー、Annotations（警告・非推奨通知）、エラーログを迅速かつ確実に取得・分析するための手順書です。

---

## 🎯 目的

- 膨大なログ全体を漫然と取得するのではなく、**サマリー、Annotations（警告）、失敗ステップのログ** をピンポイントで抽出し、CI 失敗や警告の原因を素早く特定・解決する。

---

## 📋 実行手順

### 1. ワークフロー実行（Run）の特定

現在作業中のブランチ、PR、またはリポジトリ全体の直近の実行一覧を確認します。

```bash
# 直近 5 件のワークフロー実行を確認
gh run list --limit 5

# 特定ブランチに紐づく実行を確認
gh run list --branch <ブランチ名> --limit 3

# 特定ワークフロー（例: Test Action）に絞り込んで確認
gh run list --workflow "Test Action" --limit 3
```

---

### 2. 実行サマリー & Annotations（警告・注記）の確認

Run ID を指定して、ジョブの成否、実行時間、および **Annotations（Summary ページに表示される警告・非推奨通知）** を取得します。

```bash
gh run view <RUN_ID>
```

> [!TIP]
> `gh run view <RUN_ID>` を実行すると、Summary 画面に表示される `ANNOTATIONS`（警告・非推奨通知、Linter の指摘等）が直接テキストとして出力されます。

---

### 3. 失敗時のエラーログ抽出（失敗ステップのピンポイント取得）

ワークフローが失敗（`failure` / `cancelled`）している場合、**失敗したステップのログのみ** を抽出して素早く原因を特定します。

```bash
# 失敗したステップのログのみを抽出
gh run view <RUN_ID> --log-failed
```

---

### 4. 特定ジョブまたは全体ログの詳細確認（必要に応じて）

特定ジョブの詳細ログを追跡したい場合や、全体の生ログを確認したい場合に使用します。

```bash
# 特定のジョブ ID のログを確認
gh run view --job=<JOB_ID>

# Run 全体の生ログをすべて確認（※ログ量が多いため grep 等と併用推奨）
gh run view <RUN_ID> --log
```

---

### 5. 実行中のワークフローの完了待機

ワークフローが実行中（`in_progress` / `queued`）の場合、完了を待機して結果を受け取ることができます。

```bash
# ワークフローが完了するまで待機（リアルタイム進行表示）
gh run watch <RUN_ID>
```

---

## 💡 コマンド早見表

| 目的 | コマンド |
| :--- | :--- |
| 直近の実行一覧を取得 | `gh run list --limit 5` |
| ブランチの実行一覧を取得 | `gh run list --branch <ブランチ名>` |
| サマリー & Annotations（警告）を確認 | `gh run view <RUN_ID>` |
| 失敗ステップのログのみ取得 | `gh run view <RUN_ID> --log-failed` |
| 実行完了まで待機 | `gh run watch <RUN_ID>` |
