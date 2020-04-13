import React from 'react';
import {AppRouter} from './AppRouter';
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/components/prism-typescript.min.js';
import {SessionProvider} from '../context/SessionContext';

function App() {
    return (
        <div>
            <SessionProvider>
                <AppRouter/>
            </SessionProvider>
        </div>
    );
}

export default App;
