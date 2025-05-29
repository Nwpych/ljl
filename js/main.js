// Main JavaScript file for common site functions
document.addEventListener('DOMContentLoaded', () => {
    console.log("Main.js loaded.");

    // Expandable content functionality
    const expandableTriggers = document.querySelectorAll('.expandable-trigger');
    expandableTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const targetId = trigger.dataset.target;
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.classList.toggle('hidden'); // Toggles Tailwind's hidden class (display: none)
                if (targetElement.classList.contains('hidden')) {
                    trigger.innerHTML = '了解更多 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 inline-block ml-1"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" /></svg>';
                } else {
                     trigger.innerHTML = '收起 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 inline-block ml-1"><path fill-rule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832l-3.71 3.938a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clip-rule="evenodd" /></svg>';
                }
            }
        });
    });

    // Basic Tab functionality for interactive_resources.html
    const tabs = document.querySelectorAll('[data-tab-target]');
    const tabContents = document.querySelectorAll('[data-tab-content]');

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor behavior
            const target = document.querySelector(tab.dataset.tabTarget);

            tabContents.forEach(tabContent => {
                tabContent.classList.add('hidden');
            });
            tabs.forEach(t => {
                t.classList.remove('text-blue-600', 'border-blue-600', 'font-semibold', 'bg-white');
                t.classList.add('text-gray-500', 'hover:text-gray-700', 'hover:border-gray-300', 'bg-gray-100', 'hover:bg-gray-200');
            });

            if (target) {
                target.classList.remove('hidden');
            }
            tab.classList.add('text-blue-600', 'border-blue-600', 'font-semibold', 'bg-white');
            tab.classList.remove('text-gray-500', 'hover:text-gray-700', 'hover:border-gray-300', 'bg-gray-100', 'hover:bg-gray-200');


            // Update URL hash without jumping
            if (history.pushState) {
                history.pushState(null, null, tab.dataset.tabTarget);
            } else {
                // Fallback for older browsers, though this will cause a jump
                // window.location.hash = tab.dataset.tabTarget;
                // To avoid jump, we can also just not update hash for older browsers or use a polyfill
            }
        });
    });

    // Check for hash on page load to activate a tab
    if (window.location.hash) {
        const tabToActivate = document.querySelector(`[data-tab-target="${window.location.hash}"]`);
        if (tabToActivate) {
            tabToActivate.click();
        } else {
            // Default to the first tab if hash is invalid
            if(tabs.length > 0 && tabs[0].dataset.tabTarget) {
                 const firstTab = document.querySelector(`[data-tab-target="${tabs[0].dataset.tabTarget}"]`); 
                 if (firstTab) firstTab.click();
            }
        }
    } else {
        // Default to the first tab if no hash
        if(tabs.length > 0 && tabs[0].dataset.tabTarget) {
            const firstTab = document.querySelector(`[data-tab-target="${tabs[0].dataset.tabTarget}"]`);
            if (firstTab) firstTab.click();
        }
    }

    // Accordion for FAQ items
    const faqItems = document.querySelectorAll('.faq-item-trigger');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const content = item.nextElementSibling;
            const icon = item.querySelector('.faq-icon');

            if (content) {
                content.classList.toggle('hidden');
                if (icon) {
                    if (content.classList.contains('hidden')) {
                        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />'; // Plus icon
                    } else {
                        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />'; // Minus icon
                    }
                }
            }
        });
    });

});
