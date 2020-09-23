from eval import modelDone


import cv2
import os
import numpy as np
import matplotlib.pyplot as plt
import pickle

# Para descargar los datasets
import download

from random import shuffle
from multiprocessing import Queue

from keras.applications import VGG16

from keras import backend as K
from keras.models import Model, Sequential, model_from_json
from keras.layers import Input
from keras.layers import LSTM
from keras.layers import Dense, Activation
import sys

import h5py
import time
import datetime as datetime1
import pyrebase

config = {
    "apiKey": "AIzaSyBEvhFPUvAQGPFsvjWQfbOdBUQs6DiU6H0",
    "authDomain": "flaskreact-c0c87.firebaseapp.com",
    "databaseURL": "https://flaskreact-c0c87.firebaseio.com",
    "projectId": "flaskreact-c0c87",
    "storageBucket": "flaskreact-c0c87.appspot.com",
    "messagingSenderId": "537411848434",
    "appId": "1:537411848434:web:903517588ed34c03fc286b",
    "measurementId": "G-K1RNNQXEER"
}

firebase=pyrebase.initialize_app(config)
storage = firebase.storage()


def func(filename,num):

    ob = modelDone()
    file_name = filename 
    img_size = 224
    flag = True
    answer = []
    start = time.time()

    vidcap = cv2.VideoCapture(file_name)

    length = int(vidcap.get(cv2.CAP_PROP_FRAME_COUNT))
    print( "length = ",length )

    images = np.zeros((20,224,224,3))
    while flag:

        for i in range (0,20):

            success, image = vidcap.read()
            if success==False:
                print("frames over = ",i)
                flag = False
                break

            RGB_img = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            img = cv2.resize(RGB_img, dsize=(img_size, img_size), interpolation=cv2.INTER_CUBIC)
            img = np.array(img)
            img = (img / 255.).astype(np.float16)

            images[i]=img

        ans = ob.evaluation(images)
        print("ans = ",ans)
        print("total time taken this loop: ", time.time() - start)

        answer.append(ans)
        flag = False
        if flag == False:
            break
        
    print(answer)


    font = cv2.FONT_HERSHEY_SIMPLEX 
    vidcap = cv2.VideoCapture(file_name)
    flag = True
    frame_width = int(vidcap.get(3)) 
    frame_height = int(vidcap.get(4)) 

    size = (frame_width, frame_height)

    result = cv2.VideoWriter(f"./assets/detected/tp{num}.avi",  
                            cv2.VideoWriter_fourcc(*'MJPG'), 
                            10, size) 
    path_on_cloud = f"videos/tempvid{num}.avi"
    path_local = f"assets/detected/tp{num}.avi"

    storage.child(path_on_cloud).put(path_local)
    # xyz = storage.child(path_on_cloud).put(path_local)
    # downurl = xyz.getDownloadUrl()
        
                            

    for i in range(len(answer)):
        if answer[i]==1:
            for j in range(0,20):
                success,frame = vidcap.read()
                if success==False:
                    flag = False
                    break
                
                cv2.putText(frame,'VIOLENCE', (50, 50), font, 1, (0, 255, 255), 2, cv2.LINE_4)
                #cv2.imshow('aaa',frame)
                result.write(frame) 
        else:
            for j in range(0,20):
                success,frame = vidcap.read()
                if success==False:
                    flag = False
                    break
                
                cv2.putText(frame,'NON VIOLENCE', (50, 50), font, 1, (0, 255, 255), 2, cv2.LINE_4)
                #cv2.imshow('aaa',frame)
                result.write(frame) 

        

        if flag == False:
            break

    
    result.release()
            



    





