import * as React from 'react';
import { useState, PropsWithChildren, createContext, useContext } from 'react';
import { SensorData } from '../types';

type BLE = {
  connect: () => void;
  disconnect: () => void;
  isConnected: boolean;
  data: SensorData;
};

export const BLEContext = createContext<BLE>({
  connect: () => {},
  disconnect: () => {},
  isConnected: false,
  data: { timestamp: 0, sensorValues: [] },
});

const BLEProvider = ({ children }: PropsWithChildren) => {
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState<SensorData>({ timestamp: 0, sensorValues: [] });
  const [characteristic, setCharacteristic] = useState<BluetoothRemoteGATTCharacteristic | null>(
    null,
  );

  const connect = async () => {
    console.log('Requesting Bluetooth Device...');
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ['6e400001-b5a3-f393-e0a9-e50e24dcca9e'] }],
      });
      console.log('Device:', device);
      const server = await device.gatt?.connect();
      console.log('Server:', server);

      if (!server) {
        console.error('No server');
        return;
      }

      const service = await server.getPrimaryService('6e400001-b5a3-f393-e0a9-e50e24dcca9e');
      console.log('Service:', service);
      const characteristic = await service.getCharacteristic(
        '6e400001-b5a3-f393-e0a9-e50e24dcca9e',
      );
      console.log('Characteristic:', characteristic);

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

  const handleCharacteristicValueChanged = (event: Event) => {
    const value = (event.target as BluetoothRemoteGATTCharacteristic).value;
    if (value) {
      const decoder = new TextDecoder('utf-8');
      const text = decoder.decode(value);

      const listOfValues = text.split(';').map(value => parseInt(value, 16));
      const sensorData: SensorData = {
        timestamp: listOfValues[0],
        sensorValues: listOfValues.slice(1),
      };
      setData(sensorData);
    } else {
      console.error('No value in characteristic');
    }
  };

  return (
    <BLEContext.Provider value={{ connect, disconnect, isConnected, data }}>
      {children}
    </BLEContext.Provider>
  );
};

export default BLEProvider;

export const useBle = (): BLE => {
  return useContext(BLEContext);
};
