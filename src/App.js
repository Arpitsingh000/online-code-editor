import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import SplitPane from 'react-split-pane';
import './App.css';

function App() {
  const [html, setHtml] = useState('<div>\n  <h1>Hello, World!</h1>\n  <p>Start editing to see some magic happen!</p>\n</div>');
  const [css, setCss] = useState('h1 {\n  color: #0066cc;\n}\n\np {\n  font-size: 16px;\n}');
  const [js, setJs] = useState('// Add your JavaScript here\nconsole.log("Editor loaded!");');
  const [activeTab, setActiveTab] = useState('html');
  const [srcDoc, setSrcDoc] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <!DOCTYPE html>
        <html>
          <head>
            <style>${css}</style>
          </head>
          <body>${html}
            <script>${js}</script>
          </body>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="app-container">
      <div className="editor-header">
        <h1>Online Code Editor</h1>
        <div className="tabs">
          <button
            className={activeTab === 'html' ? 'active' : ''}
            onClick={() => handleTabClick('html')}
          >
            HTML
          </button>
          <button
            className={activeTab === 'css' ? 'active' : ''}
            onClick={() => handleTabClick('css')}
          >
            CSS
          </button>
          <button
            className={activeTab === 'js' ? 'active' : ''}
            onClick={() => handleTabClick('js')}
          >
            JS
          </button>
        </div>
      </div>
      <SplitPane
        split="vertical"
        minSize={100}
        defaultSize="50%"
        className="split-pane"
      >
        <div className="editor-container">
          {activeTab === 'html' && (
            <Editor
              height="100%"
              defaultLanguage="html"
              value={html}
              onChange={setHtml}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 16,
                wordWrap: 'on',
              }}
            />
          )}
          {activeTab === 'css' && (
            <Editor
              height="100%"
              defaultLanguage="css"
              value={css}
              onChange={setCss}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 16,
                wordWrap: 'on',
              }}
            />
          )}
          {activeTab === 'js' && (
            <Editor
              height="100%"
              defaultLanguage="javascript"
              value={js}
              onChange={setJs}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 16,
                wordWrap: 'on',
              }}
            />
          )}
        </div>
        <div className="preview-container">
          <iframe
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts"
            frameBorder="0"
            width="100%"
            height="100%"
          />
        </div>
      </SplitPane>
    </div>
  );
}

export default App;
