# Antigravity 開発ガイドライン (csv-graph-generator)

本リポジトリにおける GitHub Action / TypeScript 開発およびペアプログラミングの振る舞い指針です。

---

## 1. 開発プロセス & ペアプログラミング方針

- **対話と段階的な進展**:
  - 実装前にユーザーと仕様・設計（機能、CLI引数、グラフ出力仕様等）を相談・すり合わせる。
  - 一度に大きく作らず、小さく動作確認できる単位で段階的に実装を進める。
- **変更の確認**:
  - コミット前に変更対象ファイル・ステータス（`git status`, `git diff`）を確認し、意図しないファイルが含まれていないクリーンな状態を維持する。

---

## 2. 開発 & コーディング規約 (TypeScript / GitHub Action)

- **言語 & スタイル (Prettier / ESLint 準拠)**:
  - 言語は **TypeScript** を使用し、Prettier および ESLint に準拠する。
  - **コード修正後のフォーマット・リント確認の徹底**:
    - コードの追加・修正を行った際、コミット前に `npm run format-check` および `npm run lint`（必要に応じて `npm run format`）を実行し、静的解析・スタイル違反がないことを確認する。
- **テスト方針**:
  - 単体テスト（Jest）は `npm test` でローカル実行可能。
  - ロジック追加・修正時はユニットテストを追加・更新する。
- **ビルド環境と CI の役割分担**:
  - 本プロジェクトはグラフ描画ライブラリ（`canvas` 等）などネイティブコンパイルを必要とする依存関係を含んでいる。
  - Windows 等のホスト環境ではネイティブビルド環境の構築が複雑になる場合があるため、動作検証・統合テストは GitHub Actions CI（Ubuntu / Docker）を積極的に活用する。
  - `CONTRIBUTING_ja.md` に記載の通り、ローカル環境で無理にネイティブビルドを行わず、CI パイプライン（`Test Action` ワークフロー）との協調を重視する。
- **環境差異・不要ファイルの排除**:
  - `node_modules/`, `coverage/`, `/scratch/`, `.DS_Store` などの自動生成・一時ファイルはコミット対象外を徹底する。
  - ホスト環境依存の絶対パス（例: `C:\Users\...`）を共有ファイルに混入させないこと。

---

## 3. Git / GitHub 開発ワークフロー & コミット規約

- **ブランチ戦略 (GitHub Flow)**:
  - `main` ブランチ: 常に安定してリリース可能な状態を維持する。直接の `commit` および `push` は禁止。
  - トピックブランチ: 作業目的に応じたプレフィックスを付け、`<タイプ>/<Issue番号>-<概要>` の形式で作成する（例: `feature/002-line-chart-options`）。

| プレフィックス | 用途・選定基準 | 具体例 |
| :--- | :--- | :--- |
| **`feature/`** | 新機能の追加・新規仕様の実装 | `feature/002-line-chart-options` |
| **`fix/`** | バグや不具合の修正 | `fix/003-csv-parse-empty-line` |
| **`refactor/`** | 仕様を変えない構造改善・リファクタリング | `refactor/004-extract-chart-builder` |
| **`docs/`** | ドキュメント類（README, 設計等）の追加・修正 | `docs/005-update-action-usage` |
| **`chore/`** | ビルド設定・依存関係更新・保守作業・リリース準備 | `chore/001-setup-ai-harness` |
| **`test/`** | テストコードの追加・更新 | `test/006-add-parser-tests` |

- **Git Hooks による誤操作防止**:
  - 本リポジトリでは `.githooks/` 配下に `pre-commit` および `pre-push` を用意し、`main` への直接操作をブロックする。
  - 初期設定コマンド: `git config core.hooksPath .githooks`
- **プルリクエスト (PR) 運用**:
  - 作業完了後は GitHub 上で Pull Request を作成し、レビュー・CI 検証を経て `main` へマージする。
  - PR 作成時は [`.github/pull_request_template.md`](.github/pull_request_template.md) のフォーマットを適用し、タイトルは `[種別] 概要` とする（種別は `[Feature]`, `[Fix]`, `[Refactor]`, `[Docs]`, `[Chore]`, `[Test]`）。
  - PR 発行には GitHub CLI (`gh pr create`) または `.agents/skills/create-pr/` スキルを活用する。
- **コミット単位 & メッセージ**:
  - 1つの論理的な変更ごとに小さな単位でコミットする。
  - コミットメッセージは**日本語**で、変更内容が明確にわかるように記述する（例: `折れ線グラフのマーカー表示オプションを追加`, `README.md の使用例を更新` など）。

---

## 4. Issue 駆動開発ワークフロー (`docs/issues/`)

あらゆる変更（新機能開発、バグ修正、リファクタリング、ドキュメント更新、ビルド設定・依存関係の保守 `chore` を含む）において、**例外なく以下のステップ順序に従って作業を進める**。

### 標準作業フロー（ステップ順序）
1. **Issue の起票**:
   - 作業開始前に必ず `docs/issues/<3桁連番>-<概要>.md` を作成する（例: `002-line-chart-options.md`）。
   - 雛形として [`docs/issues/TEMPLATE.md`](docs/issues/TEMPLATE.md) を使用し、目的と受け入れ基準（Acceptance Criteria）を明記する。
   - ※ Issue 作成時は `.agents/skills/create-issue/` スキルを活用する。
2. **トピックブランチの作成**:
   - 起票した Issue 番号に基づき、`<タイプ>/<3桁連番>-<概要>` のブランチを作成して切り替える（例: `feature/002-line-chart-options`）。
3. **実装 & 小単位コミット**:
   - 定義した受け入れ基準を満たす実装・テストを行い、小さな単位でコミットする。
4. **受け入れ基準の検証と Issue 完了更新**:
   - 動作確認を行い、Issue ファイルの受け入れ基準チェックボックスを埋め、ステータスを `完了` に更新してコミットする。
5. **Pull Request (PR) の発行**:
   - リモートへプッシュ後、`.agents/skills/create-pr/` スキルまたは `gh pr create` を使用して PR を発行する。

### 作業中の別要件・スコープ管理ルール
トピックブランチで作業中に、別件の相談・新規アイデア・バグ報告が発生した場合は以下の通り対応する：
- **無関係な変更の混入禁止**: 現在の Issue スコープ外の変更を同一ブランチに勝手に含めてはならない。
- **ユーザーへの確認と選択肢の提示**:
  1. **仕様変更/改善（スコープ内）**: 現在の Issue の受け入れ基準を更新して同一ブランチで実装。
  2. **新規アイデア/別要件（通常）**: `docs/issues/` に新 Issue を起票し、まずは現在の作業を完了・マージさせる（推奨）。
  3. **緊急の別要件**: 現在の作業を退避（コミットまたは stash）し、`main` から新トピックブランチを作成して優先対応。
