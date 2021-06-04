let cartBtn = document.querySelectorAll(".addtocart");
const products = [
    {
        name: "Samsung Galaxy A7",
        tag: "samsung-galaxy-a3",
        price: "70000",
        incart: 0
    },
    {
        name: "Samsung Galaxy A3",
        tag: "samsung-galaxy-a7-2017-2",
        price: "50000",
        incart: 0
    },
    {
        name: "Samsung Galaxy S9",
        tag: "samsung-galaxy-s9",
        price: "100000",
        incart: 0
    },
    {
        name: "Samsung Galaxy S10",
        tag: "Samsung-Galaxy-S10",
        price: "200000",
        incart: 0
    },
    {
        name: "Samsung Galaxy Watch",
        tag: "samsung-galaxy-watch",
        price: "70000",
        incart: 0
    },
    {
        name: "Samsung Galaxy Active Watch",
        tag: "samsung-galaxy-watch-active",
        price: "20000",
        incart: 0
    }
]

let cartL = document.querySelector(".cartlogo_badge");
for(let i = 0; i < cartBtn.length; i++){
    cartBtn[i].addEventListener("click", ()=>{
        cartNumbers(products[i])
        cartTotal(products[i])
    })
}
function onLoad (){
    let productNum = localStorage.getItem("cartNum");
    if(productNum){
        cartL.textContent = productNum;
    }
}
function cartNumbers(product){
    let num = parseInt(localStorage.getItem("cartNum")) ;
    if(num){
        localStorage.setItem("cartNum", num + 1);
        cartL.textContent = num + 1;
    }else{
        localStorage.setItem("cartNum", 1);
        cartL.textContent = 1;
    }
    setItems(product);
}

function setItems(product){
    let cartItems = JSON.parse(localStorage.getItem("productInCart"));
    if(cartItems != null){
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].incart += 1;
    }else{
        product.incart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productInCart", JSON.stringify(cartItems));
}

function cartTotal(product){
    let total = localStorage.getItem("totalCost");
    let price = parseInt (product.price)
    if(total != null){
        total = parseInt(total);
        localStorage.setItem("totalCost", total + price);
    }else{
        localStorage.setItem("totalCost", price)
    }
}
function display(){
    let items = localStorage.getItem("productInCart");
    items = JSON.parse(items);
    let page = document.querySelector(".cart")
    let total = localStorage.getItem("totalCost");
    if(items && page){
        page.innerHTML = '';
        Object.values(items).map(item => {
            page.innerHTML += `
            <div class="cartitem" data-id=${item.tag}>
               <div class="cartitem_image">
                    <img src='${item.tag}.jpg' />
                </div>
                <p class="cartitem_name">${item.name}</p>
                <select class="cartitem_select">
                    <option value='1'>${item.incart}</option>
                </select>
                 <p class="price" >₦${item.incart * item.price},00</p>
                <ion-icon name="remove" class="cartitem_deleteBtn" class="deletebtn">X</ion-icon>
            </div>`;
        });
        page.innerHTML += `
            <div class="basketTotalContainer">
                <p class="reset cartitem_deleteBtn" onClick="window.location.reload">Reset</p>
            </div>
        `;
        document.querySelector(".total span").textContent = total;    
        let del = document.querySelectorAll(".cartitem_deleteBtn")
         del.forEach(d =>{
              d.addEventListener("click", (e)=>{
                
                // let parent = e.target.parentElement.remove();
                let id = e.target.parentElement.dataset.id
                delt(id)
             })

        })
    }
};

// for(let i = 0; i< del.length; i++){
//     del[i].addEventListener("click", ()=>{
//         delt(products[i]);
//     })
// }
function delt(id){
    let cartItems = JSON.parse(localStorage.getItem("productInCart"));
    
    let cartNum = parseInt(localStorage.getItem("cartNum"));
    
    let totalCost = parseInt(localStorage.getItem("totalCost"));
    
        //delete cartItems[product.tag];
    let itemNum =parseInt(Object.values(cartItems).filter(item => item.tag == id)[0].incart);
    
    let Price =parseInt(Object.values(cartItems).filter(item => item.tag == id)[0].price) ;
    
    cartItems = Object.values(cartItems).filter(item => item.tag !== id);
    
console.log( Price);
    totalCost = totalCost - Price;

    cartNum = cartNum - itemNum;
    
    localStorage.setItem("productInCart", JSON.stringify(cartItems));
    
    localStorage.setItem("cartNum", JSON.stringify(cartNum));
    
    localStorage.setItem("totalCost", JSON.stringify(totalCost));
    
    // console.log(newItems)
    location.reload();

}
onLoad();
display();
let dbtn = document.querySelector(".reset")
    dbtn.addEventListener("click", ()=>{
        localStorage.clear()
        location.reload();
        
    })
let deleteBtns = document.querySelectorAll(".deletebtn");