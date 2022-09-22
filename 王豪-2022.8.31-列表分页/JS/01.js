//编写json数据
const data = [
    {title:'中央政治局会议建议 二十大10月16日召开',time:'2022.8.30'},
    {title:'抢占未来发展制高点  “羲和”探日成果正式发布',time:'2022.8.30'},
    {title:'星火成炬｜热血中国心 烈焰显忠诚  山城送英雄',time:'2022.8.30'},
    {title:'数读天津十年之变  用数字科技“点亮”乡村',time:'2022.8.30'},
    {title:'绘就人与自然和谐共生的中国画卷',time:'2022.8.30'},
    {title:'9月,这些新规将影响你我生活',time:'2022.8.30'},
    {title:'科技赋能 智慧农业绘就丰收新画卷',time:'2022.8.30'},
    {title:'“感动重庆”！对话支援一线的云南森林消防员',time:'2022.8.30'},
    {title:'星火成炬｜热血中国心 烈焰显忠诚  山城送英雄',time:'2022.8.30'},
    {title:'数读天津十年之变  用数字科技“点亮”乡村',time:'2022.8.30'},
    {title:'绘就人与自然和谐共生的中国画卷',time:'2022.8.30'},
    {title:'抢占未来发展制高点  “羲和”探日成果正式发布',time:'2022.8.30'},
    {title:'星火成炬｜热血中国心 烈焰显忠诚  山城送英雄',time:'2022.8.30'},
    {title:'数读天津十年之变  用数字科技“点亮”乡村',time:'2022.8.30'}
]

const ul = document.querySelector('ul');   // 获取ul列表
const btn = document.querySelector('.btn');// 获取按钮

let arr = '';
var num = 4;  // 每页显示条数
let nums = num; // 点击时每次加载条数
let pages = 1; //数据的页数
// document.cookie='num= '
var strcookie = document.cookie;
var s;
// num = s[1]
if(!window.performance.navigation.type){
    first()
}else{
    last()
}

function first(){
    document.cookie=`num=4` // 当页面首次显示时重置cookie;
    // 1.首次显示
    for(let i=0; i<num;i++){
        arr += `
        <li>
            <div>
                <span class="left-title">${data[i].title}</span>
                <span class="right-time">${data[i].time}</span>
            </div>
        </li>
        `
    }
    ul.innerHTML = arr;

    let allPages = Math.ceil(data.length/num);  // 获取数据的总页数
    if (window.performance) {
        console.info("window.performance works fine on this browser");
    }
    btn.onclick = function(){
        arr = '';// 清空页面
        pages++; // 页数增加
        //处理 num 值
        if(pages==allPages){ // 当前页数等于总页数
            num = num+nums;
            console.log('nums',nums)
            console.log('allpages',allPages)
            let surplus = Math.abs(data.length - allPages*nums);
            console.log(surplus)
            num = num - surplus;
            btn.style.background = "#aaa";
            btn.style.color = "#fff"
            btn.innerHTML= '没有更多了';
            btn.onclick = ''
            
        }else{
            num = num+nums;
        }
        console.log('num',num)
        for(let i=0; i<num;i++){
            arr += `
                <li>
                    <div>
                        <span class="left-title">${data[i].title}</span>
                        <span class="right-time">${data[i].time}</span>
                    </div>
                </li>
                `
                document.cookie =`num=${num}`;
        }
        ul.innerHTML = arr;
    }
}

function last(){
    // 1.再次显示
    //获取cooki值并赋值给num
    strcookie = document.cookie;
    s = strcookie.split('=')
    console.log(s[1])
    num=s[1]
    for(let i=0; i<num;i++){
        arr += `
        <li>
            <div>
                <span class="left-title">${data[i].title}</span>
                <span class="right-time">${data[i].time}</span>
            </div>
        </li>
        `
    }
    ul.innerHTML = arr;

    let allPages = Math.ceil(data.length/num);  // 获取数据的总页数
    if (window.performance) {
        console.info("window.performance works fine on this browser");
    }
    btn.onclick = function(){
        arr = '';// 清空页面
        pages++; // 页数增加
        //处理 num 值
        if(pages==allPages){ // 当前页数等于总页数
            num = num+nums;
            console.log('nums',nums)
            console.log('allpages',allPages)
            let surplus = Math.abs(data.length - allPages*nums);
            console.log(surplus)
            num = num - surplus;
            btn.style.background = "#aaa";
            btn.style.color = "#fff"
            btn.innerHTML= '没有更多了';
            btn.onclick = ''
            
        }else{
            num = num+nums;
        }
        console.log('num',num)
        for(let i=0; i<num;i++){
            arr += `
                <li>
                    <div>
                        <span class="left-title">${data[i].title}</span>
                        <span class="right-time">${data[i].time}</span>
                    </div>
                </li>
                `
                document.cookie =`num=${num}`;
        }
        ul.innerHTML = arr;
    }
    strcookie = document.cookie;
    s = strcookie.split('=')
    console.log(s[1])
}