var inames_rm;
function add_container() {
    document.getElementById("build_container").style.display="block";
    document.getElementById("container_table").style.display="none";
    document.getElementById("sh").style.display="none";
    document.getElementById("body").style.display="none";
    document.getElementById("node_info").style.display="none";

    show_image_list();
}

// 清空镜像表格
function clear_image_table() {
    $("#iBody").text("");
}

// 显示各节点的镜像列表
function show_image_list() {
    $.post("/image_data", {"ip": ip}, function(res) {
        clear_image_table();
        var resLen = res.length;
        if (resLen > 2) {
            // 将JSON字符串反序列化成JSON对象
            var res2Json = JSON.parse(res);
            for (var i = 0; i<res2Json.length; i++) {
                str = "<tr><td><input type='checkbox' name='iname'/>"
                + "</td><td>" + res2Json[i].image_id
                + "</td><td>" + res2Json[i].image_tags + "</td></tr>";

                $("#iBody").append(str);
            }
        } else {
            document.getElementById("iBody").innerHTML = "镜像列表为空！";
        }
    });
}

// 获取要操作的镜像数量
function get_image_len() {
    inames_rm = new Array();
    $("input[type='checkbox'][name='iname']").each(function () {
       if (this.checked) {
           var iname = $(this).parents('tr').children().eq(2).text();
           inames_rm.push(iname);
       }
    });
    var inames_rm_len = inames_rm.length;
    return inames_rm_len;
}

// remove image
function remove_image() {
    var inames_len = get_image_len();
    if (inames_len > 0)  {
        if (confirm("确认要移除镜像的吗？")) {
            $.post("remove_image", {
                "ip": ip,
                "inames_rm": JSON.stringify(inames_rm)
            }, function (res) {
                alert(res);
                show_image_list();
                $("input[type='checkbox'][name='iname']").not(this).prop("checked", false);
            });
        } else {
            $("input[type='checkbox'][name='iname']").not(this).prop("checked", false);
        }
    } else {
        alert("请选择未被使用的镜像进行移除！");
    }
}

// pull image
function pull_image() {
    document.getElementById("image_pull_info").style.display="block";
    document.getElementById("image_pull_info").innerHTML = "稍等片刻，正在下载......";
    var image_name = document.getElementById("image_name").value;
    $.post("pull_image", {
                "ip": ip,
                "image_name": JSON.stringify(image_name)
            }, function (res) {
                document.getElementById("image_pull_info").innerHTML = res;
                show_image_list();
            });
}

// create container
function create_container() {
    document.getElementById("create_container_info").style.display="block";
    document.getElementById("create_container_info").innerHTML = "稍等片刻，正在创建容器......";
    var iname = document.getElementById("iname").value;
    var cname = document.getElementById("cname").value;
    $.post("create_container", {
                "ip": ip,
                "iname": JSON.stringify(iname),
                "cname": JSON.stringify(cname)
            }, function (res) {
                document.getElementById("create_container_info").innerHTML = res;
            });
}

// build cluster
function build_cluster() {
   document.getElementById("sh").style.display="block";
   document.getElementById("body").style.display="block";
}

// 全选按钮
$(function() {
	$("#selectAllImg").bind("click",function() {
		if($(this).prop("checked")) {
			$("input[type='checkbox'][name='iname']").not(this).prop("checked",true);
		} else {
			$("input[type='checkbox'][name='iname']").not(this).prop("checked",false);
		}
	});
});