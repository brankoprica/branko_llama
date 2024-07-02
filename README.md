# BrankoLlama

**Note:** This project is still in progress. Installation instructions are complete but provisional. If you have managed to set this up locally following my instructions, please let me know! Likewise if you have any difficulties, let me know. 

## Overview

BrankoLlama is my local LLM with Retrieval-Augmented Generation (RAG). This mono repo consists of both frontend and backend components designed to help others set up and interact with their own LLM with RAG. Intended for use with llama.cpp and .gguf models. My personal choice at the moment is Qwen2 7b Instruct (https://huggingface.co/Qwen/Qwen2-7B-Instruct-GGUF/tree/main)

## Demo

https://youtu.be/ZdK7yZtbVwY 

## Table of Contents
1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Acknowledgements](#acknowledgements)
6. [Contributing](#contributing)
7. [License](#license)

## Features


- **Chat with Your Model:** Engage in conversations with your LLM.
- **Toggle RAG:** Enable or disable Retrieval-Augmented Generation during chats.
- **Upload Documents:** Upload documents to be embedded and saved to the database.
- **View Documents:** Access and view documents stored in the database.

## Prerequisites

1. llama.cpp 
2. Docker (https://www.docker.com/get-started/)
3. Python 3.8+ (www.python.org)
4. Node.js and npm
5. Tailwindcss (https://tailwindcss.com/docs/installation)
6. Weaviate (https://weaviate.io/developers/weaviate/installation/docker-compose)


### llama.cpp

Follow the installation instructions from the official repo: https://github.com/ggerganov/llama.cpp . In summary:

- Clone llama.cpp repo and go through installation
- Make sure to build llama-server 
- Find a .gguf model. I used huggingface (https://huggingface.co/) library
- Add .gguf model to your models directory in llama.cpp/models

### Weaviate

Ensure you have weaviate-client installed once your venv is set up. Follow the link https://weaviate.io/developers/weaviate/installation/docker-compose for docker compose set up, or feel free to use my .yml file for custom configurations. 

## Installation

### Get source code

```bash
git clone https://github.com/brankoprica/branko_llama.git
```

### Backend Setup 

1. Navigate to backend directory:
```bash
cd backend
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate # On windows, like me: `venv\Scripts\activate
```

3. Install Python dependencies***:
Please note that there seem to be quite a few here, I haven't had time to narrow down which are redundant and from when I was fine-tuning. I will work on cutting these down.
```bash
pip install -r requirements.txt
```

4. Run the Django development server:
*Note: Ensure you have your weaviate container running first*
```bash
python manage.py runserver
```

### Frontend Setup
1. Navigate to frontend directory
```bash
cd frontend
```

2. Install required Node.js dependencies:
```bash
npm install
```

3. Start React development server:
```bash
npm start
```

If you want to start using the app now, all that should be left is connecting to your llama-server:
```bash
llama-server.exe -m models/path/to/your/model -c 2048 --p 8081
```


## Usage
*Note: This assumes you have completed installation. This will have to be run every time you want to startup your app.*


### 1. Run Docker:
Open Docker Desktop app, find and run your weaviate container.

### 2. Run Python server:
1. Wait for Docker container to be up and running as part of the python server run will involve connecting to weaviate

2. Open terminal and navigate to your /backend directory and run

3. Run: 
```bash
cd backend
python manage.py runserver
```

### 3. Run llama.cpp's llama-server: 
1. Navigate to llama.cpp server directory
```bash
cd backend/llama.cpp
```

2. Ensure you have build llama-server in addition to building llama

3. Run server on your desired port (I choose 8081 as weaviate is on 8080):
```bash
llama-server.exe -m models/path/to/your/model -c 2048 --p 8081
```

### 4. Run frontend:
1. Navigate to /frontend 
```bash
cd frontend
```
2. Run:
```bash
npm start
```

### 5. Start using your app!

## Acknowledgements

With thanks to:

- llama.cpp
- huggingface.co
- shadcn/ui

## Contributing

I welcome contributions! I am working on my contributing.md file, but in the meantime, please send me a message if you have any recommendations!

## License

This project is licensed under the MIT License.