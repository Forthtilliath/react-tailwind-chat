import io from 'socket.io-client';

import Chat from './components/Chat';
import Login from './components/Login';

import { useChatContext } from './utils/context/ChatContext';

import './styles/globals.css';

const socket = io.connect('http://localhost:3001');

function App() {
  const { isConnected } = useChatContext();

  if (!isConnected) return <Login socket={socket} />;

  return <Chat socket={socket} />;
}

export default App;
