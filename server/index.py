from flask import Flask, Response
import cv2
import threading
app = Flask(__name__)

# initialize a lock used to ensure thread-safe
# exchanges of the frames (useful for multiple browsers/tabs
# are viewing tthe stream)
lock = threading.Lock()

ock = threading.Lock()

@app.route('/stream/<string:id>',methods = ['GET'])
def stream(id):
      return Response(generate(id), mimetype = "multipart/x-mixed-replace; boundary=frame")
   
def find_camera(id):
    cameras = [0, 1]
    return cameras[int(id)]

def generate(camera_id):

   global lock
   cam = find_camera(camera_id)
   print(cam)

   vc = cv2.VideoCapture(cam)
   
   # check camera is open
   if vc.isOpened():
      rval, frame = vc.read()
   else:
      rval = False

   # while streaming
   while rval:
      # wait until the lock is acquired
      with lock:
         # read next frame
         rval, frame = vc.read()
         # if blank frame
         if frame is None:
            continue

         # encode the frame in JPEG format
         (flag, encodedImage) = cv2.imencode(".jpg", frame)

         # ensure the frame was successfully encoded
         if not flag:
            continue

      # yield the output frame in the byte format
      yield(b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + bytearray(encodedImage) + b'\r\n')
   # release the camera
   vc.release()

if __name__ == '__main__':
   host = "127.0.0.1"
   port = 8000
   debug = False
   options = None
   app.run(host, port, debug, options)