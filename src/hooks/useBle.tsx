import * as React from 'react';

export interface BLE {
  connect: () => void;
  disconnect: () => void;
  isConnected: boolean;
  data: string[];
}

export const useBle = (): BLE => {
  const [isConnected, setIsConnected] = React.useState(false);
  const [data, setData] = React.useState<string[]>([]);
  const [characteristic, setCharacteristic] =
    React.useState<BluetoothRemoteGATTCharacteristic | null>(null);

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
      window.location.href = '/doenstexist';
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
      const newData = [...data, text];
      setData(newData.slice(Math.max(newData.length - 14, 0)));
    } else {
      console.error('No value in characteristic');
    }
  };

  return { connect, disconnect, isConnected, data };
};
