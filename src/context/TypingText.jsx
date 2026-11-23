// components/TypingText.js
import React from 'react';
import { TypeAnimation } from 'react-type-animation';

const TypingText = ({ className = "" }) => {
  return (
    <div className={`text-xl sm:text-2xl font-bold uppercase text-[#ffb400] ${className}`}>
      <TypeAnimation
        sequence={[
          'Welcome to My portfolio',
          2000,
          'I am a Web Developer',
          2000,
          "Let's build with modern JavaScript.",
          2000,
        ]}
        wrapper="span"
        cursor={true}
        repeat={Infinity}
        style={{ display: 'inline-block' }}
      />
    </div>
  );
};

export default TypingText;
