import { createContext, useContext, useState } from 'react';

import { useToggle } from '../hooks/useToggle';

const ChatContext = createContext(null);

function ChatContextProvider({ children }) {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [isConnected, _toggleConnected, connect] = useToggle();

  return (
    <ChatContext.Provider
      value={{
        username,
        setUsername,
        room,
        setRoom,
        isConnected,
        connect,
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
