import React, { useState, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import RecordRTC from 'recordrtc';

const NetworkAnimation = () => {

  const [recording, setRecording] = useState(false);
  const animationRef = useRef(null);
  const recorderRef = useRef(null);

  const springs = useSpring({
    from: { opacity: 0, scale: 0 },
    to: { opacity: 1, scale: 1 },
    config: { duration: 500 },
  });


  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
    recorderRef.current = new RecordRTC(stream, {
      type: 'video',
      mimeType: 'video/webm',
    });
    recorderRef.current.startRecording();
    setRecording(true);
  };

  const stopRecording = () => {
    recorderRef.current.stopRecording(() => {
      const blob = recorderRef.current.getBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'animation-recording.webm';
      a.click();
      setRecording(false);
    });
  };

  return (
    <div>
      <div
        ref={animationRef}
        style={{ position: 'relative', width: '600px', height: '400px', background: '#1a1a1a' }}
      >

      </div>
  
      <button onClick={startRecording} disabled={recording} style={{ margin: '10px' }}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!recording} style={{ margin: '10px' }}>
        Stop Recording
      </button>
    </div>
  );
};

export default NetworkAnimation;