#!/usr/bin/python
# -*- coding:utf-8 -*-

from flask import Blueprint, request
import docker
import json

monitoring_blu = Blueprint('monitor', __name__)

# 获取各节点的容器列表
@monitoring_blu.route('/container_data', methods=['POST'])
def get_containers():
    ip = request.form.get("ip")
    port = "2375"
    client = docker.Client(base_url='tcp://' + ip + ':' + port)
    containers = client.containers()
    container_list = []
    for container in containers:
        # CONTAINER ID
        container_id = str(container["Id"])[0:12]
        # IMAGE
        container_image = container["Image"]
        # CONTAINER NAME
        # container_name = container["Labels"]["com.docker.compose.service"]
        # 先将unicode编码转成utf-8,再截取字符串
        container_name = container["Names"][0].encode('utf-8')[1:]
        # State
        container_state = container["State"]
        container_list.append({"container_id": container_id, "container_image": container_image,
                               "container_name": container_name, "container_state": container_state})
    return json.dumps(container_list)