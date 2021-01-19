//厨师  服务员个数 变量
var serverNumber = 1;
var chiefNumber = 1;


//---------------------厨师------------------

var chief = (function() {
    var ourchief;

    function Chief() {
        this.cookList = [];
        this.cooked = [];
    }



    return {
        findChief: function() {
            if (!ourchief) {
                ourchief = new Chief();
                console.log("成功招募一名厨师");
                return ourchief;
            }
            return ourchief;
        },

        onWork: function() {
            console.log("厨师开始工作");
            var timeLeft = (5 - chiefNumber);
            setInterval(() => {

                if (ourchief.cookList.length > 0) {
                    show_cookingTime.innerHTML = "下一道菜剩余烹饪时间：" + timeLeft + "<br>";
                    timeLeft--;
                    if (timeLeft < 0) {
                        timeLeft = 5;
                    }
                }
            }, 1000);



            setInterval(() => {
                // if (ourchief.cookList.length > 0) {
                //     ourchief.cookList.splice(0, 1);
                //     customerList.list[0].orderList.length = 0;
                // }

                if (ourchief.cookList.length <= 0 && ourchief.cooked.length <= 0) {
                    return;
                }
                //开始处理优化后的菜单
                //烹饪好的
                ourchief.cooked = cookList(ourchief.cookList);


                //修改后的烹饪列表
                ourchief.cookList.splice(0, ourchief.cooked.length);

                //将菜送到顾客手中

                while (ourchief.cooked.length > 0) {
                    var temp = ourchief.cooked.shift();
                    //遍历顾客列表
                    var Index = 0;
                    for (let i = 0; i < customerList.list.length; i++) {
                        //遍历顾客的orderList
                        for (let j = 0; j < customerList.list[i].orderList.length; j++) {
                            if (customerList.list[i].orderList[j] == temp) {
                                customerList.list[i].orderList.splice(j, 1);
                                Index = 1;
                                break;
                            }
                        }
                        if (Index == 1) {
                            break;
                        }
                    }
                }


            }, 1000 * (5 - chiefNumber));

        },

        cook: function(orderList) {
            //ourchief.cookList.push(orderList);
            ourchief.cookList = ourchief.cookList.concat(orderList); //将菜单合并到厨师的烹饪列表

            //--------  优化菜单  ------


            ourchief.cookList = createList(ourchief.cookList);
        }
    }
})();


//-----------菜单优化 func
function createList(arr) {
    var sort = 0;
    var arr1 = arr;
    var arr2 = [];
    for (let i = 0; i < arr1.length; i++) {
        var temp = arr1[i];
        for (let j = 0; j < arr1.length; j++) {
            if (arr[j] == temp && arr[j] != 0) {
                arr2.push(arr[j]);
                arr[j] = 0;
            }
        }
    }

    return arr2;
}

//------------处理优化后的菜单  func
function cookList(arr) {
    if (arr.length <= 0) {
        return;
    }
    var arr2 = [];
    var temp = arr[0];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] != temp) {
            break;
        }
        if (arr[i] == temp) {
            arr2.push(arr[i]);
        }
    }

    return arr2;
}


//------------------ 服务员---------------------
var server = (function() {
    var ourserver;

    function Server() {
        this.list = [];
        this.pan = [];
    }

    return {
        findServer: function() {
            if (!ourserver) {
                ourserver = new Server();
                console.log("成功招募一名服务员");
                return ourserver
            };
            return ourserver;
        },

        onWork: function() {
            console.log("服务员开始工作");
            setInterval(() => {
                if (ourserver.list.length > 0) {
                    chief.cook(ourserver.list.shift());
                }
            }, 1000);
        },
        getOrder: function(orderList) {
            ourserver.list.push(orderList);
        }
    }
})();





//------------  顾客 ---------------
function Customer(order) {
    this.orderList = order;
    this.isOrdered = false;
    this.isWaiting = "等候ing";
}



//------- 顾客队列 ----

var customerList = {
    list: [],
    check: function() {
        var stay = [];
        for (let i = 0; i < customerList.list.length; i++) {
            if (customerList.list[i].orderList.length != 0) {
                stay.push(customerList.list[i]);
            }
        }

        customerList.list = stay;

        show_customerList.innerHTML = "顾客列表:" + "<br>";

        for (let j = 0; j < customerList.list.length; j++) {
            show_customerList.innerHTML += "【" + customerList.list[j].orderList + "】" + "(" + customerList.list[j].isOrdered + ")" + "---------"; //+ "<br>";
            if (j <= 2) {
                customerList.list[j].isWaiting = "就餐ing";
                show_customerList.innerHTML += "(" + customerList.list[j].isWaiting + ")" + "<br>";
            }
            if (j > 2) {
                show_customerList.innerHTML += "(" + customerList.list[j].isWaiting + ")" + "<br>";
            }
        }

        console.log(customerList.list);

    },
    order: function() {
        for (let i = 0; i < 3; i++) {
            if (customerList.list[i]) {
                if (customerList.list[i].isOrdered == false) {
                    server.getOrder(customerList.list[i].orderList);
                    customerList.list[i].isOrdered = true;
                    return;
                }
            }
        }
    }
}

//------随机顾客----
function createCustomer() {
    for (let i = 0; i < 4; i++) {
        var customer = new Customer(randomList(customerList.index));
        customerList.list.push(customer);
    }
}



//------随机时间 ------
function randomTime() {
    var time = [1000, 2000, 3000];
    return time[Math.round(Math.random() * 2)];
}

function randomCustomerNum() {
    var time = [2, 3, 4];
    return time[Math.round(Math.random() * 2)];
}

//------随机菜单 ------

function randomList() {
    var list = ["麻辣烫", "水煮鱼", "鱼香肉丝", "酸溜土豆", "火锅"];
    var newList = [];
    for (let i = 0; i < randomCustomerNum(); i++) {
        newList.push(list[Math.round(Math.random() * 4)]);
    }
    return newList;
}

//-------显示数据dom-------
var show_server = document.createElement("p");
var show_chief = document.createElement("p");
show_server.innerHTML = "服务员：" + serverNumber;
show_chief.innerHTML = "厨师：" + chiefNumber;

document.body.appendChild(show_chief);
document.body.appendChild(show_server);




var show_cookingTime = document.createElement("p");
var show_customerList = document.createElement("p");
show_cookingTime.innerHTML = "下一道菜剩余烹饪时间：" + "<br>";
show_customerList.innerHTML = "顾客列表：" + "<br>";
document.body.appendChild(show_cookingTime);
document.body.appendChild(show_customerList);

//--------- 按钮--监听事件 -----
var divs = document.querySelectorAll("div");

document.body.addEventListener("click", function(e) {
    var event = e || window.event;
    var target = event.target;

    switch (target.id) {
        case "addChief":
            if (chiefNumber >= 1 && chiefNumber < 4) {
                chiefNumber++;
                console.log("新雇佣了一个厨师" + "  " + "现在共有" + chiefNumber + "位厨师");
            }
            break;
        case "removeChief":
            if (chiefNumber > 1 && chiefNumber <= 4) {
                chiefNumber--;
                console.log("解雇了一个厨师" + "  " + "现在共有" + chiefNumber + "位厨师");
            }
            break;
        case "addServer":
            if (serverNumber >= 1 && serverNumber < 4) {
                serverNumber++;
                console.log("雇佣了一个服务员" + "  " + "现在共有" + serverNumber + "位服务员");
            }

            break;
        case "removeServer":
            if (serverNumber > 1 && serverNumber <= 4) {
                serverNumber++;
                console.log("解雇了一个服务员" + "  " + "现在共有" + serverNumber + "位服务员");
            }
            break;

    }
})




//_________________________________

chief.findChief();
chief.onWork();
server.findServer();
server.onWork();


var timer3 = setInterval(() => {
    if (customerList.list.length <= 6) {
        createCustomer();
    }

}, randomTime())


//-----每一秒  对客人队列进行检查
var time1 = setInterval(() => {
    show_server.innerHTML = "服务员：" + serverNumber;
    show_chief.innerHTML = "厨师：" + chiefNumber;
    //console.log("time1")
    customerList.check();
}, 500);



//------每秒 服务员点餐


var time2 = setInterval(() => {
    //console.log("time2")
    customerList.order();
}, 1000 * (5 - serverNumber));