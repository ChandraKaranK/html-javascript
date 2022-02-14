class FoodItem{
    constructor(name,price,id,quantity,type)
    {
        this.price=price;
        this.name = name;
        this.id=id;
        this.quantity= quantity;
        this.type=type;
    }
}


class Table{
    constructor(name,bill,totalItems,id)
    {
        this.name=name;
        this.bill=bill;
        this.totalItems=totalItems;
        this.id=id;
    }
}



let tableslist={
    1:[],
    2:[],
    3:[],
};

let prices={
    1:0,
    2:0,
    3:0
};

let totalItems={
    1:0,
    2:0,
    3:0
};

const items = [];
items.push(new FoodItem("Apple milk shake",130.00,"id1",1,"beverage"));
items.push(new FoodItem("BBQ chicken tikka",190.00,"id2",1,"starter"));
items.push(new FoodItem("Chicken Biryani",150.00,"id3",1,"main course"));
items.push(new FoodItem("Chicken schezwan fried rice",110.00,"id4",1,"fastfood"));
items.push(new FoodItem("Dal rice",100.00,"id5",1,"main course"));
items.push(new FoodItem("Egg Noodles",100.00,"id6",1,"fastfood"));
items.push(new FoodItem("Fish biryani",150.00,"id7",1,"main course"));
items.push(new FoodItem("Special milkshake",180.00,"id8",1,"beverage"));
items.push(new FoodItem("Samoli Chicken Shawarma",170.00,"id9",1,"starter"));
items.push(new FoodItem("Special Chicken soup",120.00,"id9",1,"appetizer"));
items.push(new FoodItem("Veg manchuria",90.00,"id10",1,"fastfood"));

const tables = [];
tables.push(new Table("Table 1",0,0,"table1"));
tables.push(new Table("Table 2",0,0,"table2"));
tables.push(new Table("Table 3",0,0,"table3"));


let menu = document.getElementById("menulist");
let tablemenu = document.getElementById("tablelist");
let cart = document.getElementById("cartTable");
cart.style.visibility="hidden";
let billTable = document.getElementById("billTable");
billTable.style.visibility ="hidden";



document.getElementById("bill1").innerHTML = prices[1];
document.getElementById("bill2").innerHTML = prices[2];
document.getElementById("bill3").innerHTML = prices[3];
document.getElementById("items1").innerHTML = totalItems[1];
document.getElementById("items2").innerHTML = totalItems[2];
document.getElementById("items3").innerHTML = totalItems[3];

function closeCart()
{
    cart.style.visibility = "hidden";
}

function closeBill()
{
    billTable.style.visibility ="hidden";
}


function searchMenu()
{
    let result = [];
    var html = "";
    let entry = document.getElementById("searchmenu").value;
    
    items.forEach(item => {  
       if((item.name.toUpperCase()).indexOf(entry.toUpperCase())>=0 || (item.type.toUpperCase()).indexOf(entry.toUpperCase())>=0)
            html=html+"<div class='item' id="+item.id+ " draggable='true' ondragstart='drag(event)'><p class='itemname'>"+item.name+"</p><p>"+item.price+"</p></div>";
    });
    menu.innerHTML=html;
    
}

function searchTable()
{
    let html = "";
    let entry = document.getElementById("searchtable").value;
    tables.forEach(table=> {  
        let input = entry.toUpperCase();
        let tableName = (table.name).toUpperCase();

        if(tableName.indexOf(input)>=0)
        {
            let element = document.getElementById(table.id);
            element.style.display = "block";
        }
        else
        {
            let element = document.getElementById(table.id);
            element.style.display = "none";
        }
        
    });
}


function allowDrop(event)
{
event.preventDefault();
}

function drag(event)
{
    event.dataTransfer.setData("text",event.target.id);
}

function drop(event)
{
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    let element = document.getElementById(data);
    let itemDiv = element.getElementsByTagName("p");
    let name = itemDiv[0].innerHTML;
    let price = Number(itemDiv[1].innerHTML);
    let quantity = 1;
    let tableId = event.target.id;

    let index = tableId.charAt(tableId.length-1);
  
    let i =Number.parseInt(index);

        let t = tableslist[i];
        let upper = t.length;
        if(t.length>0){
            for(let j=0; j<upper;j++)
            {
                if(t[j].name==name)
                {
                    t[j].quantity =t[j].quantity + 1;
                    break;
                }
                else{
                    tableslist[i].push({name,price,quantity});
                    break;
                }
            }
          }
          else
          {
            tableslist[i].push({name,price,quantity});
          }
    
   
    console.log(tableslist);


    
   addToTable(tableId,price,i);
   displayInputs(index);

}


function addToTable(tableId,price,i)
{
    let table = document.getElementById(tableId);
    let tableItems = table.getElementsByClassName("items");
    let html ="";
    let newBill = price + prices[i];
    let totalitems = totalItems[i]+1;
    prices[i] = newBill;
    totalItems[i] = totalitems;
    updateTable(tableId,i);

}

function updateTable(tableId,index)
{
    let table = document.getElementById(tableId);
    table.lastElementChild.innerHTML = "Rs: "+prices[index]+" | Total Items: "+totalItems[index];
}


function displayCart(tableId)
{
    let index = Number.parseInt(tableId.charAt(tableId.length-1));
    let table = tableslist[index];
   
    html = "";
    html = html + `
    <div id="heading">Order Details<span id="close" onclick="closeCart()">X</span></div>
    <div id="details"> 
    <table>
    <tr>
        <th>S.no</th>
        <th>Item</th>
        <th>Price</th>
        <th>Quantity</th>
        <th></th>
    </tr>  `;
    
     for(let i=0;i<table.length;i++)
            {
            const item = table[i];
                let serial = i+1;
                console.log(item.name,item.price);
                html = html + `<tr><td>`+serial+`</td><td>`+item.name+`</td><td>`+item.price+`</td><td><input type="number" class="qty" min="0" value="1"></td><td><img class="deleteIcon" src="deleteicon.png"></td></tr>`;
         }
         html = html + `<tr><td></td><td><td id="totalprice">Total price:0</td><td></td><td></td></tr>`;
         html = html + `<tr><td></td><td></td><td></td><td colspan="4"><input type = "submit" id="submit" value="Generate bill"></td></tr></table></div>`;
         cart.innerHTML = html;
         cart.style.visibility = "visible";
         
         displayTotal(index);

         let inputElements = document.getElementsByClassName("qty");
         for(let j=0;j<inputElements.length;j++)
         {
             let input = inputElements[j];
             input.addEventListener("input",function(){
                 let newQuantity = input.value;
                     let item = tableslist[index];
                     let old = Number.parseInt(item[j].quantity);
                     let newQ = Number.parseInt(newQuantity);
                     let diff = newQ-old;
                     console.log(diff);
                     if(diff)
                     {
                         item[j].quantity += diff;
                         prices[index] += (diff * item[j].price);
                         totalItems[index] += diff;
                         console.log(prices);
                         console.log(totalItems);
                         console.log(tableslist);
                     }
                 displayTotal(index);
                 updateTable(tableId,index);
                 displayInputs();
             });
             
         }

         let deleteElements = document.getElementsByClassName("deleteIcon");
         for(let j=0;j<deleteElements.length;j++)
         {
             let deleteElement = deleteElements[j];
             deleteElement.addEventListener("click",function(){
                let item = tableslist[index];
                let removeQuantity = item[j].quantity;
                let removePrice = item[j].price*removeQuantity;
                item[j].quantity = 0;
                prices[index]-=removePrice;
                totalItems[index]-=removeQuantity;
                tableslist[index].splice(j,j+1);
                updateTable(tableId,index);
                displayCart(tableId);
            });
        }

        let submit = document.getElementById("submit");
        submit.addEventListener("click",function()
        {
            cart.style.visibility = "hidden";
            html = "";
            html = html + `
            <div id="heading">Bill<span id="close" onclick="closeBill()">X</span></div>
            <div id="details"> 
            <table id="bill">
            <tr>
                <th>S.no</th>
                <th>Item</th>
                <th>ItemPrice(per 1)</th>
                <th>Quantity</th>
                <th>Price</th>
            </tr>  `;
            
             for(let i=0;i<table.length;i++)
                    {
                    const item = table[i];
                        let serial = i+1;
                        console.log(item.name,item.price);
                        html = html + `<tr><td>`+serial+`</td><td>`+item.name+`</td><td>`+item.price+`</td><td>`+item.quantity+`</td><td>`+item.price*item.quantity+`</td></tr>`;
                 }
                 html = html + `<tr><td></td><td></td><td id="totalbill">Bill amount to be paid:0</td><td></td><td></td></tr>`;
                 html = html + `<tr><td></td><td style="font-size:25px;"><b>Thank you!..Hope you liked our service</b></td><td></td><td></td></tr></table></div>`;
                 billTable.innerHTML = html;
                 billTable.style.visibility = "visible";
                 displayBill(index);
                 prices[index]=0;
                 totalItems[index]=0;
                 updateTable(tableId,index);
                 tableslist[index]=[];
                
        });
         displayInputs(index);
         console.log(tableslist);

}

function displayTotal(index)
{
    let total = document.getElementById("totalprice");
    total.innerHTML = "Total Price:"+prices[index];
}

function displayBill(index)
{
    let total = document.getElementById("totalbill");
    total.innerHTML = "Total bill to be paid:"+prices[index];
}

function displayInputs(index)
{
    let table = tableslist[index];
    let inputElements = document.getElementsByClassName("qty");
    for(let i=0;i<inputElements.length;i++)
    {
        let input = inputElements[i];
        input.value = tableslist[index][i].quantity;
    }

}



