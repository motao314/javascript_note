
(function() {
    /*点击上下个月的日期 ，转到上下个月并选中点击的日期。
    点击中间部分 ，切换显示上级内容。
    点击选中上级内容，延迟后显示下级内容。
    
    */
  //生成时钟刻度
  let scaleBox = document.querySelector(".scalebox");
  let scaleBoxInner = "";
  for (let i = 0; i < 60; i++) {
    scaleBoxInner += `<div class="scale" style="transform:rotate(${6 *
      i}deg)"></div>`;
  }
  scaleBox.innerHTML = scaleBoxInner;
  //设置时钟
  let secondptor = document.querySelector(".clock .second");
  let minuteptor = document.querySelector(".clock .minute");
  let hourptor = document.querySelector(".clock .hour");
  let timenum = document.querySelectorAll(".nowtime span");
  let weeknum = document.querySelector(".week span");
  let weekarr = ["日", "一", "二", "三", "四", "五", "六"];
  clockfn();
  setInterval(clockfn, 1000);
  function clockfn() {
    let time = new Date();
    let second = time.getSeconds();
    let minute = time.getMinutes() + second / 60;
    let hour = time.getHours() + minute / 60;
    secondptor.style.transform = `rotate(${6 * second}deg)`; //设置秒针
    minuteptor.style.transform = `rotate(${6 * minute}deg)`; //设置分针
    hourptor.style.transform = `rotate(${6 * hour}deg)`; //设置时针
    timenum[0].innerHTML = toDB(time.getHours()); //设置秒数
    timenum[1].innerHTML = toDB(time.getMinutes()); //设置分钟数
    timenum[2].innerHTML = toDB(time.getSeconds()); //设置小时数
    weeknum.innerHTML = weekarr[time.getDay()]; //设置星期
  }
  function toDB(nub) {//显示两位
    return nub < 10 ? "0" + nub : "" + nub;
  }
  //生成每种日历框架
    let riqi = document.querySelectorAll(".calendarbox ul li");
    let inner1 = "";
    let inner2 = "";
    let inner3 = "";
    let inner4 = "";
    for (let i = 0; i < 42; i++) {
        inner1 +="<span>0</span>";
    }
    for (let i = 0; i < 12; i++) {
        inner3=inner2 += "<span>0</span>";
    }
    for (let i = 0; i < 12; i++) {
        inner4 += "<span><em>0</em><em>1</em></span>";
    }
    riqi[0].innerHTML += inner1;
    riqi[1].innerHTML = inner2;
    riqi[2].innerHTML = inner3;
    riqi[3].innerHTML = inner4;
    //切换样式
    let style = document.querySelectorAll(".calendarbox .top .times");
    let n =0;
    let isclick = true;
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    let montext = ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];
    let firstday = new Date(year, month, 1).getDay();//本月一号是星期几
    let plastday = new Date(year, month, 0).getDate();//前月最后一天是几号
    let lastday = new Date(year, month + 1, 0).getDate();//本月最后一天是几号
    let prev = document.querySelector(".calendarbox .top .prev");
    let next = document.querySelector(".calendarbox .top .next");
    let times = style[0].querySelectorAll(" span ");
    todate(year, month, new Date().getDate() + firstday - 1);//显示今天
    style.forEach((item,index) => {
        item.onclick = function () {//前往下级样式
            if (n == 3) {
                return;
            }
            style[n].style.display = "none";
            riqi[n].style.display = "none";
            n++;
            style[n].style.display = "inline-block";
            riqi[n].style.display = "inline-block";
        };
        let one = riqi[index].querySelectorAll("span");
        one.forEach((item,index2)=>{
            item.onclick = function () {//每个样式下个点击事件
                one.forEach((item)=>{
                    item.classList.remove("active")
                })
                item.classList.add("active");
                if (n > 0) {
                    if(isclick){
                        isclick=false;//阻止连续点击
                        setTimeout(function () {//返回上级样式
                            style[n].style.display = "none";
                            riqi[n].style.display = "none";
                            n--;
                            style[n].style.display = "inline-block";
                            riqi[n].style.display = "inline-block";
                            isclick = true;
                        }, 200)
                    }
                }
            }
        })
        //左右点击事件
        prev.onclick = function () {
            if (month == 0) {
                month = 11;
                year--;
            } else {
                month--;
            }
            firstday = new Date(year, month, 1).getDay();
            todate(year, month, firstday);
        };
        next.onclick = function () {
            if (month == 11) {
                month = 0;
                year++;
            } else {
                month++;
            }
            firstday = new Date(year, month, 1).getDay();
            todate(year, month, firstday);
        }
    })
    clickfn2();
    function clickfn2(){
        let one1 = riqi[0].querySelectorAll("span");
        one1.forEach((item, index2) => {
            let num = Number(one1[index2].innerHTML);
            if (index2 < firstday) {
                item.onclick = function () {
                    if (month == 0) {
                        month = 11;
                        year--;
                    } else {
                        month--;
                    }
                    firstday = new Date(year, month, 1).getDay();
                    todate(year, month, num + firstday - 1);
                    clickfn2();
                }
            } else if (index2 > lastday + firstday - 1) {
                item.onclick = function () {
                    if (month == 11) {
                        month = 0;
                        year++;
                    } else {
                        month++;
                    }
                    firstday = new Date(year, month, 1).getDay();
                    todate(year, month, num + firstday - 1);
                    clickfn2();
                }
            }
        })
    }
    

     //第一级显示内容
    function todate(year, month,x) {
        one = riqi[0].querySelectorAll("span");
        firstday = new Date(year, month, 1).getDay(); //本月一号是星期几
        plastday = new Date(year, month, 0).getDate(); //前月最后一天是几号
        lastday = new Date(year, month + 1, 0).getDate(); //本月最后一天是几号
        one.forEach((item, index2) => {
            if (index2 < firstday) {
                one[index2].innerHTML = plastday + 1 - firstday + index2;
                one[index2].style.color = "#808080";
            } else if (index2 <= lastday + firstday - 1) {
                one[index2].innerHTML = index2 - firstday + 1;
            } else {
                one[index2].innerHTML = index2 - lastday - firstday + 1;
                one[index2].style.color = "#808080";
            }
            one.forEach((item) => {
                item.classList.remove("active")
            })
        })
        
        if (year == new Date().getFullYear() && month == new Date().getMonth()) {
            console.log(year, month);
            one[firstday - 1 + new Date().getDate()].classList.add("active2");//今天的默认状态
        }
        one[x].classList.add("active");//每月一号选中
        times[0].innerHTML = year;
        times[1].innerHTML = month + 1;
    }
    function next2(a){
        if (month == 11) {
            month = 0;
            year++;
        } else {
            month++;
        }
        firstday = new Date(year, month, 1).getDay();
        todate(year, month, firstday);
    }
    function prev2() {
        if (month == 0) {
            month = 11;
            year--;
        } else {
            month--;
        }
        firstday = new Date(year, month, 1).getDay();
        todate(year, month, firstday);
    }










    // todate(year, month);
    // function todate(year, month) {//显示的内容
    //     let firstday = new Date(year, month, 1).getDay();//本月一号是星期几
    //     let plastday = new Date(year, month, 0).getDate();//前月最后一天是几号
    //     let lastday = new Date(year, month + 1, 0).getDate();//本月最后一天是几号
    //     if (index2 < firstday) {
    //         one[index2].innerHTML = plastday + 1 - firstday + index2;
    //         one[index2].style.color = "#808080";
    //     } else if (index2 <= lastday + firstday - 1) {
    //         one[index2].innerHTML = index2 - firstday + 1;
    //     } else {
    //         one[index2].innerHTML = index2 - lastday - firstday + 1;
    //         one[index2].style.color = "#808080";
    //     }
    //     if (year == new Date().getFullYear() && month == new Date().getMonth()) {
    //         one[firstday - 1 + new Date().getDate()].classList.add("active2");//今天的默认状态
    //     }
    //     one[firstday].classList.add("active");//每月一号选中
    // }




    // let year = new Date().getFullYear();
    // let month = new Date().getMonth();
    // console.log(month);
    // let riqi = document.querySelector(".calendarbox dl dd"); 
    // todate(year,month);
    // function todate(year, month){//显示的内容
    //     let firstday = new Date(year, month, 1).getDay();//本月一号是星期几
    //     let plastday = new Date(year, month, 0).getDate();//前月最后一天是几号
    //     let lastday = new Date(year, month + 1, 0).getDate();//本月最后一天是几号
    //     let riqiinner = "";
    //     for (let i = 0; i < 42; i++) {
    //         if (i < firstday) {
    //             riqiinner += `<span style="color:#808080">${plastday + 1 - firstday + i}</span>`;
    //         } else if (i <= lastday + firstday-1) {
    //             riqiinner += `<span>${i - firstday + 1}</span>`;
    //         } else {
    //             riqiinner += `<span style="color:#808080">${i - lastday - firstday+1}</span>`;
    //         }
    //     }
    //     riqi.innerHTML = riqiinner;
    //     let oneday = document.querySelectorAll(".calendarbox dl dd span");
    //     if (year == new Date().getFullYear() && month == new Date().getMonth()){
    //         oneday[firstday - 1 + new Date().getDate()].classList.add("active2");//今天的默认状态
    //     }
    //     oneday[firstday].classList.add("active");//每月一号选中
    // }
    
    // //点击左右按钮
    // let prev = document.querySelector(".calendarbox .top .prev"); 
    // let next = document.querySelector(".calendarbox .top .next");
    // let times = style[0].querySelectorAll(".calendarbox .top .times span ");
    // prev.onclick =function prevfn(){
    //     if (month == 0 ){
    //         month = 11;
    //         year--;
    //     }else{
    //         month--
    //     }
    //     todate(year,month);
    //     if (style[1].style.display == "inline-block"){

    //     }
    //     times[0].innerHTML = year;
    //     times[1].innerHTML = month + 1;
    //     clickfn();
    // }
    // next.onclick = function nextfn() {
    //     if (month == 11) {
    //         month = 0;
    //         year++;
    //     } else {
    //         month++;
    //     }
    //     todate(year, month);
    //     times[0].innerHTML = year;
    //     times[1].innerHTML = month + 1;
    //     clickfn();
    // }
    // //点击显示今天
    // let today = document.querySelectorAll(".today span");
    // let todaytime = document.querySelector(".today");
    // today[0].innerHTML = new Date().getFullYear();
    // today[1].innerHTML = new Date().getMonth()+1;
    // today[2].innerHTML = new Date().getDate();
    // todayfn();
    // function todayfn(){
    //     year = new Date().getFullYear();
    //     month = new Date().getMonth();
    //     todate(year, month);
    //     times[0].innerHTML = year;
    //     times[1].innerHTML = month + 1;
    //     oneday = document.querySelectorAll(".calendarbox dl dd span");
    //     firstday = new Date(year, month, 1).getDay();
    //     oneday.forEach((item) => {
    //         item.classList.remove("active");
    //     });
    //     oneday[new Date().getDate() + firstday-1].classList.add("active");
    //     clickfn();
    // };
    // todaytime.onclick = todayfn;
    // clickfn();
    // function clickfn() {//点击事件
    //   let oneday = document.querySelectorAll(".calendarbox dl dd span");
    //   let firstday = new Date(year, month, 1).getDay();
    //   let lastday = new Date(year, month + 1, 0).getDate();
    //     oneday.forEach((item, index) => {
    //         item.onclick = function () {
    //             oneday.forEach((item) => {
    //                 item.classList.remove("active");
    //             });
    //             oneday[index].classList.add("active");//点击选中当前日期
    //             let num = Number(oneday[index].innerHTML);
    //             if (index < firstday) {//点击上个月日期
    //                 if (month == 0) {
    //                     month = 11;
    //                     year--;
    //                 } else {
    //                     month--;
    //                 }
    //                 todate(year, month);
    //                 times[0].innerHTML = year;
    //                 times[1].innerHTML = month + 1;
    //                 clickfn()
    //                 oneday = document.querySelectorAll(".calendarbox dl dd span");
    //                 firstday = new Date(year, month, 1).getDay();
    //                 oneday.forEach((item, index) => {
    //                     item.classList.remove("active");
    //                 });
    //                 oneday[num + firstday - 1].classList.add("active");
    //             } else if (index > lastday + firstday - 1) {//点击下个月日期
    //                 if (month == 11) {
    //                     month = 0;
    //                     year++;
    //                 } else {
    //                     month++;
    //                 }
    //                 todate(year, month);
    //                 times[0].innerHTML = year;
    //                 times[1].innerHTML = month + 1;
    //                 clickfn()
    //                 oneday = document.querySelectorAll(".calendarbox dl dd span");
    //                 firstday = new Date(year, month, 1).getDay();
    //                 oneday.forEach((item, index) => {
    //                     item.classList.remove("active");
    //                 });
    //                 oneday[num + firstday - 1].classList.add("active");
    //             }
    //         }
            
    //     });
    // }
    
})();
