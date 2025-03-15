const { JSDOM } = require('jsdom');
const fs = require('fs');

const html = fs.readFileSync('./src/client/views/index.html');
const dom = new JSDOM(html);
global.document = dom.window.document;
global.window = dom.window;


test(' submission triggers handlers ', function() {
  const form = document.getElementById('trip-form');
  const mockHandler = jest.fn();
  
  form.addEventListener('submit', mockHandler);
  form.dispatchEvent(new Event('submit'));

  expect(mockHandler).toHaveBeenCalled();
});

test(' (remove trip) button removes the trip ', function () {
  const removeBtn = document.querySelector('.remove-trip');
  const section = document.getElementById('trip-details');
  
  section.style.display = 'flex';
  
  removeBtn.click();
  expect(detailsSection.style.display).toBe('none');
});