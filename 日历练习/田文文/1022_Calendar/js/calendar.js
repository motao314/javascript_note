/*
日历效果需求详细

1.基础的显示生成部分
li分为三个部分，一个是在这个月之前 这个月和 这个月之后，分别用颜色区别 这个月之前和这个月与这个月之后的显色效果的不一样
让当前的今天 日期 默认加上active状态
鼠标移入li的时候 ，当前的li加上active状态
鼠标移出li的时候，让li 恢复到以前的状态和颜色

2.翻页部分
3.选择年月份部分
4.时钟显示部分
5.图片切换  让默认的数组存储好12张图片  当月份切换的时候  就显示相对应下标的图片 
月份切换  让默认的月份使用数组存好  当月份切换的时候 ，让span 的值显示对应月份数组的值
*/
// let nowMonthArr=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
// console.log(nowMonth+1)
// nowMonth+1 = nowMonthArr[1];
// let picArr = ['1.jpeg', '2.jpeg', '3.jpeg', '4.jpeg', '5.jpeg', '6.jpeg', '7.jpeg', '8.jpeg', '9.jpeg', '10.jpeg', '11.jpeg', '12.jpeg'];
// let colorArr = [];
// let monthArr = [];
/* /*
    1.点击下一月的按钮的时候，让月份++ 当月份++到12的时候 就让年份+1 并且让月份回到1又从头开始++
    2.点击上一月的按钮的时候，让月份-- 当月份--到1的时候 就让年份-1 并且让年份回到12 又从12开始--
    */
//    1.月份翻页，要让上面的月份变化加1或者减1  如果上面的月份加1 到12个月的时候 就直接让年份+1
//    如果月份减到1 就让年份-1 
//    2.让生成的两个月份和年份 传入这个date的函数里面
//     */
(function () {
    let list = document.querySelector('.date_list'); //获取ul列表
    let back = document.querySelector('.head'); //或缺head切换回去现在的时间点
    let monthList = document.querySelector('.span_ul'); //获取month的月份选择
    let monthLis = document.querySelector('.span_ul li'); //获取month的li
    let monthEm = document.querySelector('.span_em'); //month选择开启的元素   
    let btn = document.querySelectorAll('.btn'); //获取上一页下一页btn
    //获取年月日  
    let myDate = new Date();
    let nowYears = myDate.getFullYear(); //获取年份  
    let nowMonth = myDate.getMonth() + 1; //获取月份 
    var nowToday = myDate.getDate(); //获取今天日期    
    //调用函数生成li
    date(nowYears, nowMonth);
    //让日期与上面的年月份显示同步
    let monthText = document.querySelector('.span_em'); //head部分的月份显示获取
    let yearText = document.querySelector('.em em'); //head部分的年份显示获取
    monthText.innerHTML = nowMonth; //让月份等于现在的月份
    yearText.innerHTML = nowYears; //让年份等于现在的年份 
    //调用函数 给today加上状态 鼠标移入移出分别显示状态
    lisOnmouse();
    //点击下个月份
    btn[0].onclick = function () {
        if (nowMonth < 12) {
            nowMonth++;
        } else {
            nowYears++;
            nowMonth = 1;
        }
        date(nowYears, nowMonth);
        lisOnmouse2()
        monthText.innerHTML = nowMonth;
        yearText.innerHTML = nowYears;
    }
    //点击上一个月份
    btn[1].onclick = function () {
        nowMonth--;
        if (nowMonth < 1) {
            nowYears--;
            nowMonth = 12;
        }
        date(nowYears, nowMonth);
        lisOnmouse2()
        monthText.innerHTML = nowMonth;
        yearText.innerHTML = nowYears;
    }
    //点击回到选择页面
    back.onclick = () => {
        date(myDate.getFullYear(), myDate.getMonth() + 1);
        monthText.innerHTML = myDate.getMonth() + 1;
        yearText.innerHTML = myDate.getFullYear();
        lisOnmouse();
    }


    //点击月份可以切换月份 选择月份  点击年份可以选择年份切换年份
    // monthEm.onmouseover =()=>{
    //     monthList.style.display='block';
    // }
    // let timer =  0;
    // timer =setTimeout(function (){
    //     monthEm.onmouseout=()=>{
    //         monthList.style.display='none';
    //     }
    // },3000)




    //+++++++++++++++++封装的函数+++++++++++++++++++
    // date(year, month)；生成li的函数
    function date(year, month) {
        let nowDate = new Date(year, month - 1, 1);
        let firstDay = nowDate.getDay();
        let days = new Date(year, month, 0).getDate();
        let lastDays = new Date(year, month - 1, 0).getDate();
        let dates = [];
        for (let i = 0; i < 42; i++) {
            if (i < firstDay) {
                dates.push(`<li class="no">${lastDays - firstDay+1+i}</li>`);
            } else if (i >= firstDay && i < days + firstDay) {
                dates.push(`<li>${i - firstDay + 1}</li>`);
            } else {
                dates.push(`<li class="no">${i - (days + firstDay) + 1}</li>`);
            }
        }
        list.innerHTML = dates.join("");
    }
    //lisOnmouse（） 当前月份的这个li移入和移出还有today 的默认状态
    function lisOnmouse() {
        let lis = list.querySelectorAll('li');
        lis.forEach((item) => {
            if (item.className == 'no') {
                item.onmouseover = () => {
                    item.className = 'active';
                }
                item.onmouseout = () => {
                    item.className = 'no';
                }
            } else {
                item.onmouseover = () => {
                    item.className = 'active';
                }
                item.onmouseout = () => {
                    item.className = '';
                }
            }
        })
        lis.forEach((option, i, att) => {
            if (option.innerText == nowToday) {
                att[i].className = 'active';
            }
        })
    }
    //lisOnmouse2（） 切换月份的li移入和移出状态
    function lisOnmouse2() {
        let lis = list.querySelectorAll('li');
        lis.forEach((item) => {
            if (item.className == 'no') {
                item.onmouseover = () => {
                    item.className = 'active';
                }
                item.onmouseout = () => {
                    item.className = 'no';
                }
            } else {
                item.onmouseover = () => {
                    item.className = 'active';
                }
                item.onmouseout = () => {
                    item.className = '';
                }
            }
        })
    }
})();