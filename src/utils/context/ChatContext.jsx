import { createContext, useContext, useState } from 'react';

import { useToggle } from '../hooks/useToggle';

const ChatContext = createContext(null);

export const LS_KEY = 'react-tailwind-chat';

function ChatContextProvider({ children }) {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [keepConnected, toggleKeepConnected] = useToggle();
  const [isConnected, _toggleConnected, connect, disconnect] = useToggle();

  /** Save data in localStorage */
  const save = () => {
    if (keepConnected) {
      const data = { username, room, keepConnected };
      window.localStorage.setItem(LS_KEY, JSON.stringify(data));
    }
  };

  /** Remove data in localStorage */
  const clear = () => {
    window.localStorage.removeItem(LS_KEY);
  };

  return (
    <ChatContext.Provider
      value={{
        username,
        setUsername,
        room,
        setRoom,
        isConnected,
        connect,
        disconnect,
        keepConnected,
        toggleKeepConnected,
        save,
        clear,
      }}>
      {children}
    </ChatContext.Provider>
  );
}

const useChatContext = () => {
  const context = useContext(ChatContext);

  if (context === null) {
    throw new Error('useUserContext was used outside of its Provider');
  }

  return context;
};

export { ChatContextProvider, useChatContext };
