let startTime;
let interval;
let timerInterval;
let wordsTyped = 0;
const TEST_DURATION = 35; // in seconds
let testActive = false; // Flag to check if the test is active

const paragraphs = [
    "In the world of coding, every new project is an opportunity to learn and grow. Developers continuously expand their skill set, exploring new technologies and methodologies. The ever-changing landscape of programming ensures that there is always something new to discover.",
    "Programming is a playground for the curious and imaginative. It offers a space to experiment, create, and explore new ideas. The freedom to build and innovate makes coding an exciting and dynamic field.",
    "Coding is a collaborative endeavor, often involving teams of developers working together towards a common goal. The synergy of different perspectives and expertise leads to innovative solutions and high-quality software. Teamwork and communication are as crucial as coding skills.",
    "The essence of coding lies in its problem-solving nature. Developers approach each task with analytical minds, breaking down problems and devising solutions. This methodical approach transforms abstract ideas into functional software solutions.",
    "In the digital age, coding is the key to unlocking new possibilities. From artificial intelligence to blockchain, programmers are at the forefront of technological advancements. The ability to harness the power of code is a gateway to shaping the future.",
    "Coding is a blend of logic, creativity, and perseverance. Each project challenges developers to apply their skills in new and innovative ways, pushing the boundaries of what's possible. The thrill of seeing an idea come to life through code is unmatched.",
    "The impact of coding extends far beyond the screen. Developers build the tools that shape our digital interactions, from mobile apps to web services. The ability to influence how people connect and communicate is a powerful aspect of programming.",
    "In programming, every mistake is a learning opportunity. Debugging and refining code are integral parts of the development process, leading to deeper understanding and improved skills. Embracing errors as part of the journey is essential for growth as a coder.",
    "Coding is a dance between logic and creativity. Developers choreograph their code to perform specific tasks, balancing technical requirements with innovative solutions. The result is a well-oiled digital machine that performs seamlessly.",
    "The thrill of coding comes from the constant challenge of overcoming obstacles. Each project presents a unique set of requirements and constraints, pushing developers to think outside the box. The journey of turning a concept into a functional application is both exhilarating and fulfilling.",
    "Writing code is like constructing a bridge between the user's needs and technological solutions. Developers design and build this bridge with precision, ensuring a seamless connection. The end result is a user-friendly product that meets real-world demands.",
    "In the coding universe, every line of code is a step towards building something extraordinary. From crafting robust applications to designing intuitive interfaces, programmers shape the digital world with their expertise. Each project is a new adventure in the realm of technology.",
    "At its core, coding is a problem-solving exercise. Developers approach each project with a mindset of breaking down complex challenges into manageable parts. The process of translating problems into code is both an art and a science, requiring logical thinking and creativity.",
    "Coding is a continuous journey of learning and adaptation. As technology evolves, so do programming languages and techniques, offering endless opportunities for growth. Embracing change and staying curious are the keys to thriving in the ever-evolving tech landscape.",
    "The beauty of coding lies in its ability to turn imagination into reality. With every algorithm written and every application built, programmers transform abstract concepts into functional tools. The power to create and innovate is the true magic of software development.",
    "Programming languages are the dialects of the digital era, each with its unique syntax and use cases. Mastery of these languages allows developers to translate abstract ideas into tangible applications. The versatility of coding languages empowers creators to bring their visions to life.",
    "In the world of programming, simplicity is the ultimate sophistication. Crafting elegant code that is both efficient and easy to understand is a hallmark of a skilled developer. Striving for clarity amidst complexity is the essence of mastering coding.",
    "Writing code is like composing a symphony where each function and variable plays a crucial part. The harmony between different code components creates a seamless user experience, akin to a perfectly orchestrated piece of music. Every developer is a conductor of their own digital ensemble.",
    "In the realm of programming, bugs are merely challenges in disguise. Each error is a puzzle to be solved, pushing developers to think critically and innovate. The satisfaction of debugging and finding that elusive solution is one of coding's most rewarding experiences.",
    "Coding is the digital craftsmanship of the modern age. With each line of code, developers weave the fabric of our technological world, creating everything from complex algorithms to simple user interfaces. It's a blend of art and logic, where creativity meets precision."
];

const sentences = [
    "Coding transforms abstract ideas into functional technology, bridging the gap between imagination and reality.",

"Every bug fixed is a step closer to perfecting the code, turning errors into learning opportunities.",

"A well-written algorithm is like a well-choreographed dance, where every line of code plays a precise role.",

"The beauty of coding lies in creating elegant solutions for complex problems, blending logic with creativity.",

"Programming languages are the tools that developers use to craft digital experiences and solve real-world challenges.",

"In the realm of coding, every project is a new adventure, filled with unique problems and creative solutions.",

"Coding is not just about writing lines of code; it's about solving problems and building the future.",

"A clean and efficient codebase is the hallmark of a skilled developer, making complex systems manageable and maintainable.",

"The joy of coding comes from seeing a concept evolve into a fully functional application that users can interact with.",

"In programming, creativity meets precision, as developers design algorithms that execute flawlessly and efficiently.",

"Coding is a continuous learning journey, with each project offering new challenges and opportunities for growth.",

"The power of programming lies in its ability to automate tasks and streamline processes, making life easier and more efficient.",

"Every successful project starts with a well-thought-out plan and a clear understanding of the problem at hand.",

"The thrill of debugging is in the detective work, piecing together clues to uncover and fix hidden issues in the code.",

"Coding is like constructing a digital bridge, where each line of code supports the structure and connects users with technology.",

"The impact of coding extends beyond screens, influencing how we interact with the digital world and each other.",

"In the world of programming, innovation thrives on collaboration, where diverse ideas come together to create exceptional software.",

"A successful developer combines technical skills with creative thinking, crafting solutions that are both functional and inspiring.",

"Coding is a dynamic field where change is constant, offering endless opportunities to explore new technologies and techniques.",

"The essence of programming is in problem-solving, where developers break down challenges and create efficient, elegant solutions.",
];

function generateText(type) {
    let text;
    if (type === 'paragraph') {
        const availableParagraphs = [...paragraphs];
        text = '';
        for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * availableParagraphs.length);
            text += availableParagraphs.splice(randomIndex, 1) + '\n\n';
        }
    } else {
        const randomIndex = Math.floor(Math.random() * sentences.length);
        text = sentences[randomIndex];
    }
    document.getElementById('text-display').innerText = text.trim();
    document.getElementById('text-area').value = '';
    document.getElementById('time').innerText = '0';
    document.getElementById('speed').innerText = '0';
    clearInterval(interval);
    clearInterval(timerInterval);
    startTime = new Date();
    testActive = true;
    interval = setInterval(updateTime, 1000);
    timerInterval = setTimeout(endTest, TEST_DURATION * 1000);
    document.getElementById('text-area').disabled = false;
}

function calculateSpeed() {
    if (!testActive) return; // Do nothing if the test is not active

    const textArea = document.getElementById('text-area').value;
    const displayedText = document.getElementById('text-display').innerText.replace(/\n+/g, ' ').trim();
    
    // Check if the typed text matches the displayed text
    if (textArea.trim() === displayedText) {
        endTest();
        return;
    }

    wordsTyped = textArea.trim().split(/\s+/).length;
    const elapsedTime = (new Date() - startTime) / 1000 / 60; // time in minutes
    const speed = Math.floor(wordsTyped / elapsedTime);
    document.getElementById('speed').innerText = speed || 0;
}

function updateTime() {
    if (!testActive) return; // Do nothing if the test is not active

    const elapsedTime = Math.floor((new Date() - startTime) / 1000);
    document.getElementById('time').innerText = elapsedTime;
}

function endTest() {
    if (!testActive) return; // Ensure the test only ends once

    clearInterval(interval);
    clearTimeout(timerInterval);

    const textArea = document.getElementById('text-area').value;
    const displayedText = document.getElementById('text-display').innerText.replace(/\n+/g, ' ').trim();
    wordsTyped = textArea.trim().split(/\s+/).length;
    const elapsedTime = (new Date() - startTime) / 1000 / 60; // time in minutes
    const speed = Math.floor(wordsTyped / elapsedTime);

    document.getElementById('speed').innerText = speed || 0;
    document.getElementById('text-area').disabled = true;
    testActive = false;
}

// Clear text area on page load
window.onload = function() {
    document.getElementById('text-area').value = '';
    generateText('paragraph');
};
