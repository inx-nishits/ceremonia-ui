/**
 * UI Demo Protection Script
 * Implements client-side restrictions to discourage casual inspection
 * Note: These are deterrents only, not real security measures
 */

(function () {
    'use strict';

    // Disable right-click context menu
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        showProtectionNotice('Right-click is disabled on this demo');
        return false;
    });

    // Disable common DevTools shortcuts
    document.addEventListener('keydown', function (e) {
        // F12
        if (e.keyCode === 123) {
            e.preventDefault();
            showProtectionNotice('DevTools access is restricted on this demo');
            return false;
        }

        // Ctrl+Shift+I (Inspect)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
            e.preventDefault();
            showProtectionNotice('DevTools access is restricted on this demo');
            return false;
        }

        // Ctrl+Shift+J (Console)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
            e.preventDefault();
            showProtectionNotice('DevTools access is restricted on this demo');
            return false;
        }

        // Ctrl+U (View Source)
        if (e.ctrlKey && e.keyCode === 85) {
            e.preventDefault();
            showProtectionNotice('View source is disabled on this demo');
            return false;
        }

        // Ctrl+S (Save)
        if (e.ctrlKey && e.keyCode === 83) {
            e.preventDefault();
            showProtectionNotice('Saving is disabled on this demo');
            return false;
        }

        // Ctrl+Shift+C (Inspect Element)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
            e.preventDefault();
            showProtectionNotice('DevTools access is restricted on this demo');
            return false;
        }
    });

    // Prevent image dragging
    document.addEventListener('dragstart', function (e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            return false;
        }
    });

    // Disable text selection on images
    document.addEventListener('selectstart', function (e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            return false;
        }
    });

    // Prevent default image download
    document.addEventListener('DOMContentLoaded', function () {
        const images = document.querySelectorAll('img');
        images.forEach(function (img) {
            img.setAttribute('draggable', 'false');
            img.style.userSelect = 'none';
            img.style.webkitUserSelect = 'none';
            img.style.mozUserSelect = 'none';
            img.style.msUserSelect = 'none';
        });
    });

    // Detect DevTools opening (basic detection)
    let devtoolsOpen = false;
    const threshold = 160;

    setInterval(function () {
        if (window.outerWidth - window.innerWidth > threshold ||
            window.outerHeight - window.innerHeight > threshold) {
            if (!devtoolsOpen) {
                devtoolsOpen = true;
                showProtectionNotice('DevTools detected - This is a UI demo only');
            }
        } else {
            devtoolsOpen = false;
        }
    }, 1000);

    // Show protection notice
    function showProtectionNotice(message) {
        // Remove existing notice if any
        const existing = document.getElementById('protection-notice');
        if (existing) {
            existing.remove();
        }

        // Create notice element
        const notice = document.createElement('div');
        notice.id = 'protection-notice';
        notice.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(42, 40, 38, 0.95);
            color: white;
            padding: 20px 30px;
            border-radius: 8px;
            z-index: 999999;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            font-size: 14px;
            text-align: center;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            animation: fadeInOut 2s ease-in-out;
        `;
        notice.textContent = message;
        document.body.appendChild(notice);

        // Remove after 2 seconds
        setTimeout(function () {
            notice.remove();
        }, 2000);
    }

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
            20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
        }
    `;
    document.head.appendChild(style);

    // Disable console (optional - can be annoying for legitimate debugging)
    // Uncomment if you want to disable console
    /*
    console.log = function() {};
    console.warn = function() {};
    console.error = function() {};
    console.info = function() {};
    console.debug = function() {};
    */

    // Add watermark on page load
    window.addEventListener('load', function () {
        addWatermark();
    });

    function addWatermark() {
        const watermark = document.createElement('div');
        watermark.id = 'demo-watermark';
        watermark.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <span>UI Demo</span>
            </div>
        `;
        watermark.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(130, 58, 175, 0.9);
            color: white;
            padding: 10px 16px;
            border-radius: 6px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            font-size: 12px;
            font-weight: 500;
            z-index: 999998;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            backdrop-filter: blur(10px);
            pointer-events: none;
            user-select: none;
        `;
        document.body.appendChild(watermark);
    }

    // Prevent iframe embedding (clickjacking protection)
    if (window.top !== window.self) {
        window.top.location = window.self.location;
    }

    // Add meta tag to prevent caching
    const metaNoCache = document.createElement('meta');
    metaNoCache.httpEquiv = 'Cache-Control';
    metaNoCache.content = 'no-cache, no-store, must-revalidate';
    document.head.appendChild(metaNoCache);

    // Obfuscate email addresses and sensitive data
    document.addEventListener('DOMContentLoaded', function () {
        // Add pointer-events: none to prevent easy copying
        document.body.style.webkitTouchCallout = 'none';
    });

    console.log('%c⚠️ UI Demo Protection Active', 'color: #823AAF; font-size: 16px; font-weight: bold;');
    console.log('%cThis is a protected UI demonstration. Unauthorized copying or use is discouraged.', 'color: #666; font-size: 12px;');
    console.log('%cFor licensing inquiries, please contact the owner.', 'color: #666; font-size: 12px;');

})();
