//日历的变化
(function () {

//日期
    (function () {
        //日期获取元素
        let nowYear = document.querySelector(".day .year");//当前年份
        let nowMonth = document.querySelector(".day .month");//当前月
        let prev = document.querySelector(".day .prev");//上一个按钮
        let next = document.querySelector(".day .next");//上一个按钮
        let nianyue = document.querySelector(".day .title>div");


        //点击年月跳转到月份
        nianyue.onclick = function () {
            let ynowYear = document.querySelector(".yuefen .year");//当前年份
            let nowMonth = document.querySelector(".day .month");//当前月
            ynowYear.innerHTML = nowYear.innerHTML;
            selectMonth(nowMonth.innerHTML);
            yueChange();
        };

        //获取当前年月(类型string)
        nowYear.innerHTML = new Date().getFullYear() + "";
        nowMonth.innerHTML = new Date().getMonth() + 1;
        toDate(nowYear.innerHTML, nowMonth.innerHTML);

        //年月日
        let nyr = document.querySelector(".nyr");
        // nyr.innerHTML=new Date().getFullYear()+"年"+new Date().getMonth()+1+"月"+new Date().getDate()+"日";
        nyr.innerHTML = `<a href="#">${new Date().getFullYear()}年${new Date().getMonth() + 1}月${new Date().getDate()}日</a>`;

        //年月日鼠标点击
        nyr.onclick = function () {
            let ncontent = document.querySelector(".nian");
            ncontent.style.display = "none";
            // console.log(new Date().getFullYear(),new Date().getMonth() + 1);
            toDate(new Date().getFullYear(), new Date().getMonth() + 1);
            nowYear.innerHTML = new Date().getFullYear() + "";
            nowMonth.innerHTML = new Date().getMonth() + 1;
            selectedDay(new Date().getDate());
            dayChange();
        };

        //点击上一个按钮
        /*
        1)月份减一
        2）当月份<1时，让月份等于12，此时年份减一
         */
        prev.onclick = function () {
            if (nowMonth.innerHTML <= 1) {
                nowMonth.innerHTML = 12 + "";
                nowYear.innerHTML--;
                toDate(nowYear.innerHTML, nowMonth.innerHTML);

            } else {
                nowMonth.innerHTML--;
                toDate(nowYear.innerHTML, nowMonth.innerHTML);
            }
            selectedDay(1);
            dayChange();
        };

        //点击下一个按钮
        /*
        1)月份加一
        2）当月份>12时，让月份等于1，此时年份加一
         */
        next.onclick = function () {
            if (nowMonth.innerHTML > 11) {
                nowMonth.innerHTML = 1 + "";
                nowYear.innerHTML++;
                toDate(nowYear.innerHTML, nowMonth.innerHTML);
            } else {
                nowMonth.innerHTML++;
                toDate(nowYear.innerHTML, nowMonth.innerHTML);
            }
            selectedDay(1);
            dayChange();
        };
    })();

//月份
    (function () {
        //生成月份
        let yue = document.querySelector(".yuefen .yue");
        let inner2 = "";
        let objYue = {
            0: "一",
            1: "二",
            2: "三",
            3: "四",
            4: "五",
            5: "六",
            6: "七",
            7: "八",
            8: "九",
            9: "十",
            10: "十一",
            11: "十二",
        };
        for (let i = 0; i < 12; i++) {
            inner2 += `<li>${objYue[i]}月</li>`;
        }
        yue.innerHTML = inner2;
        let yueYear = document.querySelector(".yuefen .year");
        yueYear.innerHTML = new Date().getFullYear() + '';

        let ydataList = document.querySelector(".yuefen .data");
        let ynowYear = document.querySelector(".yuefen .year");//当前年份
        let yprev = document.querySelector(".yuefen .prev");//上一个按钮
        let ynext = document.querySelector(".yuefen .next");//上一个按钮

        //给默认月份加样式
        let ylis = Array.from(ydataList.querySelectorAll("li"));
        ylis.forEach((item, index) => {
            // console.log(ynowYear.innerHTML == new Date().getFullYear());
            if (index == new Date().getMonth()) {
                item.classList.add('now');
            }
        });

        //点击li添加样式
        ylis.forEach((item, index) => {
            item.onclick = function () {
                //返回日期页面
                /*
                1)获取当前点击的月份
                2）获取当前的年份
                3）页面跳转
                 */
                // console.log(item.innerHTML,index,ynowYear.innerHTML);
                let day = document.querySelector(".day");
                let year = day.querySelector(".year");
                let month = day.querySelector(".month");
                // console.log(year,month);
                dayChange();
                year.innerHTML = ynowYear.innerHTML;
                month.innerHTML = index + 1;
                toDate(year.innerHTML, month.innerHTML);
                selectedDay(1)
            }
        });

        //点击左右按钮年份的变化
        yprev.onclick = function () {
            ynowYear.innerHTML--;
            yueChange();
            selectMonth(1);
        };
        ynext.onclick = function () {
            ynowYear.innerHTML++;
            yueChange();
            selectedDay(1);
            selectMonth(1);
        };
    })();

//年份
    (function () {
        let year = document.querySelector(".nian .year");
        let yueYear = document.querySelector(".yuefen .year");
        //year.innerHTML = yueYear.innerHTML.slice(0, yueYear.innerHTML.length - 1) + 0 + -+yueYear.innerHTML.slice(0, yueYear.innerHTML.length - 1) + 9;
        //creatNian(yueYear.innerHTML.slice(0, yueYear.innerHTML.length - 1) + 0 - 1);

        //点击事件
        yueYear.onclick = function () {
            let yueYear = document.querySelector(".yuefen .year");
            year.innerHTML = yueYear.innerHTML.slice(0, yueYear.innerHTML.length - 1) + 0 + -+yueYear.innerHTML.slice(0, yueYear.innerHTML.length - 1) + 9;
            creatNian(yueYear.innerHTML.slice(0, yueYear.innerHTML.length - 1) + 0 - 1);
            bindYearEvent();
            nianChange();
            selectYear(yueYear.innerHTML);
        };
        //点击上下按钮
        let nprev = document.querySelector(".nian .prev");//上一个按钮
        let nnext = document.querySelector(".nian .next");//上一个按钮
        nprev.onclick = function () {
            creatNian(year.innerHTML.slice(0, 4) - 10 - 1);
            bindYearEvent();
            year.innerHTML = year.innerHTML.slice(0, 4) - 10 + '-' + (year.innerHTML.slice(5, 9) - 10);
            selectYear(year.innerHTML.slice(0, 4));
        };
        nnext.onclick = function () {
            creatNian(Number(year.innerHTML.slice(0, 4)) + 10 - 1);
            bindYearEvent();
            year.innerHTML = Number(year.innerHTML.slice(0, 4)) + 10 + '-' + (Number(year.innerHTML.slice(5, 9)) + 10);
            selectYear(Number(year.innerHTML.slice(0, 4)));
        };

    })();

})();

//圆时钟的变化
(function () {
    //生成表格
    let list = document.querySelector(".list");
    let inner = "";
    for (let i = 0; i < 60; i++) {
        inner += '<li style="transform: rotate(' + i * 6 + 'deg)"></li>'
    }
    list.innerHTML = inner;

    //生成数字
    let list2 = document.querySelector(".list2");
    let inner2 = "";
    for (let i = 1; i < 13; i++) {
        inner2 += ('<li style="transform: rotate(' + i * 30 + 'deg)"><span style="transform: rotate(-' + i * 30 + 'deg)">' + i + '</span></li>');
    }
    list2.innerHTML = inner2;

    //时间变化
    let h = document.querySelector(".h");
    let m = document.querySelector(".m");
    let s = document.querySelector(".s");

    timeChange();
    setInterval(timeChange, 1000);

    function timeChange() {
        let date = new Date();
        let seconds = date.getSeconds();
        let minutes = date.getMinutes() + seconds / 60;
        let hours = date.getHours() + minutes / 60;

        css(s, "rotate", seconds * 6);
        css(m, "rotate", minutes * 6);
        css(h, "rotate", hours * 30)
    }

})();

//时间显示
(function () {
    /*
 1,获取电脑当前时间
 2，点的闪烁
 3，nub两个span轮播，span[0]是当前时间，span[1]是即将显示的时间
     1）个位数的前面加0
     2）时钟数不变的不用轮播
  */

    dots();
    setInterval(dots, 1000);

    function dots() {
        //点的闪烁   透明度
        let dot = document.querySelectorAll(".dot");
        dot.forEach((item) => {
            mTween({
                el: item,
                attr: {
                    opacity: 0
                },
                time: 200,
                type: "linear",
                cb: function () {
                    mTween({
                        el: item,
                        attr: {
                            opacity: 1
                        },
                        time: 200,
                        type: "linear",
                    })
                }
            })
        });

        //时间切换
        let date = new Date();
        let time = toDB(date.getHours()) + toDB(date.getMinutes()) + toDB(date.getSeconds());
        let nub = document.querySelectorAll(".nub");
        //时间数字切换
        nub.forEach((a, index) => {
            let span = a.querySelectorAll("span");
            if (span[1].innerHTML == time[index]) {
                return;
            }
            span[0].innerHTML = span[1].innerHTML;//当前显示的数字
            span[1].innerHTML = time[index];//即将要显示的数字

            //背景切换
            css(a, "translateY", 0);
            mTween({
                el: a,
                attr: {
                    translateY: -22
                }
            })
        })
    }

    //补零
    function toDB(nub) {
        return nub < 10 ? "0" + nub : "" + nub;
    }
})();

//星期
(function () {
    let xinqi = document.querySelector(".xinqi");
    let xingqi = {
        0: '星期日',
        1: '星期一',
        2: '星期二',
        3: '星期三',
        4: '星期四',
        5: '星期五',
        6: '星期六'
    };
    xinqi.innerHTML = xingqi[new Date().getDay()];
})();

//生成日期时间
function toDate(year, month) {
    let dataList = document.querySelector(".day .data");
    let nowYear = document.querySelector(".day .year");//当前年份
    let nowMonth = document.querySelector(".day .month");//当前月
    let firstDay = new Date(year, month - 1, 1).getDay();//第一天对应的星期
    // console.log(firstDay);
    let lastMonthDays = new Date(year, month - 1, 0).getDate();//获取上个月的最后一天
    let lastMonthFirst = lastMonthDays - firstDay + 1;//上个月在这个列表中需要显示的第一天是几号;
    // console.log(lastMonthFirst);
    let nowMonthFirst = 1;//当前月的第一天
    let nowMonthLast = new Date(year, month, 0).getDate();//这个月的最后一天
    let nextMonthFirst = 1;//下个月的第一天
    let inner = "";
    for (let i = 0; i < 42; i++) {
        if (i < firstDay) {
            //上个月
            inner += `<li class="gray shang">${lastMonthFirst}</li>`;
            lastMonthFirst++;
        } else if (nowMonthFirst <= nowMonthLast) {
            //当前月
            // console.log(nowMonthFirst, nowMonth.innerHTML, nowYear.innerHTML);
            // console.log(new Date().getDate(), new Date().getMonth(), new Date().getFullYear());
            if (nowMonthFirst == new Date().getDate()
                && nowMonth.innerHTML == new Date().getMonth() + 1
                && nowYear.innerHTML == new Date().getFullYear()) {
                inner += `<li class="now">${nowMonthFirst}</li>`;
            } else {
                inner += `<li>${nowMonthFirst}</li>`;
            }
            nowMonthFirst++;
        } else {
            //下个月
            inner += `<li class="gray xia">${nextMonthFirst}</li>`;
            nextMonthFirst++;
        }
    }

    dataList.innerHTML = inner;
    initEvent();
}

//初始化事件
function initEvent() {
    let dataList = document.querySelector(".day .data");
    let nowYear = document.querySelector(".day .year");//当前年份
    let nowMonth = document.querySelector(".day .month");//当前月
    let lis = dataList.querySelectorAll("li");
    //点击日期添加样式
    lis.forEach(item => {
        item.onclick = function () {
            // console.log(this.innerHTML + '====');
            //清除所有样式
            lis.forEach(item => {
                if (item.classList.contains("shang") || item.classList.contains("xia")) {
                    item.classList.add("gray")
                }
                item.style.color = "";
                item.style.backgroundColor = "";
                item.style.border = "1px solid transparent";
            });
            item.style.color = "#3a66cc";
            item.style.backgroundColor = "#deedff";
            item.style.border = "1px solid #0066cc";

            //1)点击到上个月的
            if (item.classList.contains("shang")) {
                if (nowMonth.innerHTML <= 1) {
                    nowMonth.innerHTML = 12 + "";
                    nowYear.innerHTML--;
                    toDate(nowYear.innerHTML, nowMonth.innerHTML);
                    selectedDay(this.innerHTML);
                } else {
                    nowMonth.innerHTML--;
                    toDate(nowYear.innerHTML, nowMonth.innerHTML);
                    selectedDay(this.innerHTML);
                    dayChange();
                }
            }
            //2)点击到下个月
            if (item.classList.contains("xia")) {
                if (nowMonth.innerHTML > 11) {
                    nowMonth.innerHTML = 1 + "";
                    nowYear.innerHTML++;
                    toDate(nowYear.innerHTML, nowMonth.innerHTML);
                    selectedDay(this.innerHTML);
                } else {
                    nowMonth.innerHTML++;
                    toDate(nowYear.innerHTML, nowMonth.innerHTML);
                    selectedDay(this.innerHTML);
                    dayChange();
                }
            }
        }
    });
}

//点击时判断是否是上个月或者下个月
function selectedDay(selectedDay) {
    //选中上个月的，并且给加上默认样式
    let lis = Array.from(document.querySelectorAll("li"));
    // let selectedDay = this.innerHTML;
    // console.log(selectedDay);
    lis.filter(i => {
        return (!i.classList.contains('gray')) && (i.innerHTML == selectedDay)
    }).forEach((item) => {
        item.style.color = "#3a66cc";
        item.style.backgroundColor = "#deedff";
        item.style.border = "1px solid #0066cc";
    })
}

//日期动画
function dayChange() {
    let dcontent = document.querySelector(".day .content");
    let day = document.querySelector(".day");
    let yuefen = document.querySelector(".yuefen");
    yuefen.style.display = "none";

    day.style.display = "block";
    mTween({
        el: dcontent,
        attr: {
            height: 0,
            width: 0
            // transform:scale(0)
        },
        time: 300,
        cb: function () {
            mTween({
                el: dcontent,
                attr: {
                    height: 152,
                    width: 160
                    // transform:scale(1)
                },
                time: 300,
            })
        }
    });
}

//月份动画
function yueChange() {
    let ycontent = document.querySelector(".yuefen .content");
    let yuefen = document.querySelector(".yuefen");
    let day = document.querySelector(".day");
    day.style.display = "none";
    yuefen.style.display = "block";
    mTween({
        el: ycontent,
        attr: {
            height: 0,
            // width:0
            // transform:scale(0)
        },
        time: 300,
        cb: function () {
            mTween({
                el: ycontent,
                attr: {
                    height: 184,
                    // width: 160
                    // transform:scale(1)
                },
                time: 300,
            })
        }
    });
}

//月份的默认样式
function selectMonth(month) {
    let yuefen = document.querySelector(".yuefen li.now");
    yuefen.classList.remove('now');
    document.querySelectorAll(".yuefen li")[month - 1].classList.add('now');
}

//创建年份
function creatNian(num) {
    let nian = document.querySelector(".nian .nianlist");
    let inner3 = "";
    for (let i = 0; i < 12; i++) {
        inner3 += `<li>${num + i}</li>`;
    }
    nian.innerHTML = inner3;
}

//年份动画
function nianChange() {
    let nian = document.querySelector(".nian");
    let ncontent = nian.querySelector(".nian .content");
    console.log(ncontent);
    let yuefen = document.querySelector(".yuefen");
    let day = document.querySelector(".day");
    yuefen.style.display = "none";
    day.style.display = "none";
    nian.style.display = "block";
    // ncontent.style.transform = "scale(1)";
    mTween({
        el: ncontent,
        attr: {
            // height: 0
            width: 0
        },
        time: 300,
        cb: function () {
            mTween({
                el: ncontent,
                attr: {
                    // height: 152
                    width: 160
                },
                time: 300,
            })
        }
    })
}

//年份的默认样式
function selectYear(nian) {
    let nlis = document.querySelectorAll(".nian li");
    nlis.forEach(item => {
        if (item.innerHTML == nian) {
            item.classList.add('now');
        }
    })
}

//年份的事件绑定
function bindYearEvent() {
    //点击列表年
    let nianlist = document.querySelector(".nian .nianlist");
    let nlis = Array.from(nianlist.querySelectorAll("li"));
    let yuefen = document.querySelector(".yuefen");
    let nian = document.querySelector(".nian");
    let yueYear = document.querySelector(".yuefen .year");
    //li 的点击事件
    nlis.forEach(item => {
        item.onclick = function () {
            selectYear(this.innerHTML);
            yuefen.style.display="block";
            nian.style.display="none";
            yueYear.innerHTML=this.innerHTML;
            // selectMonth(1);
        }
    })
}