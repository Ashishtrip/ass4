class QAItem {
    constructor(question, answer) {
        this.question = question;
        this.answer = answer;
        this.isExpanded = false;
        this.element = null;
        this.questionElement = null;
        this.answerElement = null;
        this.toggleIcon = null;
    }

    // Toggle visibility of the answer
    toggle() {
        this.isExpanded = !this.isExpanded;
        this.updateUI();
    }

    // Update visual cue and visibility
    updateUI() {
        if (this.toggleIcon) {
            this.toggleIcon.textContent = this.isExpanded ? '−' : '+';
        }
        if (this.answerElement) {
            this.answerElement.classList.toggle('active', this.isExpanded);
        }
        if (this.questionElement) {
            this.questionElement.classList.toggle('active', this.isExpanded);
        }
    }

    // Render HTML for this QAItem
    render() {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';

        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `
            ${this.question}
            <span class="toggle-icon">+</span>
        `;

        const answerDiv = document.createElement('div');
        answerDiv.className = 'answer';
        answerDiv.innerHTML = `<p>${this.answer}</p>`;

        faqItem.appendChild(questionDiv);
        faqItem.appendChild(answerDiv);

        this.element = faqItem;
        this.questionElement = questionDiv;
        this.answerElement = answerDiv;
        this.toggleIcon = questionDiv.querySelector('.toggle-icon');

        // Add event listener
        questionDiv.addEventListener('click', () => this.toggle());

        return faqItem;
    }
}

// Array of QAItem instances
const faqData = [
    new QAItem(
        'What is Object-Oriented Programming?',
        'Object-Oriented Programming (OOP) is a programming paradigm based on the concept of "objects", which can contain data and code: data in the form of fields (attributes), and code in the form of procedures (methods).'
    ),
    new QAItem(
        'How do CSS transitions work?',
        'CSS transitions allow you to change property values smoothly, from one value to another, over a given duration. They are triggered when a property changes, such as on hover or with JavaScript class toggling.'
    ),
    new QAItem(
        'Why use semantic HTML?',
        'Semantic HTML uses elements that convey meaning to both developers and browsers. It improves accessibility, SEO, and makes code more readable and maintainable.'
    )
];

// Initialize the FAQ when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const faqContainer = document.getElementById('faq-items');
    
    faqData.forEach(qaItem => {
        const renderedItem = qaItem.render();
        faqContainer.appendChild(renderedItem);
    });
});
