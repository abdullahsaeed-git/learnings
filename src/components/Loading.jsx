import React from 'react'

function Loading() {
  return (
    // <div className='my-5 text-center fw-bold fs-1'>Loading...</div>
    <div className="d-flex justify-content-center">
      <div
        className="spinner-border text-primary text-center m-5"
        style={{width: "3rem", height: "3rem", color: 'white',borderWidth: '7px'
        }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Loading