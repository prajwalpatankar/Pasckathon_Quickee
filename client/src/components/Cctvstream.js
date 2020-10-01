import axios from 'axios';
import React, {useState} from 'react';
import './../App.css';




function Cctvstream() {

  const [modeloutput, setModel] = useState(true)  
  // setTimeout(() => {
  //   setModel(false)
  // }, 5000);

  axios.post('/f2')
  .then(response => {
      console.log(response.data.modeloutput)
      if(response.data.modeloutput==1) {
        setModel(true)
      }
      else {
        setModel(false)
      }
    })
  .catch(err => {
    console.log(err)
  })



  if(modeloutput){
    return (
      <div className="App">
        <header className="App-header">
          <div className="livestream">
            <div className="cctvvideo video-border-vio">
              <img src={'/video_feed'} className="App-logo" alt="logo"></img>
            </div>
            <h5 className="output-text">Violent</h5>
          </div>
        </header>
      </div>
    );
  }
  else {
    return (
      <div className="App">
        <header className="App-header">
          <div className="livestream">
            <div className="cctvvideo video-border-non">
              <img src={'/video_feed'} className="App-logo" alt="logo"></img>
            </div>
            <h5>Non Violent</h5>
          </div>
        </header>
      </div>
    );
  }
}

export default Cctvstream;
