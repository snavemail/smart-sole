import React, { useEffect, useState } from 'react';
import './test.css';
import FeetIcon from '../../icons/FeetIcon';
import { getCircleStyles } from '../../utils';
import { SensorData } from '../../types';
import { useBle } from '../../hooks/useBle';
import { authErrorToast, successToast } from '../../toasts';
import { ToastContainer } from 'react-toastify';
import { useProfile } from '../../hooks/useProfile';
import { convertTimestampToDatetime } from '../../utils/formatdate';

export default function Test() {
  const startTime = new Date().getTime();
  const { data, allData } = useBle();
  const { profile } = useProfile();
  const [allSensorData, setAllSensorData] = useState<SensorData>({
    timestamp: [new Date().getTime()],
    sensor0: [0],
    sensor1: [0],
    sensor2: [0],
    sensor3: [0],
    sensor4: [0],
    sensor5: [0],
  });

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimestamp = new Date().getTime();

      const newLeftSensorValues = Array.from({ length: 6 }, () => Math.floor(Math.random() * 1000));

      setAllSensorData({
        timestamp: [...allSensorData.timestamp, newTimestamp],
        sensor0: [...allSensorData.sensor0, newLeftSensorValues[0]],
        sensor1: [...allSensorData.sensor1, newLeftSensorValues[1]],
        sensor2: [...allSensorData.sensor2, newLeftSensorValues[2]],
        sensor3: [...allSensorData.sensor3, newLeftSensorValues[3]],
        sensor4: [...allSensorData.sensor4, newLeftSensorValues[4]],
        sensor5: [...allSensorData.sensor5, newLeftSensorValues[5]],
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
    startTime,
  ]);

  const maxValue = 1000;

  const sensorData = allData.timestamp.length > 0 ? allData : allSensorData;

  const finishTest = async () => {
    setLoading(true);
    try {
      // const duration =
      //   sensorData.timestamp[sensorData.timestamp.length - 1] - sensorData.timestamp[0];

      // // Make a POST request to create the test
      // const testResponse = await fetch('http://127.0.0.1:8000/api/tests', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     duration,
      //     profile_id: profile.id,
      //   }),
      // });

      // console.log(testResponse);

      // if (!testResponse.ok) {
      //   throw new Error('Failed to create test');
      // }

      // const testId = (await testResponse.json()).id;

      // make a post request of the data to save average data
      const dataResponse = await fetch('http://127.0.0.1:8000/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // test_id: testId,
          data: allSensorData,
        }),
      });
      console.log(dataResponse);
      if (dataResponse.status === 200) {
        successToast('Test finished successfully');
        setAllSensorData({
          timestamp: [],
          sensor0: [],
          sensor1: [],
          sensor2: [],
          sensor3: [],
          sensor4: [],
          sensor5: [],
        });
      }
    } catch (error) {
      authErrorToast('Error finishing test');
      setAllSensorData({
        timestamp: [],
        sensor0: [],
        sensor1: [],
        sensor2: [],
        sensor3: [],
        sensor4: [],
        sensor5: [],
      });
    } finally {
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
      <div className='data-div'>
        <div className='foot-div'>
          <div className='sensor-container timestamp'>
            {sensorData.timestamp[sensorData.timestamp.length - 1]}
          </div>
          <FeetIcon />
          {Object.keys(sensorData)
            .filter(key => key !== 'timestamp')
            .map((key, index) => (
              <div key={index} className={`sensor-container sensor-left-${index}`}>
                {sensorData[key][sensorData[key].length - 1]}
                <div
                  className='sensor-circle'
                  style={getCircleStyles(sensorData[key][sensorData[key].length - 1], maxValue)}
                />
              </div>
            ))}
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
