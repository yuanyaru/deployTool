var ip;
var cnames;
var cnames_rm;
$(document).ready(function () {
    nodeClick();
    show_node_list();
});

// 清空node表格
function clear_node_table() {
    $("#nodeBody").text("");
}

function show_nodeinfo() {
    clear_node_table();
    show_node_list();
    document.getElementById("node_info").style.display="block";
    document.getElementById("container_table").style.display="none";
    document.getElementById("build_container").style.display="none";
}

function show_node_list() {
    $.post("/set_isused", function (res) {
        var result = JSON.parse(res);
        console.log(res);
        document.getElementById("loading").style.display="none";
        for (var i = 0; i<result[1].length; i++) {
            var str1 = "<tr><td><img src=\"../static/css/img/docker.png\" height=\"50\" width=\"50\">"
                + "</td><td>" + result[2][i]
                + "</td><td>" + result[1][i] + "<img src=\"../static/css/img/up.png\">"
                + "</td><td>centos7" + "</td></tr>";
            var str2 = "<tr><td><img src=\"../static/css/img/docker.png\" height=\"50\" width=\"50\">"
                + "</td><td>" + result[2][i]
                + "</td><td>" + result[1][i] + "<img src=\"../static/css/img/down.png\">"
                + "</td><td>centos7" + "</td></tr>";
            if(result[0][i].toString() == "true") {
                $("#nodeBody").append(str1);
            } else {
                $("#nodeBody").append(str2);
            }
        }
    })
}

function nodeClick() {
    var elems = document.getElementsByName("ip");
    for (var i=0;i<elems.length;i++){
        elems[i].addEventListener('click', function (evt) {
            clear_container_table();
            var elm = $(this);
            ip = $(elm).text();
            show_container_table();
        });
    }
}

function clear_download_info() {
    document.getElementById("image_pull_info").style.display="none";
    document.getElementById("create_container_info").style.display="none";
    document.getElementById("image_name").value = "请输入要拉取的镜像名称";
    document.getElementById("iname").value = "";
    document.getElementById("cname").value = "";
}

function show_container_table() {
    document.getElementById("node_ip").innerText="---"+ip;
    clear_download_info();
    document.getElementById("container_table").style.display="block";
    document.getElementById("build_container").style.display="none";
    document.getElementById("node_info").style.display="none";

    show_container_list();
}

// 清空容器表格
function clear_container_table() {
    $("#cBody").text("");
}

// 显示各节点的容器列表
function show_container_list() {
    $.post("/container_data", {"ip": ip}, function(res) {
        clear_container_table();
        if(res.includes("unused")) {
            // alert(ip + ":2375 is unused!");
            document.getElementById("cBody").innerHTML = ip + ":2375 is unused!!!";
        } else {
            var resLen = res.length;
            if (resLen > 2) {
            // 将JSON字符串反序列化成JSON对象
            var res2Json = JSON.parse(res);
            for (var i = 0; i<res2Json.length; i++) {
                str = "<tr><td><input type='checkbox' name='cname'/>"
                + "</td><td>" + res2Json[i].container_id
                + "</td><td>" + res2Json[i].container_image
                + "</td><td>" + res2Json[i].container_name
                + "</td><td>" + res2Json[i].container_state + "</td></tr>";

                $("#cBody").append(str);
            }} else {
                document.getElementById("cBody").innerHTML = "容器列表为空！！！";
            }
        }
    });
}

// 获取要操作的容器数量
function get_container_len() {
    cnames = new Array();
    cnames_rm = new Array();
    $("input[type='checkbox'][name='cname']").each(function () {
       if (this.checked) {
           var status = $(this).parents('tr').children().eq(4).text();
           var cname = $(this).parents('tr').children().eq(3).text();
           if(status == "exited" || status == "created") {
               cnames.push(cname);
               cnames_rm.push(cname);
           } else {
               cnames.push(cname);
           }
       }
    });
    var cnames_len = cnames.length;
    var cnames_rm_len = cnames_rm.length;
    var len = [cnames_len, cnames_rm_len]
    return len;
}

// start container
function start_container() {
    var cnames_len = get_container_len()[0];
    if (cnames_len > 0)  {
        if (confirm("确认要启动容器的吗？")) {
            $.post("start_container", {
                "ip": ip,
                "cnames": JSON.stringify(cnames)
            }, function (res) {
                show_container_list();
                $("input[type='checkbox']").not(this).prop("checked", false);
            });
        } else {
            $("input[type='checkbox']").not(this).prop("checked", false);
        }
    } else {
        alert("请先选择要启动的容器！");
    }
}

// stop container
function stop_container() {
    var cnames_len = get_container_len()[0];
    if (cnames_len > 0)  {
        if (confirm("确认要停止容器的吗？")) {
            $.post("stop_container", {
                "ip": ip,
                "cnames": JSON.stringify(cnames)
            }, function (res) {
                show_container_list();
                $("input[type='checkbox']").not(this).prop("checked", false);
            });
        } else {
            $("input[type='checkbox']").not(this).prop("checked", false);
        }
    } else {
        alert("请先选择要停止的容器！");
    }
}

// remove container
function remove_container() {
    var cnames_len = get_container_len()[1];
    if (cnames_len > 0)  {
        if (confirm("确认要移除容器的吗？")) {
            $.post("remove_container", {
                "ip": ip,
                "cnames_rm": JSON.stringify(cnames_rm)
            }, function (res) {
                show_container_list();
                $("input[type='checkbox']").not(this).prop("checked", false);
            });
        } else {
            $("input[type='checkbox']").not(this).prop("checked", false);
        }
    } else {
        alert("请选择未运行的容器进行移除！");
        $("input[type='checkbox']").not(this).prop("checked", false);
    }
}

// 全选按钮
$(function() {
	$("#selectAllCon").bind("click",function() {
		if($(this).prop("checked")) {
			$("input[type='checkbox'][name='cname']").not(this).prop("checked",true);
		} else {
			$("input[type='checkbox'][name='cname']").not(this).prop("checked",false);
		}
	});
});