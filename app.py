from flask import Flask, request, url_for, redirect, render_template
from flask_socketio import SocketIO
import eventlet
app = Flask(__name__)
socketio = SocketIO(app)

VOLUME = 0
CHANNEL = 0 
POWER = False
CURRENT_VIDEO = "https://ia804609.us.archive.org/4/items/rick-roll/Rick%20Roll.mp4"

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        print(request.form.get('power'))
    video = CURRENT_VIDEO
    tv_img="../static/images/the_simpsons_tv.png"
    remote_img="../static/images/cartoon_remote.png"
    return render_template('./index.html', video=video, tv_img = tv_img, remote_img = remote_img)

# New route for WebSocket connection
@socketio.on('remote-control')
def remote_control(data):
    global CHANNEL, VOLUME, POWER, CURRENT_VIDEO
    if data['event'] == 'power':
        POWER = data['value']
    elif data['event'] == 'channel':
        CHANNEL = data['value']
    elif data['event'] == 'volume':
        VOLUME = data['value']
    # Broadcast the updated settings to all connected clients
    socketio.emit('tv-settings', {'power': POWER, 'channel': CHANNEL, 'volume': VOLUME}, broadcast=True)

if __name__ == "__main__":
    eventlet.wsgi.server(eventlet.listen(('0.0.0.0', 5000)), app)
