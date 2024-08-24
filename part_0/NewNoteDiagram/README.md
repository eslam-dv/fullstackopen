```mermaid
sequenceDiagram
    participant user
    participant browser
    participant server
    
    user->>browser: submit new note

    Note right of browser: The Browser sends a new note to the server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server->>browser: location: /notes
    deactivate server

    Note right of browser: The server redirects the browser to /notes
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes 
    activate server
    server->>browser: HTML document
    deactivate server   
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server->>browser: the css file
    deactivate server
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server->>browser: the JS file
    deactivate server
    
    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server->>browser: the notes json file
    deactivate server```