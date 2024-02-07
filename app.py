from flask import send_from_directory
from flask import Flask
from sortingAlgorithm import *
app = Flask(__name__, static_url_path='/static')

@app.route('/')
def index():
    return send_from_directory('HTMLFolder', 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
