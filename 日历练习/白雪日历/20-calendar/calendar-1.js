(function () {
    let days = document.querySelectorAll('.days'); //日期的父级
    css(days[0], 'left', 0);
    css(days[1], 'left', '500');
    let weeks = ['日', '一', '二', '三', '四', '五', '六'];
    //默认显示的是现在的日期
    defaultDate();

    function defaultDate() {
        let nowDate = new Date();
        let nowYear = nowDate.getFullYear();
        let nowMonth = nowDate.getMonth() + 1;
        let nowDay = nowDate.getDate();
        let nowWeek = nowDate.getDay();
        let nowDateEle = document.querySelector('.right .date');
        nowDateEle.innerHTML = `${nowYear}-${nowMonth}-${nowDay} 周${weeks[nowWeek]}`
        skip(nowYear, nowMonth, days[0]);
        skip(nowYear, nowMonth, days[1])
    }

    document.onkeyup = (e) => {
        if (e.keyCode === 13) {
            appointDate();
        }
    }

    let nextBtn = document.querySelector('.btns .next');
    let prevBtn = document.querySelector('.btns .prev');

    nextBtn.onclick = function () {
        let currentYearEle = document.querySelector('.about-date .year');
        let currentMonthEle = document.querySelector('.about-date .month');
        let monthNub = parseFloat(currentMonthEle.innerHTML) >= 12 ? 0 : parseFloat(currentMonthEle.innerHTML);
        let yearNub = parseFloat(currentMonthEle.innerHTML) >= 12 ? parseFloat(currentYearEle.innerHTML) + 1 : parseFloat(currentYearEle.innerHTML);

        currentMonthEle.innerHTML = `${++monthNub}月`;
        currentYearEle.innerHTML = `${yearNub}年`;
        css(days[0], 'left', 0);
        css(days[1], 'left', '500');
        mTween({
            el: days[0],
            attr: {
                left: -500
            },
            time: 400,
            type: "easeBoth"
        })
        mTween({
            el: days[1],
            attr: {
                left: 0
            },
            time: 400,
            type: "easeBoth"
        })
        skip(yearNub, monthNub, days[1]);
    }
    prevBtn.onclick = function () {
        let currentYearEle = document.querySelector('.about-date .year');
        let currentMonthEle = document.querySelector('.about-date .month');
        let monthNub = parseFloat(currentMonthEle.innerHTML) <= 1 ? 13 : parseFloat(currentMonthEle.innerHTML);
        let yearNub = parseFloat(currentMonthEle.innerHTML) <= 1 ? parseFloat(currentYearEle.innerHTML) - 1 : parseFloat(currentYearEle.innerHTML);

        currentMonthEle.innerHTML = `${--monthNub}月`;
        currentYearEle.innerHTML = `${yearNub}年`;
        css(days[0], 'left', '-500');
        css(days[1], 'left', 0);
        mTween({
            el: days[0],
            attr: {
                left: 0
            },
            time: 400,
            type: "easeBoth"
        })
        mTween({
            el: days[1],
            attr: {
                left: 500
            },
            time: 400,
            type: "easeBoth"
        })
        skip(yearNub, monthNub, days[0]);
    }

    //指定某月
    function appointDate() {
        let appointYear = document.querySelectorAll('.appointDate input')[0].value.trim();
        let appointMonth = document.querySelectorAll('.appointDate input')[1].value.trim();

        if (appointYear && appointMonth !== '') {
            skip(appointYear, appointMonth, days[0])
        }
    }
    //跳转日期
    function skip(currentYear, currentMonth, el) {
        let yearEle = document.querySelector('.about-date .year');
        yearEle.innerHTML = `${currentYear}年`;
        let monthEle = document.querySelector('.about-date .month');
        monthEle.innerHTML = `${currentMonth}月`;
        let currentDate = new Date(currentYear, currentMonth - 1, 1); //指定月的日期
        let currentDay = new Date().getDate();
        let firstDay = currentDate.getDay(); //指定月的第一天是周几
        let currentMonthDays = new Date(currentYear, currentMonth, 0).getDate(); //指定月总天数
        let prevMonthDays = new Date(currentYear, currentMonth - 1, 0).getDate(); //上个月总天数
        let prevMonthStart = prevMonthDays - firstDay + 1;
        let currentMonthStart = 1;
        let nextMonthStart = 1;

        let dateHtml = [];
        for (let i = 0; i < 42; i++) {
            if (i < firstDay) { //上个月补位
                dateHtml.push(`<li class="other">${prevMonthStart++}</li>`)
            } else if (currentMonthStart <= currentMonthDays) { //当前月
                dateHtml.push(`<li>${currentMonthStart++}</li>`);
            } else { //下个月补位
                dateHtml.push(`<li class="other">${nextMonthStart++}</li>`);
            }
            el.innerHTML = dateHtml.join('');
        }
        let nowMonth = new Date().getMonth();
        let nowYear = new Date().getFullYear();
        let li = document.querySelectorAll('.days li');
        li.forEach(item => {
            if (item.innerHTML == currentDay && parseFloat(monthEle.innerHTML)==nowMonth+1 && parseFloat(yearEle.innerHTML)==nowYear) { //前者是字符串，后者是数字，所以用两个等号
                item.classList.add('today');
            }
            item.onclick = function () {
                li.forEach(item => {
                    item.classList.remove('today');
                });
                item.classList.add('today');
            }
        });
    }
    //切换到月份组tab
    (function () {
        let monthBtn = document.querySelector('.ctrl .month');
        let monthsList = document.getElementsByClassName('tab-months')[0];
        let dateList = document.querySelector('.tab-date');
        let yearBtn = document.querySelector('.about-date .year');
        let changeYear = document.querySelector('.change-year');
        let prevYearBtn = document.querySelector('.change-year .prev-year');
        let nextYearBtn = document.querySelector('.change-year .next-year');

        css(dateList, "scale", 1);
        css(monthsList, 'scale', 0);
        let li = monthsList.querySelectorAll('li');
        monthBtn.onclick = () => {
            mTween({
                el: dateList,
                attr: {
                    "scale": 0
                },
                time: 200,
                cb: () => {
                    mTween({
                        el: monthsList,
                        attr: {
                            "scale": 1
                        },
                        time: 200,
                        type: 'easeBoth'
                    })
                }
            })
            monthBtn.style.display = 'none';
            monthsList.style.display = 'flex';
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            changeYear.style.display = 'flex';
        }
        li.forEach((item, index) => {
            item.onclick = () => {
                console.log(item)
                let currentYear = parseFloat(document.querySelector('.ctrl .year').innerHTML);
                console.log(currentYear)
                skip(currentYear, index + 1, days[0])
                mTween({
                    el: monthsList,
                    attr: {
                        'scale': 0
                    },
                    time: 200,
                    type: 'easeBoth',
                    cb: () => {
                        mTween({
                            el: dateList,
                            attr: {
                                "scale": 1
                            },
                            time: 200,
                            type: 'easeBoth'
                        })
                    }
                })
                monthBtn.style.display = 'block';
                prevBtn.style.display = 'block';
                nextBtn.style.display = 'block';
                changeYear.style.display = 'none';
                dateList.style.display = 'block';
            }
        });
        prevYearBtn.onclick = () => {
            let nub = parseFloat(yearBtn.innerHTML);
            yearBtn.innerHTML = `${--nub}年`;
        }
        nextYearBtn.onclick = () => {
            let nub = parseFloat(yearBtn.innerHTML);
            yearBtn.innerHTML = `${++nub}年`;
        }
    })();
    //切换到年份组tab
    (function () {
        let yearBtn = document.getElementsByClassName('year')[0];
        let monthBtn = document.querySelector('.ctrl .month');
        let tabYear = document.querySelector('.tab-year');
        let yearList = document.querySelectorAll('.tab-year .decade')[0];
        let monthsList = document.getElementsByClassName('tab-months')[0];
        let dateList = document.getElementsByClassName('tab-date')[0];
        let currentStart = `${String((parseFloat(yearBtn.innerHTML))).substr(0,3)}0`;
        let currenEnd = `${String((parseFloat(yearBtn.innerHTML))).substr(0,3)}9`;
        let changeDecade = document.querySelector('.change-decade');
        let prevDecadeBtn = document.querySelector('.change-decade .prev-decade');
        let nextDecadeBtn = document.querySelector('.change-decade .next-decade');
        let changeYear = document.querySelector('.change-year');
        let html = '';
        css(yearList, 'scale', 0)
        css(monthsList, 'scale', 0)
        css(dateList, 'scale', 1)
        yearBtn.onclick = () => {
            if(yearBtn.innerHTML.indexOf('-')>-1){
                console.log(yearBtn.innerHTML)
                return
            }
            yearList.innerHTML = '';
            yearBtn.innerHTML = `${currentStart}-${currenEnd}`;
            for (let i = currentStart; i <= currenEnd; i++) {
                html += `<li>${i}</li>`
            }
            if (yearList.innerHTML !== '') {
                return;
            }
            yearList.innerHTML = html;
            html = '';
            mTween({
                el: monthsList,
                attr: {
                    'scale': 0
                },
                time: 200,
                cb: () => {

                    mTween({
                        el: yearList,
                        attr: {
                            'scale': 1
                        },
                        time: 200,
                        type: 'easeBoth'
                    });
                    mTween({
                        el: dateList,
                        attr: {
                            'scale': 0
                        },
                        time: 200,
                        type: 'easeBoth'
                    });
                }
            })
            monthBtn.style.display = 'none';
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            dateList.style.display = 'none';
            tabYear.style.display = 'flex';
            yearList.style.display = 'flex';
            changeDecade.style.display = 'flex';
            changeYear.style.display = 'none';
            let li = yearList.querySelectorAll('li');
            li.forEach((item) => {
                item.onclick = () => {
                    yearBtn.innerHTML = `${item.innerHTML}年`;
                    yearList.innerHTML = '';
                    mTween({
                        el: yearList,
                        attr: {
                            'scale': 0
                        },
                        time: 200,
                        type: 'easeBoth',
                        cb: () => {
                            mTween({
                                el: monthsList,
                                attr: {
                                    'scale': 1
                                },
                                time: 200,
                                type: 'easeBoth'
                            })
                        }
                    })
                    yearList.style.display = 'none';
                    monthsList.style.display = 'flex';
                    changeDecade.style.display = 'none';
                    changeYear.style.display = 'flex';
                }
            });
            prevDecadeBtn.onclick = () => { //  切换上一个十年
                let arr = []; //用来存放字符串切割后的数组
                let html = '';//用来存放生成的li结构
                yearList.innerHTML = ''; //先清空结构
                yearBtn.innerHTML.split('-').map((item) => { //以 '-' 为分隔符把字符串切割成数组，并且存在arr里
                    arr.push(item - 10)
                })
                yearBtn.innerHTML = arr.join('-'); //把数组转换成字符串并且赋值
                for (let i = arr[0]; i <= arr[1]; i++) { //循环生成li结构
                    html += `<li>${i}</li>`;
                }
                yearList.innerHTML = html; //结构赋值
                let li = yearList.getElementsByTagName('li'); //获取循环后的结构
                for (let i = 0; i < li.length; i++) { //给li加点击事件
                    li[i].onclick = () => {
                        yearBtn.innerHTML = `${li[i].innerHTML}年`; 
                        yearList.innerHTML = '';
                        mTween({
                            el: yearList,
                            attr: {
                                'scale': 0
                            },
                            time: 200,
                            type: 'easeBoth',
                            cb: () => {
                                mTween({
                                    el: monthsList,
                                    attr: {
                                        'scale': 1
                                    },
                                    time: 200,
                                    type: 'easeBoth'
                                })
                            }
                        })
                        yearList.style.display = 'none';
                        monthsList.style.display = 'flex';
                        changeDecade.style.display = 'none';
                        changeYear.style.display = 'flex';
                    }
                }
            }
            nextDecadeBtn.onclick = () => {
                let arr = [];
                let html = '';
                yearBtn.innerHTML.split('-').map((item) => {
                    arr.push(Number(item) + 10)
                })
                yearBtn.innerHTML = arr.join('-');
                for (let i = arr[0]; i <= arr[1]; i++) {
                    html += `<li>${i}</li>`;
                }
                yearList.innerHTML = html;
                let li = yearList.getElementsByTagName('li');
                for (let i = 0; i < li.length; i++) {
                    li[i].onclick = () => {
                        yearBtn.innerHTML = `${li[i].innerHTML}年`;
                        yearList.innerHTML = '';
                        mTween({
                            el: yearList,
                            attr: {
                                'scale': 0
                            },
                            time: 200,
                            type: 'easeBoth',
                            cb: () => {
                                mTween({
                                    el: monthsList,
                                    attr: {
                                        'scale': 1
                                    },
                                    time: 200,
                                    type: 'easeBoth'
                                })
                            }
                        })
                        yearList.style.display = 'none';
                        monthsList.style.display = 'flex';
                        changeDecade.style.display = 'none';
                        changeYear.style.display = 'flex';
                    }
                }
            }
        }

    })();
})();