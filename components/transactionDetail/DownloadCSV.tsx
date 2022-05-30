import React from 'react';

import useDownloadCSV from '../../hooks/useDownloadCSV';

interface DownloadCSVProps {
  accountIdFilter: Array<string>;
}

const DownloadCSV: React.FC<DownloadCSVProps> = ({ accountIdFilter }) => {
  const { downloadCSV, showDownloadModal, showDownloadButton, closeModal } = useDownloadCSV(accountIdFilter);

  return (
    <>
      <button
        className="bg-loopring-darkBlue px-6 mt-2 rounded text-white h-9 text-sm order-2 lg:order-none lg:absolute left-0"
        onClick={downloadCSV}
      >
        Download as CSV
      </button>
      {showDownloadModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-25 flex justify-center items-center">
          <div className="bg-white w-1/3 p-6 rounded flex flex-col justify-between items-center relative">
            <div onClick={closeModal} className="absolute right-4 top-1 text-2xl cursor-pointer">
              &times;
            </div>
            <h4 className="text-2xl text-black text-center">
              {showDownloadButton ? 'Your CSV is ready' : 'Please wait while we get your CSV ready'}
            </h4>
            <a
              id="csv-download"
              className={`bg-loopring-darkBlue px-6 mt-2 rounded text-white h-9 text-sm flex justify-center items-center ${
                !showDownloadButton ? 'bg-opacity-25' : ''
              }`}
              onClick={closeModal}
            >
              Download
              {showDownloadButton ? null : (
                <div className="ml-2 animate-spin border-l border-white rounded-full w-4 h-4"></div>
              )}
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default DownloadCSV;
