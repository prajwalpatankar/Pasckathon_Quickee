## setting up frontend
    $ cd client  
    $ npm install  
  

## run frontend server
    $ npm start 

## setting up server
    $ cd ..  
    $ cd server   
    $ sudo apt install pythonpy
    $ sudo apt-get install python3-venv
    $ python3 -m venv env (on linux/mac)     --(or)--    py -m venv env (on windows)
    $ source env/bin/activate (on ubuntu/mac) --(or)--   env\Scripts\activate (on windows)
    $ pip3 install -r rq.txt
    
##if requirements are not installed automatically, use the folling commands :
    $ pip3 install flask
    $ pip3 install flask-cors
    $ pip3 install numpy
    $ pip3 install imutils opencv-python
    $ pip3 install flask-SQLAlchemy
    $ pip3 install flask-restful
    $ pip3 install flask-jwt-extended
    $ pip3 install tensorflow
    $ pip3 install keras
    $ pip3 install torch  
  
  
## run backend server
    $ python index.py
