$(document).ready(function () {
    var ss=document.getElementById('time').getElementsByTagName('span');
    function changeTime() {
        var time = new Date();
        ss[0].innerHTML = time.getFullYear().toString();
        ss[1].innerHTML = time.getMonth()+1;
        ss[2].innerHTML = time.getDate().toString();
        ss[3].innerHTML = time.getHours().toString();
        ss[4].innerHTML = time.getMinutes().toString();
        ss[5].innerHTML = time.getSeconds().toString();
    }
    changeTime();
    setInterval(function(){
        changeTime();
    },1000)

    $("#contect").click(function () {
        window.confirm("感谢您的使用 ！\n" +
                        "如果您在使用过程中有任何疑问，请联系平台研发部yyr !");
    });

    $("#about").click(function () {
        window.confirm("本产品：分布式系统部署工具\n" +
                       "版   本：v1.0.0");
    });

    $("#browser").treeview();
});