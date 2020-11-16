let sourceData = [{
    product: "手机",
    region: "华东",
    sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
}, {
    product: "手机",
    region: "华北",
    sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
}, {
    product: "手机",
    region: "华南",
    sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
}, {
    product: "笔记本",
    region: "华东",
    sale: [50, 60, 80, 110, 30, 20, 70, 30, 420, 30, 20, 20]
}, {
    product: "笔记本",
    region: "华北",
    sale: [30, 35, 50, 70, 20, 15, 30, 50, 710, 130, 20, 20]
}, {
    product: "笔记本",
    region: "华南",
    sale: [80, 120, 130, 140, 70, 75, 120, 90, 550, 120, 110, 100]
}, {
    product: "智能音箱",
    region: "华东",
    sale: [10, 30, 4, 5, 6, 5, 4, 5, 6, 5, 5, 25]
}, {
    product: "智能音箱",
    region: "华北",
    sale: [15, 50, 15, 15, 12, 11, 11, 12, 12, 14, 12, 40]
}, {
    product: "智能音箱",
    region: "华南",
    sale: [10, 40, 10, 6, 5, 6, 8, 6, 6, 6, 7, 26]
}];





var div = document.getElementById("table-wrapper") //table即将渲染到的父节点
var dataList = [];     //得到需要渲染的数据
var input = document.querySelectorAll("input"); // 0-3 region  (4) ; 5-7 product (8)  //先获取的页面上的input
var productList = [],                                                                 //后来创建的input不会被捕捉      
    regionList = [];
var btn_save = document.getElementById("save");



for (let i = 0; i < sourceData.length; i++) {  //为每一组数据 写一个index来区别和定位
    sourceData[i].data_index = i; 
}



for (let i = 0; i < input.length; i++) {
    input[i].index = i;
}

for (let i = 0; i < input.length; i++) {
    input[i].addEventListener("click", input_click, false);
    input[i].addEventListener("change", GetList, false);
}

localStorage.setItem("sourceData", JSON.stringify(sourceData));//将原先数据存入

GetList();  //页面一开始就要有数据

btn_save.addEventListener("click", Save, false);//为save按钮添加响应事件




 //保存数据到localStorage
function Save() {
    var num = 0;
    var index;
    var inputs = document.querySelectorAll(".sale_data"),
        data_sale = [];  //每12个input作为一组数据

    var rows = document.getElementsByTagName("tr"),
        data_index = [];  //获取 每12个为一组的数据 的index


    for (let i = 1; i < rows.length; i++) {
        data_index.push(rows[i].lastChild.innerHTML);
    }

    

    for (let i = 0; i < inputs.length; i++) {
        
        data_sale.push(inputs[i].value);
        if (inputs[i].value == "") {
            inputs[i].style.backgroundColor = "yellow";

        }
        if (inputs[i].value != "") {
            inputs[i].style.backgroundColor = "white";
        }
        if (data_sale.length == 12) {

            //12个数为一组的数据 写入 
            index = data_index[num];
            num++;

            var obj = JSON.parse(localStorage.getItem("sourceData"));

            for (let i = 0; i < obj.length; i++) {
                if (Number(obj[i].data_index) == Number(index)) {

                    obj[i].sale = data_sale;
                    break;
                }
            }
           

            localStorage.setItem("sourceData", JSON.stringify(obj));

            console.log("yes, you have reset data");


            // 清理data_sale以便下次循环写入
            data_sale = [];
        }
    }
}






function GetList() {
    productList = [],  //再次渲染前清空之前的获取内容
        regionList = [],
        dataList = [];

    div.innerHTML = ""; //再次渲染前清空之前的渲染内容

    for (let i = 0; i < input.length; i++) {
        if (i == 4 || i == 8) {
            continue;
        }
        if (input[i].checked == true && i < 4) {
            regionList.push(input[i].value);
        }
        if (input[i].checked == true && i > 4) {
            productList.push(input[i].value);
        }
    }

    var localData = JSON.parse(localStorage.getItem("sourceData"));
    if (localData) {

        console.log("Yes , it has data");

        localData.forEach((item) => {
            for (let i = 0; i < regionList.length; i++) {
                var index = i;
                for (let j = 0; j < productList.length; j++) {
                    if (item.region == regionList[index] && item.product == productList[j]) {
                        dataList.push(item);
                    }
                }
            }
        })
    } else {
        console.log("sorry, it doesn't have data");
        localData.forEach((item) => {
            for (let i = 0; i < regionList.length; i++) {
                var index = i;
                for (let j = 0; j < productList.length; j++) {
                    if (item.region == regionList[index] && item.product == productList[j]) {
                        dataList.push(item);
                    }
                }
            }
        })
    }
    //console.log(dataList);
    showTable(dataList);

}






function isAllChecked(arguments) {  //是否全被选择了

    if (arguments.length == 1) {  //由全选按钮触发

        var num = 0;  //没有被checked的个数
        if (arguments[0] == "all_1") {
            for (let i = 0; i < 4; i++) {
                if (input[i].checked != true) {
                    num++;
                }
            }

            if (num == 0) {
                return true;
            } else {
                return false;
            }
        }
        if (arguments[0] == "all_2") {
            for (let i = 5; i < 8; i++) {
                if (input[i].checked != true) {
                    num++;
                }
            }
            if (num == 0) {
                return true;
            } else {
                return false;
            }
        }
    }


    if (arguments.length == 2) {  //由普通按钮触发

        var num = 0;  //没有被checked的个数

        if (arguments[0] == 0) {

            for (let i = 0; i < 4; i++) {

                if (input[i].checked != true) {
                    num++;
                }
            }

            if (num == 4) {
                return "none";   //一个都没有选择
            }

            if (num == 0) {
                return true; //都checked了
            } else {

                return false; //存在没有check的项
            }
        }
        if (arguments[0] == 5) {

            for (let i = 5; i < 8; i++) {

                if (input[i].checked != true) {
                    num++;
                }
            }
            if (num == 3) {
                return "none";   //一个都没有选择
            }

            if (num == 0) {
                return true; //都checked了nxgd
            } else {

                return false; //存在没有check的项
            }
        }
    }
}



function input_click() {
    // 全选 按钮
    if (this.value == "all_1") {
        if (!isAllChecked(this.value)) {
            for (let i = 0; i < 4; i++) {
                input[i].checked = true;
            }
            input[4].disabled = true;
            return;

        }
    }
    if (this.value == "all_2") {
        if (!isAllChecked(this.value)) {
            for (let i = 5; i < 8; i++) {
                input[i].checked = true;
            }
            input[8].disabled = true;
            return;
        }

    }

    //普通 按钮
    if (this.index >= 0 && this.index < 4) {
        //检测是否全选

        if (!isAllChecked([0, 4])) {

            input[4].disabled = false;
            input[4].checked = false;

        }
        if (isAllChecked([0, 4]) == "none") {
            this.checked = true;
        }
    }

    if (this.index > 4 && this.index <= 7) {
        if (!isAllChecked([5, 8])) {

            input[8].disabled = false;
            input[8].checked = false;

        }
        if (isAllChecked([5, 8]) == "none") {
            this.checked = true;
        }
    }
}



function showTable(dataList) {  //(渲染模块)
    //表头渲染
    var table = document.createElement("table");
    div.appendChild(table);
    var header = table.createTHead();
    var header_row = header.insertRow(0);
    if (regionList.length == 1 && productList.length > 1) {
        header_row.insertCell(0).appendChild(document.createTextNode("地区"));
        header_row.insertCell(1).appendChild(document.createTextNode("商品"));
    } else if (productList.length == 1 && regionList.length > 1) {
        header_row.insertCell(0).appendChild(document.createTextNode("商品"));
        header_row.insertCell(1).appendChild(document.createTextNode("地区"));
    } else if (productList.length == 1 && regionList.length == 1) {
        header_row.insertCell(0).appendChild(document.createTextNode("商品"));
        header_row.insertCell(1).appendChild(document.createTextNode("地区"));
    } else if (productList.length > 1 && regionList.length > 1) {
        header_row.insertCell(0).appendChild(document.createTextNode("商品"));
        header_row.insertCell(1).appendChild(document.createTextNode("地区"));
    }


    for (let i = 1; i <= 12; i++) {
        header_row.insertCell(-1).appendChild(document.createTextNode(i+"月"));
    }
    header_row.insertCell(-1).appendChild(document.createTextNode("data_index"));


    //dataList渲染
    dataList.forEach((item) => {   //地区，商品
        var sale = item.sale;   
        var row_num = -1;
        var data_index = item.data_index;
        var content_row = header.insertRow(row_num);
        if (regionList.length == 1 && productList.length > 1) {
            content_row.insertCell(0).appendChild(document.createTextNode(item.region));
            content_row.insertCell(1).appendChild(document.createTextNode(item.product));  
        } else if (productList.length == 1 && regionList.length > 1) {
            content_row.insertCell(0).appendChild(document.createTextNode(item.product));
            content_row.insertCell(1).appendChild(document.createTextNode(item.region));
        } else if (productList.length == 1 && regionList.length == 1) {
            content_row.insertCell(0).appendChild(document.createTextNode(item.product));
            content_row.insertCell(1).appendChild(document.createTextNode(item.region));
        } else if (productList.length > 1 && regionList.length > 1) {
            content_row.insertCell(0).appendChild(document.createTextNode(item.product));
            content_row.insertCell(1).appendChild(document.createTextNode(item.region));
        }


        for (let i = 0; i < sale.length; i++) {   //12个月销售情况 渲染
            let cell = document.createElement("input");
 
            cell.value = sale[i]
            cell.setAttribute("class", "sale_data");
            content_row.insertCell(-1).appendChild(cell);
        }

        content_row.insertCell(-1).appendChild(document.createTextNode(data_index));


        //添加onblur事件

        var newInputs = document.querySelectorAll(".sale_data");
        for (let i = 0; i < newInputs.length; i++) {

            newInputs[i].addEventListener("keydown", function (e) {  //input 键盘事件
                e = event || window.event;
                if (e.keyCode == 27) {
                    this.value = this.defaultValue;
                    this.blur();
                }
                if (e.keyCode == 13) {
                    this.blur();
                }
            }, false)

            newInputs[i].addEventListener("focus", function () {
                this.defaultValue = this.value;
            }, false)

            
            newInputs[i].addEventListener("blur", function () { //input 焦点失去 事件

                if (!Number(this.value)) {
                    alert("you can not input a NaN");
                    this.value = this.defaultValue ;
                }
            }, false);
        }

    })    




    reDecorate_showTable(); //相同首项进行合并

}


//合并首项的函数
function reDecorate_showTable() {
    var allTr = [];
    allTr = document.querySelectorAll("tr");
    var allTr_FirstTd = [];


    allTr.forEach((item) => {
        allTr_FirstTd.push(item.firstChild.innerHTML);
    })
    console.log(allTr_FirstTd)
    //if (allTr_FirstTd.length == 4) {
    //    allTr[3].firstElementChild.parentNode.removeChild(allTr[3].firstElementChild)
    //}

    for (var i = 1; i < allTr_FirstTd.length; i++) {

        var num = 0;  //相同的个数
        for (var j = i + 1; j < allTr_FirstTd.length; j++) {
            if (j == allTr_FirstTd.length - 1) {

                if (allTr[i].firstElementChild.innerHTML == allTr[j].firstElementChild.innerHTML) {
                    allTr[i].firstElementChild.setAttribute("rowspan", num + 2);
                    allTr[j].firstElementChild.parentNode.removeChild(allTr[j].firstElementChild);
                }
                break;
            }
            if (allTr_FirstTd[i] == allTr_FirstTd[j]) {
                num++;

                allTr[i].firstElementChild.setAttribute("rowspan", num + 1);
                allTr[j].firstElementChild.parentNode.removeChild(allTr[j].firstElementChild);

            }
            if (allTr_FirstTd[i] != allTr_FirstTd[j]) {
                i = j - 1;
                break;
            }



        }
    }


}






