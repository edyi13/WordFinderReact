import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { WordFinder } from './Components/WordFinder'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WordFinder matrix={['dolari', 'polaro', 'colart', 'molary', 'telarf', 'solarp']} wordStream={['dolar', 'polar', 'molar', 'colar']} />
  </React.StrictMode>,
)
