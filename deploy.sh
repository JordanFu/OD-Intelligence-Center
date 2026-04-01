#!/bin/bash
# AI 组织设计研究 - 部署脚本（GitHub Pages）

set -e

cd "$(dirname "$0")"

echo "🚀 部署 ai-org-research 到 GitHub Pages..."

# 添加所有变更
git add -A

# 检查是否有变更
if git diff --cached --quiet; then
    echo "✅ 无变更，跳过部署"
    exit 0
fi

# 生成提交信息
COMMIT_MSG="auto-sync: $(date '+%Y-%m-%d %H:%M') - 更新数据"

# 提交
git commit -m "$COMMIT_MSG"

# 推送到 GitHub（触发 GitHub Actions 自动部署）
echo "📤 推送到 GitHub..."
git push origin main || git push -u origin main

echo "✅ 部署完成！GitHub Pages 将在 1-2 分钟内更新"
