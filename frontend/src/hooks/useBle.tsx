import * as React from 'react';
import { useState, PropsWithChildren, createContext, useContext } from 'react';
import { SensorData, SensorDatum } from '../types';

type BLE = {
  connect: () => void;
  disconnect: () => void;
  resetData: () => void;
  isConnected: boolean;
  data: SensorDatum;
  allData: SensorData;
};

export const BLEContext = createContext<BLE>({
  connect: () => {},
  disconnect: () => {},
  resetData: () => {},
  isConnected: false,
  data: {
    timestamp: 0,
    sensor0: 0,
    sensor1: 0,
    sensor2: 0,
    sensor3: 0,
    sensor4: 0,
    sensor5: 0,
  },
  allData: {
    timestamp: [],
    sensor0: [],
    sensor1: [],
    sensor2: [],
    sensor3: [],
    sensor4: [],
    sensor5: [],
  },
});

const BLEProvider = ({ children }: PropsWithChildren) => {
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState<SensorDatum>({
    timestamp: 0,
    sensor0: 0,
    sensor1: 0,
    sensor2: 0,
    sensor3: 0,
    sensor4: 0,
    sensor5: 0,
  });
  const [allData, setAllData] = useState<SensorData>({
    timestamp: [],
    sensor0: [],
    sensor1: [],
    sensor2: [],
    sensor3: [],
    sensor4: [],
    sensor5: [],
  });
  const [characteristic, setCharacteristic] = useState<BluetoothRemoteGATTCharacteristic | null>(
    null,
  );

  const connect = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ['6e400001-b5a3-f393-e0a9-e50e24dcca9e'] }],
      });
      const server = await device.gatt?.connect();

      if (!server) {
        console.error('No server');
        return;
      }

      const service = await server.getPrimaryService('6e400001-b5a3-f393-e0a9-e50e24dcca9e');
      const characteristic = await service.getCharacteristic(
        '6e400001-b5a3-f393-e0a9-e50e24dcca9e',
      );

      characteristic.addEventListener(
        'characteristicvaluechanged',
        handleCharacteristicValueChanged,
      );
      await characteristic.startNotifications();

      setCharacteristic(characteristic);
      setIsConnected(true);
    } catch (error) {
      console.error('Bluetooth connection error:', error);
      setIsConnected(false);
    } finally {
      setIsConnected(true);
    }
  };

  const disconnect = () => {
    if (characteristic) {
      characteristic.removeEventListener(
        'characteristicvaluechanged',
        handleCharacteristicValueChanged,
      );
      characteristic.stopNotifications();
    }
    setIsConnected(false);
  };

  const resetData = () => {
    setData({
      timestamp: 0,
      sensor0: 0,
      sensor1: 0,
      sensor2: 0,
      sensor3: 0,
      sensor4: 0,
      sensor5: 0,
    });
    setAllData({
      timestamp: [],
      sensor0: [],
      sensor1: [],
      sensor2: [],
      sensor3: [],
      sensor4: [],
      sensor5: [],
    });
  };

  const handleCharacteristicValueChanged = (event: Event) => {
    const value = (event.target as BluetoothRemoteGATTCharacteristic).value;
    if (value) {
      const decoder = new TextDecoder('utf-8');
      const text = decoder.decode(value);

      const listOfValues = text
        .replace(';', '')
        .split(':')
        .map(value => parseInt(value, 16));
      // [timestamp, sensor0, sensor1, sensor2, sensor3, sensor4, sensor5]
      const sensorData: SensorData = {
        timestamp: [...allData.timestamp, listOfValues[0]],
        sensor0: [...allData.sensor0, listOfValues[1]],
        sensor1: [...allData.sensor1, listOfValues[2]],
        sensor2: [...allData.sensor2, listOfValues[3]],
        sensor3: [...allData.sensor3, listOfValues[4]],
        sensor4: [...allData.sensor4, listOfValues[5]],
        sensor5: [...allData.sensor5, listOfValues[6]],
      };
      setData({
        timestamp: listOfValues[0],
        sensor0: listOfValues[1],
        sensor1: listOfValues[2],
        sensor2: listOfValues[3],
        sensor3: listOfValues[4],
        sensor4: listOfValues[5],
        sensor5: listOfValues[6],
      });
      setAllData(sensorData);
    } else {
      console.error('No value in characteristic');
    }
  };

  return (
    <BLEContext.Provider value={{ connect, disconnect, resetData, isConnected, data, allData }}>
      {children}
    </BLEContext.Provider>
  );
};

export default BLEProvider;

export const useBle = (): BLE => {
  return useContext(BLEContext);
};
