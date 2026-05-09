// The `categories` array is now loaded from data.js
document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('categories-grid');
    
    categories.forEach((cat, index) => {
        // Create Card Element
        const card = document.createElement('div');
        card.className = 'card';
        card.style.animation = `fadeIn 0.6s ease forwards ${(index * 0.1) + 0.2}s`;
        card.style.opacity = '0'; // Initial state for animation
        
        // Icon
        const iconDiv = document.createElement('div');
        iconDiv.className = 'card-icon';
        const icon = document.createElement('i');
        icon.className = `fa-solid ${cat.icon}`;
        iconDiv.appendChild(icon);
        
        // Title
        const title = document.createElement('h3');
        title.className = 'card-title';
        title.textContent = cat.name;
        
        // List of items
        const list = document.createElement('ul');
        list.className = 'item-list';
        
        const createListItem = (item) => {
            const li = document.createElement('li');
            
            // Add Logo Image using Google Favicon API
            const img = document.createElement('img');
            img.className = 'item-logo';
            img.src = `https://www.google.com/s2/favicons?domain=${item.domain}&sz=64`;
            img.alt = item.name + " logo";
            
            li.appendChild(img);
            li.appendChild(document.createTextNode(item.name));
            return li;
        };
        
        // Display up to 6 items initially to keep cards consistent
        const maxDisplay = 6;
        cat.items.slice(0, maxDisplay).forEach(item => {
            list.appendChild(createListItem(item));
        });
        
        // If more items, add a "+ more" indicator
        if (cat.items.length > maxDisplay) {
            const li = document.createElement('li');
            
            // Replicate the formatting of standard list items but specifically for the "more" button
            li.textContent = `+ 更多 ${cat.items.length - maxDisplay} 項服務...`;
            li.style.color = 'var(--accent-cyan)';
            li.style.fontStyle = 'italic';
            li.style.cursor = 'pointer';
            // Remove the default pseudo-element bullet icon for the "more" button
            li.style.listStyle = 'none';
            
            // Hover effect for the "more" item
            li.addEventListener('mouseenter', () => {
                li.style.textShadow = '0 0 10px rgba(0, 240, 255, 0.5)';
                li.style.transform = 'translateX(5px)';
            });
            li.addEventListener('mouseleave', () => {
                li.style.textShadow = 'none';
                li.style.transform = 'translateX(0)';
            });

            // Simple click to show all items
            li.addEventListener('click', function expandList() {
                li.remove();
                cat.items.slice(maxDisplay).forEach(item => {
                    const extraLi = createListItem(item);
                    extraLi.style.opacity = '0';
                    extraLi.style.animation = 'fadeIn 0.3s ease forwards';
                    list.appendChild(extraLi);
                });
            });

            list.appendChild(li);
        }
        
        card.appendChild(iconDiv);
        card.appendChild(title);
        card.appendChild(list);
        
        gridContainer.appendChild(card);
    });

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add a simple scroll effect for navbar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '1rem 5%';
            navbar.style.background = 'rgba(7, 11, 20, 0.95)';
        } else {
            navbar.style.padding = '1.2rem 5%';
            navbar.style.background = 'rgba(7, 11, 20, 0.8)';
        }
    });
});
