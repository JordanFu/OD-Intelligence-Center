#!/bin/bash
# AI 组织设计研究 - 本地到云端自动同步脚本

set -e

cd "$(dirname "$0")"

echo "🔄 检查数据更新..."

# 先添加所有变更（包括未跟踪文件）
git add -A

# 检查是否有已暂存的变更（含新增文件）
if git diff --cached --quiet; then
    echo "✅ 无变更，跳过同步"
    exit 0
fi

# 生成提交信息（包含时间）
COMMIT_MSG="auto-sync: $(date '+%Y-%m-%d %H:%M') - 更新数据"

# 提交
git commit -m "$COMMIT_MSG" || true

# 推送到 GitHub
echo "🚀 推送到 GitHub..."
git push origin main || git push -u origin main

echo "✅ 同步完成！Vercel 将在 1-2 分钟内自动部署"
