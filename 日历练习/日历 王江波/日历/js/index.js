(function(){
    let wrap = document.querySelector(".wrap");
    let title = wrap.querySelector(".title");
    let nowTime = title.querySelector("time");
    let nowDay = title.querySelector("p");
    let content = wrap.querySelector(".content");
    let topYear = content.querySelector(".topYear");
    let topTime = topYear.querySelector("time");
    let week = ["日","一","二","三","四","五","六"];
    toTime();
    setInterval(toTime,1000);
    function toTime(){//上面的时钟
        let dateTime = new Date();
        let year = dateTime.getFullYear();
        let month = dateTime.getMonth() + 1;
        let date = dateTime.getDate();
        let hours = dateTime.getHours();
        let minutes = dateTime.getMinutes();
        let seconds = dateTime.getSeconds();
        let day = dateTime.getDay();
        nowTime.innerHTML = `${toDB(hours)}:${toDB(minutes)}:${toDB(seconds)}`;
        nowDay.innerHTML =  `${year}年${toDB(month)}月${toDB(date)}日 星期${week[day]}`;
       
    }
    let list = content.querySelector(".list");
    let navs = content.querySelector("nav");
    let dateTime = new Date();
    let year = dateTime.getFullYear();
    let month = dateTime.getMonth() + 1;
   
    topTime.innerHTML = `${year}年${toDB(month)}月`
    create(year,month);
    function create(year,month){
        //生成星期
        let innerDay ="";
        for(let i = 0;i<7;i++){
            innerDay += `<span>${week[i]}</span>`
         }
        navs.innerHTML = innerDay;
        //生成日期
        let firstDay = new Date(year,month - 1,1).getDay();//当前这个月第一天是星期几 
        let days = new Date(year,month,0).getDate();//上个月最后一天,通过上个月最后一天获取这个月有几天
        let lastDays = new Date(year,month-1,0).getDate();//上个月最后一天是几号
        var dates = [];
        for(var i = 0; i < 42; i++){
            if(i < firstDay){ //这里是要补进去的上个月的日期
                dates.push(`<li class="gray">${lastDays - firstDay+1+i}</li>`);
            } else if(i >= firstDay&& i < days + firstDay){
                dates.push(`<li>${i - firstDay + 1}</li>`);//这个月有多少天        
            } else {//这里是要补进去的下个月的日期
                dates.push(`<li class="gray">${i - (days + firstDay) + 1}</li>`);
            }
        }
       list.innerHTML = dates.join("");
       //给今天的日期加上标记
        let listLi = list.querySelectorAll("li");
        if(year == dateTime.getFullYear()&& month ==dateTime.getMonth()+1){
            listLi[firstDay-1 + dateTime.getDate()].style.background ="yellow";
        }
    }
    //点击左箭头 上一年月
    let btn = topYear.querySelectorAll("button");
    btn[1].onclick = function(){
        if(topTime.innerHTML.length == 8){
            month--;
            if(month == 0){
                month = 12;
                year--;  
                topTime.innerHTML = `${year}年${toDB(month)}月`;       
            }
            topTime.innerHTML = `${year}年${toDB(month)}月`;   
         }else if(topTime.innerHTML.length == 5){
            year--; 
            topTime.innerHTML = `${year}年`; 
        }else{
            let yearBox = content.querySelector(".yearBox");
            let arr = [];
            let str = "";
            topTime.innerHTML.split("-").map((item)=>{
                arr.push(item-10);  
            });
            // yearBorn();
            topTime.innerHTML = arr.join("-");
            for(let i =arr[0];i<=arr[i];i++){
                str +=`<li>${i}</li>`;
            }  
            yearBox.innerHTML = str;  
        }
        monthBorn();
        monthClick();
        yearBorn1()
        css(monthBox,"scale",0);
        mTween({
            el:monthBox,
            attr:{
                scale:1
            }
        })
        css(bottomBox,"scale",0);
        mTween({
            el:bottomBox,
            attr:{
                scale:1
            },
            type: "backOut",
        })
      }
      //点击右箭头 下一年月
     btn[0].onclick = function(){
        if(topTime.innerHTML.length == 8){
        month++;
            if(month >12){
                month = 1;
                year++;  
            } 
            topTime.innerHTML = `${year}年${toDB(month)}月`;
           
        }else if(topTime.innerHTML.length == 5){
            year++; 
            topTime.innerHTML = `${year}年`;  
        }
        else{
            let yearBox = content.querySelector(".yearBox");
            let arr = [];
            let str = "";
            // yearBorn();
            topTime.innerHTML.split("-").map((item)=>{
                arr.push(Number(item)+10);
            });
            topTime.innerHTML = arr.join("-");
            for(let i =arr[0];i<=arr[i];i++){
                str +=`<li>${i}</li>`;
            }
            yearBox.innerHTML = str;
        }
        monthBorn();
        monthClick();
        yearBorn1()
        css(monthBox,"scale",0);
        mTween({
            el:monthBox,
            attr:{
                scale:1
            }
        })
        css(bottomBox,"scale",0);
        mTween({
            el:bottomBox,
            attr:{
                scale:1
            },
            type: "backOut"
        })
     }
     //点击切换月
     let bottomBox = content.querySelector(".bottomBox");
     let monthBox = content.querySelector(".monthBox");
     let yearBox = content.querySelector(".yearBox");
     //topTime 点击的时候判断
     topTime.onclick = function(){
         if(topTime.innerHTML.length == 8){//显示月
         topTime.innerHTML = `${year}年`;
        bottomBox.classList.add("hide"); 
        monthBox.classList.remove("hide");
        css(monthBox,"scale",0);
        mTween({
            el:monthBox,
            attr:{
                scale:1
            }
        })
        }else if(topTime.innerHTML.length == 5){//显示年
        
            monthBox.classList.add("hide");
            yearBox.classList.remove("hide");
            yearBorn();
            css(yearBox,"scale",0);
            mTween({
                el:yearBox,
                attr:{
                    scale:1
                }
            })
        }
     }
     //生成月份  
    monthBorn();
       function monthBorn(){
            let monthInner = "";
            for(let i = 0;i<16;i++){
                if(i<=11){
                    monthInner +=` <li>${i+1}月</li>`;
                }else{
                    monthInner +=` <li>${i%11}月</li>`;
                }
            }
            monthBox.innerHTML = monthInner;
       }
       //单月点击切换
       monthClick();
       function monthClick(){
            let monthList = monthBox.querySelectorAll("li");
            monthList.forEach((item,index)=>{
            item.onclick = function(){
            if(index <=11){
                month = index + 1;
            } else{
                year ++;
                index = index%11;
            }
            create(year,month);
            monthBox.classList.add("hide");
            bottomBox.classList.remove("hide");
            topTime.innerHTML = `${year}年${toDB(month)}月`;
                css(bottomBox,"scale",0);
                mTween({
                    el:bottomBox,
                    attr:{
                        scale:1
                    }
                })               
              }
         }) 
   }   
    //生成年  
    function yearBorn(){
        let yearInner = "";
        let start = `${String(parseFloat(topTime.innerHTML)).substring(0,3)}0`;//最后一位数字
        let end = `${String(parseFloat(topTime.innerHTML)).substring(0,3)}9`;
         topTime.innerHTML = `${start}-${end}`;
        let born =Number(start)+16;
        console.log(born)
        for(let i = start;i<born;i++){
            yearInner +=`<li>${i}</li>`;        
        }
        yearBox.innerHTML = yearInner;
        let yearList = yearBox.querySelectorAll("li");
       //单个年点击
        yearList.forEach((item,index)=>{
        item.onclick = function(){
            yearBox.classList.add("hide"); 
            monthBox.classList.remove("hide"); 
            topTime.innerHTML = item.innerHTML + "年";
            year = item.innerHTML;
        }   
      })    
    }
    function yearBorn1(){
        let yearInner = "";
        let start = `${String(parseFloat(topTime.innerHTML)).substring(0,3)}0`;
        let end = `${String(parseFloat(topTime.innerHTML)).substring(0,3)}9`;
        //  topTime.innerHTML = `${start}-${end}`;
        let born =Number(start)+16;
        for(let i = start;i<born;i++){
            yearInner +=`<li>${i}</li>`;
           
        }
        yearBox.innerHTML = yearInner;
        let yearList = yearBox.querySelectorAll("li");
        css(yearBox,"scale",0);
        mTween({
            el:yearBox,
            attr:{
                scale:1
            },
            type: "bounceIn",
        })    
       //单个年点击
         yearList.forEach((item,index)=>{
        item.onclick = function(){
            yearBox.classList.add("hide"); 
            monthBox.classList.remove("hide"); 
            topTime.innerHTML = item.innerHTML;
            year = item.innerHTML;    
         }   
      })    
    }
    //返回最初界面
   nowDay.onclick = function(){  
       if(yearBox.className == "yearBox") {
         bottomBox.className = "bottomBox";
       }else if(monthBox.className == "monthBox"){ 
        bottomBox.className = "bottomBox";
       }      
    let dateTime = new Date();
        let year = dateTime.getFullYear();
        let month = dateTime.getMonth() + 1;
        let date = dateTime.getDate();
        let day = dateTime.getDay();
        nowDay.innerHTML =  `${year}年${toDB(month)}月${toDB(date)}日 星期${week[day]}`;
        topTime.innerHTML = `${year}年${toDB(month)}月`;
        create(year,month);
        css(bottomBox,"scale",0);
        mTween({
            el:bottomBox,
            attr:{
                scale:1
            }
        })
    }
})()
function toDB(nub){
    return nub < 10?"0"+nub:""+nub;
}
//zhongbiao

        let box = document.querySelector(".box");
        let clock = box.querySelector(".clock");
        let clockList = clock.querySelector("ul");
        
     console.log(box)
     clockInner ="";
        for(let i = 0;i<60;i++){
            clockInner += `<li style ='transform:rotate(${i*6}deg)'></li>`;       
        }
        clockList.innerHTML = clockInner;  

       
        let list2 = box.querySelector(".list2");
        let clockInner1 = "";
        for(let i = 0; i<12; i++){                                                        //三目，如果是ture,等于i;否则为12(0是flase)
            clockInner1 += `<li style="transform:rotate(${i*30}deg)"><span style="transform:rotate(${-i*30}deg)">${i?i:12}</span></li>`;
        }
        list2.innerHTML = clockInner1;
    
        let h = document.querySelector(".s");
        let m = document.querySelector(".f");
        let s = document.querySelector(".m");
        totime();
        setInterval(totime,1000);
        function totime(){
            let date = new Date();
            let second = date.getSeconds();
            let minutes = date.getMinutes()+second/60;
            let hours = date.getHours()+minutes/60;
            css(s,"rotate",second*6);
           css(m,"rotate",minutes*6);
            css(h,"rotate",hours*30);

        }

    

