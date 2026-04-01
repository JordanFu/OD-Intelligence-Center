#!/bin/bash
# AI 组织设计研究 - Vercel 自动部署脚本
# 当 digest.md 或 daily/ 有更新时，自动部署到 Vercel

set -e

cd "$(dirname "$0")"

echo "🚀 检查是否有更新需要部署..."

# 检查 vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "❌ vercel CLI 未安装"
    exit 1
fi

# 部署到 Vercel
echo "📤 正在部署到 Vercel..."
vercel --yes --prod

echo "✅ 部署完成！"
echo "🔗 访问地址: https://ai-org-research.vercel.app"
