---
name: prepare-release
description: >-
  Prepare a new version release by triggering the Bump Version workflow or creating
  a release PR to update package.json, and guiding post-merge release publishing.
---

# リリース準備・発行スキル (prepare-release)

ユーザーから「リリースしたい」または「`vX.Y.Z` をリリースしたい」と依頼された際に実行するスキルです。

---

## 🎯 リリース準備フロー (Release Preparation)

### 1. ベースブランチ (main) の CI 疎通確認
1. ベースとなる `main` ブランチの最新コミットに対する GitHub Actions (Test Action) の成功を確認する：
   ```bash
   gh run list --branch main --workflow "Test Action" --limit 1
   ```
   - ステータスが `completed / success` であることを確認する（失敗または実行中の場合は、結果を待つか原因を確認する）。

### 2. リリース方式の選択と実行

本リポジトリでは **Bump Version** ワークフロー（自動 PR 生成）を活用するか、手動でリリース PR を作成します。

#### 方法 A: Bump Version ワークフローの起動（推奨・自動化）
1. バージョンを指定して更新するか、指定なしでパッチバージョンを自動インクリメント（例: 0.0.5 -> 0.0.6）させる場合：
   ```bash
   # バージョン手動指定の場合（例: 0.1.0）
   gh workflow run bump-version.yml -f version="0.1.0"

   # バージョン指定なし（package.json を patch bump）
   gh workflow run bump-version.yml
   ```
2. ワークフロー完了後、自動生成された PR を確認：
   ```bash
   gh pr list --label "chore"
   ```
3. ユーザーへ PR URL を案内し、レビューおよび `main` へのマージを依頼する。

#### 方法 B: トピックブランチでの手動リリース準備
1. バージョン番号の決定（例: `0.0.6`）。
2. トピックブランチ `chore/<3桁連番>-release-vX.Y.Z` を作成・切り替える：
   ```bash
   git switch main
   git pull origin main
   git switch -c chore/<3桁連番>-release-vX.Y.Z
   ```
3. `package.json`（およびメジャーバージョン変更時は `action.yml`, `README.md`）のバージョンを更新。
4. Issue ファイル `docs/issues/<3桁連番>-release-vX.Y.Z.md` を作成。
5. 変更をコミットし、PR を作成する：
   ```bash
   git add package.json docs/issues/<3桁連番>-release-vX.Y.Z.md
   git commit -m "chore: リリース vX.Y.Z に向けたバージョン更新"
   git push -u origin chore/<3桁連番>-release-vX.Y.Z
   gh pr create --title "[Chore] Issue #<3桁連番>: リリース vX.Y.Z" --body-file "<一時ファイルのパス>" --label "chore" --base main
   ```

---

## 🏷️ リリース公開フロー (Post-Merge Release Publishing)

ユーザーから「リリース PR をマージしました」と連絡を受けた後の手順：

1. `main` ブランチを最新化する：
   ```bash
   git switch main
   git pull origin main
   ```
2. リリースタグを発行、または GitHub Releases 画面で公開する：
   - GitHub Releases 画面（`https://github.com/asabon/csv-graph-generator/releases`）の **Next Release (Draft)** を開き、Tag version（例: `v0.0.6`）を入力して新規タグ作成を選択し、Title を `v0.0.6` に設定して **Publish release** をクリックする。
   - またはタグを push してトリガーする：
     ```bash
     git tag v0.0.6
     git push origin v0.0.6
     ```
3. **公開後の自動処理**:
   - `publish-release.yml` および `publish-image.yml`（GHCR コンテナイメージ更新）が自動実行され、最新のメジャーバージョンタグ（例: `v0`）が追従更新されることを案内する。
