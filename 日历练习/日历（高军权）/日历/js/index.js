(function () {
    let box = document.querySelector('.box');
    //标题日期
    (function () {
        let date = new Date();
        let titTim = box.querySelector('.tit_tim');//头部标题
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let date2 = date.getDate();
        titTim.innerHTML = `${nub(year)}年${nub(month)}月${nub(date2)}日`;//当前的日期
    })();
    //左侧日历
    (function () {
        let titTim = box.querySelector('.tit_tim')//头部标题
        let dateBox = box.querySelector('.date_box');
        let dateTit = dateBox.querySelector('.date_tit .month');//日历表小标题
        let prev = dateBox.querySelector('.date_tit .prev');//向上按钮
        let next = dateBox.querySelector('.date_tit .next');//向下按钮
        let listYear = dateBox.querySelector('.list_year');//年份份父级
        let yearBox = listYear.querySelector('.list_box')//年份表显示框
        let yearLs = yearBox.querySelectorAll('ul');//年份表生成区
        let listMonth = dateBox.querySelector('.list_month');//月份表父级
        let monthBox = listMonth.querySelector('.list_box');//月份显示框
        let monthLs = monthBox.querySelectorAll('ul'); //月份生成区
        let dateArea = dateBox.querySelector('.date_area');//日历表父级
        let dayList = dateArea.querySelector('.day_list'); //日历表显示框
        let dayLs = dayList.querySelectorAll('ul');//日历生成区
        let boxWhith = css(dateBox, "width");//显示区宽度
        let date = new Date();
        let year = date.getFullYear();//当前年份
        let month = date.getMonth() + 1;//当前日期
        let nowDate = date.getDate(); //今天是几号
        dayLs[0].innerHTML = cld();
        //点击头部标题时日历返回当前月
        titTim.onclick = function () {
            if (css(listMonth, "opacity") == 1) { //显示是月份呢列表是动画切换为详细日历
                year = date.getFullYear();
                month = date.getMonth() + 1;
                dayLs[0].innerHTML = cld();
                mTween({
                    el: listMonth,
                    attr: {
                        opacity: 0,
                        zIndex: -1,
                        scale: 2
                    }
                });
                mTween({
                    el: dateArea,
                    attr: {
                        opacity: 1,
                        zIndex: 1,
                        scale: 1
                    }
                });
            } else {//显示是其他页面是直接切换为详细日历
                year = date.getFullYear();
                month = date.getMonth() + 1;
                dayLs[0].innerHTML = cld();
                dayLs[1].innerHTML = cld();
                css(listYear, "scale", 0);
                css(listYear, "opacity", 0);
                css(listYear, "z-index", -1);
                css(dateArea, "scale", 1);
                css(dateArea, "opacity", 1);
                css(dateArea, "z-index", 1);
            }

        }
        //点击日历标题时页面更换
        dateTit.onclick = function () {
            if (css(dateArea, "opacity") == 1) { //判断显示页面是详细日历切到月份列表页面
                monthLs[0].innerHTML = mohLs();
                dayMthMove();
                css(listMonth, "scale", 2)
                mTween({
                    el: listMonth,
                    attr: {
                        opacity: 1,
                        zIndex: 1,
                        scale: 1
                    }
                });
                mTween({
                    el: dateArea,
                    attr: {
                        opacity: 0,
                        zIndex: -1,
                        scale: 0
                    }
                });
            } else if (css(listMonth, "opacity") == 1) { //当显示页面是月份列表时切换到年份列表
                yearLs[0].innerHTML = yeaLs();
                mthYearMove();
                css(listYear, "scale", 2)
                mTween({
                    el: listYear,
                    attr: {
                        opacity: 1,
                        zIndex: 1,
                        scale: 1
                    }
                });
                mTween({
                    el: listMonth,
                    attr: {
                        opacity: 0,
                        zIndex: -1,
                        scale: 0
                    }
                });
            }
        }
        prev.onclick = function () {
            if (css(dateArea, "opacity") == 1) {
                dateprev();
            } else if (css(listMonth, "opacity") == 1) {
                monthPrev();
                dayMthMove();
            } else if (css(listYear, "opacity") == 1) {
                yearPrev();
                mthYearMove();
            }
        }
        next.onclick = function () {
            if (css(dateArea, "opacity") == 1) {
                datenext();
            } else if (css(listMonth, "opacity") == 1) {
                monthNext();
                dayMthMove();
            } else if (css(listYear, "opacity") == 1) {
                yearNext();
                mthYearMove();
            }
        }
        //生成详细日历的页面
        function cld() {
            let nowMonDay = new Date(year, month - 1, 1).getDay();//选中月份的一号时周几
            let nowMonDate = new Date(year, month, 0).getDate();//选中月份有几天
            let perMonLast = new Date(year, month - 1, 0).getDate();//选中月份的上个月的最后一天是几号
            let perMonFrist = perMonLast - nowMonDay + 1;//上个月在日历中从几号开始显示的
            let inner = '';
            let nowMonFrist = 1; //选中月份的开始
            let nextMonFrist = 1; //选中月份的下个月的开始
            for (let i = 0; i < 42; i++) {
                if (i < nowMonDay) {
                    inner += `<li class="gray">${perMonFrist}</li>`
                    perMonFrist++;
                } else if (nowMonFrist <= nowMonDate) {
                    if (nowMonFrist == nowDate && (month - 1) == date.getMonth() && year == date.getFullYear()) {
                        inner += `<li style="border:1px solid #66ccff;">${nowMonFrist}</li>`;
                        nowMonFrist++;
                        continue;
                    }
                    inner += `<li>${nowMonFrist}</li>`;
                    nowMonFrist++;
                } else {
                    inner += `<li class="gray">${nextMonFrist}</li>`
                    nextMonFrist++;
                }
            }
            dateTit.innerHTML = `${nub(year)}年${nub(month)}月`;
            return inner;
        }
        //显示详细日历的时候向左切换
        function dateprev() {
            dayLs[1].innerHTML = cld();
            month--;
            if (month < 1) {
                year--;
                month = 12;
            };
            dayLs[0].innerHTML = cld();
            css(dayList, "left", -boxWhith);
            mTween({
                el: dayList,
                attr: {
                    left: 0
                }
            });
        }
        //显示详细日历的时候向右切换
        function datenext() {
            dayLs[0].innerHTML = cld();
            month++;
            if (month > 12) {
                if (month % 12 == 1) {
                    year++;
                }
                month = 1;
            }
            dayLs[1].innerHTML = cld();
            css(dayList, "left", 0);
            mTween({
                el: dayList,
                attr: {
                    left: -boxWhith
                }
            });
        }
        //生成月份列表
        function mohLs() {
            dateTit.innerHTML = `${year}年`;
            let monthArr = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
            let inner = '';
            for (let i = 0; i < 12; i++) {
                if (i == date.getMonth() && year == date.getFullYear()) {
                    inner += `<li style="border:1px solid #66ccff;">${monthArr[i]}</li>`;
                    continue;
                    i++;
                }
                inner += `<li>${monthArr[i]}</li>`
            }
            return inner;
        }
        //点击月份时来到这一月
        function dayMthMove() {
            monthLs.forEach((item) => {
                let li = item.querySelectorAll('li'); //分开获取两个ul下的li
                li.forEach((item, index) => {
                    item.onclick = () => { //点击其中一个月份时切回这月
                        month = index + 1;
                        dayLs[0].innerHTML = cld();
                        mTween({ //月份列表消失
                            el: listMonth,
                            attr: {
                                opacity: 0,
                                zIndex: -1,
                                scale: 2
                            }
                        });
                        mTween({ //详细日期显示
                            el: dateArea,
                            attr: {
                                opacity: 1,
                                zIndex: 1,
                                scale: 1
                            }
                        });
                    }
                });
            });
        }
        //显示月份时向左切换
        function monthPrev() {
            monthLs[1].innerHTML = mohLs();
            year--;
            monthLs[0].innerHTML = mohLs();
            css(monthBox, "left", -boxWhith);
            mTween({
                el: monthBox,
                attr: {
                    left: 0
                }
            });
        }
        //显示月份时向右切换
        function monthNext() {
            monthLs[0].innerHTML = mohLs();
            year++;
            monthLs[1].innerHTML = mohLs();
            css(monthBox, "left", 0);
            mTween({
                el: monthBox,
                attr: {
                    left: -boxWhith
                }
            });
        }
        //生成年份列表
        function yeaLs() {
            let str = String(year).substr(0, 3);
            dateTit.innerHTML = `${str}0年-${str}9年`;
            let inner = '';
            let num = Number(str + 0) - 1;  //设定年份呢列表开始值
            for (let i = 0; i < 12; i++) {
                if (i == 0 || i == 11) {
                    inner += `<li style="color:#999;">${num + i}</li>`;
                    continue;
                    i++;
                }
                if ((num + i) == date.getFullYear()) {
                    inner += `<li style="border:1px solid #66ccff;">${num + i}</li>`;
                    continue;
                    i++;
                }
                inner += `<li>${num + i}</li>`
            }
            return inner;
        }
        //显示年时向左切换
        function yearPrev() {
            yearLs[1].innerHTML = yeaLs();
            year -= 10;
            yearLs[0].innerHTML = yeaLs();
            css(yearBox, "left", -boxWhith);
            mTween({
                el: yearBox,
                attr: {
                    left: 0
                }
            });
        }
        //显示年时向右切换
        function yearNext() {
            yearLs[0].innerHTML = yeaLs();
            year += 10;
            yearLs[1].innerHTML = yeaLs();
            css(yearBox, "left", 0);
            mTween({
                el: yearBox,
                attr: {
                    left: -boxWhith
                }
            });
        }
        //点击年份时来到这一年的月份列表
        function mthYearMove() {
            yearLs.forEach((item) => {
                let li = item.querySelectorAll('li'); //分开获取两个ul下的li
                li.forEach((item) => {
                    item.onclick = () => { //点击其中一个月份时切回这月
                        year = Number(item.innerHTML);
                        monthLs[0].innerHTML = mohLs();
                        mTween({ //年份列表消失
                            el: listYear,
                            attr: {
                                opacity: 0,
                                zIndex: -1,
                                scale: 2
                            }
                        });
                        mTween({ //月份显示
                            el: listMonth,
                            attr: {
                                opacity: 1,
                                zIndex: 1,
                                scale: 1
                            }
                        });
                        dayMthMove();
                    }
                });
            })
        }
    })();

    //右侧钟表
    (function () {
        let clock = box.querySelector('.clock');
        let hours = clock.querySelector('.clock_pic .hours');
        let minutes = clock.querySelector('.clock_pic .minutes');
        let seconds = clock.querySelector('.clock_pic .seconds');
        let nowDate = clock.querySelector('.clock_tim p');
        let week = clock.querySelector('.clock_tim div');
        let weekArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        move()
        function move() {
            let date = new Date();
            let date2 = date.getDay();
            let second = date.getSeconds();
            let minute = date.getMinutes() + second / 60;
            let hour = date.getHours() + minute / 60;
            css(seconds, `rotate`, second * 6);
            css(minutes, `rotate`, minute * 6);
            css(hours, `rotate`, hour * 30);
            nowDate.innerHTML = `${nub(date.getHours())}:${nub(date.getMinutes())}:${nub(date.getSeconds())}`;
            week.innerHTML = weekArr[date2];
        }
        setInterval(move, 500);
    })();
    // 一位数补零
    function nub(num) {
        return num < 10 ? '0' + num : '' + num;
    }
})();