function createFigure(array) {

    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('width', '1000');
    svg.setAttribute('height', '1000');
    document.body.appendChild(svg);

    //清除上一次
    svg.innerHTML = "";

    // x y 轴 建立
    var line_x = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line_x.setAttribute("x1",50);
    line_x.setAttribute("y1", 300);
    line_x.setAttribute("x2", 380);
    line_x.setAttribute("y2", 300);
    line_x.setAttribute("stroke","black");
    line_x.setAttribute("stroke-width", 2);

    svg.appendChild(line_x);

    var line_y = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line_y.setAttribute("x1", 50);
    line_y.setAttribute("y1", 300);
    line_y.setAttribute("x2", 50);
    line_y.setAttribute("y2", 50);
    line_y.setAttribute("stroke", "black");
    line_y.setAttribute("stroke-width", 2);

    svg.appendChild(line_y);



    //确定柱状图 y轴 基准点（初始值）
    var standard = 50;


    //遍历 array中的数据
    var index_x = 70,
        index_y = 300;

    for (let i = 0; i < array.length; i++) {
        var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", index_x);
        rect.setAttribute("y", index_y - (array[i] - standard));
        rect.setAttribute("width", 10);
        rect.setAttribute("height", array[i] - standard);

        rect.setAttribute("style", "fill:blue;");
        svg.appendChild(rect);

        index_x += 20;
    }
}