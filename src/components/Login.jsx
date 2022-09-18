import { LS_KEY, useChatContext } from '../utils/context/ChatContext';
import useEffectOnce from '../utils/hooks/useEffectOnce';

const Login = ({ socket }) => {
  const {
    username,
    room,
    setUsername,
    setRoom,
    toggleKeepConnected,
    connect,
    save,
  } = useChatContext();

  /** Load user from localStorage and connect him */
  useEffectOnce(() => {
    const userData = JSON.parse(window.localStorage.getItem(LS_KEY));
    if (!userData) return;
    if (!userData.keepConnected);

    setUsername(userData.username);
    setRoom(userData.room);
    connect();

    socket.emit('join_room', userData.room);
  }, []);

  /** From the form, connect the user */
  const joinRoom = (e) => {
    e.preventDefault();
    socket.emit('join_room', room);
    connect();
    save();
  };

  return (
    <>
      <h3 className="text-5xl font-bold mb-6">Join A Chat</h3>
      <form onSubmit={joinRoom} className="flex flex-col gap-3">
        <label>
          <p>Username</p>
          <input
            className="border-2 border-green-500 h-10 m-2 p-2 rounded"
            type="text"
            placeholder="Username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <input
          className="border-2 border-green-500 h-10 m-2 p-2 rounded"
          type="text"
          placeholder="Room id..."
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <label className="flex m-2 gap-2 items-center cursor-pointer justify-center">
          <input
            type="checkbox"
            className="border-2 border-green-500 h-4 w-4"
            onChange={toggleKeepConnected}
          />
          <p>Keep me connected</p>
        </label>
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
