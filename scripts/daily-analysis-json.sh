#!/bin/bash
# 小红书每日爆款分析 - 生成 digest.json 供网页使用
# 从小红书搜索高赞帖子，生成结构化分析报告
#
# 使用方式：bash daily-analysis-json.sh [output_dir]
# 输出 digest.json 到指定目录

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ANALYSIS_DIR="${1:-$SCRIPT_DIR}"
TODAY="$(date +%Y-%m-%d)"
OUTPUT="$ANALYSIS_DIR/digest.json"

export PATH="$HOME/.local/bin:$PATH"

# 确保 MCP 服务在运行
if ! pgrep -f "xiaohongshu-mcp" > /dev/null 2>&1; then
    echo "启动 MCP 服务..."
    cd ~/.xiaohongshu && nohup ~/.local/bin/xiaohongshu-mcp -port :18060 > ~/.xiaohongshu/mcp.log 2>&1 &
    sleep 5
fi

# 关键词列表
KEYWORDS=(
    '职场吐槽'
    'HR 被误解'
    '35岁 职场'
    '裁员 真相'
    'AI 淘汰 职场'
    '职场 冷知识'
)

echo "=========================================="
echo "小红书爆款分析 - $TODAY"
echo "=========================================="

# 收集所有帖子数据
ALL_POSTS="[]"

for kw in "${KEYWORDS[@]}"; do
    echo "搜索: $kw"
    RESULT=$(bash "$SCRIPT_DIR/../../小红书/scripts/mcp-call.sh" search_feeds \
        "{\"keyword\":\"$kw\"}" 2>&1)
    
    # 提取 feeds JSON
    FEEDS=$(echo "$RESULT" | python3 -c "
import sys, json
try:
    data = json.loads(sys.stdin.read())
    feeds_text = data['result']['content'][0]['text']
    feeds = json.loads(feeds_text)['feeds']
    high_likes = []
    for f in feeds[:20]:
        n = f['noteCard']
        likes_str = n['interactInfo']['likedCount']
        likes = int(likes_str.replace('万','0000')) if '万' in likes_str else (int(likes_str) if likes_str.isdigit() else 0)
        if likes >= 500:
            high_likes.append({
                'id': f['id'],
                'xsecToken': f['xsecToken'],
                'title': n['displayTitle'],
                'author': n['user']['nickname'],
                'likes': likes,
                'likes_str': likes_str,
                'collects_str': n['interactInfo']['collectedCount'],
                'comments_str': n['interactInfo']['commentCount'],
                'keyword': '$kw',
                'commentRatio': 0
            })
    print(json.dumps(high_likes, ensure_ascii=False))
except Exception as e:
    print('[]')
" 2>/dev/null || echo "[]")
    
    # 合并
    ALL_POSTS=$(echo "$ALL_POSTS" "$FEEDS" | python3 -c "
import sys, json
a = json.loads(sys.stdin.readline())
b = json.loads(sys.stdin.readline())
seen = {p['id'] for p in a}
for p in b:
    if p['id'] not in seen:
        a.append(p)
# 按点赞数排序
a.sort(key=lambda x: x['likes'], reverse=True)
print(json.dumps(a, ensure_ascii=False))
" 2>/dev/null || echo "$ALL_POSTS")
done

# 计算评论比
TOTAL=$(echo "$ALL_POSTS" | python3 -c "
import sys, json
posts = json.loads(sys.stdin.read())
for p in posts:
    likes = p['likes']
    comments_str = p['comments_str']
    comments = int(comments_str.replace('万','0000')) if '万' in comments_str else (int(comments_str) if comments_str.isdigit() else 0)
    p['commentRatio'] = round(comments / likes, 3) if likes > 0 else 0
print(json.dumps(posts, ensure_ascii=False))
" 2>/dev/null || echo "$ALL_POSTS")

# 拉取 TOP 10 帖子详情
echo "拉取 TOP 帖子详情..."
TOP_POSTS=$(echo "$TOTAL" | python3 -c "
import sys, json
posts = json.loads(sys.stdin.read())
print(json.dumps(posts[:10], ensure_ascii=False))
" 2>/dev/null)

# 分析帖子类型
DETAILS="[]"
for post in $(echo "$TOP_POSTS" | python3 -c "
import sys, json
posts = json.loads(sys.stdin.read())
for p in posts:
    print(f\"{p['id']}|{p['xsecToken']}\")
" 2>/dev/null); do
    IFS='|' read -r FEED_ID XSEC_TOKEN <<< "$post"
    echo "  详情: $FEED_ID"
    DETAIL=$(bash "$SCRIPT_DIR/../../小红书/scripts/mcp-call.sh" get_feed_detail \
        "{\"feed_id\":\"$FEED_ID\",\"xsec_token\":\"$XSEC_TOKEN\"}" 2>&1 | python3 -c "
import sys, json
try:
    data = json.loads(sys.stdin.read())
    note = json.loads(data['result']['content'][0]['text'])['data']['note']
    desc = note.get('desc', '')[:800]
    likes = note['interactInfo']['likedCount']
    likes_int = int(likes.replace('万','0000')) if '万' in likes else int(likes)
    comments = note['interactInfo']['commentCount']
    comments_int = int(comments.replace('万','0000')) if '万' in comments else int(comments)
    collects = note['interactInfo']['collectedCount']
    collects_int = int(collects.replace('万','0000')) if '万' in collects else int(collects)
    
    # 判断类型
    comment_ratio = comments_int / likes_int if likes_int > 0 else 0
    collect_ratio = collects_int / likes_int if likes_int > 0 else 0
    
    if comment_ratio > 0.1:
        post_type = '身份共鸣+情绪'
    elif collect_ratio > 0.5:
        post_type = '实用干货'
    elif '裁员' in desc or '被裁' in desc:
        post_type = '真实故事'
    else:
        post_type = '纯情绪共鸣'
    
    print(json.dumps({
        'title': note['title'],
        'desc': desc,
        'likes': likes_int,
        'collects': collects_int,
        'comments': comments_int,
        'images': len(note.get('imageList', [])),
        'type': post_type
    }, ensure_ascii=False))
except Exception as e:
    print('{}')
" 2>/dev/null || echo "{}")
    
    DETAILS=$(echo "$DETAILS" "$DETAIL" | python3 -c "
import sys, json
a = json.loads(sys.stdin.readline())
b = json.loads(sys.stdin.readline())
if b and b.get('title'):
    a.append(b)
print(json.dumps(a, ensure_ascii=False))
" 2>/dev/null)
done

# 生成分析报告
echo "生成分析报告..."

mkdir -p "$ANALYSIS_DIR"

python3 << PYEOF
import json, os
from datetime import datetime

# 读取数据
all_posts = json.loads('''$TOTAL''')
details = json.loads('''$DETAILS''')

# 计算统计数据
total_posts = len(all_posts)
high_liked_posts = len([p for p in all_posts if p['likes'] >= 500])

# 生成 TOP 帖子排行
top_posts = []
for i, p in enumerate(all_posts[:5], 1):
    # 找到对应的详情
    detail = next((d for d in details if d.get('title') == p['title']), None)
    post_type = detail.get('type', '未知') if detail else '未知'
    
    top_posts.append({
        'rank': i,
        'title': p['title'][:50],
        'author': p['author'],
        'likes': p['likes'],
        'collects': p['collects_str'],
        'comments': p['comments_str'],
        'keyword': p['keyword'],
        'commentRatio': p['commentRatio'],
        'type': post_type
    })

# 分析核心发现
core_findings = []

# 1. 分析情绪类型
emotion_posts = [p for p in details if '情绪' in p.get('type', '') or '共鸣' in p.get('type', '')]
if emotion_posts:
    max_likes = max(p['likes'] for p in emotion_posts)
    core_findings.append({
        'id': 1,
        'title': '情绪共鸣型内容持续爆火',
        'desc': f'标题直接用极端比喻或身份标签点燃共鸣，最高获赞 {max_likes} 赞',
        'actionable': '可用「坐牢」「牛马」「社畜」等动物/场景比喻作为标题钩子'
    })

# 2. 分析干货类型
干货_posts = [p for p in details if '干货' in p.get('type', '') or '实用' in p.get('type', '')]
if 干货_posts:
    max_collects = max(p['collects'] for p in 干货_posts)
    core_findings.append({
        'id': 2,
        'title': '实用干货收藏率极高',
        'desc': f'「一张图看懂」类内容收藏率达 80%+，最高收藏 {max_collects}',
        'actionable': '用「一张图看懂」「N个技巧」等结构化标题'
    })

# 3. 分析评论互动
high_comment_posts = [p for p in all_posts if p['commentRatio'] > 0.1]
if high_comment_posts:
    top_comment = high_comment_posts[0]
    core_findings.append({
        'id': 3,
        'title': '争议性话题引发深度讨论',
        'desc': f'「{top_comment["title"][:20]}...」评论比达 {int(top_comment["commentRatio"]*100)}%，说明话题有争议性',
        'actionable': '可尝试社会议题类话题：年龄歧视、性别歧视、职场PUA等'
    })

# 4. 故事叙事型
story_posts = [p for p in details if '故事' in p.get('type', '')]
if story_posts:
    core_findings.append({
        'id': 4,
        'title': '真实故事 > 纯情绪吐槽',
        'desc': '裁员帖虽然点赞不是最高，但评论互动极强，说明真实经历引发讨论',
        'actionable': '用「故事叙事型」结构：入职→拼命→被裁→反转'
    })

# 5. 热点借势
if all_posts:
    hot_topic = all_posts[0]
    core_findings.append({
        'id': 5,
        'title': '热点借势+实用信息双重吸引力',
        'desc': f'「{hot_topic["keyword"]}」相关话题热度高，结合实用信息效果更好',
        'actionable': '结合时事热点发布内容，同时提供实用价值'
    })

# 提取新标题模板
new_title_templates = []
seen_templates = set()

for p in all_posts[:10]:
    title = p['title']
    # 提取模板模式
    if '坦白了' in title:
        tpl = '坦白了！{事件}'
        if tpl not in seen_templates:
            new_title_templates.append({
                'template': tpl,
                'example': title,
                'likes': p['likes']
            })
            seen_templates.add(tpl)
    elif '冷知识' in title:
        tpl = '一个冷知识，{反常识结论}'
        if tpl not in seen_templates:
            new_title_templates.append({
                'template': tpl,
                'example': title,
                'likes': p['likes']
            })
            seen_templates.add(tpl)
    elif any(x in title for x in ['坐牢', '牛马', '社畜']):
        tpl = '{极端比喻}，{身份群体}'
        if tpl not in seen_templates:
            new_title_templates.append({
                'template': tpl,
                'example': title,
                'likes': p['likes']
            })
            seen_templates.add(tpl)
    elif '一句话' in title:
        tpl = '怎么一句话证明你在{场景}'
        if tpl not in seen_templates:
            new_title_templates.append({
                'template': tpl,
                'example': title,
                'likes': p['likes']
            })
            seen_templates.add(tpl)

# 如果没有提取到，使用默认模板
if not new_title_templates:
    new_title_templates = [
        {'template': '坦白了！{事件}', 'example': all_posts[0]['title'] if all_posts else '坦白了！', 'likes': all_posts[0]['likes'] if all_posts else 0},
        {'template': '一个冷知识，{反常识结论}', 'example': '一个冷知识，上班最轻松的其实不是摸鱼', 'likes': 4815},
        {'template': '{极端比喻}，{身份群体}', 'example': '又来坐牢了', 'likes': 18439}
    ]

# 提取热门标签
new_tags = []
for p in all_posts[:5]:
    tags = ['#' + p['keyword'], '#打工人', '#职场日常']
    for t in tags:
        if t not in new_tags:
            new_tags.append(t)

# 默认标签
if len(new_tags) < 4:
    new_tags.extend(['#精神状态', '#上班摸鱼', '#职场冷知识'][:4-len(new_tags)])

# 写作建议
writing_suggestions = [
    '情绪入口 + 专业视角：先用情绪共鸣抓住读者（如「打工人破防」），再给出专业洞察',
    '身份标签要精准：使用「牛马」「打工人」「社畜」等精准身份词，引发代入感',
    '收藏引导：干货类内容加上「建议收藏」「码住」等词汇，提升收藏率',
    '结尾互动：结尾抛出问题或投票，如「你们公司有这种操作吗？」',
    '善用数字：「N个技巧」「3个方法」等清单型标题提升收藏'
]

# 构建最终 JSON
digest = {
    'lastUpdated': '$TODAY',
    'summary': {
        'keywordsSearched': len('''${KEYWORDS[@]}'''.split()),
        'totalPosts': total_posts,
        'highLikedPosts': high_liked_posts,
        'analyzedPosts': len(details)
    },
    'topPosts': top_posts,
    'coreFindings': core_findings[:5],
    'newTitleTemplates': new_title_templates[:5],
    'newTags': new_tags[:8],
    'writingSuggestions': writing_suggestions
}

# 写入文件
with open('$OUTPUT', 'w', encoding='utf-8') as f:
    json.dump(digest, f, ensure_ascii=False, indent=2)

print(f"分析报告已保存到 $OUTPUT")
print(f"- 搜索 {len('''${KEYWORDS[@]}'''.split())} 个关键词")
print(f"- 获取 {total_posts} 条帖子")
print(f"- 深度分析 {len(details)} 条")
print(f"- 生成 {len(core_findings)} 条核心发现")
PYEOF

echo "分析完成！"
