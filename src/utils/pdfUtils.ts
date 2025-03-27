
/**
 * Utility for generating PDF documents
 */
import html2pdf from 'html2pdf.js';

interface PdfOptions {
  filename?: string;
  margin?: number;
  pagebreak?: { mode?: string; before?: string[]; after?: string[]; avoid?: string[] };
  image?: { type?: string; quality?: number };
}

/**
 * Generate a PDF from an HTML element
 */
export const generatePdf = (element: HTMLElement, options: PdfOptions = {}): void => {
  const defaultOptions = {
    margin: 10,
    filename: 'document.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  const pdfOptions = { ...defaultOptions, ...options };
  html2pdf().set(pdfOptions).from(element).save();
};

/**
 * Generate a PDF from content data
 */
export const generateContentPdf = (title: string, content: string, author?: string, date?: string): void => {
  // Create a temporary container for PDF generation
  const container = document.createElement('div');
  container.style.padding = '20px';
  
  // Add content to the container
  const titleElement = document.createElement('h1');
  titleElement.style.fontSize = '24px';
  titleElement.style.marginBottom = '10px';
  titleElement.style.fontWeight = 'bold';
  titleElement.style.textAlign = 'center';
  titleElement.innerText = title;
  container.appendChild(titleElement);
  
  if (author || date) {
    const metaElement = document.createElement('div');
    metaElement.style.fontSize = '14px';
    metaElement.style.marginBottom = '20px';
    metaElement.style.textAlign = 'center';
    metaElement.style.color = '#666';
    
    if (author) metaElement.innerText = `الكاتب: ${author}`;
    if (author && date) metaElement.innerText += ' | ';
    if (date) metaElement.innerText += `التاريخ: ${date}`;
    
    container.appendChild(metaElement);
  }
  
  const contentElement = document.createElement('div');
  contentElement.style.fontSize = '16px';
  contentElement.style.lineHeight = '1.6';
  contentElement.style.textAlign = 'right';
  contentElement.style.direction = 'rtl';
  
  // Convert new lines to paragraphs
  content.split('\n\n').forEach(paragraph => {
    if (paragraph.trim()) {
      const p = document.createElement('p');
      p.innerText = paragraph;
      p.style.marginBottom = '10px';
      contentElement.appendChild(p);
    }
  });
  
  container.appendChild(contentElement);
  
  // Footer with source
  const footerElement = document.createElement('div');
  footerElement.style.marginTop = '30px';
  footerElement.style.fontSize = '12px';
  footerElement.style.borderTop = '1px solid #ccc';
  footerElement.style.paddingTop = '10px';
  footerElement.style.textAlign = 'center';
  footerElement.innerText = `المصدر: ${window.location.origin}`;
  container.appendChild(footerElement);
  
  // Append to body temporarily (needed for html2pdf)
  document.body.appendChild(container);
  
  // Generate PDF and then remove the element
  generatePdf(container, { filename: `${title.substring(0, 30)}.pdf` });
  
  // Remove the container after a brief delay to ensure PDF generation works
  setTimeout(() => {
    document.body.removeChild(container);
  }, 1000);
};
