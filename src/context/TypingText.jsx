// components/TypingText.js
import React from 'react';
import { TypeAnimation } from 'react-type-animation';

const TypingText = () => {
  return (
    <div className="text-3xl font-bold uppercase text-[#ffb400] pt-2">
      <TypeAnimation
        sequence={[
          'Welcome to My portfolio', // Types this out first
          2000, // Waits 3 seconds
          'I am a Web Developer', // Deletes and types a new string
          2000, // Waits 3 seconds
          "Let's build with modern JavaScript.", // Deletes and types another string
          2000, // Waits 3 seconds
        ]}
        wrapper="span"
        cursor={true}
        repeat={Infinity} // Loop indefinitely
        style={{ display: 'inline-block' }}
      />
    </div>
  );
};

export default TypingText;
