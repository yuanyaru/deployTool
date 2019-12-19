var ip;
$(document).ready(function () {
    nodeClick();
});

function nodeClick() {
    var elems = document.getElementsByName("ip");
    for (var i=0;i<elems.length;i++){
        elems[i].addEventListener('click', function (evt) {
            clear_table();
            var elm = $(this);
            ip = $(elm).text();
            show_table();
        });
    }
}

function show_table() {
    document.getElementById("container_table").style.display="block";
    show_data();
}

// 清空表格
function clear_table() {
    $("tBody").text("");
}

// 显示各节点的容器列表
function show_data() {
    $.post("/container_data", {"ip": ip}, function(res) {
        clear_table();
        var resLen = res.length;
        if (resLen > 2) {
            // 将JSON字符串反序列化成JSON对象
            var res2Json = JSON.parse(res);
            for (var i = 0; i<res2Json.length; i++) {
                str = "<tr><td>" + res2Json[i].container_id
                + "</td><td>" + res2Json[i].container_image
                + "</td><td>" + res2Json[i].container_name
                + "</td><td>" + res2Json[i].container_state
                + "</td><td>" + "<button>停止</button>   <button>删除</button>" + "</td></tr>";

                $("#tBody").append(str);
            }
        } else {
            document.getElementById("tBody").innerHTML = "容器列表为空！";
        }
    });
}