import React from 'react';

const ModalPopup = ({ content, closeModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-md p-6 w-96">
        <h2 className="text-lg font-semibold mb-4">Share this link!</h2>
        <p>{content}</p>
        <button
          className="mt-4 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalPopup;
