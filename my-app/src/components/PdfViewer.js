import React from 'react';
import './PdfViewer.css'; // Import your CSS file

const PdfViewer = ({ pdfUrl }) => {
    return (
        <iframe className='pdfStyle' src={pdfUrl}/>
    );
};

export default PdfViewer;
