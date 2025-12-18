import { CheckCircleFilled, FilePdfFilled } from '@ant-design/icons';
import { Select, Upload } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import './App.css';
import type { UploadChangeParam, UploadFile } from 'antd/es/upload';
import { AnimatePresence, motion } from 'framer-motion'

const { Dragger } = Upload;

function App() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean | null>(null);
  const [type, setType] = useState('md');

  const uploadHandler = async () => {
    if (!file) return alert("Please select a file first!");
    setLoading(true);
    setIsFinished(false)

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`http://localhost:3000/compress?type=${type}`, formData, {
        responseType: 'blob',
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      console.log(url, ": url download");
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `compressed-${file.name}`);
      document.body.appendChild(link);
      setIsFinished(true);
      link.click();
      link.remove();
      setTimeout(() => {
        setIsFinished(null);
      }, 1600);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to compress the PDF. Please try again.");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2200);
      setFileList([]);
      setFile(null);
    }
  }


  const onChange = (info: UploadChangeParam) => {
    console.log('onChange:', info);
  }


  return (
    <div className='container'>
      <motion.div
        animate={{ height: loading ? 200 : "" }}
        transition={{ type: 'spring', mass: 1 }}
        className="drop-zone">
        <AnimatePresence mode="wait">
          {(loading) && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.5, type: "spring", damping: 20 }}
              className="layer-on-compress"
            >
              <AnimatePresence mode="wait">
                {isFinished === false && (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                  >
                    Compressing...
                  </motion.span>
                )}

                {isFinished === true && (
                  <motion.span
                    key="complete"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.5, }}
                  >
                    <CheckCircleFilled className="check-icon" /> Compress Complete.
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        <h1>Compress PDF</h1>
        <Dragger
          fileList={fileList}
          headers={{ 'Content-Type': 'application/pdf', XMLHttpRequest: "" }}
          beforeUpload={(file) => {
            if (file.type !== "application/pdf") {
              console.log("Only PDF files are allowed.");
              return Upload.LIST_IGNORE;
            }
            setFile(file);
            setFileList([file]);
            return false;
          }}
          onChange={onChange}
          maxCount={1}
          onRemove={() => {
            setFileList([]);
            setFile(null);
          }}
        >
          <div className="icons">
            <FilePdfFilled rotate={-15} className='icon' />
            <FilePdfFilled className='icon' />
            <FilePdfFilled rotate={15} className='icon' />
          </div>
          <h2 className="title-action">
            Click or Drag <span>PDF</span> file
          </h2>
          <p className="ant-upload-hint">
            to this area to upload file for compression
          </p>
        </Dragger>
        <div className="split-button">
          <Select
            defaultValue="md"
            className='select-compression'
            onChange={(val) => setType(val)}
            options={[
              { value: 'xs', label: 'Extremely Compression' },
              { value: 'md', label: 'Recommended Compression' },
              { value: 'lg', label: 'Less Compression' },
            ]}
          />
          <button className='btn-compress' onClick={uploadHandler} disabled={fileList.length === 0}>Compress PDF</button>
        </div>
      </motion.div>
    </div>
  )
}

export default App
