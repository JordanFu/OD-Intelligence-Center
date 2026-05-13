# AI 组织设计研究 · 看板

## 专项

- 职级与岗位族群改革每日追踪：`specials/job-levels/2026-05-12.html`

AI 如何改变组织设计 —— 信息聚合与 OD 洞察平台

## 在线访问

🔗 **GitHub Pages**: [https://jordanfu.github.io/OD-Intelligence-Center/](https://jordanfu.github.io/OD-Intelligence-Center/)

## 本地开发

```bash
# 启动本地服务器
python3 -m http.server 8080

# 或
npx serve .
```

## 数据更新

数据文件 `digest.md` 由自动化任务每日更新，通过 `deploy.sh` 自动部署到 GitHub Pages。

## 部署方式

推送代码到 `main` 分支后，GitHub Actions 会自动构建并部署到 GitHub Pages。
