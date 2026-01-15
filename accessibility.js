/* ═══════════════════════════════════════════════════════════════════
   ACCESSIBILITY MANAGER
   Handles colorblind mode and other accessibility features
   ═══════════════════════════════════════════════════════════════════ */

(function() {
    'use strict';
    
    console.log('Accessibility script loaded');
    
    // Load saved preferences
    function loadPreferences() {
        const colorblindMode = localStorage.getItem('colorblind-mode') === 'true';
        console.log('Loading preferences, colorblind mode:', colorblindMode);
        if (colorblindMode) {
            document.body.classList.add('colorblind-mode');
            const checkbox = document.getElementById('colorblind-toggle');
            if (checkbox) checkbox.checked = true;
            
            // Refresh player colors if function exists
            setTimeout(function() {
                if (typeof refreshPlayerColors === 'function') {
                    refreshPlayerColors();
                }
                if (typeof compareAll === 'function') {
                    compareAll();
                }
            }, 100);
        }
    }
    
    // Create accessibility UI
    function createAccessibilityUI() {
        console.log('Creating accessibility UI');
        // Create toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'accessibility-toggle';
        toggleBtn.innerHTML = '👁️';
        toggleBtn.setAttribute('aria-label', 'Options d\'accessibilité');
        toggleBtn.setAttribute('title', 'Options d\'accessibilité');
        
        // Create panel
        const panel = document.createElement('div');
        panel.className = 'accessibility-panel';
        panel.innerHTML = `
            <h3>Accessibilité</h3>
            <div class="accessibility-option">
                <input type="checkbox" id="colorblind-toggle" name="colorblind-toggle">
                <label for="colorblind-toggle">Mode daltonien</label>
            </div>
        `;
        
        // Add to body
        document.body.appendChild(toggleBtn);
        document.body.appendChild(panel);
        console.log('Accessibility UI created and added to body');
        
        // Toggle panel
        toggleBtn.addEventListener('click', function(e) {
            console.log('Toggle button clicked');
            e.stopPropagation();
            panel.classList.toggle('show');
            console.log('Panel show class toggled, classes:', panel.className);
        });
        
        // Close panel when clicking outside
        document.addEventListener('click', function(e) {
            if (!panel.contains(e.target) && e.target !== toggleBtn) {
                panel.classList.remove('show');
            }
        });
        
        // Handle colorblind mode toggle
        const colorblindCheckbox = document.getElementById('colorblind-toggle');
        colorblindCheckbox.addEventListener('change', function() {
            console.log('Colorblind checkbox changed, checked:', this.checked);
            if (this.checked) {
                document.body.classList.add('colorblind-mode');
                localStorage.setItem('colorblind-mode', 'true');
            } else {
                document.body.classList.remove('colorblind-mode');
                localStorage.setItem('colorblind-mode', 'false');
            }
            
            // Refresh comparison table if it exists
            if (typeof compareAll === 'function') {
                compareAll();
            }
            
            // Refresh player card colors if function exists
            if (typeof refreshPlayerColors === 'function') {
                refreshPlayerColors();
            }
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            console.log('DOM loaded, initializing...');
            loadPreferences();
            createAccessibilityUI();
        });
    } else {
        console.log('DOM already loaded, initializing...');
        loadPreferences();
        createAccessibilityUI();
    }
})();
