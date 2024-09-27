import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, RotateCw } from "lucide-react";

const UseRefExamples = () => {
  const [inputValue, setInputValue] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [renderCount, setRenderCount] = useState(0);

  // Ref for accessing DOM element
  const inputRef = useRef(null);

  // Ref for storing mutable value
  const renderCountRef = useRef(0);

  // Ref for accessing video element
  const videoRef = useRef(null);

  // Focus the input on mount
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Update render count on each render
  useEffect(() => {
    renderCountRef.current += 1;
    setRenderCount(renderCountRef.current);
  });

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClearInput = () => {
    setInputValue("");
    inputRef.current.focus();
  };

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleRestart = () => {
    const video = videoRef.current;
    video.currentTime = 0;
    video.play();
    setIsPlaying(true);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">useRef Examples</h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">
          1. Accessing DOM Elements
        </h2>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="border p-2 mr-2"
          placeholder="Type here..."
        />
        <button
          onClick={handleClearInput}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Clear & Focus
        </button>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">
          2. Storing Mutable Values
        </h2>
        <p>This component has rendered {renderCount} times.</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">
          3. Managing Video Playback
        </h2>
        <video ref={videoRef} width="320" height="240" className="mb-2">
          <source src="/api/placeholder/320/240" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div>
          <button
            onClick={handlePlayPause}
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          >
            {isPlaying ? (
              <Pause className="inline" />
            ) : (
              <Play className="inline" />
            )}
            {isPlaying ? " Pause" : " Play"}
          </button>
          <button
            onClick={handleRestart}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            <RotateCw className="inline mr-1" />
            Restart
          </button>
        </div>
      </div>
    </div>
  );
};

export default UseRefExamples;
