var chiefCreate = (function () {
    var ourChief = null;
    //类： chief
    function Chief() {
        this.list = "none";
        
        console.log("已经成功招募一名厨师");
    };
    Chief.prototype = {
        constructor: Chief,
        cook: function (args) {
            this.list = args;
            //传值给server

            console.log("已经完成烹饪：" + this.list);
            //服务生的盘子要装菜
            serverCreate.getCooked(this.list);


            this.list = "none";

        }
    }

    return {
        name: "Chief",

        findChief: function (args) {
            if (!ourChief) {
                ourChief = new Chief(args);
            }
            return ourChief;
        },

        cookChief: function (args) {
            if (!ourChief) {
                console.log("我们还没有招募厨师，请先findChief");
                return;
            }
            //厨师去做菜
            ourChief.cook(args);
        }
    }
})();

//chiefCreate.findChief();
//chiefCreate.cookChief("鱼香肉丝");

var serverCreate = (function () {
    //创建单例
    var ourServer = null;
    //类
    function Server() {
        this.panzi = "none";
        this.orderList = "none";
        console.log("已经成功招募一名服务员");
    }
    Server.prototype = {
        constructor: Server,
        order: function (order) {
            this.orderList = order;
            console.log("服务员已经收到点单啦,点单为：" + this.orderList);
        },
        call: function () {
            //告诉厨师
            console.log("已通知厨师烹饪ing");
            chiefCreate.cookChief(this.orderList); 
            this.orderList = "none";
        },
        send: function (args) {
            this.panzi = args;
            console.log("服务员正在端菜，菜名：" + args);
            //送给顾客
            consumerCreate.getCooked(this.panzi);

            this.panzi = "none";
            console.log("送餐结束");
        }
    };

    return {
        name: "Server",
        findServer: function () {
            if (!ourServer) {
                ourServer = new Server();
            }
            return ourServer;
        },

        getOrder: function (order) {
            ourServer.order(order);
            ourServer.call();
        },
        getCooked: function (args) {
            ourServer.send(args);
        }
    }

})();
//chiefCreate.findChief();
//serverCreate.findServer();
//serverCreate.getOrder("鱼香肉丝");

 
var consumerCreate = (function () {
    //创造单例
    var ourConsumer = null;
    //类
    function Consumer(args) {
        this.want = args;
        this.eating = "none";
        console.log("来了个顾客，想吃：" + this.want);
    }
    Consumer.prototype = {
        constructor: Consumer,
        order: function () {
            console.log("已经向服务员点餐，点餐：" + this.want);
            serverCreate.getOrder(this.want);
        },
        eat: function (args) {
            this.eating = args;
            console.log("顾客取到餐了，正在吃" + this.eating);
            //客人离开了
            ourConsumer = null;
            console.log("顾客满意地离开了");
            return;
        }
    }

    return {
        name: "consumer",
        findConsumer: function (args) {
            if (!ourConsumer) {
                ourConsumer = new Consumer(args);
                
            }
            return ourConsumer;
        },
        order: function () {
            ourConsumer.order();

        },
        getCooked: function (args) {
            ourConsumer.eat(args);
        }
    }
})();

//chiefCreate.findChief();
//serverCreate.findServer();
//consumerCreate.findConsumer("鱼香肉丝");
//consumerCreate.order();





//随机点菜
function randomOrder() {
    //菜单
    var recipe = [
        {
            item: "肉末茄子",
            price: 10
        },
        {
            item: "水煮鱼",
            price: 15
        },
        {
            item: "麻辣烫",
            price: 20
        },
        {
            item: "鱼香肉丝",
            price: 20

        },
        {

            item: "烤鸭",
            price: 20
        }];
    var len = recipe.length;
    return recipe[Math.round(Math.random() * len)];  //返回一个obj
}


//预先创建一个顾客队列
var customerArr = [];

function createArr(num) {
    var arr = [];
    for (let i = 0; i < num; i++) {
        arr.push(randomOrder())
    }
    return arr;
}


//预先创造队列

customerArr = createArr(5);

for (let i = 0; i < customerArr.length; i++) {
    chiefCreate.findChief();
    serverCreate.findServer();
    consumerCreate.findConsumer(customerArr[i].item);
    consumerCreate.order();
}
