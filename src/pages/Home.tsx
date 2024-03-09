import React, { useEffect, useState } from 'react';
import '../css/home.css';
import { useBle } from '../hooks/useBle';
import FeetIcon from '../icons/FeetIcon';

type SensorData = {
  timestamp: string; // The time the sensor values were collected
  sensorValues: number[]; // An array of sensor values
};

const getCircleStyles = (value: number, maxValue: number) => {
  const radius = 20 + (value / maxValue) * 80; // Adjust the size based on the value (20-100px)
  const heatValue = ((value - 255) / (maxValue - 255)) * 100; // Calculate the heat value (0-100)

  // Define the color gradient for the heat map
  const gradient = [
    { color: '#ff0000', position: 0 }, // Red (hot)
    { color: '#bfff00', position: 50 }, // Yellow Green
    { color: '#0000ff', position: 100 }, // Dark blue (cold)
  ];

  const adjustedGradient = gradient.map(({ color, position }) => ({
    color,
    position: position * (heatValue / 100),
  }));

  const gradientString = adjustedGradient
    .map(({ color, position }) => `${color} ${position}%`)
    .join(', ');

  console.log(gradientString);

  return {
    width: `${radius}px`,
    height: `${radius}px`,
    background: `radial-gradient(circle at center, ${gradientString})`,
  };
};

export default function Home() {
  const { data } = useBle();
  const [sensorData, setSensorData] = useState<SensorData>({
    timestamp: new Date().toISOString(),
    sensorValues: Array(6).fill(0),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimestamp = new Date().getTime().toString();

      const newSensorValues = sensorData.sensorValues.map(() => Math.random() * 1000);

      setSensorData({ timestamp: newTimestamp, sensorValues: newSensorValues });
    }, 1000);
    return () => clearInterval(interval);
  }, [sensorData.sensorValues]);

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
        <div
          className='sensor-1 sensor-circle'
          style={getCircleStyles(sensorData.sensorValues[0], maxValue)}></div>
        <div className='sensor-2'></div>
        <div className='sensor-3'></div>
        <div className='sensor-4'></div>
        <div className='sensor-5'></div>
        <div className='sensor-6'></div>
      </div>
      <div className='sensor-div'>
        <table className='sensor-table'>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Sensor 1: TL</th>
              <th>Sensor 2: TM</th>
              <th>Sensor 3: TR</th>
              <th>Sensor 4: M</th>
              <th>Sensor 5: BL</th>
              <th>Sensor 6: BR</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{sensorData.timestamp}</td>
              {sensorData.sensorValues.map((value, index) => (
                <td key={index}>{value.toFixed(2)}</td>
              ))}
            </tr>
            <tr>
              <td>NA</td>
              {sensorData.sensorValues.map((value, index) => (
                <td>
                  <div
                    key={index}
                    className='sensor-circle-table'
                    style={getCircleStyles(value, maxValue)}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className='connect-div'>
        <h2 className='connect-text'>
          <span>Collecting data</span>
        </h2>
      </div>
    </div>
  );
}
