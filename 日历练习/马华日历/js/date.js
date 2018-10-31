(function () {
    let box = document.querySelector('.box');
    let time = box.querySelector('.time');
    let titleToday = box.querySelector('.titleToday');
    let month = box.querySelector('.month span');
    toTime();
    setInterval(toTime, 1000);
    function toTime() {
        let nowDate = new Date();//获取时间
        let Second = toZP(nowDate.getSeconds());//秒
        let Minutes = toZP(nowDate.getMinutes());//分
        let Hours = toZP(nowDate.getHours());//时
        let Days = toZP(nowDate.getDate());//日
        let Month = toZP(nowDate.getMonth() + 1);//月
        let Year = toZP(nowDate.getFullYear());//年
        titleToday.innerHTML = Year + '年' + Month + '月' + Days + '日';
        time.innerHTML = Hours + ':' + Minutes + ':' + Second;
    }
    let list = box.querySelector('.list');
    let btns = box.querySelectorAll('.month i');
    let now = new Date();
    let Y = now.getFullYear();
    let M = now.getMonth() + 1;
    let D = now.getDate();
    run();
    function run() {
        month.innerHTML = Y + '年' + M + '月';
    }
    toDate(Y, M);
    function toDate(year, month) {
        let firstDay = new Date(year, month - 1, 1).getDay();//本月第一天
        let lastMonthDays = new Date(year, month - 1, 0).getDate();//上个月最后一天
        let inner = "";
        let lastMonthFirst = lastMonthDays - firstDay + 1;//上个月在这个列表中需要显示的第一天是几号
        let nowMonthFirst = 1;
        let nowMonthLast = new Date(year, month, 0).getDate();//上个月最后一天
        let nextMonthFirst = 1;
        for (let i = 0; i < 42; i++) {
            if (i < firstDay) {//小于本月第一天
                inner += `<li class="gray">${lastMonthFirst}</li>`;
                lastMonthFirst++;
            } else if (nowMonthFirst <= nowMonthLast) {
                if (nowMonthFirst == D) {
                    inner += `<li class="active">${nowMonthFirst}</li>`;
                    nowMonthFirst++;
                    continue;
                }
                inner += `<li>${nowMonthFirst}</li>`;
                nowMonthFirst++;
            } else {
                inner += `<li class="gray">${nextMonthFirst}</li>`;
                nextMonthFirst++;
            }
        }
        list.innerHTML = inner;
    }
    btns[0].onclick = function () {
        M++;
        if (M > 12) {
            if (M % 12 == 1) {
                Y++;
            }
            M = 1;
        }
        toDate(Y, M);
        month.innerHTML = Y + '年' + M + '月';
    }
    btns[1].onclick = function () {
        M--;
        if (M < 1) {
            Y--;
            M = 12;
        }
        toDate(Y, M);
        month.innerHTML = Y + '年' + M + '月';
    }
    function toZP(nub) {//补零
        return nub < 10 ? '0' + nub : '' + nub;
    }
    let lis = list.querySelectorAll('li');
    lis.forEach((item, index) => {
        item.onmouseover = () => {
            lis.forEach((item) => {
                item.style.background = '';
            })
            item.style.background = 'rgba(0,168,255,.3)';
        }
        item.onmouseout = () => {
            item.style.background = '';
        }
    })
    let list2 = box.querySelector('.list2');
    let week = box.querySelector('.week');
    let onOff = true;
    month.onclick = () => {
        if (onOff) {
            list.style.display = 'none';
            week.style.display = 'none';
            list2.style.display = 'flex';
            month.innerHTML = Y + '年';
            onOff = false;
        } else if (!onOff) {
            list2.style.display = 'none';
            week.style.display = 'flex';
            list.style.display = 'flex';
            month.innerHTML = Y + '年' + M + '月';
            onOff = true;
        }
    }
    let list2d = list2.querySelectorAll('div');
    list2d.forEach((item) => {
        item.onclick = () => {
            list2.style.display = 'none';
            week.style.display = 'flex';
            list.style.display = 'flex';
            month.innerHTML = Y + '年' + parseInt(item.innerHTML) + '月';
            onOff = true;
        }
    })
})();    