from flask import Flask, request, url_for, redirect, render_template
app = Flask(__name__)

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

if __name__ == "__main__":
    app.run(debug=True)
