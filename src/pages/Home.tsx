import React, { useEffect, useState } from 'react';
import '../css/home.css';
import FeetIcon from '../icons/FeetIcon';
import { getCircleStyles } from '../utils';
import { SensorData } from '../types';

export default function Home() {
  const [leftSensorData, setLeftSensorData] = useState<SensorData>({
    timestamp:
      new Date().getHours().toString() +
      ':' +
      new Date().getMinutes().toString() +
      ':' +
      new Date().getSeconds().toString() +
      ':' +
      new Date().getMilliseconds().toString(),
    sensorValues: Array(6).fill(0),
  });

  const [rightSensorData, setRightSensorData] = useState<SensorData>({
    timestamp: '0',
    sensorValues: Array(6).fill(0),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimestamp =
        new Date().getHours().toString() +
        ':' +
        new Date().getMinutes().toString() +
        ':' +
        new Date().getSeconds().toString() +
        ':' +
        new Date().getMilliseconds().toString();

      const newLeftSensorValues = leftSensorData.sensorValues.map(() => Math.random() * 1000);

      const newRightSensorValues = rightSensorData.sensorValues.map(() => Math.random() * 1000);

      setRightSensorData({ timestamp: newTimestamp, sensorValues: newRightSensorValues });

      setLeftSensorData({ timestamp: newTimestamp, sensorValues: newLeftSensorValues });
    }, 1000);
    return () => clearInterval(interval);
  }, [leftSensorData.sensorValues, rightSensorData.sensorValues]);

  const maxValue = 1000;

  return (
    <div className='home-wrapper'>
      <div className='header-div'>
        <h1 className='header-text'>
          <span>Your are connected!</span>
        </h1>
      </div>
      <div className='foot-div'>
        <FeetIcon />
        {leftSensorData.sensorValues.map((value, index) => (
          <div className={`sensor-container sensor-left-${index}`}>
            {value.toFixed(2)}
            <div className='sensor-circle' style={getCircleStyles(value, maxValue)} />
          </div>
        ))}
        {rightSensorData.sensorValues.map((value, index) => (
          <div className={`sensor-container sensor-right-${index}`}>
            {value.toFixed(2)}
            <div className='sensor-circle' style={getCircleStyles(value, maxValue)} />
          </div>
        ))}
        <div className='sensor-container timestamp'>{leftSensorData.timestamp}</div>
      </div>
      <div className='connect-div'>
        <h2 className='connect-text'>
          <span>Collecting data</span>
        </h2>
      </div>
    </div>
  );
}
