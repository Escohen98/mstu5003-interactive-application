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
    power: bool = False
    #current_video: str = "https://ia804609.us.archive.org/4/items/rick-roll/Rick%20Roll.mp4"
    current_video: str = "./static/videos/Big Ben's Final Rick Roll.mp4"
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
        print("Change: ", change)
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
    checked = socketio.server.namespace_handlers['/'].settings.power
    channel = socketio.server.namespace_handlers['/'].settings.channel
    volume = socketio.server.namespace_handlers['/'].settings.volume
    print("Power: ", socketio.server.namespace_handlers['/'].settings.power)
    tv_img="../static/images/the_simpsons_tv.png"
    remote_img="../static/images/cartoon_remote.png"
    return render_template('./index.html', video=video, channel=channel, volume=set_volume(volume), tv_img = tv_img, remote_img = remote_img, checked=checked)

#Does the math to set the volume
#Adapted from index.js
def set_volume(volume):
    #safeguard
    if volume > 99:
        volume = 99
    elif volume < 0:
        volume = 0
    vol = (volume+1)/1000
    return "{:.2f}".format(vol)

socketio.on_namespace(RemoteControlHandler('/'))

if __name__ == "__main__":
    #eventlet.wsgi.server(eventlet.listen(('0.0.0.0', 2345)), app)
    socketio.run(app, host='0.0.0.0', port='2345')
