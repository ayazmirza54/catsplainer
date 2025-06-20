/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Modality } from '@google/genai';
import { marked } from 'marked';
import { useEffect, useState } from 'react';
import '../pawsplainer.css'
const Catsplainer = () => {
    const [apiKeyMissing, setApiKeyMissing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

        if (!apiKey) {
            console.error('VITE_GEMINI_API_KEY is not set. Please add it to your .env file.');
            setApiKeyMissing(true);
            return;
        }

        const ai = new GoogleGenAI({ apiKey });

        const userInput = document.querySelector('#input') as HTMLTextAreaElement;
        const modelOutput = document.querySelector('#output') as HTMLDivElement;
        const slideshow = document.querySelector('#slideshow') as HTMLDivElement;
        const error = document.querySelector('#error') as HTMLDivElement;
        const submitButton = document.querySelector('#submit-button') as HTMLButtonElement;
        const loader = document.querySelector('#loader') as HTMLDivElement;

        const additionalInstructions = `
Use a fun story about lots of tiny dogs and puppies as a metaphor.
Keep sentences short but conversational, casual, and engaging.
Generate a cute, minimal illustration for each sentence with black ink on white background.
No commentary, just begin your explanation.
Keep going until you're done.`;

        async function addSlide(text: string, image: HTMLImageElement) {
            const slide = document.createElement('div');
            slide.className = 'slide';
            const caption = document.createElement('div') as HTMLDivElement;
            caption.innerHTML = await marked.parse(text);
            slide.append(image);
            slide.append(caption);
            slideshow.append(slide);
        }

        function parseError(error: string) {
            const regex = /{"error":(.*)}/gm;
            const m = regex.exec(error);
            try {
                const e = m?.[1];
                const err = JSON.parse(e as string);
                return err.message;
            } catch (e) {
                return error;
            }
        }

        async function generate(message: string) {
            if (!message.trim()) return;

            setIsLoading(true);
            userInput.disabled = true;
            submitButton.disabled = true;
            loader.removeAttribute('hidden');

            // Create a new chat instance to clear history
            const chat = ai.chats.create({
                model: 'gemini-2.0-flash-preview-image-generation',
                config: {
                    responseModalities: [Modality.TEXT, Modality.IMAGE],
                },
                history: [],
            });

            modelOutput.innerHTML = '';
            slideshow.innerHTML = '';
            error.innerHTML = '';
            error.toggleAttribute('hidden', true);

            try {
                const userTurn = document.createElement('div') as HTMLDivElement;
                userTurn.innerHTML = await marked.parse(message);
                userTurn.className = 'user-turn';
                modelOutput.append(userTurn);
                userInput.value = '';

                const result = await chat.sendMessageStream({
                    message: message + additionalInstructions,
                });

                let text = '';
                let img = null;

                for await (const chunk of result) {
                    for (const candidate of chunk.candidates as any) {
                        for (const part of candidate.content?.parts ?? []) {
                            if (part.text) {
                                text += part.text;
                            } else {
                                try {
                                    const data = part.inlineData;
                                    if (data) {
                                        img = document.createElement('img');
                                        img.src = `data:image/png;base64,` + data.data;
                                    } else {
                                        console.log('no data', chunk);
                                    }
                                } catch (e) {
                                    console.log('no data', chunk);
                                }
                            }
                            if (text && img) {
                                await addSlide(text, img);
                                slideshow.removeAttribute('hidden');
                                text = '';
                                img = null;
                            }
                        }
                    }
                }
                if (img) {
                    await addSlide(text, img);
                    slideshow.removeAttribute('hidden');
                    text = '';
                }
            } catch (e) {
                const msg = parseError(e as string);
                error.innerHTML = `Something went wrong: ${msg}`;
                error.removeAttribute('hidden');
            } finally {
                setIsLoading(false);
                userInput.disabled = false;
                submitButton.disabled = false;
                loader.setAttribute('hidden', '');
                userInput.focus();
            }
        }

        // Handle Enter key press
        userInput.addEventListener('keydown', async (e: KeyboardEvent) => {
            if (e.code === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                const message = userInput.value;
                await generate(message);
            }
        });

        // Handle submit button click
        submitButton.addEventListener('click', async () => {
            const message = userInput.value;
            await generate(message);
        });

        const examples = document.querySelectorAll('#examples li');
        examples.forEach((li) =>
            li.addEventListener('click', async () => {
                await generate(li.textContent as string);
            }),
        );
    }, []);

    return (
        <div className="catsplainer-container">
            {apiKeyMissing ? (
                <div style={{ padding: '20px', textAlign: 'center' }}>
                    <h1 className="catsplainer-title">🐶 Pawsplainer</h1>
                    <p style={{ color: 'red', marginBottom: '20px' }}>
                        ⚠️ API Key Missing
                    </p>
                    <p>
                        Please create a <code>.env</code> file in your project root and add:
                    </p>
                    <pre style={{
                        background: '#f5f5f5',
                        padding: '10px',
                        borderRadius: '4px',
                        margin: '10px 0'
                    }}>
                        VITE_GEMINI_API_KEY=your_gemini_api_key_here
                    </pre>
                    <p>
                        Get your API key from{' '}
                        <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer">
                            Google AI Studio
                        </a>
                    </p>
                </div>
            ) : (
                <div>
                    <h1 className="catsplainer-title">🐶 Pawsplainer</h1>
                    <p className="catsplainer-description">Ask me anything and I'll explain it using tiny puppies!</p>

                    <div id="examples">
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5em' }}>Try these examples:</h3>
                        <ul>
                            <li>How does photosynthesis work?</li>
                            <li>What is machine learning?</li>
                            <li>Explain quantum physics</li>
                        </ul>
                    </div>

                    <textarea
                        id="input"
                        placeholder="Ask me anything..."
                        rows={3}
                    ></textarea>

                    <button
                        id="submit-button"
                        className="catsplainer-submit"
                        type="button"
                        disabled={isLoading}
                    >
                        {isLoading ? '🐾 Thinking...' : '🐾 Explain with Puppies!'}
                    </button>

                    <div id="loader" className="loader-container" hidden>
                        <div className="loader">
                            <div className="paw-print paw-1"></div>
                            <div className="paw-print paw-2"></div>
                            <div className="paw-print paw-3"></div>
                        </div>
                        <p className="loader-text">Create fun explanations with cute dog images...</p>
                    </div>

                    <div id="error" hidden></div>

                    <div id="output"></div>
                    <div id="slideshow" hidden></div>
                </div>
            )}
        </div>
    );
};

export default Catsplainer;
