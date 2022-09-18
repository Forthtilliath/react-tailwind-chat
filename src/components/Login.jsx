import { useChatContext } from '../utils/context/ChatContext';

const Login = ({ socket }) => {
  const { username, room, setUsername, setRoom, connect } = useChatContext();

  const joinRoom = (e) => {
    e.preventDefault();

    socket.emit('join_room', room);
    connect();
  };

  return (
    <>
      <h3 className="text-5xl font-bold mb-4">Join A Chat</h3>
      <form onSubmit={joinRoom} className="flex flex-col gap-5">
        <input
          className="border-2 border-green-500 h-10 m-2 p-2 rounded"
          type="text"
          placeholder="Username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border-2 border-green-500 h-10 m-2 p-2 rounded"
          type="text"
          placeholder="Room id..."
          onChange={(e) => setRoom(e.target.value)}
        />
        <button
          className="h-12 m-2 p-2 rounded bg-green-500 hover:bg-green-600 text-white cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
          disabled={username === '' || room === ''}>
          Join A Room
        </button>
      </form>
    </>
  );
};

export default Login;
