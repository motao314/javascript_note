(function() {
    let box = document.querySelector('.box');
    let dateArea = box.querySelector('.date_block');
    let list = box.querySelector('.date_area .list');
    let uls = box.querySelectorAll('.date_area .list ul');
    let dateList = box.querySelectorAll('.date'); //日历区域
    let dateBlock = box.querySelector('.date_month .date_block');
    let cbNowDate = box.querySelector('.time .now_date');

    let monthBlock = box.querySelector('.date_month .month');
    let monthArea = box.querySelector('.date_month .month_block');
    let lisMonth = box.querySelectorAll('.date_month .month .list_month'); //月份区域
   
    let nowTime = box.querySelector('.time .now_time');
    let now_date = box.querySelector('.time .now_date');
    let dateYear = box.querySelector('.date_month .date_top .date_year');
    let preBtn = box.querySelector('.date_month .date_top .pre');
    let nextBtn = box.querySelector('.date_month .date_top .next');
    let ulHeight = css(uls[0], 'height');
    let monNum = 1;
    let yearNum = 0;
    let now = 0;
    let next = 0;
    let yearText = box.querySelector('.date_month .date_top .date_year'); //当前显示的年月文本
    let showMonthArea = box.querySelector('.box .date_month .month');

    function dateTime() {
        let nowDate = new Date();
        let hours = nowDate.getHours(); //时
        let minutes = nowDate.getMinutes(); //分
        let seconds = nowDate.getSeconds(); //秒
        let year = nowDate.getFullYear(); //年
        let month = nowDate.getMonth() + 1; //月
        let date = nowDate.getDate(); //日
        nowTime.innerHTML = nub(hours) + ":" + nub(minutes) + ":" + nub(seconds);
        now_date.innerHTML = nub(year) + "年" + nub(month) + "月" + nub(date) + "日";
    }
    dateTime();
    setInterval(dateTime, 1000);

    function nub(num) {
        return num < 10 ? "0" + num : "" + num; //补零函数
    }

    let nowDate = new Date();
    let year = nowDate.getFullYear(); //今年是哪一年
    let nowMonDate = nowDate.getDate(); //今天是几号
    let month = nowDate.getMonth() + (monNum); //现在是几月份


    function date() {
        let nowMonDay = new Date(year, month - 1, 1).getDay() - 1; //这个月是从周几开始的
        let preMonDate = new Date(year, month - 1, 0).getDate(); //上个月一共多少天，最后一天是几号
        let preMonFirst = preMonDate - nowMonDay + 1; //上个月在这个列表中需要显示的第一天是几号;
        let nowMonLast = new Date(year, month, 0).getDate(); //这个月有多天

        let inner = '';
        let nowMonFirst = 1; //这个月的1号
        let nextMonFirst = 1; //下个月的1号
        for (let i = 0; i < 42; i++) {
            if (i < nowMonDay) {
                inner += `<li class="active_gray">${preMonFirst}</li>`;
                preMonFirst++;
            } else if (nowMonFirst <= nowMonLast) { //这个月的1号小于这个月的总天数
                if (nowMonFirst == nowMonDate &&
                    month == nowDate.getMonth() + 1 &&
                    year == nowDate.getFullYear()) {
                    inner += `<li class="active_blue">${nowMonFirst}</li>`;
                    nowMonFirst++; //不++就会一直等于自己
                    continue;
                }
                inner += `<li>${nowMonFirst}</li>`;
                nowMonFirst++;
            } else {
                inner += `<li class="active_gray">${nextMonFirst}</li>`;
                nextMonFirst++;
            }
        }
        dateYear.innerHTML = nub(year) + "年" + nub(month) + "月";

        return inner;
    }
    date();
    dateList[0].innerHTML = date(); //页面默认先生成一下

    function monthChange() {
        let inner = '';
        let nowMonFirst = 1; //这个月的1号
        let nextMonFirst = 1; //下个月的1号
		let nowYearNum = 1;
		let nextYearNum = 1;
        let nowYear = new Date(year,11).getMonth()+1;
        for(let i = 0; i < 16; i++) {
            if (i < 12) {
                if(i+1 == (nowDate.getMonth() + 1) && year == nowDate.getFullYear()){
                      inner += `<li style="background: #0078d7">${nowYearNum}月</li>`;
                      nowYearNum++;
                      continue;  
                }
                inner += `<li>${nowYearNum}月</li>`;
                nowYearNum++;
            } else { //这个月的1号小于这个月的总天数
                inner += `<li class="active_gray">${nextYearNum}月</li>`;
                nextYearNum++;
            }
        }
        return inner;
    }
    lisMonth[0].innerHTML = monthChange(); //页面默认先生成一下
    
    


    cbNowDate.onclick = function() {
        // if (css(dateArea, 'opacity') == 0) {
        year = nowDate.getFullYear();
        month = nowDate.getMonth() + 1;
        dateList[0].innerHTML = date();
        mTween({
            el: dateArea,
            attr: {
                opacity: 1,
                scale: 1
            }
        });
        mTween({
            el: monthBlock,
            attr: {
                opacity: 0,
                scale: 2,
                zIndex: -1
            }
        });
        // }

    }

    yearText.onclick = function() {
        if (css(dateBlock, 'opacity') == 1) {
            css(monthBlock, 'scale', 2);
            css(dateBlock, 'scale', 1);
            mTween({
                el: monthBlock,
                attr: {
                    zIndex: 1,
                    opacity: 1,
                    scale: 1
                },
                time: 500
            });
            mTween({
                el: dateBlock,
                attr: {
                    zIndex: -1,
                    opacity: 0,
                    scale: 0.5
                },
                time: 500
            });
            yearText.innerHTML = "2018年";
        }
    }
    
    function nextYear(){
        lisMonth[0].innerHTML = monthChange();
        year++;
        monthChange();
        dateYear.innerHTML = year+'年';
        css(monthArea,'top',0);
         lisMonth[1].innerHTML = monthChange();
         mTween({
            el: monthArea,
            attr: {
                top: -ulHeight
            }
         });
    }
    function preYear(){
        lisMonth[1].innerHTML = monthChange();
        year--;
        monthChange();
        dateYear.innerHTML = year+'年';
        css(monthArea,'top',-ulHeight);
         lisMonth[0].innerHTML = monthChange();
         mTween({
            el: monthArea,
            attr: {
                top: 0
            }
         });
    }
    
    let yearLis = box.querySelectorAll('.date_month .month_block li')
    // let yearLis = box.getElementsByTagName('li');
    yearLis.forEach((item)=>{
        // console.log(item);
        item.onclick = ()=>{
            month = parseInt(item.innerHTML);
            year = parseInt(dateYear.innerHTML);
            // console.log(month);
            console.log(year,month);
            dateList[0].innerHTML = date();
            dateList[1].innerHTML = date();
            // date();
            css(monthBlock,'scale',1);
            mTween({
                el: monthBlock,
                attr: {
                    scale: 2,
                    opacity: 0,
                    zIndex: -5
                }
            });
            mTween({
                el: dateBlock,
                attr: {
                    scale: 1,
                    opacity: 1,
                    zIndex: -10
                }
            });
        }
        
    });
    function nextMonth() {
        dateList[0].innerHTML = date(); //显示的当前张
        month++;
        if (month > 12) {
            if (month % 12 == 1) {
                year++;
            }
            month = 1;
        }
        date();
        css(list, 'top', 0); //初始值
        dateList[1].innerHTML = date(); //显示的当前张
        mTween({
            el: list,
            attr: {
                top: -ulHeight,
                zIndex: 1
            }
        });
    }

    function preMonth() {
        dateList[1].innerHTML = date(); //显示的当前张
        month--;
        if (month < 1) {
            year--;
            month = 12;
        }
        date();
        css(list, 'top', -ulHeight); //初始值
        dateList[0].innerHTML = date(); //显示的当前张
        mTween({
            el: list,
            attr: {
                top: 0,
                zIndex: 1
            }
        });
    }


    nextBtn.onclick = function() {
        if (css(dateArea, 'opacity') == 1) {
            nextMonth();
        }else if(css(monthBlock,'opacity') == 1){
            nextYear();   
        }


    }
    preBtn.onclick = function() {
        if (css(dateArea, 'opacity') == 1) {
            preMonth();
        }else if(css(monthBlock,'opacity') == 1){
            preYear();  
        }
    }




    function showMonth() {
        // css(dateArea, 'scale', 1);
        // mTween({
        //     el: dateArea,
        //     attr: {
        //         opacity: 0,
        //         zIndex: -1,
        //         scale: 0.5
        //     },
        //     time: 500
        // });
        css(showMonthArea, 'scale', 2);
        mTween({
            el: showMonthArea,
            attr: {
                zIndex: 1,
                opacity: 1,
                scale: 1
            },
            time: 500
        });
    }
})();