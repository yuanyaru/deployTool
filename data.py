#!/usr/bin/python
# -*- coding:utf-8 -*-

from flask import Flask, render_template
import sys
from monitoring import monitoring_blu

reload(sys)
sys.setdefaultencoding('utf-8')

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
app.register_blueprint(monitoring_blu)


def set_node_list():
    nodelist = ["192.168.100.61", "192.168.100.62", "192.168.100.63"]
    return nodelist


@app.route('/')
def index():
    result = set_node_list()
    return render_template('data.html', nodes=result, nodeLen=len(result))


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)