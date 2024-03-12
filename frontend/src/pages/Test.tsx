import React, { useEffect, useState } from 'react';
import '../css/home.css';
import FeetIcon from '../icons/FeetIcon';
import { getCircleStyles } from '../utils';
import { SensorData } from '../types';
import { useBle } from '../hooks/useBle';

export default function Test() {
  const { data } = useBle();
  const [leftSensorData, setLeftSensorData] = useState<SensorData>({
    timestamp: new Date().getTime(),
    sensorValues: Array(6).fill(0),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimestamp = new Date().getTime();

      const newLeftSensorValues = leftSensorData.sensorValues.map(() => Math.random() * 1000);

      setLeftSensorData({ timestamp: newTimestamp, sensorValues: newLeftSensorValues });
    }, 1000);
    return () => clearInterval(interval);
  }, [leftSensorData.sensorValues]);

  const maxValue = 1000;

  const sensorData = data.sensorValues.length > 0 ? data : leftSensorData;

  return (
    <div className='home-wrapper'>
      <div className='header-div'>
        <h1 className='header-text'>
          <span>Your are connected!</span>
        </h1>
      </div>
      <div className='foot-div'>
        <div className='sensor-container timestamp'>{sensorData.timestamp}</div>
        <FeetIcon />
        {sensorData.sensorValues.map((value, index) => (
          <div className={`sensor-container sensor-left-${index}`}>
            {value.toFixed(2)}
            <div className='sensor-circle' style={getCircleStyles(value, maxValue)} />
          </div>
        ))}
      </div>
      <div className='next-div'>
        <a href='/loading'>Next</a>
      </div>
    </div>
  );
}
