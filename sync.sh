#!/bin/bash
# AI 组织设计研究 - 本地到云端自动同步脚本

set -e

cd "$(dirname "$0")"

echo "🔄 检查数据更新..."

NEED_SYNC=false

# 1. 检查是否有未暂存的变更（含未跟踪文件）
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 发现工作区变更（含未跟踪文件），添加到暂存区..."
    git add -A
    NEED_SYNC=true
fi

# 2. 检查是否有已暂存的变更
if ! git diff --cached --quiet; then
    NEED_SYNC=true
fi

# 3. 检查是否有未推送的本地提交
UNPUSHED=$(git rev-list @{upstream}..HEAD 2>/dev/null || true)
if [ -n "$UNPUSHED" ]; then
    echo "📦 发现 $(echo "$UNPUSHED" | wc -l | tr -d ' ') 个未推送的提交"
    NEED_SYNC=true
fi

if [ "$NEED_SYNC" = false ]; then
    echo "✅ 无变更，跳过同步"
    exit 0
fi

# 如果有暂存变更，提交
if ! git diff --cached --quiet; then
    COMMIT_MSG="auto-sync: $(date '+%Y-%m-%d %H:%M') - 更新数据"
    git commit -m "$COMMIT_MSG"
fi

# 推送到 GitHub（含 rebase 逻辑）
echo "🚀 推送到 GitHub..."
if ! git push origin main 2>/dev/null; then
    echo "⚠️ 推送被拒绝，先拉取远程更新..."
    git pull --rebase origin main
    git push origin main
fi

echo "✅ 同步完成！Vercel 将在 1-2 分钟内自动部署"
