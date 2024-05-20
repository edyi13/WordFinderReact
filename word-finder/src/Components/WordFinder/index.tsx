import axios from 'axios';
import { useState } from 'react';
import MatrixGrid from '../MatrixGrid';
import WordStream from '../WordStream';
import WordCount from '../WordsCount';
import './index.css';
interface Props{
    matrix: string[],
    wordStream: string[]
}
export const WordFinder = ({ matrix, wordStream }: Props) => {
    const [wordCounts, setWordCounts] = useState<string[]>([]);
    const [wordStreamInput, setWordStream] = useState<string[]>([]);
    const [matrixInput, setMatrix] = useState<string[]>([]);
    const [newMatrix, setNewMatrix] = useState<boolean>(false);

    const getWordCounts = async () => {
        try {
            const matrixParam =matrixInput.length > 0 ? matrixInput : matrix;
            const wordStreamParam = wordStreamInput.length > 0 ? wordStreamInput : wordStream;
            const baseUrl = 'https://word-finder-dev.azurewebsites.net/api/v1/WordFinder/GetMostRepeatedWords';
            const queryParams = new URLSearchParams();
            matrixParam.forEach((value, index) => { 
                queryParams.append(`matrix[${index}]`, value);
            });
            wordStreamParam.forEach((value, index) => { 
                queryParams.append(`wordStream[${index}]`, value); 
            });
            const response = await axios.get(baseUrl, { params: queryParams });
            return response.data;
        } catch (error) {
            return error;
        }
    };

    const getNewMatrix = async () => {
        try {
            const size = wordStreamInput.length;
            const queryParams = new URLSearchParams();
            wordStreamInput.forEach((value, index) => {
            queryParams.append(`words[${index}]`, value);
            });
            queryParams.append('size', size.toString());
            console.log(wordStreamInput);
            const baseUrl ="https://word-finder-dev.azurewebsites.net/api/v1/WordFinder/GetNewMatrix";
            const response = await axios.get(baseUrl, { params: queryParams });
            return response.data;
        } catch (error) {
        return error;
        }
    };

    const handleGetWordsCountButtonClick = () => {
            getWordCounts()
            .then((words) => setWordCounts(words.data))
            .catch((error) => console.error(error));        
    };

    const handleGetNewMatrixButtonClick = () => {
            getNewMatrix()
                .then((matrix) => {
                    setMatrix(matrix.data); 
                    setNewMatrix(false);
                })
        
    };

    const handleMatrixChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setMatrix(value.replace(/\s/g, "").split(','));
        console.log(matrixInput)
    };

    const handleWordStreamChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setWordStream(value.replace(/\s/g, "").split(','));
        console.log(wordStreamInput)
    };

    // Rest of the code...

    return (
        <div>
            <h1>Word Finder</h1>
            <label htmlFor="new-matrix">Generate Matrix: </label>
            <input 
                type="checkbox" 
                id="new-matrix" 
                name="new-matrix" 
                checked={newMatrix} 
                onChange={() => setNewMatrix(!newMatrix)} />            
            <br />
            <label htmlFor="matrix-input">Matrix: </label>
            <input
                id="matrix-input"
                disabled={newMatrix}
                type="text" 
                placeholder="Enter matrix values" 
                onChange={handleMatrixChange}
                style={{ width: '500px', height: '25px', fontSize: '12px' }}
            />
            <br />
            <label htmlFor="word-stream-input">Words: </label>
            <input
                id="word-stream-input"
                type="text"                
                placeholder="Enter word stream values" 
                onChange={handleWordStreamChange}
                style={{ width: '500px', height: '25px', fontSize: '12px' }}
            />
            <br />
            <br />
            {<MatrixGrid matrix={typeof matrixInput !== 'undefined' && matrixInput.length > 0 ? matrixInput : matrix} />}
            {<WordStream wordStream={wordStreamInput.length > 0 ? wordStreamInput : wordStream}/>}
            {<WordCount wordCount={wordCounts}/>}
            <button className='button' disabled={!newMatrix} onClick={() => handleGetNewMatrixButtonClick()}>Get New Matrix</button>
            <button className='button' onClick={() => handleGetWordsCountButtonClick()}>Get Word Counts</button>
        </div>
    );
};
