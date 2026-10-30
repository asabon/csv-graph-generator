---
name: prepare-release
description: >-
  Prepare a new version release by incrementing package.json version,
  creating a release issue/PR, and guiding post-merge release publishing.
---

# リリース準備・発行スキル (prepare-release)

ユーザーから「リリースしたい」または「`vX.Y.Z` をリリースしたい」と依頼された際に実行するスキルです。

---

## 🎯 リリース準備フロー (Release Preparation)

### 1. ベースブランチ (main) の CI 疎通確認 & バージョン決定
1. ベースとなる `main` ブランチの最新コミットに対する GitHub Actions (Test Action) の成功を確認する：
   ```bash
   git fetch origin main
   gh run list --branch main --workflow "Test Action" --limit 1 --json headSha,status,conclusion
   git rev-parse origin/main
   ```
   - 直近の実行の `headSha` が `origin/main` の最新コミット SHA と一致し、ステータスが `completed / success` であることを確認する。
   - ※ まだ実行されていない、または過去のコミットに対する結果である場合は、`gh workflow run "Test Action" --ref main` を実行して完了を待つ。
2. バージョン情報の決定：
   - ユーザーからバージョン（例: `"0.0.6"`）が指定された場合はそのバージョンを使用する。
   - バージョンが明示されていない場合は現在の `package.json` のバージョンを確認し、変更差分の規模に応じてパッチインクリメント（例: `0.0.5` -> `0.0.6`）を決定する。

### 2. リリース用 Issue の起票
1. `docs/issues/` 配下のファイル一覧を確認し、3桁連番を決定する：
   ```bash
   Get-ChildItem docs/issues/*.md
   ```
2. [`docs/issues/TEMPLATE.md`](../../../docs/issues/TEMPLATE.md) をもとに `docs/issues/<3桁連番>-release-vX.Y.Z.md` を作成する（リリース目的と受け入れ基準を記述）。

### 3. トピックブランチ作成 & バージョン更新
1. トピックブランチ `chore/<3桁連番>-release-vX.Y.Z` を作成・切り替える：
   ```bash
   git switch main
   git pull origin main
   git switch -c chore/<3桁連番>-release-vX.Y.Z
   ```
2. `package.json` のバージョンを更新：
   - メジャーバージョンアップ時は `action.yml` や `README.md`（および `README_ja.md`）の `@vX` 表記も更新する。
3. 変更をコミットする：
   ```bash
   # 通常（マイナー・パッチリリース時）
   git add package.json docs/issues/<3桁連番>-release-vX.Y.Z.md
   git commit -m "chore: リリース vX.Y.Z に向けたバージョン更新"

   # メジャーバージョンアップ時（action.yml, README等も更新した場合）
   git add package.json docs/issues/<3桁連番>-release-vX.Y.Z.md action.yml README.md README_ja.md
   git commit -m "chore: リリース vX.Y.Z に向けたバージョン更新"
   ```

### 4. Pull Request の作成
1. ブランチをリモートへプッシュする：
   ```bash
   git push -u origin chore/<3桁連番>-release-vX.Y.Z
   ```
2. GitHub CLI で PR を作成する：
   ```bash
   gh pr create --title "[Chore] Issue #<3桁連番>: リリース vX.Y.Z" --body-file "<一時ファイルのパス>" --label "chore" --base main
   ```
3. ユーザーへ PR URL を案内し、レビューおよび `main` へのマージを依頼する。

---

## 🏷️ リリース公開フロー (Post-Merge Release Publishing)

ユーザーから「リリース PR をマージしました」と連絡を受けた後の手順：

1. `main` ブランチを最新化する：
   ```bash
   git switch main
   git pull origin main
   ```
2. GitHub Releases 画面でドラフトを公開する：
   - GitHub Releases 画面（`https://github.com/asabon/csv-graph-generator/releases`）の **Next Release (Draft)** を開き、右上の編集（鉛筆アイコン）をクリックする。
   - **Tag version**（例: `v0.0.6`）を入力して「Create new tag」を選択し、Title を `v0.0.6` に設定して **Publish release** をクリックする。
   - ※ UI 経由でドラフトを公開することで、Release Drafter で自動生成されたリリースノートが添付され、Docker イメージビルドおよびメジャーバージョンタグ更新ワークフローが確実にトリガーされます。
3. **公開後の自動処理**:
   - `publish-release.yml`（メジャーバージョンタグ更新）および `publish-image.yml`（GHCR コンテナイメージ更新）が自動実行されることをユーザーに報告する。
