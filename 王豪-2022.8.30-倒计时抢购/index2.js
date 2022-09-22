
const vbox = document.querySelector('.vbox');
const data = {
    imgArr:['lb1.jpg','lb2.jpg','lb3.jpg','lb4.jpg'],
    titleArr:['火影鸣人影分身','眼睛的光色和嘴巴','结印-这是什么印','火影佐助'],
    smalltitleArr:['是木叶的下忍','不怎么认识','只知道结印','千鸟'],
    oldPriseArr:['399','499','599','699'],
    newPriseArr:['19.9','29.9','39.9','49.9'],
    timeArr:[
        '2022-8-30 00:00:00','2022-8-31 17:00:00',
        '2022-8-30 18:22:00','2022-8-21 20:16:00'
    ]
}
//页面渲染

//定义一个状态
let state = 'before';//开始之前的状态'bofore' 正在进行'now' 结束后'after'
for(let i=0; i<data.imgArr.length;i++){
    setInterval(function(){
        //获取当前时间
        let nowTime = new Date()
        //获取活动开始时间
        let stopTime = new Date(data.timeArr[i]);
        //计算差值
        let lastTime = stopTime - nowTime;
        
        if(lastTime>0){
            state = 'before';
            
            // console.log('即将开始');
        }else if(lastTime>=(-2*60*60*1000) && lastTime<0){
            //如果差值小于0或者大于两小时则为正在抢购
            state='now';
        }else{
            state = 'after';
        }
        state=='before'? beforefun() : state == 'now'?  nowfun() : afterfun();
        function beforefun(){
           
            hours = Math.floor(lastTime/1000/60/60);
            mins = Math.floor(lastTime/1000/60%60)
            sound = Math.floor(lastTime/1000%60)
            // console.log(hours,mins,sound);
            document.querySelectorAll('.ptime')[i].innerHTML=`${hours}时${mins}分${sound}秒`
            
        }
        
        function nowfun(){
            var tempLastTime = 2*60*60*1000 + lastTime;
            hours = Math.floor(tempLastTime/1000/60/60);
            mins = Math.floor(tempLastTime/1000/60%60);
            sound = Math.floor(tempLastTime/1000%60);
            document.querySelectorAll('.ptime')[i].innerHTML=`${hours}时${mins}分${sound}秒`
            document.querySelectorAll('.tep')[i].innerHTML=`抢购时间还剩`;
            document.querySelectorAll('.btn')[i].innerHTML=`立即抢购`;
            document.querySelectorAll('.btn')[i].style.background='red'
        }
        
        function afterfun(){
            document.querySelectorAll('.tep')[i].innerHTML=`活动结束`
            document.querySelectorAll('.ptime')[i].innerHTML=`敬请期待`
            document.querySelectorAll('.btn')[i].style.background='#aaa'
            document.querySelectorAll('.btn')[i].innerHTML=`已抢完`;
        }
    },1000)

    init();
    function init(){
        let arr;
        arr = `<div class="shops">
                                <div class="left-img">
                                    <div class="needtimes">
                                        <div class="cont">
                                            <p class='tep'> 距离抢购还有</p>
                                            <p class="ptime">0小时0分0秒</p>
                                        </div>
                                        <img class="imgs" src="${data.imgArr[i]}" alt="">
                                    </div>
                                </div>
                                <div class="right-content">
                                    <p class="vtitle">${data.titleArr[i]}</p>
                                    <small class='vsmall'>${data.smalltitleArr[i]}</small>
                                    <span class="new-price"><span>${data.newPriseArr[i]}元</span><small class="old-price">${data.oldPriseArr[i]}元</small></span>
                                    <div class="btn">即将开始</div>
                                </div>
                            </div>`
            vbox.innerHTML += arr;
    }
}
console.log(document.querySelectorAll('.ptime')[1].innerHTML)
// console.log(ptimes)

