
const shopmenu = document.querySelector('.shopmenu');  // 02 商品结算列表
let nums = 1;  //默认件数
//加号
const adds = document.getElementsByClassName("add");
// 减号
const cuts = document.getElementsByClassName("cut");
// 获取件数
const number = document.getElementsByClassName("num");
const tonum = document.getElementById("tonum");
const toPrice = document.getElementById("totalprice");
const allCheck = document.getElementById("allcheck");
const inpchek = document.getElementsByClassName("inpchek");
console.log(inpchek)
// console.log(allCheck)

// 初始化页面
initalPage();
// 被动方法-计算总数总价
renderTotalNum_andTotalPrice();
// 被动方法-校验全选
checkAllCkeckBox();
// 主动方法
bindAllEvents();




// 工具函数-加法
function bindAddEvents(){
    let tempShopCart = initalShopCart_orGetShopCart();
    for(let i=0; i<adds.length;i++){
        adds[i].onclick = function(){
            tempShopCart[i].num++;
            number[i].value = tempShopCart[i].num;
            window.localStorage.setItem('shopCart',JSON.stringify(tempShopCart));
            renderTotalNum_andTotalPrice()
        }
    }
}
// 工具函数-剑法
function bindCatEvents(){
    let tempShopCart = initalShopCart_orGetShopCart();
    for(let i=0; i<cuts.length;i++){
        cuts[i].onclick = function(){
            tempShopCart[i].num--;
            if(tempShopCart[i].num<1){
                tempShopCart[i].num = 1;
            }
            number[i].value = tempShopCart[i].num;
            window.localStorage.setItem('shopCart',JSON.stringify(tempShopCart));
            renderTotalNum_andTotalPrice();
        }
    }
}
// delete
function bindDeleteBtnEvents(){
    var deletebtns = document.querySelectorAll(".shopdel");
    
    let tempShopCart = initalShopCart_orGetShopCart();
    for(let i=0; i<deletebtns.length;i++){
        deletebtns[i].onclick = function(){
            var deleterow = tempShopCart.splice(i,1);
            // console.log(deleterow);

            // deleterow[0].remove();
            window.localStorage.setItem('shopCart',JSON.stringify(tempShopCart));
            initalPage();// 重新渲染后所有都事件全都消失
            bindAllEvents();
            renderTotalNum_andTotalPrice();
            checkAllCkeckBox()
        }
    }
}
// 工具函数-复选点击
function bindCheckBoxEvents(){
    let tempShopCart = initalShopCart_orGetShopCart();
    for(let i=0; i<inpchek.length;i++){
        inpchek[i].onclick = function(){
            tempShopCart[i].check = tempShopCart[i].check== 1? 0:1;
            this.checked = tempShopCart[i].check;
            window.localStorage.setItem('shopCart',JSON.stringify(tempShopCart));
            renderTotalNum_andTotalPrice();
            checkAllCkeckBox();
        }
    }
}
// console.log(allCheck.checked)
function bindCheckAllEvents(){
    let tempShopCart = initalShopCart_orGetShopCart();
    let flag = true;
    allCheck.onclick = function(){
        if(allCheck.checked){
            for(let i=0; i<tempShopCart.length;i++){
                tempShopCart[i].check = 1;
                inpchek[i].checked = true;
                window.localStorage.setItem('shopCart',JSON.stringify(tempShopCart));
                renderTotalNum_andTotalPrice();
                checkAllCkeckBox();
            }
        }else{
            for(let i=0; i<tempShopCart.length;i++){
                tempShopCart[i].check = 0;
                inpchek[i].checked = false;
                window.localStorage.setItem('shopCart',JSON.stringify(tempShopCart));
                renderTotalNum_andTotalPrice();
                checkAllCkeckBox();
            }
        }

    }
}
function bindDeleteAllBtnEvents(){
    let tempShopCart = initalShopCart_orGetShopCart();
    const shopdelAll = document.querySelector('.shopdel-all');
    shopdelAll.onclick = function(){
        wShopCart = [];
        // console.log(tempShopCart)
        for(let i=0;i<tempShopCart.length;i++){
            if(tempShopCart[i].check == 0){
                console.log(tempShopCart[i]);
                // tempShopCart[i].splice(i,1)
                wShopCart.push(tempShopCart[i])
                console.log(wShopCart);
            }
        }
        window.localStorage.setItem('shopCart',JSON.stringify(wShopCart));
        initalPage();// 重新渲染后所有都事件全都消失
        bindAllEvents();
        renderTotalNum_andTotalPrice();
        checkAllCkeckBox()
    
    }
}
// 工具函数-主动
function bindAllEvents(){
    bindAddEvents();
    bindCatEvents();
    bindCheckBoxEvents();
    bindDeleteBtnEvents();
    bindCheckAllEvents();
    bindDeleteAllBtnEvents();
}
// 工具函数-被动-校验全选
function checkAllCkeckBox(){
    let tempShopCart = initalShopCart_orGetShopCart();
    let flag = true;
    for(let i=0; i<tempShopCart.length;i++){
        if(!tempShopCart[i].check){
            flag = false;
            break;
        }
    }
    allCheck.checked=flag
}
// 工具函数-被动-计算总数总价
function renderTotalNum_andTotalPrice(){
    // 总数
    renderTotalNum();
    // 总价
    renderTotalPrice();
}
// 工具函数-计算总数
function renderTotalNum(){
    let tempShopCart = initalShopCart_orGetShopCart();
    // 总数
    let totalNum = 0;
    for(let i=0; i<tempShopCart.length;i++){
        if(tempShopCart[i].check){
            totalNum+=tempShopCart[i].num;
        }
    }
    // 渲染
    tonum.innerHTML = totalNum
}
// 工具函数-计算总价
function renderTotalPrice(){
    let tempShopCart = initalShopCart_orGetShopCart();
    // 总数
    let totalPrice = 0;
    for(let i=0; i<tempShopCart.length;i++){
        if(tempShopCart[i].check){
            totalPrice += parseFloat(tempShopCart[i].newPrice) * tempShopCart[i].num;
        }
    }
    // 渲染
    toPrice.innerHTML = totalPrice +'元';
}
// 工具函数-初始化页面
function initalPage(){
    // 获取 仓库中的数据
    let tempShopCart = initalShopCart_orGetShopCart();
    var arr = ""

    console.log(tempShopCart[0].Img)
    for(let i=0; i<tempShopCart.length;i++){
        // 判断勾选默认状态
        var temp = "";
        if(tempShopCart[i].check == 1){
            temp = "checked"
        }
        arr += `
        <li data-pid="${tempShopCart[i].pid}">
            <div class="tops">
                <input type="checkbox" ${temp} class="inpchek">
                <img src="${tempShopCart[i].Img}" alt="">
                <div class="shop-title">
                    <div class="title-mine">${tempShopCart[i].infoTitle}</div>
                    <div class="title-small">${tempShopCart[i].infoSmallTitle}</div>
                </div>
            </div>
            <div class="price">
                <div class="old-price">原价: ${tempShopCart[i].newPrice} </div>
                <div class="new-price">现价: ${tempShopCart[i].oldPrice} </div>
            </div>
            <div class="numcump">
                <button class="cut">-</button>
                <input class="num" type="text" name="" id="" value="${tempShopCart[i].num}">
                <button class="add"> + </button>
            </div>
            <div class="shopdel">删除</div>
        </li>
        `
    }
    shopmenu.innerHTML = arr;
}

// 工具函数-购物车初始化或获取
function initalShopCart_orGetShopCart(){
    // 1.判断购物车是否存在于数据仓库
    let shopCart = window.localStorage.getItem('shopCart');
    if(shopCart == null){ // 不存在则创建
        window.localStorage.setItem('shopCart',JSON.stringify([]));
        console.log('你刚才创建了一个购物车');
        return [];
    }else{// 否则 返回当前数据
        return JSON.parse(shopCart)
    }
}