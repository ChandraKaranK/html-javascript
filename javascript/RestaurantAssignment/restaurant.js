class FoodItem{
    constructor(name,price,id)
    {
        this.price=price;
        this.name = name;
        this.id=id;
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
items.push(new FoodItem("Apple milk shake",130.00,"id1"));
items.push(new FoodItem("BBQ chicken tikka",190.00,"id2"));
items.push(new FoodItem("Chicken Biryani",150.00,"id3"));
items.push(new FoodItem("Chicken schezwan fried rice",110.00,"id4"));
items.push(new FoodItem("Dal rice",100.00,"id5"));
items.push(new FoodItem("Egg Noodles",100.00,"id6"));
items.push(new FoodItem("Fish biryani",150.00,"id7"));
items.push(new FoodItem("Special milkshake",180.00,"id8"));
items.push(new FoodItem("Samoli Chicken Shawarma",170.00,"id9"));
items.push(new FoodItem("Special Chicken soup",120.00,"id9"));
items.push(new FoodItem("Veg manchuria",90.00,"id10"));

const tables = [];
tables.push(new Table("Table 1",0,0,"table1"));
tables.push(new Table("Table 2",0,0,"table2"));
tables.push(new Table("Table 3",0,0,"table3"));


let menu = document.getElementById("menulist");
let tablemenu = document.getElementById("tablelist");

document.getElementById("bill1").innerHTML = prices[1];
document.getElementById("bill2").innerHTML = prices[2];
document.getElementById("bill3").innerHTML = prices[3];
document.getElementById("items1").innerHTML = totalItems[1];
document.getElementById("items2").innerHTML = totalItems[2];
document.getElementById("items3").innerHTML = totalItems[3];


function searchMenu()
{
    let result = [];
    var html = "";
    let entry = document.getElementById("searchmenu").value;
    items.forEach(item => {  
       if((item.name.toUpperCase()).indexOf(entry.toUpperCase())>=0)
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

    //    if(tableName.indexOf(input)>=0){
    //         let tableIndex = table.id.charAt((table.id).length-1);
    //         console.log("index is "+tableIndex);
    //         let index = Number.parseInt(tableIndex);
    //         html=html+`<div class="table" id="`+table.id+`"ondrop="drop(event)" ondragover="allowDrop(event)>
    //                  <p class="tablename"><b>`+table.name+`</b></p>
    //                  <p class="items">Rs:`+ prices[index] +`| Total items: `+totalItems[index]+`</p>
    //                  </div>`;}
    
    // });
    //tablemenu.innerHTML=html;


        if(tableName.indexOf(input)>=0)
        {
            let element = document.getElementById(table.id);
            element.style.visibility = "visible";
        }
        else
        {
            let element = document.getElementById(table.id);
            element.style.visibility = "hidden";
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

    let tableId = event.target.id;
    console.log(tableId);
    let index = tableId.charAt(tableId.length-1);
    console.log(index);
    console.log("hiii");
    let i =Number.parseInt(index);
    tableslist[i].push({name,price});
    console.log(tableslist);
    
   addToTable(tableId,price,i);

}


function addToTable(tableId,price,i)
{
    let table = document.getElementById(tableId);
    let tableItems = table.getElementsByClassName("items");
    console.log(tableItems);
    let html ="";
    let newBill = price + prices[i];
    let totalitems = totalItems[i]+1;
    prices[i] = newBill;
    totalItems[i] = totalitems;
    html=html+`Rs: `+newBill+ ` | Total items: `+totalitems+`</p>`;
    table.lastElementChild.innerHTML = html; ;

}

function displayCart(element)
{
    let tableId = element.id;
    let index = Number.parseInt(tableId.charAt(tableId.length-1));
    let bill = prices[index];
    let numberOfItems = totalItems[index];
    console.log(bill,numberOfItems);
    let table = tableslist[index];
    // console.log(table[0].name,table[0].price);
    // console.log(table[1].name,table[1].price);
    for(let i=0;i<table.length;i++)
    {
        const item = table[i];
        console.log(item.name,item.price);
    }
    
}