# Issue #001: AI ハーネス環境の整備と git submodule の撤廃

- **ステータス**: 進行中
- **作成日**: 2026-10-06
- **対象ブランチ**: `chore/001-setup-ai-harness-and-remove-submodules`

---

## 🎯 目的 / 概要

リポジトリ内の AI 協調開発（AI ハーネス）環境を最新の洗練された構成（`IntervalTimer` 方式）に刷新し、運用の妨げとなっていた git submodule（`.shared-config`）や古い `.agent` 構成を撤廃してシンプルで自律的なプロジェクト構成に整備する。

---

## 📋 要件 / 受け入れ基準 (Acceptance Criteria)

- [ ] git submodule（`.gitmodules`, `.shared-config`）および git 設定の submodule 定義が完全に削除されていること。
- [ ] 古い `.agent` ディレクトリおよび古い設定ファイルが削除され、不要な成果物がクリーンアップされていること。
- [ ] プロジェクトルートに最新のガイドラインをまとめた `AGENTS.md` が配置されていること。
- [ ] `.agents/rules/` にワークスペース用ルール（`environment-isolation.md` 等）が配置されていること。
- [ ] `.agents/skills/` に標準スキル（`create-issue`, `create-pr`, `check-ci`, `prepare-release` 等）が配置されていること。
- [ ] `.githooks/` 配下に `pre-commit` および `pre-push` が設置され、`main` への直接操作防止と命名規則が検証されること。
- [ ] `.github/pull_request_template.md` が整備されていること。
- [ ] `.gitignore` に一時ファイル等（`/scratch/` など）の除外設定が追加されていること。
- [ ] `docs/issues/` の Issue 駆動開発テンプレート（`TEMPLATE.md`）が整備されていること。

---

## 💡 設計メモ・実装方針

1. **submodule の完全撤廃**:
   - `git rm .gitmodules`
   - `.shared-config` の削除と `.git/config` からの submodule エントリ削除
2. **古いエージェント構成の撤廃**:
   - `.agent/` ディレクトリの削除
3. **最新 AI ハーネスの導入 (`IntervalTimer` 準拠)**:
   - `AGENTS.md`: TypeScript / GitHub Actions 向けのコーディング規約、GitHub Flow、小単位コミット、Issue 駆動開発の明文化
   - `.agents/rules/environment-isolation.md`: 環境差異や一時ファイル、ビルド成果物のコミット防止
   - `.agents/skills/`:
     - `create-issue`: `docs/issues/` の連番自動採番、テンプレート展開、ブランチ自動作成
     - `create-pr`: `gh pr create` + PR テンプレート適用
     - `check-ci`: `gh run` 活用（サマリー、Annotations、失敗ステップログ抽出）
     - `prepare-release`: GitHub Actions (Bump Version ワークフロー起動や package.json バージョン更新) に連動したリリース準備
   - `.githooks/`:
     - `pre-commit`: main 直接コミット禁止、ブランチ名規則チェック
     - `pre-push`: main 直接プッシュ禁止
   - `.github/pull_request_template.md`
4. **Git 除外設定**:
   - `.gitignore` に `/scratch/` を追記

---

## 📝 完了チェックリスト

- [ ] 受け入れ基準を満たす実装・設定完了
- [ ] フォーマット・リントチェック確認
- [ ] Issue のステータスを完了に更新
