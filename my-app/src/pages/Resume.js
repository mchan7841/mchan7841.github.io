import React from 'react';
import PageContent from '../components/PageContent';
import PdfViewer from '../components/PdfViewer';
import './Resume.css'
const Resume = () => {
    const pdfUrl = process.env.PUBLIC_URL + '/Resume-3.pdf';
  return (
    <PageContent>
        <h2 className='header'>Resume</h2>
        <div class="iframe-container">
            <PdfViewer pdfUrl={pdfUrl} />
        </div>
    </PageContent>
  );
};

export default Resume;
