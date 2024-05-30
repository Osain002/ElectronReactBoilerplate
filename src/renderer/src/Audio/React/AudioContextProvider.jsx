import React, { createContext, useState, useEffect, useContext } from 'react';

// const AudioContext = window.AudioContext || window.webkitAudioContext;

const AudioContextState = createContext();

export const AudioContextProvider = ({ children }) => {
  // const audioContextInstance = new AudioContext();
  // const [audioContext] = useState(audioContextInstance);

  return (
    <AudioContextState.Provider>
      {children}
    </AudioContextState.Provider>
  );
};

export const useAudioContext = () => {
  return useContext(AudioContextState);
};
