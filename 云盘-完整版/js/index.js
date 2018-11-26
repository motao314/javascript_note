(function(){
    let topPid = -1;
    let topId = 0;
    let nowId = 0;//当前视图项的id

    /* 数据方法 */
    // 通过id查找子级
    function getChild(id){
        return data.filter((item)=>item.pid==id);
    }
    
    // 根据 id 找到父级 
    function getParent(id){
        let self = getSelf(id);
        return getSelf(self.pid);
    }

    // 根据id找到自己
    function getSelf(id){
        return data.filter((item)=>item.id==id)[0];
    }
    // 修改当前项的选中状态
    function changeChecked(id,checked){
        let self = getSelf(id);
        self.checked = checked;
    }

    // 获取当前视图下选中的文件
    function getChecked(id){
        let child = getChild(id);
        return child.filter(item=>item.checked);
    }

    // 根据 id 获取所有父级
    function getAllParent(id){
        //console.log(id);// 当前项的id
        let parents = [];
        let parent = getParent(id);
        // 如果它还有父级 继续找
        // if(parent){
        //     parents.unshift(parent);//找到老爸
        //     parent = getParent(parent.id);
        //     if(parent){
        //         parents.unshift(parent);//找到爷爷
        //         parent = getParent(parent.id);
        //         if(parent){
        //             parents.unshift(parent);//曾祖父
        //             parent = getParent(parent.id);    
        //         }

        //     }
        // }
        while(parent){
            parents.unshift(parent);
            parent = getParent(parent.id);
        }
        return parents;
    }

    //获取文件夹名字
    /* 
         id 父级的id 在哪一层下获取一个新名字
         新建文件夹

         新建文件夹(2) 
         新建文件夹(3) 
         新建文件夹(4)
         新建文件夹(5)

         新建文件夹命名规则：
            第0项：新建文件夹
            第N项：新建文件夹(  N+1   )

        1. 第一步找所有的子文件夹
        2. 把所有的名字存起来
        3. 把不符合规则的名字过滤掉
        4. 按照顺序把名字进行排列
        5. 获取新名字:
                第0位，不是新建文件夹就返回新建文件夹
                第n位, 第 n 为 不是 新建文件夹(n+1)，就返回   新建文件夹(n+1)

    */
    function getName(id){
        let child = getChild(id);
        let names = child.map((item)=>{
            return item.title;
        });
        names = names.filter((item)=>{
            if(item === "新建文件夹"){
                return true;
            }
            let start = item.substr(0,6);
            let index = item.substring(6,item.length-1);
            let end = item.substring(item.length-1);
            if(start == "新建文件夹("
            && end == ")"
            && Number(index) > 1
            && parseInt(index) + "" == index){
                return true;
            }
            return false;
        });  
        names.sort((n1,n2)=>{
            n1 = n1 == "新建文件夹"?1:n1.substring(6,n1.length-1);
            n2 = n2 == "新建文件夹"?1:n2.substring(6,n2.length-1);
            return n1 - n2;
        });
        if(names[0] !== "新建文件夹"){
            return "新建文件夹";
        }
        for(let i = 1; i < names.length; i++){
            if(names[i] != "新建文件夹("+(i+1)+")"){
                return "新建文件夹("+(i+1)+")";
            }
        }

        return "新建文件夹("+(names.length+1)+")";
    }

    // 检测重命 true 重名 false 不重名
    // id：当前文件夹 id  newName：新名字
    // pid 要在那个视图下检测 
    function testName(id, newName, pid){
        let child = getChild(pid);
        return child.some((item)=>{
            return item.title == newName&&item.id != id;
        })
    }
    // 获取所有子级
    function getAllchilds(id){
        let child = getChild(id);
       // console.log(child);
        child.forEach((item)=>{
            let itemChild =  getChild(item.id);
            if(itemChild.length > 0){
                child = child.concat(getAllchilds(item.id));
            }
        });
        return child;
    }

    // 删除数据
    function removeData(id){
        let self = getSelf(id);
        let childs = getAllchilds(id);
        childs.push(self);
        // let child = getChild(id);
        // child.forEach((item)=>{
        //     removeData(item.id);
        // });
        // data = data.filter(item=>self.id!=item.id);
        data = data.filter(item=>!childs.includes(item));
    }

    /* 视图渲染 */

    let treeMenu = document.querySelector("#tree-menu");
    treeMenu.innerHTML = createTreeMenu(topPid,0,false);
    // 渲染左侧树形菜单
    /* 
        1. 获取顶层pid
        
        2. 获取第一层菜单的数据
        3. 循环第一层数据，根据第一层生成第一层结构
        4. 如果当前项的数据，还有子级
        5. 获取当前项的子级
        6. 根据当前项的子级 生成 第二层菜单

    */

    // 所有需要打开项 nowId 以及 nowId 所有父祖级

    // 创建那一层的内容
    // openState 是否展开
    function createTreeMenu(id,leavel,openState){
        let child = getChild(id);
        let openData = getAllParent(nowId);;// 需要打开的数据
        let inner = "<ul>";
        openData.push(getSelf(nowId));
        child.forEach((item)=>{
            let itemChild = getChild(item.id);
            //console.log(openData.includes(item));
            inner += `
                <li class="${openState||openData.includes(item)?"open":""}">
                    <p data-id="${item.id}" style="padding-left:${40+leavel*20}px" class="${itemChild.length>0?"has-child":""} ${item.id == nowId?"active":""}"><span>${item.title}</span></p>
                    ${itemChild.length > 0?createTreeMenu(item.id,leavel+1,openState):""}
                </li>
            `;
        });
        return inner + "</ul>";
    }
    

    // 路径导航渲染

    let breadNav = document.querySelector(".bread-nav");
    breadNav.innerHTML = createBreadNav();
    function createBreadNav(){
        let inner = "";
        let parents = getAllParent(nowId);
        let self = getSelf(nowId);
        parents.forEach((item)=>{
            inner += `<a data-id="${item.id}">${item.title}</a>`;
        });
        inner += `<span>${self.title}</span>`;
        return inner ;
    }

    // 文件夹视图渲染
    let folders = document.querySelector("#folders");
    folders.innerHTML = createFolders();
    function createFolders(){
        let inner = "";
        let child = getChild(nowId);
        child.forEach((item)=>{
            inner += `
            <li class="folder-item ${item.checked?"active":""}" data-id="${item.id}">
                <img src="img/folder-b.png" alt="">
                <span class="folder-name">${item.title}</span>
                <input type="text" class="editor" value="${item.title}">
                <label class="checked">
                    <input type="checkbox" ${item.checked?"checked":""}  />
                    <span class="iconfont icon-checkbox-checked"></span>
                </label>   
            </li>`;
        });
        return inner;
    }

    /* 点击选项切换视图 */

    treeMenu.addEventListener("click",function(e){
        let item;
        if(e.target.tagName == "P"){
            item = e.target;
        } else if(e.target.tagName == "SPAN"){
            item =  e.target.parentNode;
        }
        if(item){
            console.log(item.dataset.id);
            nowId = item.dataset.id;
            treeMenu.innerHTML = createTreeMenu(topPid,0);
            breadNav.innerHTML = createBreadNav();
            folders.innerHTML = createFolders();
        }
    });

    // 路径导航点击切换

    breadNav.addEventListener("click",function(e){
        if(e.target.tagName === "A"){
            nowId = e.target.dataset.id;
            treeMenu.innerHTML = createTreeMenu(topPid,0);
            breadNav.innerHTML = createBreadNav();
            folders.innerHTML = createFolders();
        }
    });

    // 文件夹视图切换
    folders.addEventListener("click",function(e){
        let item;
        if(e.target.tagName == "IMG"){
            item =  e.target.parentNode;
        } else if(e.target.tagName == "LI"){
            item =  e.target;
        }
        if(item){
            nowId = item.dataset.id;
            treeMenu.innerHTML = createTreeMenu(topPid,0);
            breadNav.innerHTML = createBreadNav();
            folders.innerHTML = createFolders();
        }
    });
    document.addEventListener("selectstart",function(e){
        e.preventDefault();
    })
    document.addEventListener("dragstart",function(e){
        e.preventDefault();
    })
    folders.addEventListener("mousedown",function(e){
        if(e.botton == 0){ //左键框选

        }
        if(e.target){

        }
        //e.preventDefault();
    })
    /* 右键菜单 */
    let target_El = null;
    let contextmenu = document.querySelector("#contextmenu");
    contextmenu.addEventListener("mousedown",function(e){
        e.stopPropagation(); 
    });
    document.addEventListener("contextmenu",function(e){
        e.preventDefault();
    });
    contextmenu.addEventListener("click",function(e){
        if(e.target.tagName == "LI"){
            switch(e.target.classList[1]){
                case "icon-lajitong":
                    console.log("删除");
                    break;
                case "icon-yidong":
                    console.log("移动");
                    break;
                case "icon-zhongmingming":
                    rename(target_El);
                    break;    
            }
            contextmenu.style.display = "none";
            target_El = null;
        }
    })
    document.addEventListener("mousedown",function(){
        contextmenu.style.display = "none";
       // target_El&&target_El.classList.remove("active");
        target_El = null;
    });
    folders.addEventListener("contextmenu",function(e){
        console.log(e.target);
        let item;
        if(e.target.classList.contains("folder-item")){
            item = e.target;
        } else if(e.target.classList.contains("folder-name")
        ||e.target.tagName == "IMG"){
            item = e.target.parentNode;
        } else if(e.target.classList.contains("icon-checkbox-checked")){
            item = e.target.parentNode.parentNode;
        }
        if(item){
            target_El = item;
            contextmenu.style.left = e.clientX + "px";
            contextmenu.style.top = e.clientY + "px";
            contextmenu.style.display = "block";
            //target_El.classList.add("active");
        }
    });


    /* 新建文件夹 */

    /*
        {
            id:自己的id,
            pid:父级的id,
            title:自己的名字
        }
    */
    let createBtn = document.querySelector(".create-btn");
    createBtn.addEventListener("click",function(){
        let newFile = {
            id: Date.now(),
            pid: nowId,
            title: getName(nowId)
        };
        data.push(newFile);
        treeMenu.innerHTML = createTreeMenu(topPid,0);
        folders.innerHTML = createFolders();
        alertSucc("新建文件成功");
    });

    /* 文件夹的选中 */
    folders.addEventListener("change",function(e){
        if(e.target.type == "checkbox"){
            let item = e.target.parentNode.parentNode;
            changeChecked(item.dataset.id,e.target.checked);
            folders.innerHTML = createFolders();
        }
    });

    /* 文件夹移动 */
    let moveBtn = document.querySelector(".move-btn");
    moveBtn.addEventListener("click",function(e){
        let checkedData = getChecked(nowId);
        if(checkedData.length == 0){
            alertWarning("请选择文件夹");
            return;
        }
        moveData = checkedData;
        moveAlert();
    });

    /* 重命名 */    

    function rename(folder){
        let folderName = folder.querySelector(".folder-name");
        let editor = folder.querySelector(".editor");
        let active_id = folder.dataset.id;
        let self = getSelf(active_id);
        editor.value = folderName.innerHTML;
        folderName.style.display = "none";
        editor.style.display = "block";
        editor.select();
        editor.onblur = function(){
            let newName = this.value.trim();
            if(!newName){
                alertWarning("文件夹名字不能为空");
                editor.focus();
            } else if(testName(active_id,newName,self.pid)){
                alertWarning("名字有冲突请修改");
                editor.focus();
            } else {
                if(self.title == newName){
                    folderName.style.display = "block";
                    editor.style.display = "none";
                } else {
                    self.title = newName;
                    folders.innerHTML = createFolders();
                    treeMenu.innerHTML = createTreeMenu(topPid,0);
                    alertSucc("重命名成功");
                }
            }
        };
    }



    /* 批量删除文件夹 */
    let delBtn = document.querySelector(".del-btn");
    delBtn.addEventListener("click",function(){
        let checkeds = getChecked(nowId);
        if(checkeds.length < 1){
            alertWarning("请先选择文件夹");
            return ;
        }
        confirm("确定删除这些文件夹吗",function(){
            checkeds.forEach((item)=>{
                removeData(item.id);
            });
            treeMenu.innerHTML = createTreeMenu(topPid,0);
            folders.innerHTML = createFolders();
            alertSucc("删除文件成功");
        });
    });

    /* 信息提示框 */
    let alertSuccessEl = document.querySelector(".alert-success");
    let alertWarningEl =  document.querySelector(".alert-warning");
    // 成功提示
    function alertSucc(info){
        alertSuccessEl.innerHTML = info;
        alertSuccessEl.classList.add("alert-show");
        setTimeout(function(){
            alertSuccessEl.classList.remove("alert-show");
        },1000);
    }
    // 失败提示
    function alertWarning(info){
        alertWarningEl.innerHTML = info;
        alertWarningEl.classList.add("alert-show");
        setTimeout(function(){
            alertWarningEl.classList.remove("alert-show");
        },1000);
    }

    // 带有确定按钮的弹窗
    let mask = document.querySelector("#mask");
    let confirmEl = document.querySelector(".confirm");
    let confirmText = document.querySelector(".confirm-text");
    let confirmBtns = confirmEl.querySelectorAll(".confirm-btns a");
    
    confirmBtns[0].onclick = function(){
        confirmEl.classList.remove("confirm-show");
        mask.style.display = "none";
    };

    function confirm(info,cb){
        confirmEl.classList.add("confirm-show");
        mask.style.display = "block";
        confirmBtns[0].onclick = function(){
            confirmEl.classList.remove("confirm-show");
            mask.style.display = "none";
            cb();
        };
    }

    // 移动到弹窗
    let moveAlertEl = document.querySelector(".move-alert");
    let moveAlertMenu = moveAlertEl.querySelector(".move-alert-menu");
    let parent_id = 0;// 移动到哪个父级下
    let moveBtns = moveAlertEl.querySelectorAll(".confirm-btns a");
    let moveData = [];//要移动的文件夹
    moveBtns[0].onclick = function(){
        if(parent_id !== nowId){
            for(let i = 0; i < moveData.length; i++){
                
                if(parent_id == moveData[i].id){
                    alertWarning("不能移动到自己");
                    return ;
                }
                if(testName(moveData[i].id, moveData[i].title,parent_id)){
                    alertWarning("目标文件夹下名字有冲突");
                    return ;
                }
                let childs = getAllchilds(moveData[i].id);
                for(let j = 0; j < childs.length; j++ ){
                    if(parent_id == childs[j].id){
                        alertWarning("不能移动到子级");
                        return ;
                    }
                }
                moveData[i].pid = parent_id;
            }
            nowId = parent_id;
            treeMenu.innerHTML = createTreeMenu(topPid,0,false);
            folders.innerHTML = createFolders();
            breadNav.innerHTML = createBreadNav();
            alertSucc("移动文件夹成功");
        }
        moveAlertEl.classList.remove("move-alert-show");
        mask.style.display = "none";
    };
    moveAlertMenu.addEventListener("click",function(e){
        let item;
        if(e.target.tagName == "P"){
            item = e.target;
        } else if(e.target.tagName == "SPAN"){
            item = e.target.parentNode;
        }
        if(item){
            let items = this.querySelectorAll("p");
            items.forEach((item)=>{
                item.classList.remove("active");
            })
            item.classList.add("active");
            parent_id = item.dataset.id;
        }
    });
    function moveAlert(){
        moveAlertMenu.innerHTML = createTreeMenu(topPid,0,true);
        moveAlertEl.classList.add("move-alert-show");
        parent_id = nowId;
        mask.style.display = "block";
    }

})();