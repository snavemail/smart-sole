import React, { useEffect, useState } from 'react';
import '../css/home.css';
import FeetIcon from '../icons/FeetIcon';
import { getCircleStyles } from '../utils';
import { useBle } from '../hooks/useBle';
import { SensorData } from '../types';

export default function Home() {
  const [leftSensorData, setLeftSensorData] = useState<SensorData>({
    timestamp: new Date().getTime(),
    sensorValues: Array(6).fill(0),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimestamp = new Date().getTime();

      const newLeftSensorValues = leftSensorData.sensorValues.map(() => Math.random() * 300);

      setLeftSensorData({ timestamp: newTimestamp, sensorValues: newLeftSensorValues });
    }, 1000);
    return () => clearInterval(interval);
  }, [leftSensorData.sensorValues]);

  const { data, isConnected } = useBle();
  console.log('data', data);
  console.log('isConnected', isConnected);

  const usedData = data.sensorValues.length > 0 ? data : leftSensorData;

  const maxValue = 300;

  return (
    <div className='home-wrapper'>
      <div className='header-div'>
        <h1 className='header-text'>
          <span>You are connected!</span>
        </h1>
      </div>
      <div className='foot-div'>
        <div className='sensor-container timestamp'>{usedData.timestamp}</div>
        <FeetIcon />
        {usedData.sensorValues.map((value, index) => (
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
