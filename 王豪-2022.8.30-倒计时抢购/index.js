const ptime = document.querySelector('.ptime');
const needtimes = document.querySelector('.needtimes')
// 1.需要一个倒计时
let cutTime = setInterval(cutdown_Time,1000);



//定义 状态值
let state = 'before'  // 'before'表示准备抢购 'now'表示正在抢购  'after'表示抢购结束

// 工具函数-倒计时
let h = 0;
let m = 0;
let s = 10;
function cutdown_Time(){
    h;
    m;
    s--;
    if(m>=60){
        h=h-60;
        m=1;
    }
    if(m<0){
        h=h-1;
        m=59;
    }
    if(s>=60){
        s=s-60;
        m=1;
    }
    if(s<0){
        m=m-1;
        s=59;
    }
    ptime.innerHTML= `${h}时${m}分${s}秒`;
    befnow();
    state=='before'? beforeSty() : state=='now'? nowSty() : state = afterSty();
}

function befnow(){
    for(let i=1; i<4;i++){
        if(h==0&&m==0&&s==0){
            h=0
            m=0;
            s=10;
            state='now';
        }
    }
    console.log(state)
}

function beforeSty(){
    needtimes.style.background='red';
}
function nowSty(){
    needtimes.style.background='green';
}
function afterSty(){
    needtimes.style.background='blue';
}


