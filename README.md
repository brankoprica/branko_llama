# BrankoLlama

**Note:** This project is currently in progress. Full installation instructions and additional details will be provided soon.

## Overview

BrankoLlama is my local LLM with Retrieval-Augmented Generation (RAG) and fine-tuning project. This mono repo consists of both frontend and backend components designed to help others set up and interact with their own LLM with RAG and fine-tuning capabilities. Intended for use with llama.cpp and .gguf models. My personal choice at the moment is Qwen2 7b Instruct (https://huggingface.co/Qwen/Qwen2-7B-Instruct-GGUF/tree/main)

## Table of Contents
1. [Features](#features)
2. [Technologies](#technologies)
3. [Installation](#installation)
4. [Getting Started](#getting-started)
5. [Usage](#usage)
6. [Contributing](#contributing)
7. [License](#license)

## Features

### Frontend

- **Chat with Your Model:** Engage in conversations with your LLM.
- **Toggle RAG:** Enable or disable Retrieval-Augmented Generation during chats.
- **Upload Documents:** Upload documents to be embedded and saved to the database.
- **View Documents:** Access and view documents stored in the database.

### Backend

- **Fine-Tuning Models:** Fine-tune your own models for better performance and customization.

## Technologies

### Frontend

- **JavaScript**
- **React**
- **Tailwind CSS**
- **shadcn**

### Backend

- **Python**
- **Django**
- **llama.cpp** (Requires separate installation)
- **Docker containers for Weaviate**
- **Weaviate vector database**

## Installation

*Instructions coming soon...*

## Getting started
*Note: This assumes you have cloned the repo and installed all dependencies.*


### 1. Run Docker:
I user Docker Desktop app. Open your weaviate container and run it.

### 2. Run Python server:

1. Wait for Docker container to be up and running as part of the python server run will involve connecting to weaviate
2. Open terminal and navigate to your /backend directory
3. Run: 
```bash
python manage.py runserver
```

### 3. Run llama.cpp's llama-server: 
1. Navigate to llama.cpp server directory
2. Ensure you have build llama-server in addition to building llama
3. Run server on your desired port (I choose 8081 as weaviate is on 8080):
```bash
llama-server.exe -m models/path/to/your/model -c 2048 --p 8081
```

### 4. Run frontend:
1. Navigate to /frontend 
2. Run:

```bash
npm start
```

### 5. Start using your app!

## Usage

*Instructions coming soon...*

## Contributing

I welcome contributions! I am working on my contributing.md file, but in the meantime, please send me a message if you have any recommendations!

## License

This project is licensed under the MIT License.