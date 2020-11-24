var restaurant = new Restaurant(10000, 30);



// 创建餐厅
function Restaurant(asset, seat) {
    this.asset = asset;
    this.seat = new Array(seat);
    this.staffs = [];
    this.index = 0; //订单号
}

// 餐厅的 方法
Restaurant.prototype.hire = function (staff) {   //雇佣员工
    let inform = {};  //填信息
    for (let k in staff) {
        inform[k] = staff[k];
    }
    (this.staffs).push(inform);
}
Restaurant.prototype.fire = function (staff) {  //解雇员工
    var index;
    for (let i = 0; i < this.staffs.length; i++) {  
        if (staff.id == this.staffs[i].id) {
            index = i;
        }
    }
    this.staffs.splice(index, 1);
}
Restaurant.prototype.open = function () {
    this.index = 0;
}


//员工
function Staff(id,name,job,salary) {
    this.id = id;
    this.name = name;
    this.job = job;
    this.salary = salary;
}

////员工的方法
//Staff.prototype.work = function () {

//}


//员工--服务员
function Server(id, name, salary) {
    Staff.call(this, id, name, "server", salary);
    this.note = [];
    this.isBusy = false;
}
Server.prototype.isBusy = function () {   //服务员是否忙碌 检测
    this.isBusy = (this.note.length > 0) ? true : false;
    if (this.isBusy == true) {
        this.informChief();   //一旦变忙 传菜单给厨师
    }
    this.isBusy = false;
}

Server.prototype.serve = function (consumer_index) {
    var obj = {
        consumer_index: consumer_index
    }
    restaurant.seat[consumer_index]
}

Server.prototype.informChief = function () {  //服务员传菜单给厨师
    if (this.note.length > 0) {
        //找空闲的厨师
        for (let i = 0; i < restaurant.staffs.length; i++) {
            if (restaurant.staffs[i].job == "chief") {
                //给“空闲的”厨师菜单
                if (restaurant.staffs[i].isBusy == false) {
                    for (let i = 0; i < this.note.length; i++) {
                        restaurant.staffs[i].cookList.push(this.note[i]);
                    }
                    restaurant.staffs[i].isBusy();   //使厨师变忙
                }
            }
        }
    }
}





//员工--厨师
function Chief(id, name, job, salary) {
    Staff.call(this, id, name, "chief", salary);
    this.isBusy = false;
    this.cookList = [];
}
Chief.prototype.isBusy = function () {
    if (this.cookList.length > 0) {
        this.isBusy = true;
        //传菜
        for (let i = 0; i < restaurant.seat.length; i++) {
            if (restaurant.seat[i].index == this.cookList[this.cookList.length - 1]) {
                for (let i = 0; i < this.cookList.length - 1; i++) {

                }
            }
        }
        this.isBusy = false;
    }
}



//顾客
function Consumer(name,money, want) {
    this.name = name;
    this.index = null;
    this.money = money;
    this.want = want;
    this.eat = [];

}
Consumer.prototype.order = function (order) {
    //找服务员,餐馆里的
    for (let i = 0; i < restaurant.staffs.length; i++) {
        if (restaurant.staffs[i].job == "server") {
            //给“空闲的”服务员
            if (restaurant.staffs[i].isBusy == false) {
                
                this.index = restaurant.index;   //是顾客获得一个订单号

                restaurant.seat[this.index] = this;//录入restaurant的seat


                restaurant.index++;                //餐厅订单号更新
                restaurant.staffs[i].note.push(order);
                restaurant.staffs[i].note.push(this.index);
                restaurant.staffs[i].isBusy();   //使服务员变忙
                
            }
        }
    }
}


//餐品
function List(name, cookCost, price) {
    this.name = name;
    this.cookCost = cookCost;
    this.price = price;
}


