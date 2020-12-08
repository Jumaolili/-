var Restaurant = (function () {
    var ourRestaurant = null;
    function CreateRestaurant() {
        this.money = 0;

        console.log("餐厅搭建成功");
    };

    CreateRestaurant.prototype = {
        constructor: CreateRestaurant,
        makeMoney: function (args) {
            this.money += args;
            if (!showMoney) {
                var showMoney = document.createElement("p");
                showMoney.innerHTML = "Money:" + args;
                document.body.appendChild(showMoney);
            } else {
                showMoney.innerHTML = "Money:" + args; 
            }
        }
    };

    return {
        findRestaurant: function () {
            if (!ourRestaurant) {
                ourRestaurant = new CreateRestaurant();
            }
            return ourRestaurant;
        },

        getMoney: function (args) {
            console.log("收入钱款:" + args);
            ourRestaurant.makeMoney(args);
        }
    }
})();


//雇佣一名厨师
var Chief = (function () {
    var ourChief = null;
    function CreateChief() {
        this.cookList = [];   //需要烹饪的空菜单

        console.log("我们成功雇佣了一个厨师");
    };
    CreateChief.prototype = {
        constructor: CreateChief,
        cook: function () {   //厨师烹饪的方法
            //创建厨师状态
            var item = [];  
            for (let i = 0; i < this.cookList.length; i++) {
                item.push(this.cookList[i].item);
            }
            var leftList = document.createElement("p");
            leftList.innerHTML = "(忙碌)剩余烹饪列表：" + item;
            div.appendChild(leftList);
            
            var time = [];
            for (let i = 0; i < ourChief.cookList.length; i++) {
                time.push(ourChief.cookList[i].time);
            }

            var num = 0;
            var trueTime = time.map(a => {
                
                if (num == 0) {
                    num++;
                    return a;
                }
                
                var sum = 0;
                for (let i = 0; i <= num; i++) {
                    sum += time[i];
                }
                num++;
                return sum;
            })
            //console.log(trueTime);




            var index = 0;
            var point = 0;
            var cook = setInterval(function () {
                point++;
                if (trueTime[0]) {
                    if (point == trueTime[0]) {
                        balls[2].velX = 5;
                        Server.sendOrder(ourChief.cookList[0].item)
                        index++;
                        item.shift();
                        leftList.innerHTML = "(忙碌)剩余烹饪列表：" + item;
                    }
                }
                if (trueTime[1]) {
                    if (point == trueTime[1]) {
                        balls[2].velX = 5;
                        Server.sendOrder(ourChief.cookList[1].item)
                        index++;
                        item.shift();
                        leftList.innerHTML = "(忙碌)剩余烹饪列表：" + item;
                    }
                }
                if (trueTime[2]) {
                    if (point == trueTime[2]) {
                        balls[2].velX = 5;
                        Server.sendOrder(ourChief.cookList[2].item)
                        index++;
                        item.shift();
                        leftList.innerHTML = "(忙碌)剩余烹饪列表：" + item;
                    }
                }
                if (trueTime[3]) {
                    if (point == trueTime[3]) {
                        balls[2].velX = 5;
                        Server.sendOrder(ourChief.cookList[3].item)
                        index++;
                        item.shift();
                        leftList.innerHTML = "(忙碌)剩余烹饪列表：" + item;
                    }
                }
                if (trueTime[4]) {
                    if (point == trueTime[4]) {
                        balls[2].velX = 5;
                        Server.sendOrder(ourChief.cookList[4].item)
                        index++;
                        item.shift();
                        leftList.innerHTML = "(忙碌)剩余烹饪列表：" + item;
                    }
                }
                if (trueTime[5]) {
                    if (point == trueTime[5]) {
                        balls[2].velX = 5;
                        Server.sendOrder(ourChief.cookList[5].item)
                        index++;
                        item.shift();
                        leftList.innerHTML = "(忙碌)剩余烹饪列表：" + item;
                    }
                }

            }, 1000);

            var check = setInterval(function () {
                if (item.length == 0) {
                    leftList.innerHTML=leftList.innerHTML.replace("忙碌", "空闲");
                }
                
                if (index == ourChief.cookList.length) {
                    clearInterval(cook);
                }
            }, 1000);
            
        }
    }

    return {                    //厨师的全局方法
        name: "John Cook",

        findChief: function () {
            if (!ourChief) {
                ourChief = new CreateChief();
            }
            return ourChief;
        },

        getOrder: function (args) {
            ourChief.cookList = args;
            console.log("厨师已经收到服务员送的菜单--烹饪ing.....");
            console.log(ourChief.cookList);
            ourChief.cook();
        },

        whetherBusy: function () {
            if (ourChief.cookList.length > 0) {
                return true;
            }
        }
    }

})();

//雇佣一名服务生
var Server = (function () {
    var ourServer = null;
    function CreateServer() {
        this.orderList = [];   //由顾客点的菜单
        this.pan = [];   //盘子
        console.log("我们成功雇佣了一个服务生");
    };
    CreateServer.prototype = {
        constructor: CreateServer,
        send: function () {
            console.log("已经传达给厨师了");
            Chief.getOrder(this.orderList);
        }
    }

    return {
        name: "Millie Server",

        findServer: function () {
            if (!ourServer) {
                ourServer = new CreateServer();
            }
            return ourServer;
        },

        //接受菜单
        getOrder: function (args) {
            console.log("服务员已经收到订餐");
            ourServer.orderList = args;
            

            //接受订单后，立刻传订单给厨师


            ourServer.send()
        },
        sendOrder: function (args) {
            console.log("配送完成：" + args);
            ourServer.pan = args;
            Customer.getOrder(args);
           
            ourServer.pan = "";
        }

    }

})();

//生成客人
var Customer = (function () {
    var ourCustomer = null;
    function CreateCustomer() {
        this.list = [];    //订单
        this.pan = [];  //盘子
        console.log("我们有客人啦");
    };
    CreateCustomer.prototype = {
        constructor: CreateCustomer,
        order: function () {
            console.log("客人点菜了,订单是：" + this.list);
            balls[2].velX = 5; //现在送订单
            Server.getOrder(this.list);
        }
    }

    return {
        name: "Me",

        findCustomer: function () {
            if (!ourCustomer) {
                ourCustomer = new CreateCustomer();
            }
            return ourCustomer;
        },
        Iorder: function () {
            ourCustomer.list = randomOrder();

            ourCustomer.order();
        },

        check: function () {
            return true;
        },

        getOrder: function (args) {
            ourCustomer.pan.push(args);
            if (ourCustomer.pan.length == ourCustomer.list.length) {
                var customer_eat = document.createElement("p");
                customer_eat.innerHTML = "顾客正在吃.." +  ourCustomer.pan.length;
                div.appendChild(customer_eat);
                var point =  ourCustomer.pan.length;
                var timer = setInterval(function () {
                    point--;
                    customer_eat.innerHTML = customer_eat.innerHTML.replace(/\d+/g, point);
                }, 1000);
                setTimeout(function () {
                    clearInterval(timer);
                    console.log("客人吃完了...");
                    balls[2].velX = 5;  //去结账


                    var money = 0;
                    for (let i = 0; i < ourCustomer.list.length; i++) {
                        money += ourCustomer.list[i].price;
                    }
                    Restaurant.getMoney(money);
                }, ourCustomer.pan.length * 1000);
            }
        }
    }

})();

//随机菜单
function randomOrder() {
    //菜单
    var recipe = [
        {
            item: "肉末茄子",
            price: 10,
            time: 2
        },
        {
            item: "水煮鱼",
            price: 15,
            time: 3
        },
        {
            item: "麻辣烫",
            price: 20,
            time: 4
        },
        {
            item: "鱼香肉丝",
            price: 20,
            time: 4
        },
        {

            item: "烤鸭",
            price: 20,
            time: 5
        }];
    var len = recipe.length;
    var num = Math.round(Math.random() * len) + 1;
    var order = [];
    for (let i = 0; i < num; i++) {
        order.push(recipe[Math.floor(Math.random() * len)]);
    }
    return order;
}




function cook(time) {
    var cook_i = time;
    var p_cook = document.createElement("p");
    p_cook.innerHTML = "cook:" + cook_i;
    div.appendChild(p_cook);
    var timer = setInterval(function () {
        cook_i--;
        p_cook.innerHTML = "cook:" + cook_i;
    }, 1000);
    setTimeout(function () {
        clearInterval(timer);
    }, time*1000);

}

Chief.findChief();
Server.findServer();
Customer.findCustomer();
Restaurant.findRestaurant();


//canvas绘制<<<<<<
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width = 450;
const height = canvas.height = 40;





function Ball(x, y, velX, size, color) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.size = size;
    this.color = color;
}
Ball.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}
Ball.prototype.update = function () {
    this.x += this.velX;
}

Ball.prototype.update1 = function () {
    for (let i = 0; i < balls.length; i++) {
        if (this !== balls[i]) {
            const dx = this.x - balls[i].x;
            const dy = this.y - balls[i].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < (this.size + balls[i].size)) {
                this.velX = -this.velX;
                if (balls[i] == balls[0]) {
                    if (Chief.whetherBusy()) {
                        balls[2].velX = 0;
                    }
                    
                }
                
            };
            
        }
    }
}

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].update1();
    }

    requestAnimationFrame(loop);
}

var balls = [];


balls.push(new Ball(50, 20, 0, 20, "blue"));
balls.push(new Ball(250, 20, 0, 20, "red"));
balls.push(new Ball(210, 20, 0, 20, "yellow")) //3 balls[2]

loop();
//canvas<<<<<<<

var div = document.querySelector("div");

var pro_customer_order = new Promise(function (resolve, reject) {
    var order_time = 3;
    var order_p = document.createElement("p");
    order_p.innerHTML = "customer_order:" + order_time;
    div.appendChild(order_p);
    var timer = setInterval(function () {
        order_time--;
        order_p.innerHTML = "customer_order:" + order_time;
    }, 1000);
    setTimeout(function () {
        clearInterval(timer);
        resolve();
    }, 3000);
});

pro_customer_order.then(function () {
    Customer.Iorder();
})




