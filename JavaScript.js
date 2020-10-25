
var crews = document.querySelectorAll("#test");


for (let i = 0; i < crews.length; i++) {
    crews.onClick = function () {
        let lis = this.document.querySelectorAll("div");
        lis[1].setAttribute("class", "page6-Active");
    }
    crews.onmouseout = function () {
        let lis = this.document.querySelectorAll("div");
        lis[1].setAttribute("class", "page6-NonActive");
    }
}
