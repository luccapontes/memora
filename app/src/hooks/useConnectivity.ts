import { useState, useEffect } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

interface ConnectivityState {
  isConnected: boolean;
  isInternetReachable: boolean | null;
  type: string | null;
  isWifi: boolean;
  isCellular: boolean;
}

export function useConnectivity() {
  const [connectivity, setConnectivity] = useState<ConnectivityState>({
    isConnected: true,
    isInternetReachable: true,
    type: null,
    isWifi: false,
    isCellular: false,
  });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setConnectivity({
        isConnected: state.isConnected ?? false,
        isInternetReachable: state.isInternetReachable,
        type: state.type,
        isWifi: state.type === 'wifi',
        isCellular: state.type === 'cellular',
      });
    });

    // Get initial state
    NetInfo.fetch().then((state: NetInfoState) => {
      setConnectivity({
        isConnected: state.isConnected ?? false,
        isInternetReachable: state.isInternetReachable,
        type: state.type,
        isWifi: state.type === 'wifi',
        isCellular: state.type === 'cellular',
      });
    });

    return () => unsubscribe();
  }, []);

  return connectivity;
} 