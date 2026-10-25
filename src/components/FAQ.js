//Import
import Questions from './data/faqs.json';
import { useState } from 'react';

//Function Component
function FAQ() {
    //Declare a "state": "enteredKeywords"
    const [enteredKeywords, setEnteredKeywords] = useState('');
    let id=0;

    //component UI
    return (
        <>
            <div style={{minHeight: '60vh', padding: '2rem', backgroundColor: '#d8ebd2' }}>
                <h1>Frequently Asked Questions</h1>
                {/*Search bar on top */}
                <div className='row'>
                    <input className='col-11 m-3'
                        type='text'
                        name='search'
                        onChange={e => {setEnteredKeywords(e.target.value)}} placeholder='Keywords'
                    >
                    </input>
                </div>
                <div>
                    {/*and extract "question & answer" from Questions JSON */}
                    {Questions.filter(
                        question => question.question.toLowerCase().includes(enteredKeywords.toLowerCase()) 
                        || question.answer.toLowerCase().includes(enteredKeywords.toLowerCase())
                    ).map(
                        question => {
                            return (
                                <div className='p-3 mb-3 mt-3' style={{backgroundColor: '#f7e6ce'}} key={id++}>
                                    <h4>{question.question}</h4>
                                    <p>{question.answer}</p>
                                </div>
                            )
                        }
                    )}
                </div>
            </div>
        </>
    )
}
//Export
export default FAQ;