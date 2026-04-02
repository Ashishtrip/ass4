class QAItem {
    /**
     * Represents a single FAQ Q&A pair with toggle functionality.
     * @param {string} question - The question text
     * @param {string} answer - The answer text
     */
    constructor(question, answer) {
        this.question = question;
        this.answer = answer;
        this.isExpanded = false;
        this.element = null;
        this.questionElement = null;
        this.answerElement = null;
        this.toggleIcon = null;
    this.answerId = `ans-${Math.random().toString(36).substr(2, 9)}`; // Unique ID for ARIA
    }

    /**
     * Toggle the expanded state of this FAQ item and update UI/accessibility.
     */
    toggle() {
        this.isExpanded = !this.isExpanded;
        this.updateUI();
    }

    /**
     * Updates the DOM for expanded/collapsed state:
     * - Icon text (+/-), rotation class removed via CSS
     * - Dynamic maxHeight for smooth scalable animation
     * - ARIA attributes for accessibility
     */
    updateUI() {
        if (this.toggleIcon) {
            this.toggleIcon.textContent = this.isExpanded ? '−' : '+';
        }
        if (this.answerElement) {
            this.answerElement.classList.toggle('active', this.isExpanded);
            // Dynamic max-height for scalable animation
            if (this.isExpanded) {
                this.answerElement.style.maxHeight = `${this.answerElement.scrollHeight}px`;
            } else {
                this.answerElement.style.maxHeight = '0px';
            }
        }

        if (this.questionElement) {
            this.questionElement.classList.toggle('active', this.isExpanded);
            // Update ARIA for screen readers
            this.questionElement.setAttribute('aria-expanded', this.isExpanded);
        }
    }

    /**
     * Generates semantic HTML for this FAQ item with accessibility features.
     * Uses <article> and <h2> for better semantics/SEO/accessibility.
     * Adds keyboard support (Enter/Space) and ARIA attributes.
     * @returns {HTMLElement} The rendered FAQ item
     */
    render() {
        const faqItem = document.createElement('article');
        faqItem.className = 'faq-item';

        const questionEl = document.createElement('h2');
        questionEl.className = 'question';
        questionEl.setAttribute('role', 'button');
        questionEl.setAttribute('tabindex', '0');
        questionEl.setAttribute('aria-expanded', 'false');
        questionEl.setAttribute('aria-controls', this.answerId);
        questionEl.innerHTML = `
            ${this.question}
            <span class="toggle-icon" aria-hidden="true">+</span>
        `;

        const answerDiv = document.createElement('div');
        answerDiv.id = this.answerId;
        answerDiv.className = 'answer';
        answerDiv.innerHTML = `<p>${this.answer}</p>`;

        faqItem.appendChild(questionEl);
        faqItem.appendChild(answerDiv);

        this.element = faqItem;
        this.questionElement = questionEl;
        this.answerElement = answerDiv;
        this.toggleIcon = questionEl.querySelector('.toggle-icon');

        // Event listeners: mouse click + keyboard (Enter/Space)
        const toggleHandler = (e) => {
            if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') {
                return;
            }
            if (e.type === 'keydown') {
                e.preventDefault();
            }
            this.toggle();
        };
        questionEl.addEventListener('click', toggleHandler);
        questionEl.addEventListener('keydown', toggleHandler);

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

/**
 * Initialize the FAQ section when DOM is ready:
 * Renders all QAItems from faqData into the container.
 */
document.addEventListener('DOMContentLoaded', () => {
    const faqContainer = document.getElementById('faq-items');
    
    faqData.forEach(qaItem => {
        const renderedItem = qaItem.render();
        faqContainer.appendChild(renderedItem);
    });
});
