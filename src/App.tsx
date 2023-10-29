
import './App.css'
import UploadForm from './upload'

function App() {
    return (
        <UploadForm></UploadForm>
    )
}

export default App


// import { useState } from 'react';
// import React from "react";
// import * as nbt from "prismarine-nbt";
// import { Buffer } from 'buffer';

// const App = () => {
//     const [test, setTest] = useState("");

//     const base64 = "H4sIAAAAAAAAAOXW2Y7TSBQA0JtONyRhaRYxAwKJYhlekMGOt5i3EJskUnpR8PAale1rx+rYbtkVBv5gfoI3pPxHPoUPQVynN5qwtIZoHiAPrlTdupVbVUdJGgB1qMQNAFhfg7U4qFgV2Ohk01RUGlAVPKrDOqb+GMpXBS78nXo58j3uTbBShXovDvDFhEcFRT824HwQF/sT/paSBlmONRq9DFfnM7OHfCLGz9h8xh+bOlyjIRtDTAs8HFNo6oX5zOrm2T9izF7BfZrSzXkqisMkavwP796zg6Uo+gSuUMJungn0RZylrP8KHpzOUoyy+fDuX3b4aYu0S5TmjrM8LVi/34e7Jzm8nK7Lf1Fj+mOe+shEtlg0R48OJSjj1iKchSzgCY+QBWVBcJPGPO7vMS6YGCM1gnqYP6GNlfPns5Y7jgsWC0yYz1PmIcsxzPIIg3uLncxnk2F76LDnOzvuyxqsb/ME4RYFejwPMMWA2TFPMirieZaJAhqw6bwROW8LkcfeVGBRg1qSBXEYYw7re4hpDepZHkdx6vIIbnSG7Rduf7s76g779qizMxg4HbdW3jr80WsPbWfbsUd2v721s22PFlU04GJ5+XQ2CdL5VOGcWJwb7alKnWhxWdTZqEJj//giSkxAG5hOaeWHTcvXW5qGkhIilzSTG5LXtGTJsDwvVHWu6YpF6Tx9HU9G0wLLxStUuIgTLARP9mHTeKq0nioWs55pOtvdAliDc/bi8KF8X7Jt/R9sr3/JVlF+c7fXP3M7cLpd0nVM987X6A4wIo7RavXeWtJ7VMtqAKuGZ1o62fXpYXBL8lTZkwI5CEwrMFHRzJ8HbK4Y8KWzAVaNXxnwjc94dnrOS3d30HadI6CPKGojsYx9tgS1M6bLozMV+AOq54ODJc6s9faS1pPSVuFVlnWLN3koqaFpSJqi+xJXuSfJmhUqckuW0VTO7lX7hldjxV7rZ/qf0JL/C9fN01yXtDblr2mFsqJjPj1nsOW4R3Tuf49ODycJilWz+XOJzUFJS2ROw9g4xeZEiaai4euqKbU8rklaQA/L9EOJfp8t2ZRRa6rNn/lWg0+Rk6/ZWwoAAA==";

//     nbt.parse(Buffer.from(base64, "base64")).then((data) => {
//         setTest(JSON.stringify(data, null, 4));
//     })
//     return (
//         <div>
//             <h1>welcome!</h1>
//             <p>this is react development environment built by webpack!</p>
//             <pre>{test}</pre>
//         </div>
//     )
// };

// export default App;