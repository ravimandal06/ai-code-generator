import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Code, 
  Eye, 
  Save, 
  Download, 
  History, 
  Settings, 
  Zap,
  Copy,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Loader2,
  Maximize2,
  Minimize2,
  Split,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const CodeGeneratorPlatform = () => {
  // State management
  const [idea, setIdea] = useState('');
  const [modifyPrompt, setModifyPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isModifying, setIsModifying] = useState(false);
  const [activeTab, setActiveTab] = useState('html');
  const [viewMode, setViewMode] = useState('split'); // split, code, preview
  const [isPreviewMaximized, setIsPreviewMaximized] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [projectTitle, setProjectTitle] = useState('Untitled Project');
  const [status, setStatus] = useState('ready');
  const [apiUsage, setApiUsage] = useState(75);
  
  const iframeRef = useRef(null);

  // Sample generated code for demonstration
  const sampleCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Todo App</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        
        .container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            padding: 30px;
            width: 100%;
            max-width: 400px;
        }
        
        h1 {
            color: #333;
            text-align: center;
            margin-bottom: 30px;
            font-size: 2rem;
        }
        
        .input-container {
            display: flex;
            margin-bottom: 20px;
            gap: 10px;
        }
        
        input {
            flex: 1;
            padding: 12px 16px;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            font-size: 16px;
            transition: all 0.3s ease;
        }
        
        input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        
        button {
            padding: 12px 20px;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        button:hover {
            background: #5a67d8;
            transform: translateY(-2px);
        }
        
        .todo-list {
            list-style: none;
        }
        
        .todo-item {
            background: #f8f9fa;
            margin: 8px 0;
            padding: 15px;
            border-radius: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 0.3s ease;
        }
        
        .todo-item:hover {
            transform: translateX(5px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .todo-text {
            flex: 1;
            font-size: 16px;
            color: #333;
        }
        
        .todo-item.completed .todo-text {
            text-decoration: line-through;
            color: #888;
        }
        
        .delete-btn {
            background: #ff4757;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 12px;
            transition: all 0.3s ease;
        }
        
        .delete-btn:hover {
            background: #ff3838;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>✨ Todo App</h1>
        <div class="input-container">
            <input type="text" id="todoInput" placeholder="Add a new task..." />
            <button onclick="addTodo()">Add</button>
        </div>
        <ul class="todo-list" id="todoList"></ul>
    </div>

    <script>
        let todos = [];
        let todoId = 0;

        function addTodo() {
            const input = document.getElementById('todoInput');
            const text = input.value.trim();
            
            if (text === '') return;
            
            const todo = {
                id: todoId++,
                text: text,
                completed: false
            };
            
            todos.push(todo);
            input.value = '';
            renderTodos();
        }

        function toggleTodo(id) {
            todos = todos.map(todo => 
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            );
            renderTodos();
        }

        function deleteTodo(id) {
            todos = todos.filter(todo => todo.id !== id);
            renderTodos();
        }

        function renderTodos() {
            const todoList = document.getElementById('todoList');
            todoList.innerHTML = '';
            
            todos.forEach(todo => {
                const li = document.createElement('li');
                li.className = \`todo-item \${todo.completed ? 'completed' : ''}\`;
                li.innerHTML = \`
                    <span class="todo-text" onclick="toggleTodo(\${todo.id})">\${todo.text}</span>
                    <button class="delete-btn" onclick="deleteTodo(\${todo.id})">Delete</button>
                \`;
                todoList.appendChild(li);
            });
        }

        // Allow Enter key to add todos
        document.getElementById('todoInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTodo();
            }
        });
    </script>
</body>
</html>`;

  // Simulate code generation
  const handleGenerateCode = async () => {
    if (!idea.trim()) return;
    
    setIsGenerating(true);
    setStatus('generating');
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setGeneratedCode(sampleCode);
    setIsGenerating(false);
    setStatus('ready');
    setApiUsage(prev => prev + 5);
  };

  // Simulate code modification
  const handleModifyCode = async () => {
    if (!modifyPrompt.trim() || !generatedCode) return;
    
    setIsModifying(true);
    setStatus('modifying');
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsModifying(false);
    setStatus('ready');
    setModifyPrompt('');
    setApiUsage(prev => prev + 3);
  };

  // Update iframe content
  useEffect(() => {
    if (iframeRef.current && generatedCode) {
      const iframe = iframeRef.current;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(generatedCode);
        iframeDoc.close();
      }
    }
  }, [generatedCode]);

  const StatusIndicator = ({ status }) => {
    const statusConfig = {
      ready: { icon: CheckCircle, color: 'text-green-500', text: 'Ready' },
      generating: { icon: Loader2, color: 'text-blue-500', text: 'Generating...' },
      modifying: { icon: RefreshCw, color: 'text-orange-500', text: 'Modifying...' },
      error: { icon: AlertCircle, color: 'text-red-500', text: 'Error' }
    };
    
    const config = statusConfig[status];
    const Icon = config.icon;
    
    return (
      <div className="flex items-center gap-2">
        <Icon className={`w-4 h-4 ${config.color} ${status === 'generating' || status === 'modifying' ? 'animate-spin' : ''}`} />
        <span className={`text-sm ${config.color}`}>{config.text}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-800">CodeGen AI</h1>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <input
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="px-3 py-1 text-sm bg-gray-100 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Project title"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <StatusIndicator status={status} />
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
              <span>API Usage:</span>
              <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-300"
                  style={{ width: `${apiUsage}%` }}
                />
              </div>
              <span>{apiUsage}%</span>
            </div>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <History className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
            <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Idea Input Section */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Describe your idea
                  </label>
                  <textarea
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder="e.g., Create a todo app with drag and drop functionality, colorful design, and local storage..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                </div>
                <div className="flex flex-col justify-end">
                  <button
                    onClick={handleGenerateCode}
                    disabled={isGenerating || !idea.trim()}
                    className="px-6 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 font-medium"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5" />
                        Generate Code
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              {/* Modify Prompt */}
              {generatedCode && (
                <div className="flex flex-col md:flex-row gap-4 pt-4 border-t border-gray-200">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Modify design or functionality
                    </label>
                    <input
                      type="text"
                      value={modifyPrompt}
                      onChange={(e) => setModifyPrompt(e.target.value)}
                      placeholder="e.g., Make it dark theme, add animations, change colors to green..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={handleModifyCode}
                      disabled={isModifying || !modifyPrompt.trim()}
                      className="px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                    >
                      {isModifying ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Modifying...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="w-4 h-4" />
                          Modify
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Code Editor and Preview */}
        <div className="flex-1 flex">
          {/* Sidebar History */}
          {showHistory && (
            <div className="w-64 bg-white border-r border-gray-200 p-4">
              <h3 className="font-medium text-gray-800 mb-4">History</h3>
              <div className="space-y-2">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                    <div className="text-sm font-medium text-gray-700">Version {item}</div>
                    <div className="text-xs text-gray-500">2 hours ago</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main Editor and Preview Area */}
          <div className="flex-1 flex flex-col">
            {/* View Mode Controls */}
            <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('split')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'split' ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100'}`}
                >
                  <Split className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('code')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'code' ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100'}`}
                >
                  <Code className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('preview')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'preview' ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100'}`}
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Copy className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Download className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => setIsPreviewMaximized(!isPreviewMaximized)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {isPreviewMaximized ? (
                    <Minimize2 className="w-4 h-4 text-gray-600" />
                  ) : (
                    <Maximize2 className="w-4 h-4 text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Editor and Preview Content */}
            <div className="flex-1 flex">
              {/* Code Editor */}
              {(viewMode === 'split' || viewMode === 'code') && (
                <div className={`${viewMode === 'split' ? 'w-1/2' : 'w-full'} flex flex-col bg-gray-900`}>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 text-sm">
                    <button
                      onClick={() => setActiveTab('html')}
                      className={`px-3 py-1 rounded transition-colors ${activeTab === 'html' ? 'bg-purple-600 text-white' : 'hover:bg-gray-700'}`}
                    >
                      HTML
                    </button>
                    <button
                      onClick={() => setActiveTab('css')}
                      className={`px-3 py-1 rounded transition-colors ${activeTab === 'css' ? 'bg-purple-600 text-white' : 'hover:bg-gray-700'}`}
                    >
                      CSS
                    </button>
                    <button
                      onClick={() => setActiveTab('js')}
                      className={`px-3 py-1 rounded transition-colors ${activeTab === 'js' ? 'bg-purple-600 text-white' : 'hover:bg-gray-700'}`}
                    >
                      JavaScript
                    </button>
                  </div>
                  <div className="flex-1 p-4 overflow-auto">
                    <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
                      {generatedCode || '// Your generated code will appear here...\n// Start by describing your idea above!'}
                    </pre>
                  </div>
                </div>
              )}

              {/* Preview */}
              {(viewMode === 'split' || viewMode === 'preview') && (
                <div className={`${viewMode === 'split' ? 'w-1/2 border-l border-gray-200' : 'w-full'} flex flex-col bg-white`}>
                  <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
                    <span className="text-sm text-gray-600">Live Preview</span>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex-1 bg-gray-50">
                    {generatedCode ? (
                      <iframe
                        ref={iframeRef}
                        className="w-full h-full border-0 rounded-lg"
                        title="Preview"
                        sandbox="allow-scripts allow-same-origin"
                        style={{ minHeight: '400px' }}
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center text-gray-500" style={{ minHeight: '400px' }}>
                        <div className="text-center">
                          <Eye className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                          <p className="text-lg font-medium mb-2">No Preview Available</p>
                          <p className="text-sm">Generate code to see the live preview</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeGeneratorPlatform;