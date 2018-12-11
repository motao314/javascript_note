# git 分布式版本控制工具

git 初始化
git init

查看状态
git status

添加至暂存区
git add filename
git add .

提交至仓库
git commit -m "提交简介"
git commit -a -m "提交简介"


从暂存区删除
git rm <file>
git rm --cached <file>

查看日志
git log
git log -p 查看详细信息
git log -2 查看最近的n条信息
git log --stat 列出所有被修改的文件，以及简略的统计信息
git log --pretty 设置打印内容的格式
	- oneline 哈希和描述
	- short 哈希、作者、描述
	- full 哈希、作者、提交者、描述
	- fuller 哈希、作者、日期、提交者、提交日期、描述
	- format - 定制要显示的记录格式
git log --oneline --decorate 查看分支指向+哈希
git log --oneline --decorate --all --graph  
git reflog 查看历史提交   


head 指针

什么是HEAD？! 什么是master？！

提交对象：
	Git 保存的并不是文件的变化或者差异，而是一系列的不同时刻的文件快照。
	提交操作时Git会保存一个提交对象，该对象中包含一个指向暂存内容快照的指针、作者姓名、邮箱、父对象指针以及提交输入信息。
	* 首次提交的对象没有父对象
	* 普通的提交有一个父对象
	* 多个分支合并的有多个父对象


分支管理
git branch  查看分支
git branch name 新建分支
git checkout name 切换分支
git checkout -b name 新建分支并切换
git merge 目标分支 - 将目标分支的内容合并到当前分支
git merge --no-ff -m - 将目标分支的内容合并到当前分支，并记录一个描述
git branch -d name 删除分支 
git branch -D name 强制删除分支

回滚

git reset "head^^"
git reset hash

标签
git tag name
git tag name hash

不追踪文件
.gitignore


远程同步
git push 提交远程仓库
git push -u origin master 
git clone 克隆项目到本地
git pull 拉取

git fetch origin 刷新远程分支
git push -u origin name 创建远程分支
git push origin -d name 删除远程分支
git push origin -D name 强制删除远程分支


生成 ssh
ssh-keygen -t rsa -C "motao@miaov.com"




---------------------------------
工作区 暂存区 本地仓库 远程仓库