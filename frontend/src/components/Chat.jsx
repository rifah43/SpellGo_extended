import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything.",
      direction: 'incoming',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messageListRef = useRef(null);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    setIsTyping(true);

    try {
      const resp = await axios.post('http://localhost:5000/user/chatbot', {
        prompt: message,
      });
      setIsTyping(false);

      if (resp.status === 200) {
        const chatGPTMessage = {
          message: resp.data.response,
          direction: 'incoming',
          sender: "ChatGPT"
        };
        const final = [...newMessages, chatGPTMessage];
        setMessages(final);

        if (messageListRef.current) {
          messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
      } else {
        console.error('Error:', resp.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div style={{ width: '100%', height: '80%' }}>
      <MainContainer style={{ borderRadius: '1em', padding: '1%' }}>
        <ChatContainer style={{ padding: '1%' }}>
          <MessageList
            typingIndicator={isTyping ? <TypingIndicator message="ChatGPT is typing" /> : null}
          >
            {messages.map((message, i) => (
              <Message key={i} model={message} />
            ))}
          </MessageList>
          <MessageInput placeholder="Type a message here" onSend={handleSend} />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default Chat;
