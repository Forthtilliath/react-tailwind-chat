import React, { useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import { useChatContext } from '../utils/context/ChatContext';
import useEffectOnce from '../utils/hooks/useEffectOnce';

import Message from './Message';

const Chat = ({ socket }) => {
  const { username, room, clear, disconnect } = useChatContext();

  const [currentMessage, setCurrentMessage] = useState('');
  const [messagesList, setMessagesList] = useState([]);

  /** Send a message to other users and log into the message in the chat */
  const sendMessage = async (e) => {
    e.preventDefault();

    if (currentMessage !== '') {
      const now = new Date();
      const messageData = {
        room,
        author: username,
        message: currentMessage,
        time: now.getHours() + ':' + now.getMinutes(),
      };
      await socket.emit('send_message', messageData);
      setMessagesList((list) => [...list, messageData]);
      setCurrentMessage('');
    }
  };

  /** Log new message from other users */
  useEffectOnce(() => {
    socket.on('receive_message', (data) => {
      setMessagesList((list) => [...list, data]);
    });
  }, [socket]);

  /** Disconnect the user of the chat */
  const disconnectChat = () => {
    clear();
    socket.disconnect();
    disconnect();
  };

  return (
    <div className="w-80">
      <h3 className="text-5xl font-bold p-2 bg-gray-800 text-white text-center rounded-t-md">
        Live Chat
      </h3>
      <div className="text-sm p-2 bg-gray-800 text-white text-center flex justify-between">
        <p>Room id : {room}</p>
        <button
          onClick={disconnectChat}
          className="hover:bg-gray-600 px-2 py-1 rounded">
          Disconnect
        </button>
      </div>
      <div className="border border-gray-800 h-[300px]">
        <ScrollToBottom
          className="w-full h-full overflow-hidden"
          scrollViewClassName="sb-2 sb-rounded-md sb-gradient-to-br sb-from-green sb-to-blue"
          followButtonClassName="!bg-gray-800"
          initialScrollBehavior="smooth">
          {messagesList.map((message, i) => (
            <Message key={i} data={message} />
          ))}
        </ScrollToBottom>
      </div>
      <div className="h-14 border border-gray-800 border-t-0">
        <form onSubmit={sendMessage} className="flex">
          <input
            className="px-2 h-[55px] border-r border-dotted border-gray-400 flex-[85%]"
            type="text"
            placeholder="Hey..."
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
          />
          <button className="h-10 m-2 p-2 rounded bg-green-500 hover:bg-green-600 text-white cursor-pointer disabled:opacity-50 disabled:pointer-events-none flex-[15%]">
            &#9658;
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
