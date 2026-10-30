# CSV Graph Generator への貢献 (日本語)

[English](./CONTRIBUTING.md)

CSV Graph Generator に関心を持っていただきありがとうございます！バグ報告、機能リクエスト、プルリクエストを歓迎します。

---

## 開発ワークフロー

本プロジェクトは **GitHub Actions の Docker アクション** として動作します。
グラフ描画ライブラリ（`canvas` 等）はネイティブコンパイルを必要とするため、動作確認や統合テストは GitHub Actions CI（Ubuntu / Docker）環境を積極的に活用します。

### 1. 開発とブランチ運用 (GitHub Flow)
1. **Issue の起票**:
   - 作業開始前に [`docs/issues/`](docs/issues/) 配下に Issue を作成します（テンプレート: [`docs/issues/TEMPLATE.md`](docs/issues/TEMPLATE.md)）。
2. **トピックブランチの作成**:
   - `<タイプ>/<3桁番号>-<概要>` の形式でブランチを作成します（例: `feature/002-line-chart-options`）。
   - 許容タイプ: `feature`, `fix`, `refactor`, `docs`, `chore`, `test`
3. **コードの変更**:
   - `src/` 配下の TypeScript ソースコードを編集します。
4. **コミットとプッシュ**:
   - 1つの論理的な変更ごとに小さな単位でコミットし、トピックブランチへプッシュします。
   - ※ `main` ブランチへの直接コミットおよび直接プッシュは Git Hooks により禁止されています。
5. **Pull Request (PR) の作成**:
   - PR を作成すると、GitHub Actions CI（`Test Action`）が Ubuntu コンテナ上で Dockerfile を自動ビルドし、各種グラフの生成テストを実行します。
   - ※ 旧 Node.js アクション時代のように `dist/` 成果物を手動コミットしたりプルバックしたりする必要はありません。

---

## コードスタイル & 品質管理

- コードのフォーマットには **Prettier** を使用しています（`npm run format` / `npm run format-check`）。
- リンティング（静的解析）には **ESLint** を使用しています（`npm run lint`）。
- 単体テストには **Jest** を使用しています（`npm test`）。
- コミット前に静的解析およびフォーマットのチェックを通過することを確認してください。

---

## リリースプロセス

リリース手順の詳細は [`RELEASE.md`](RELEASE.md) を参照してください。
日常のリリースは Antigravity の `prepare-release` スキルを活用して迅速に行うことができます。

---

## 問題の報告 (Reporting Issues)

バグを見つけた場合や機能リクエストがある場合は、まず既存の Issue を検索してください。類似の Issue が存在しない場合は、明確な説明を含む新しい Issue を作成してください。
