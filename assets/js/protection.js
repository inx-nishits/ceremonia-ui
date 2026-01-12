/**
 * UI Demo Protection Script
 * Implements client-side deterrents for the demo version.
 */

(function () {
    'use strict';

    // 1. Watermark removed as per user request
    function createWatermark() {
        // Watermark disabled
    }

    // 2. Create Notification Toast
    function createToast() {
        const toast = document.createElement('div');
        toast.id = 'protection-toast';
        toast.textContent = 'Right-click is disabled on this demo';
        document.body.appendChild(toast);
    }

    function showToast(message) {
        const toast = document.getElementById('protection-toast');
        if (toast) {
            toast.textContent = message;
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 2000);
        }
    }

    // 3. Disable Right Click
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        showToast('Right-click is disabled on this demo');
    });

    // 4. Disable Keyboard Shortcuts (DevTools, Save, Print, etc.)
    document.addEventListener('keydown', function (e) {
        // F12
        if (e.key === 'F12') {
            e.preventDefault();
            showToast('DevTools are disabled');
        }

        // Ctrl+Shift+I (DevTools)
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
            e.preventDefault();
            showToast('DevTools are disabled');
        }

        // Ctrl+Shift+J (Console)
        if (e.ctrlKey && e.shiftKey && e.key === 'J') {
            e.preventDefault();
            showToast('Console is disabled');
        }

        // Ctrl+Shift+C (Inspect)
        if (e.ctrlKey && e.shiftKey && e.key === 'C') {
            e.preventDefault();
            showToast('Inspector is disabled');
        }

        // Ctrl+U (View Source)
        if (e.ctrlKey && e.key === 'u') {
            e.preventDefault();
            showToast('View Source is disabled');
        }

        // Ctrl+S (Save)
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            showToast('Saving is disabled');
        }
    });

    // 5. Disable Image Dragging
    function protectImages() {
        const images = document.getElementsByTagName('img');
        for (let i = 0; i < images.length; i++) {
            images[i].setAttribute('draggable', 'false');
            images[i].addEventListener('dragstart', function (e) {
                e.preventDefault();
            });
        }
    }

    // 6. DevTools Detection (Simple Window Size Monitor)
    // This is a basic detection that checks if window size changes significantly without resize event likely due to devtools opening
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    window.addEventListener('resize', function () {
        const threshold = 160; // Minimum dock size for devtools usually
        const widthDiff = windowWidth - window.innerWidth;
        const heightDiff = windowHeight - window.innerHeight;

        if (widthDiff > threshold || heightDiff > threshold) {
            console.log('%c⚠️ UI Demo Protection Active', 'font-size: 20px; color: #823AAF; font-weight: bold;');
            console.log('%cThis is a protected UI demonstration.', 'font-size: 14px; color: #2A2826;');
        }

        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
    });

    // Initialize
    window.addEventListener('DOMContentLoaded', () => {
        // createWatermark(); // Disabled
        createToast();
        protectImages();

        // Log protection message
        console.log('%c⚠️ UI Demo Protection Active', 'font-size: 20px; color: #823AAF; font-weight: bold;');
    });

})();
