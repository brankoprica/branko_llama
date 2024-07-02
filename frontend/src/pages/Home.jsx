import React from 'react';

function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[100dvh] gap-8 px-4 md:px-6">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Welcome to Brankollama,</h1>
                <h1 className="text-3xl font-semibold tracking-tighter sm:text-4xl md:text-5xl">A custom RAG application.</h1>
                {/* <p className="text-muted-foreground md:text-xl">Explore our features and get started.</p> */}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-3xl">
                <a
                href="/chat"
                className="bg-background border border-input rounded-lg p-6 flex flex-col items-center justify-center gap-2 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-colors"
                prefetch={false}
                >
                <MessageCircleIcon className="h-8 w-8" />
                <h3 className="text-lg font-medium">Chat</h3>
                <p className="text-sm text-muted-foreground">Interact with your LLM.</p>
                </a>
                <a
                href="/save_document"
                className="bg-background border border-input rounded-lg p-6 flex flex-col items-center justify-center gap-2 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-colors"
                prefetch={false}
                >
                <UploadIcon className="h-8 w-8" />
                <h3 className="text-lg font-medium">Upload</h3>
                <p className="text-sm text-muted-foreground">Upload your documents to your vector database.</p>
                </a>
                <a
                href="/documents"
                className="bg-background border border-input rounded-lg p-6 flex flex-col items-center justify-center gap-2 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-colors"
                prefetch={false}
                >
                <FileIcon className="h-8 w-8" />
                <h3 className="text-lg font-medium">Documents</h3>
                <p className="text-sm text-muted-foreground">View your documents.</p>
                </a>
            </div>
        </div>
    );
}

export default Home;


function FileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  )
}


function MessageCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  )
}


function UploadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}