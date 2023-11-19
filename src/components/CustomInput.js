import React, { useState, useEffect, useRef } from 'react';
import '../App.css';

const CustomInput = ({ min, max, placeholder }) => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const normalizeValue = (val) => {
    if (val === '') return val;
    let num = parseFloat(val.replace(/\s/g, ''));
    if (!isNaN(num)) {
      if (num < min) {
        return min.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      } else if (num > max) {
        return max.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      } else {
        if (val.length === 4 ) {
            return num.toString().replace(/\B(?=(\d{4})+(?!\d))/g, " ");
        } else {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }
      }
    } else {
      return value;
    }
  };

  const handleInputChange = (e) => {
    let val = e.target.value.replace(/^(-?\d*)[^0-9-]/g, '$1');
    setValue(normalizeValue(val));
    if (inputRef.current.value.length > 7) {
      inputRef.current.style.width = ((e.target.value.length + 18) * 8) + 'px';
    } else {
        inputRef.current.style.width = '145px';
    }
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    setValue(normalizeValue(value));
  }, [min, max]); // Пересчитываем значение, если изменились min или max

  return (
    <div className="cost-input">
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef}
        className='customInput'
      />
      <label className={`placeholder ${value || isFocused ? 'placeholderUp' : ''}`}>{placeholder}</label>
    </div>
  );
};

export default CustomInput;
