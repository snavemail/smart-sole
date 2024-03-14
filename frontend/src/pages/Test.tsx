import React, { useEffect, useState } from 'react';
import '../css/test.css';
import FeetIcon from '../icons/FeetIcon';
import { getCircleStyles } from '../utils';
import { SensorData } from '../types';
import { useBle } from '../hooks/useBle';
import { useParams } from 'react-router-dom';
import { convertTimestampToDatetime } from '../utils/formatdate';

export default function Test() {
  const { data } = useBle();
  const [allData, setAllData] = useState<SensorData[]>([]);
  const [leftSensorData, setLeftSensorData] = useState<SensorData>({
    timestamp: new Date().getTime(),
    sensorValues: Array(6).fill(0),
  });
  const { profileId } = useParams();

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimestamp = new Date().getTime();

      const newLeftSensorValues = leftSensorData.sensorValues.map(() => Math.random() * 1000);

      setLeftSensorData({ timestamp: newTimestamp, sensorValues: newLeftSensorValues });
      setAllData(prev => [...prev, leftSensorData]);
    }, 1000);
    return () => clearInterval(interval);
  }, [leftSensorData, leftSensorData.sensorValues]);

  const maxValue = 1000;

  const sensorData = data.sensorValues.length > 0 ? data : leftSensorData;

  const finishTest = async () => {
    try {
      // Calculate duration
      const duration = allData[allData.length - 1].timestamp - allData[0].timestamp;
      console.log('Duration:', duration);

      // Make a POST request to create the test
      const testResponse = await fetch('http://127.0.0.1:8000/api/tests/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          duration,
          profile_id: profileId,
        }),
      });

      if (!testResponse.ok) {
        throw new Error('Failed to create test');
      }

      const testId = (await testResponse.json()).id;

      // Iterate over data points
      for (const data of allData) {
        // Make a POST request to create a step for each data point
        console.log('td', testId);
        console.log(data.timestamp);
        const stepResponse = await fetch('http://127.0.0.1:8000/api/steps/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            timestamp: convertTimestampToDatetime(data.timestamp),
            test_id: testId,
          }),
        });

        if (!stepResponse.ok) {
          throw new Error('Failed to create step');
        }

        const stepId = (await stepResponse.json()).id;

        // Iterate over sensor values
        for (const sensorValue of data.sensorValues) {
          const sensorReadingResponse = await fetch('http://127.0.0.1:8000/api/sensor-readings/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sensor_id: data.sensorValues.indexOf(sensorValue),
              value: sensorValue,
              step_id: stepId,
            }),
          });

          if (!sensorReadingResponse.ok) {
            throw new Error('Failed to create sensor reading');
          }
        }
      }

      alert('Test finished successfully');
    } catch (error) {
      console.error('Error finishing test:', error);
      alert('Error finishing test');
    }
  };

  return (
    <div className='test-wrapper'>
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
        <button onClick={finishTest}>Finish</button>
      </div>
    </div>
  );
}
