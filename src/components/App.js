import React, { useState, useEffect } from 'react';
import Editor from './Editor'
// import { Card } from 'react-bootstrap';
import useLocalStorage from '../hooks/useLocalStorage'

function App() {
  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')
  const [active, setActive] = useState("h")

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, css, js])

  return (
    <>

      <div className="pane top-pane">
        
        <div className="top-left">
          {/* <Card styles={{ card: { backgroundColor: 'red' }}}>
          <Card.Header>Featured</Card.Header> */}
          <h1 style={{ color: 'white' }}>Code Editor</h1>
          <button onClick={() => setActive("h")}>index.html</button>
          <button onClick={() => setActive("c")}>index.css</button>
          <button onClick={() => setActive("j")}>index.js</button>
        </div>
        {active === "h" && <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />}
        {active === "c" && <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />}
        {active === "j" && <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />}
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  )
}

export default App;
