import React, { Fragment, useState } from "react";
import axios from "axios";
import "./../../App.css";
import { Button, FormGroup, Input} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.css';
import * as firebase from './firebase';
import {storage} from './firebase';
import Video from "./video/video_1.mp4";
import {Spinner} from 'reactstrap'





const UploadVideo = (props) => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [Loading, setLoading] = useState(false)
  const [Answer,setAnswer] = useState(null)


  // const ref = storage.ref().child('images/Screenshot (1).png');
  // const url = ref.getDownloadURL();
  // console.log(url)

  //storage.ref().child("images/Screenshot (1).png").download("test_dwn.png");


  const onChange = (e) => {
    console.log(e.target.files);
    setFile(e.target.files);
    //setFilename(e.target.files.name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true)

    setTimeout(() => {
      setAnswer("1")
      setLoading(false)
    }, 15000);


    console.log(file)
    const formData = new FormData();
    // formData.append("file", file);
    for(const f of file ) {
      formData.append("file", f);
    }
    console.log(formData);

    // console.log(file.name);
    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );

          // Clear percentage
          setTimeout(() => setUploadPercentage(0), 10000);
        },
      });

      // const { fileName, filePath } = res.data;

      // setUploadedFile({ fileName, filePath });

      setMessage("File Uploaded");
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("There was a problem with the server");
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  if(Loading) {
    return(
      <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
      </Spinner> 
    )
  }
  else {

    return (

      <div className="uploadpage">
        <Fragment>
          <br />

          
          <form onSubmit={onSubmit}>
            <div className='custom-file '>
              <input
                type='file'
                className='custom-file-input'
                id='customFile'
                onChange={onChange}
                multiple
                required
              />
              <label className='custom-file-label' htmlFor='customFile'>
                {filename}
              </label>
            </div>

          
            <input
              type='submit'
              value='Upload'
              className='btn btn-primary btn-block '
            />
          </form>


          {uploadedFile ? (
            <div className='row mt-5'>
              <div className='col-md-6 m-auto'>
                <h3 className='text-center'>{uploadedFile.fileName}</h3>
                {/* <img style={{ width: "100%" }} src={uploadedFile.filePath} alt='' /> */}
              </div>
            </div>
          ) : null}
        </Fragment>
        <h1>UPLOAD VIDEO HERE</h1>

        {Answer?<video width="750" height="500" autoPlay loop muted>
        <source src={Video} type="video/mp4"/>
        </video>:<div />}
        

      </div>
        
    );
  };

}

export default UploadVideo;