#!/usr/bin/python
# -*- coding:utf-8 -*-

from flask import Flask, render_template
import sys
import json
from monitoring import net_is_used
from monitoring import monitoring_blu
from buildContainer import container_blu

reload(sys)
sys.setdefaultencoding('utf-8')

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
app.register_blueprint(monitoring_blu)
app.register_blueprint(container_blu)


def set_node_list():
    nodeiplist = ["192.168.100.61", "192.168.100.62", "192.168.100.63", "192.168.100.64"]
    nodenamelist = ["node1", "node2", "node3", "node4"]
    return nodeiplist, nodenamelist


@app.route('/set_isused', methods=['POST'])
def set_isused():
    result = set_node_list()
    isuseds = []
    for ip in result[0]:
        isused = net_is_used(ip, 2375)
        isuseds.append(isused)
    print isuseds
    resultList = [isuseds, result[0], result[1]]
    return json.dumps(resultList)


@app.route('/')
def index():
    result = set_node_list()
    return render_template('data.html', nodeips=result[0], nodeipLen=len(result[0]),
                           nodenames=result[1], nodenameLen=len(result[1]))


if __name__ == '__main__':
    set_isused()
    app.run(host='0.0.0.0', debug=True)
