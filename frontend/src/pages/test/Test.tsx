import React, { useEffect, useState } from 'react';
import './test.css';
import FeetIcon from '../../icons/FeetIcon';
import { getCircleStyles } from '../../utils';
import { SensorData, SensorDatum } from '../../types';
import { useBle } from '../../hooks/useBle';
import { errorToast, successToast } from '../../toasts';
import { ToastContainer } from 'react-toastify';
import { useProfile } from '../../hooks/useProfile';

export default function Test() {
  const { data, allData } = useBle();
  const { profile } = useProfile();
  const [allSensorData, setAllSensorData] = useState<SensorData>({
    timestamp: [],
    sensor0: [],
    sensor1: [],
    sensor2: [],
    sensor3: [],
    sensor4: [],
    sensor5: [],
  });
  const [leftSensorData, setLeftSensorData] = useState<SensorDatum>({
    timestamp: new Date().getTime(),
    sensor0: 0,
    sensor1: 0,
    sensor2: 0,
    sensor3: 0,
    sensor4: 0,
    sensor5: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimestamp = new Date().getTime();

      const newLeftSensorValues = Array.from({ length: 6 }, () => Math.floor(Math.random() * 1001));

      setLeftSensorData({
        timestamp: newTimestamp,
        sensor0: newLeftSensorValues[0],
        sensor1: newLeftSensorValues[1],
        sensor2: newLeftSensorValues[2],
        sensor3: newLeftSensorValues[3],
        sensor4: newLeftSensorValues[4],
        sensor5: newLeftSensorValues[5],
      });
      setAllSensorData({
        timestamp: [...allSensorData.timestamp, leftSensorData.timestamp],
        sensor0: [...allSensorData.sensor0, leftSensorData.sensor0],
        sensor1: [...allSensorData.sensor1, leftSensorData.sensor1],
        sensor2: [...allSensorData.sensor2, leftSensorData.sensor2],
        sensor3: [...allSensorData.sensor3, leftSensorData.sensor3],
        sensor4: [...allSensorData.sensor4, leftSensorData.sensor4],
        sensor5: [...allSensorData.sensor5, leftSensorData.sensor5],
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [
    allSensorData.sensor0,
    allSensorData.sensor1,
    allSensorData.sensor2,
    allSensorData.sensor3,
    allSensorData.sensor4,
    allSensorData.sensor5,
    allSensorData.timestamp,
    leftSensorData.sensor0,
    leftSensorData.sensor1,
    leftSensorData.sensor2,
    leftSensorData.sensor3,
    leftSensorData.sensor4,
    leftSensorData.sensor5,
    leftSensorData.timestamp,
  ]);

  const maxValue = 1000;

  const sensorData = allData.timestamp.length > 0 ? allData : allSensorData;

  const finishTest = async () => {
    setLoading(true);
    try {
      const duration =
        sensorData.timestamp[sensorData.timestamp.length - 1] - sensorData.timestamp[0];

      // Make a POST request to create the test
      const testResponse = await fetch('http://127.0.0.1:8000/api/tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          duration,
          profile_id: profile.id,
        }),
      });

      console.log(testResponse);

      if (!testResponse.ok) {
        throw new Error('Failed to create test');
      }

      const testId = (await testResponse.json()).id;

      // make a post request of the data to save average data
      const dataResponse = await fetch('http://127.0.0.1:8000/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          test_id: testId,
          data: allSensorData,
        }),
      });

      console.log(dataResponse);

      successToast('Test finished successfully');
    } catch (error) {
      errorToast('Error finishing test');
    } finally {
      setAllSensorData({
        timestamp: [],
        sensor0: [],
        sensor1: [],
        sensor2: [],
        sensor3: [],
        sensor4: [],
        sensor5: [],
      });
      setLoading(false);
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
        <div className='sensor-container timestamp'>
          {sensorData.timestamp[sensorData.timestamp.length - 1]}
        </div>
        <FeetIcon />
        <div className={`sensor-container sensor-left-0`}>
          {leftSensorData.sensor0}
          <div
            className='sensor-circle'
            style={getCircleStyles(leftSensorData.sensor0, maxValue)}
          />
        </div>
        <div className={`sensor-container sensor-left-1`}>
          {leftSensorData.sensor1}
          <div
            className='sensor-circle'
            style={getCircleStyles(leftSensorData.sensor1, maxValue)}
          />
        </div>
        <div className={`sensor-container sensor-left-2`}>
          {leftSensorData.sensor2}
          <div
            className='sensor-circle'
            style={getCircleStyles(leftSensorData.sensor2, maxValue)}
          />
        </div>
        <div className={`sensor-container sensor-left-3`}>
          {leftSensorData.sensor3}
          <div
            className='sensor-circle'
            style={getCircleStyles(leftSensorData.sensor3, maxValue)}
          />
        </div>
        <div className={`sensor-container sensor-left-4`}>
          {leftSensorData.sensor4}
          <div
            className='sensor-circle'
            style={getCircleStyles(leftSensorData.sensor4, maxValue)}
          />
        </div>
        <div className={`sensor-container sensor-left-5`}>
          {leftSensorData.sensor5}
          <div
            className='sensor-circle'
            style={getCircleStyles(leftSensorData.sensor5, maxValue)}
          />
        </div>
      </div>
      <div className='next-div'>
        <button onClick={finishTest} disabled={loading}>
          Finish
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}
