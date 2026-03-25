# Interactive FAQ Webpage

An interactive FAQ-style webpage built with HTML, CSS, and Object-Oriented JavaScript. Questions toggle to reveal/hide answers with smooth animations.

## Features

- Semantic HTML structure
- CSS transitions for smooth expand/collapse
- OOP JavaScript with `QAItem` class
- Dynamic generation from data array
- Visual cues (+/- icons)

## Files

- `index.html` - Main structure
- `style.css` - Styling and animations
- `script.js` - OOP logic and interactivity
- `README.md` - This file

## Usage

1. Open `index.html` in a web browser
2. Click any question to toggle its answer

## How it Works

1. **QAItem Class**: Manages individual Q&A pairs with `toggle()`, `updateUI()`, and `render()` methods
2. **Data Array**: Holds `QAItem` instances
3. **Dynamic Rendering**: JavaScript populates the page on load
4. **Event Handling**: Click events toggle visibility and update icons