import React, { useState } from 'react';
import { cmSizes, euSizes, ukSizes, usSizes } from '../constants';
import '../css/shoe-size.css';

export default function ShoeSizeInput() {
  const [selectedSizeUnit, setSelectedSizeUnit] = useState('US');
  const [usSize, setUsSize] = useState('');
  const [euSize, setEuSize] = useState('');
  const [cmSize, setCmSize] = useState('');

  const handleSizeUnitChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSelectedSizeUnit(event.target.value);
  };

  return (
    <div className='shoe-size-input'>
      <label htmlFor='shoe-size-unit'>Select Size Unit:</label>
      <div className='unit-selector-wrapper'>
        <div className='select-unit'>
          <select id='shoe-size-unit' onChange={handleSizeUnitChange} value={selectedSizeUnit}>
            <option value='US'>US</option>
            <option value='EU'>EU</option>
            <option value='UK'>UK</option>
            <option value='CM'>CM</option>
          </select>
        </div>
        <div className='select-size'>
          {selectedSizeUnit === 'US' && (
            <select value={usSize} onChange={e => setUsSize(e.target.value)}>
              <option value=''>Select Size</option>
              {usSizes.map(size => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          )}
          {selectedSizeUnit === 'EU' && (
            <select value={euSize} onChange={e => setEuSize(e.target.value)}>
              <option value=''>Select Size</option>
              {euSizes.map(size => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          )}
          {selectedSizeUnit === 'UK' && (
            <select value={cmSize} onChange={e => setCmSize(e.target.value)}>
              <option value=''>Select Size</option>
              {ukSizes.map(size => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          )}
          {selectedSizeUnit === 'CM' && (
            <select value={cmSize} onChange={e => setCmSize(e.target.value)}>
              <option value=''>Select Size</option>
              {cmSizes.map(size => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    </div>
  );
}
