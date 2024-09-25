import React, { useEffect } from 'react';
import '../../styles/BushTrimmingLoader.css';

const BushTrimmingLoader = () => {
  // Optional: You can add an event listener here to trigger the shake animation manually
  useEffect(() => {
    const tree = document.querySelector('.tree');

    tree.addEventListener('click', () => {
      tree.classList.add('shake');
      setTimeout(() => {
        tree.classList.remove('shake');
      }, 4000); // Matches the duration of the shake animation
    });
  }, []);

  return (
    <div className="animation-wrapper">
      <div className="tree-container">
        <div className="tree">
          <div className="leaf leaf1"></div>
          <div className="leaf leaf2"></div>
          <div className="leaf leaf3"></div>
          <div className="leaf leaf4"></div>
          <div className="leaf leaf5"></div>
        </div>
        <div className="tree">
          <div className="leaf leaf1"></div>
          <div className="leaf leaf2"></div>
          <div className="leaf leaf3"></div>
          <div className="leaf leaf4"></div>
          <div className="leaf leaf5"></div>
        </div>
      </div>
      <div className="tree-container">
        <div className="tree">
          <div className="leaf leaf1"></div>
          <div className="leaf leaf2"></div>
          <div className="leaf leaf3"></div>
          <div className="leaf leaf4"></div>
          <div className="leaf leaf5"></div>
        </div>
        <div className="tree">
          <div className="leaf leaf1"></div>
          <div className="leaf leaf2"></div>
          <div className="leaf leaf3"></div>
          <div className="leaf leaf4"></div>
          <div className="leaf leaf5"></div>
        </div>
      </div>
    </div>
  );
};

export default BushTrimmingLoader;
