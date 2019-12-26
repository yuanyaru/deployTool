#!/usr/bin/python
# -*- encoding:utf-8 -*-

from flask import Blueprint, request
import docker
import json
from monitoring import get_images_used

container_blu = Blueprint('container', __name__)


# 获取各节点的镜像列表
@container_blu.route('/image_data', methods=['POST'])
def get_images():
    ip = request.form.get("ip")
    port = "2375"
    client = docker.Client(base_url='tcp://' + ip + ':' + port)
    images = client.images()
    image_list = []
    for image in images:
        # IMAGE ID
        image_id = str(image["Id"])[7:19]
        # RepoTags
        image_tags = image["RepoTags"][0]
        image_list.append({"image_id": image_id, "image_tags": image_tags})
    return json.dumps(image_list)


# remove image
@container_blu.route('/remove_image', methods=['POST'])
def remove_images():
    ip = request.form.get("ip")
    port = "2375"
    client = docker.Client(base_url='tcp://' + ip + ':' + port)
    inames = request.form.get("inames_rm")
    names = json.loads(inames)
    image_used = get_images_used()
    for name in names:
        if name in image_used:
            result = name + "正在使用，无法移除！"
        else:
            client.remove_image(name)
            result = name + "镜像已经移除!"
    return result


# pull image
@container_blu.route('/pull_image', methods=['POST'])
def pull_image():
    ip = request.form.get("ip")
    port = "2375"
    client = docker.Client(base_url='tcp://' + ip + ':' + port)
    image_name = request.form.get("image_name")
    name = json.loads(image_name)
    result = client.pull(name)
    return result


# create container
@container_blu.route('/create_container', methods=['POST'])
def create_container():
    ip = request.form.get("ip")
    port = "2375"
    client = docker.Client(base_url='tcp://' + ip + ':' + port)
    iname = request.form.get("iname")
    cname = request.form.get("cname")
    iname = json.loads(iname)
    cname = json.loads(cname)
    result = client.create_container(image=iname, name=cname)
    return str(result)
