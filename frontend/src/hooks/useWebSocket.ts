import { useEffect, useRef } from 'react';

interface WebSocketMessage {
  type: string;
  message: string;
}

export function useWebSocket(onMessage: (message: WebSocketMessage) => void) {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  useEffect(() => {
    const connect = () => {
      try {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = `${protocol}//${window.location.host}`;
        wsRef.current = new WebSocket(wsUrl);

        wsRef.current.onopen = () => {
          reconnectAttempts.current = 0;
          if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
            reconnectTimeoutRef.current = null;
          }
        };

        wsRef.current.onmessage = (event) => {
          try {
            const message: WebSocketMessage = JSON.parse(event.data);
            onMessage(message);
          } catch (_error) {}
        };

        wsRef.current.onclose = (event) => {
          // If connection was refused (code 1006) or server unavailable (code 1001),
          // it means WebSocket server is not running (normal mode)
          if (event.code === 1006 || event.code === 1001) {
            return;
          }

          // Only attempt to reconnect if we haven't exceeded max attempts
          if (reconnectAttempts.current < maxReconnectAttempts) {
            reconnectAttempts.current++;
            const delay = Math.min(1000 * 2 ** reconnectAttempts.current, 10000);

            reconnectTimeoutRef.current = setTimeout(() => {
              connect();
            }, delay);
          } else {
          }
        };

        wsRef.current.onerror = (_error) => {};
      } catch (_error) {}
    };

    connect();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [onMessage]);
}
