import React from 'react';

function ChatBotWelcome() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="max-w-md w-full px-6 py-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-6xl animate-wave">👋</div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Welcome to my chatbot!</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Powered by <a className="italic hover:underline">Mistral 7b via llama.cpp </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatBotWelcome;
