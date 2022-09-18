import { useChatContext } from '../utils/context/ChatContext';

export const Message = ({ data }) => {
  const { username } = useChatContext();

  const isAuthor = username === data.author;

  const cnMessage = isAuthor ? '' : ' items-end';
  const cnContent = isAuthor ? 'bg-green-500' : 'bg-blue-500';
  const cnMeta = isAuthor ? 'ml-2' : 'mr-2';

  return (
    <div className={`p-2 flex flex-col ${cnMessage}`}>
      <div
        className={`min-h-[40px] min-w-[120px] w-fit rounded text-white  mx-1 px-1 break-words flex items-center ${cnContent}`}>
        <p>{data.message}</p>
      </div>
      <div className={`flex gap-2 text-xs ${cnMeta}`}>
        <p className="">{data.time}</p>
        <p className="font-bold">{data.author}</p>
      </div>
    </div>
  );
};

export default Message;
