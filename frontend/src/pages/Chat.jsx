import React, { useState } from 'react';
import axios from 'axios';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import SendIcon from '../components/SendIcon';
import BotIcon from '../components/BotIcon';
import ChatBotWelcome from '../components/ChatBotWelcome';
import { Switch } from '../components/ui/switch';

function Chat() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]); // Ensure messages is initialized as an array
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState('');
  const [useRAG, setUseRAG] = useState(true)

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true); // Set loading to true

    const newMessage = { type: 'user', text: query };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setQuery('');

    try {
      const res = await axios.post(`${useRAG ? 'http://localhost:8000/api/rag_response/' : 'http://localhost:8000/api/non_rag_chat/'}`, { prompt: query });
      const botResponse = { type: 'bot', text: useRAG ? res.data.generated_text : res.data.response };
      console.log(botResponse)
      console.log(res.data)
      setMessages(prevMessages => [...prevMessages, botResponse]);
    } catch (err) {
      setError('Error fetching response. Please try again.');
    } finally {
      setLoading(false); // Set loading to false after response or error
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between bg-indigo-500 text-white p-4 flex items-center">
        <a href='/' className='flex items center'>
            <BotIcon className="h-6 w-6 mr-2" />
            <h1 className="text-lg font-medium">Branko's Llama</h1>
        </a>
        <span className='flex items-center gap-2'>
          <Switch 
            checked={useRAG}
            onCheckedChange={() => setUseRAG(!useRAG)}
            />
          <h1 className="text-md">RAG {useRAG ? 'on ' : 'off'}</h1>
        </span>
      </header>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <ChatBotWelcome />
        )}
        {Array.isArray(messages) && messages.map((message, index) => (
          <div key={index} className={`flex items-start ${message.type === 'user' ? 'justify-end' : ''}`}>
            {message.type === 'bot' && (
              <Avatar className="mr-2">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>B</AvatarFallback>
              </Avatar>
            )}
            <div className={`rounded-lg p-3 max-w-[80%] ${message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'}`}>
              <p>{message.text}</p>
            </div>
            {message.type === 'user' && (
              <Avatar className="ml-2">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex items-start">
            <Avatar className="mr-2">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>B</AvatarFallback>
            </Avatar>
            <div className="rounded-lg p-3 max-w-[80%]">
              <div className="loader"></div>
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="bg-gray-100 dark:bg-gray-800 p-4 flex items-center">
        <Input
          type="text"
          placeholder="Type your message..."
          className="flex-1 mr-2 rounded-lg p-2 bg-white dark:bg-gray-700 dark:text-gray-200"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="submit">
          <SendIcon className="h-5 w-5" />
        </Button>
      </form>
      {error && (
        <div className="mt-4 p-4 border border-red-500 rounded">
          <p className="text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
}

export default Chat;
