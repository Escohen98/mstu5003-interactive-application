from flask import Flask, request, url_for, redirect, render_template
from flask_socketio import SocketIO, Namespace
from dataclasses import dataclass, fields, asdict
import eventlet
app = Flask(__name__)
app.config['SECRET_KEY'] = 'S3cr3t!' #Idk, but Daniel said so. 
socketio = SocketIO(app)

@dataclass(kw_only=True)
class TVSettings:
    volume: int = 0
    channel: int = 0
    power: bool = 0
    current_video: str = "https://ia804609.us.archive.org/4/items/rick-roll/Rick%20Roll.mp4"

class RemoteControlHandler(Namespace):
    def __init__(self, namespace=None):
        print("initialized")
        super().__init__(namespace)
        self.settings = TVSettings()
    
    def on_connect(self):
        print("Client connected")

    def on_disconnect(self):
        print("Client disconnected")

    #changes the settings when a socket comes in. emits to the web server
    def on_setting_change(self, change):
        if (not isinstance(change, dict)) or (not change):
            return #Do nothing for non-dicts and empty dics
        
        for field in fields(TVSettings):
            new_value = change.get(field.name)
            if isinstance(new_value, field.type):
                #Changes the TVSettings class object
                setattr(self.settings, field.name, new_value)

            self.emit('tv_settings', asdict(self.settings))

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        print(request.form.get('power'))
    video = socketio.server.namespace_handlers['/'].settings.current_video
    tv_img="../static/images/the_simpsons_tv.png"
    remote_img="../static/images/cartoon_remote.png"
    return render_template('./index.html', video=video, tv_img = tv_img, remote_img = remote_img)

# New route for WebSocket connection
# @socketio.on('remote-control')
# def remote_control(data):
#     global CHANNEL, VOLUME, POWER, CURRENT_VIDEO
#     if data['event'] == 'power':
#         POWER = data['value']
#     elif data['event'] == 'channel':
#         CHANNEL = data['value']
#     elif data['event'] == 'volume':
#         VOLUME = data['value']
#     # Broadcast the updated settings to all connected clients
#     socketio.emit('tv-settings', {'power': POWER, 'channel': CHANNEL, 'volume': VOLUME}, broadcast=True)

socketio.on_namespace(RemoteControlHandler('/'))

if __name__ == "__main__":
    eventlet.wsgi.server(eventlet.listen(('0.0.0.0', 2345)), app)
    #socketio.run(app)
