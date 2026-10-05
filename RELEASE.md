# リリース手順 (Release Process)

本プロジェクトのバージョンリリース手順です。
日常の開発はトピックブランチと PR で進め、リリース作業は Antigravity の `prepare-release` スキルを活用して迅速に行うことができます。

---

## ⚡ クイックリリース手順（推奨: Antigravity を使用）

日常のリリースは、チャットで Antigravity に指示するだけで自動で準備が完了します。

1. **リリース準備を依頼**:
   - チャットで **「リリースしてください」**（パッチバージョンアップ）または **「vX.Y.Z をリリースしてください」** と伝えます。
   - Antigravity が `main` の CI 疎通を確認し、リリース用トピックブランチ（`chore/<連番>-release-vX.Y.Z`）の作成、`package.json` の更新、Issue 起票、PR 作成までを自動実行します。
2. **PR の確認・マージ**:
   - 発行された PR を確認し、`main` へマージします。
3. **リリースの公開**:
   - リポジトリの **[Releases](https://github.com/asabon/csv-graph-generator/releases)** ページを開きます。
   - 自動生成されている **Next Release (Draft)** の編集アイコンをクリックし、Tag version（例: `v0.0.6`）とタイトルを入力して **Publish release** をクリックします（または `git tag vX.Y.Z && git push origin vX.Y.Z`）。

---

## 🛠️ 手動リリース手順 (Manual Process)

手動でリリース作業を行う場合の手順です。

### 1. リリース準備ブランチの作成とバージョン更新
1. `main` ブランチを最新化します。
   ```bash
   git switch main
   git pull origin main
   ```
2. リリース用ブランチを作成します。
   ```bash
   git switch -c chore/<3桁連番>-release-vX.Y.Z
   ```
3. `package.json` の `version` を更新します。
   - ※ メジャーバージョンアップ（例: `v0` -> `v1`）の場合は、`action.yml` の `image: 'docker://ghcr.io/asabon/csv-graph-generator:vX'` および `README.md` の `@vX` 表記も更新します。
4. Issue ファイル（`docs/issues/<3桁連番>-release-vX.Y.Z.md`）を作成します。
5. コミットしてリモートへプッシュし、PR を作成します。
   ```bash
   git add package.json docs/issues/<3桁連番>-release-vX.Y.Z.md
   git commit -m "chore: リリース vX.Y.Z に向けたバージョン更新"
   git push -u origin chore/<3桁連番>-release-vX.Y.Z
   gh pr create --title "[Chore] Issue #<3桁連番>: リリース vX.Y.Z" --label "chore" --base main
   ```

### 2. PR のレビューとマージ
- CI（`Test Action`）の通過を確認し、PR を `main` へマージします。

### 3. リリース公開 (Publish Release)
1. **[Releases](https://github.com/asabon/csv-graph-generator/releases)** ページを開きます。
2. 一番上の **Next Release (Draft)** を開き、右上の鉛筆アイコン（Edit）をクリックします。
3. **Tag version** に更新したバージョン（先頭に `v` を付与、例: `v0.0.6`）を入力し、「Create new tag」を選択します。
4. タイトルもバージョン番号（例: `v0.0.6`）に変更し、**Publish release** をクリックします。

---

## 🤖 公開後の自動処理
リリースが公開されると、以下の GitHub Actions が自動実行されます：
- **Publish Docker Image**: GHCR に最新の Docker イメージをビルド・プッシュします。
- **Update Major Tag**: メジャーバージョンタグ（例: `v0`）を自動的にこの新しいリリースへ更新します。
