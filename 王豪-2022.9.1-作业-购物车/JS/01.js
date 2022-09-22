var data = {
    Img:['xm1.jpg','xm2.jpg','xm3.jpg','xm4.jpg','xm5.jpg','xm6.jpg'],
    infoTitle:['粉色滑板车 你值得拥有','卡死顶机器人 给你一个机','大学生童话手表','小学生神器,跑得快','小学生神器2,跑得快','印象低音炮'],
    infoSmallTitle:['一体化设计 符合大学生玩法','绝对给你卡死','麻麻再也不用担心走丢了','对于小学生来说刚刚好','对于小学生来说刚刚好2','白色无污染'],
    newPrice:['100','200','400','25.5','444','23.5'],
    oldPrice:['1212','1213','2002','2345','999','3375'],
    num:['1','1','1','1','1','1 ']
}

const shopList = document.querySelector('#shopList');  // 01 商品列表

// 初始化页面
initalPage();
// 购物车初始化
initalShopCart_orGetShopCart();
// 给按钮添加点击事件
bindEvents();




// 工具函数-绑定按钮的点击事件
function bindEvents(){
    // 获取所有btn
    const bybtn = document.querySelectorAll(".bybtn");
    // 循环绑定
    for(let i=0; i<bybtn.length;i++){
        bybtn[i].onclick = function(){
            // 点击获得对应的商品信息,能构成一个对象结构
            let tempObj = {
                pid:i,
                Img:this.parentNode.previousElementSibling.src,
                infoTitle:this.parentNode.querySelector(".info-title").innerHTML,
                infoSmallTitle:this.parentNode.querySelector(".info-smalltitle").innerHTML,
                newPrice:this.parentNode.querySelector(".new-price").innerHTML,
                oldPrice:this.parentNode.querySelector(".old-price").innerHTML,
                num:1,
                check:1
            }
            // 重新获取购物车数据
            let tempShopCart = initalShopCart_orGetShopCart();
            // 判断 当前对象 是否存在于数据仓库  存在 num++ 不存在则添加
            if(!checkIf_tempObj_existIn_tempShopCart(tempObj, tempShopCart)){ // 把商品对象存入数组
                tempShopCart.push(tempObj);
            }
            // 更新购物车数据 至 数据仓库
            window.localStorage.setItem('shopCart',JSON.stringify(tempShopCart))
            
        }
    }
}
// 工具函数-点击商品是否存在购物车数组
function checkIf_tempObj_existIn_tempShopCart(_tempObj, _tempShopCart){
    let flag = false; // 状态守卫
    for(let i=0; i<_tempShopCart.length;i++){
        if(_tempShopCart[i].pid == _tempObj.pid){
            flag = true;
            //满足则直接给num+1
            _tempShopCart[i].num++;
            break;
        }
    }
    return flag;
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
// 工具函数-创建数据列表
function initalPage(){
    var arr = ''
    for(let i=0; i<data.Img.length;i++){
        arr += `
        <li>
            <img src="../imgs/${data.Img[i]}" alt="">
            <div class="information-box">
                <div class="info-title">${data.infoTitle[i]}</div>
                <div class="info-smalltitle">${data.infoSmallTitle[i]}</div>
                <div class="price">
                <span class="new-price">${data.newPrice[i]}元</span>
                <del class="old-price">${data.oldPrice[i]}元</del>
                </div>
                <div class="bybtn">立即购买</div>
            </div>
        </li>`
    }
    // 将所有内容添加至页面
    shopList.innerHTML=arr;
}

