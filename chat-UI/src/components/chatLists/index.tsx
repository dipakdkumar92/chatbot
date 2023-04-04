
import { ChatList } from "react-chat-elements"

import "./chatLists.scss"

interface ChatListsProps {
    showChat: object;
    setShowChat: Function;
}

const ChatLists: React.FC<ChatListsProps> = ({ showChat, setShowChat }) => {
    console.log("showChat", showChat);

    return (
        <div className="list-container">
            <header className="chat-list-header">Chats</header>
            <ChatList
                className='chat-list'
                id="1"
                onClick={(e) => setShowChat(e)}
                lazyLoadingImage="https://avatars.githubusercontent.com/u/80540635?v=4"
                dataSource={[
                    {
                        id: "1",
                        avatar: 'https://avatars.githubusercontent.com/u/80540635?v=4',
                        alt: 'kursat_avatar',
                        title: 'Kursat1',
                        subtitle: "Why don't we go to the No Way Home movie this weekend ?",
                        date: new Date(),
                        unread: 3,

                    },
                    {
                        id: "2",
                        avatar: 'https://avatars.githubusercontent.com/u/80540635?v=4',
                        alt: 'kursat_avatar',
                        title: 'Kursat2',
                        subtitle: "dlkahkas aenifhnklsdm mbi;awbndlm,cxz x",
                        date: new Date(),
                        unread: 4,
                    },
                    {
                        id: "1",
                        avatar: 'https://avatars.githubusercontent.com/u/80540635?v=4',
                        alt: 'kursat_avatar',
                        title: 'Kursat1',
                        subtitle: "Why don't we go to the No Way Home movie this weekend ?",
                        date: new Date(),
                        unread: 3,
                    }


                ]}
            />
        </div>
    )
}

export default ChatLists