import axios from 'axios';
import React from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

// const { Dragger } = Upload;

class UploadVideo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: '',
    };

    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  handleUploadImage(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('filename', this.fileName.value);
    console.log(data)
    fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        this.setState({ imageURL: `http://localhost:8000/${body.file}` });
      });
    });
  }

  render() {
    return (
      <form onSubmit={this.handleUploadImage}>
        <div>
          <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
        </div>
        <div>
          <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
        </div>
        <br />
        <div>
          <button  type="submit" className="btn">Upload</button>
        </div>
        <img src={this.state.imageURL} alt="img" />
      </form>
    );
  }





// const props = {
//   name: 'file',
//   multiple: true,
//   action: 'http://localhost:8000/upload',
//   onChange(info) {
//     const { status } = info.file;
//     if (status !== 'uploading') {
//       console.log(info.file, info.fileList);
//     }
//     if (status === 'done') {
//       message.success(`${info.file.name} file uploaded successfully.`);
//     } else if (status === 'error') {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },
// };

// ReactDOM.render(
//   <Dragger {...props}>
//     <p className="ant-upload-drag-icon">
//       <InboxOutlined />
//     </p>
//     <p className="ant-upload-text">Click or drag file to this area to upload</p>
//     <p className="ant-upload-hint">
//       Support for a single or bulk upload. Strictly prohibit from uploading company data or other
//       band files
//     </p>
//   </Dragger>,
//   mountNode,
// );
}

export default UploadVideo;

