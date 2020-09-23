from flask import Flask, Response, request,session
from flask_restful import Api
from flask_jwt_extended import JWTManager
import os
from werkzeug.utils import secure_filename
import logging
# from flask_jwt import JWT
from resources.user import UserRegister,UserLogin
# from security import authenticate,identity
import cv2
import threading
from flask_cors import CORS, cross_origin

from eval import modelDone
from message import func

import ffmpy 
from ffmpy import FFmpeg

# from flask_cors import CORS

UPLOAD_FOLDER = './assets/'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['PROPAGATE_EXCEPTIONS'] = True
app.secret_key = 'jose'                                                                                                                            
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER                                                                          

api = Api(app)
CORS(app,expose_headers='Authorization')



#model

#ob=modelDone()






@app.before_first_request
def create_tables():
    db.create_all()


jwt = JWTManager(app)

api.add_resource(UserRegister, '/register')
api.add_resource(UserLogin,'/login')

# initialize a lock used to ensure thread-safe
# exchanges of the frames (useful for multiple browsers/tabs
# are viewing tthe stream)
lock = threading.Lock()

ock = threading.Lock()

@app.route('/stream/<string:id>',methods = ['GET'])
def stream(id):
      return Response(generate(id), mimetype = "multipart/x-mixed-replace; boundary=frame")
   
def find_camera(id):
    cameras = [0, 2]
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

@app.route('/upload', methods=['POST','GET'])
def fileUpload():

   #file = request.files['file'] 
   #filename = secure_filename(file.filename)
   #print(request.files, '1','2','3')
   
   target=os.path.join(UPLOAD_FOLDER,'test_docs')
   if not os.path.isdir(target):
      os.mkdir(target)
   logger.info("welcome to upload`")

   
   j = 0
   for i in request.files.getlist('file'):
      # file = request.files['file'] 
      print(i)    
      filename = secure_filename(i.filename)
      destination="/".join([target, filename])
      i.save(destination)
      # ob.get_transfer_values(file_name = destination)
      #func(destination,j)
      j+=1


   # session['uploadFilePath']=destination
   # response="Whatever you wish too return"

   return {"message":"Saved"}

if __name__ == '__main__':
   host = "127.0.0.1"
   port = 8000
   debug = False
   options = None
   from db import db
   db.init_app(app)
   app.run(host, port, debug, options)
