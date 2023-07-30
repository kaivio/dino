#!/bin/bash

# 禁用转义
git config core.quotepath false

# 获取当前存储库的根目录
repo_root=$(git rev-parse --show-toplevel)

# 获取所有文件的列表
files=$(git ls-files)

# 遍历每个文件
for file in $files; do
	echo 处理: $file
    # 获取文件的历史提交用户名
    authors=$(git log --format="- %an" --follow -- "$file"| sort | uniq )

    echo -e "\n\nAuthors :\n$authors" 

    # 在文件末尾处输入历史提交用户名
    echo -e "\n\nAuthors :\n$authors" >> "$repo_root/$file"
done
