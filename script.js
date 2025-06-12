// Bucket List Application - Love Edition 💕

class LoveBucketList {
    constructor() {
        this.bucketListItems = [];
        this.currentFilter = 'all';
        
        // Initial romantic activities
        this.initialItems = [
            { text: "Road trip somewhere remote to stargaze", icon: "fa-star", checked: false, date: "" },
            { text: "Be friends with each other's friends", icon: "fa-users", checked: false, date: "" },
            { text: "Camping OR hiking", icon: "fa-campground", checked: false, date: "" },
            { text: "Sing and play guitar", icon: "fa-guitar", checked: false, date: "" },
            { text: "Sienna's fam reunion", icon: "fa-people-roof", checked: false, date: "" },
            { text: "Go to Narnia (the secret spot!)", icon: "fa-tree", checked: false, date: "" },
            { text: "Surfing", icon: "fa-water", checked: false, date: "" },
            { text: "Fishing and Kayaking", icon: "fa-fish", checked: false, date: "" },
            { text: "Golfing", icon: "fa-golf-ball-tee", checked: false, date: "" },
            { text: "Pickle ball", icon: "fa-table-tennis-paddle-ball", checked: false, date: "" },
            { text: "Tennis", icon: "fa-baseball-bat-ball", checked: true, date: "" },
            { text: "Pleasant Park run", icon: "fa-person-running", checked: false, date: "" },
            { text: "Ride a two-person bicycle", icon: "fa-bicycle", checked: false, date: "" },
            { text: "Play soccer at the beach", icon: "fa-futbol", checked: false, date: "" },
            { text: "Drive in theatre", icon: "fa-film", checked: false, date: "" },
            { text: "Bake together", icon: "fa-cookie-bite", checked: false, date: "" },
            { text: "Go to Ontree", icon: "fa-tree-city", checked: false, date: "" },
            { text: "Go to Torii's cottage", icon: "fa-house-chimney-window", checked: false, date: "" },
            { text: "Go to Sienna's cottage", icon: "fa-house-chimney-user", checked: false, date: "" },
            { text: "Bike to the dam and swim at night", icon: "fa-moon", checked: false, date: "" },
            { text: "Skinny dip", icon: "fa-water-ladder", checked: false, date: "" },
            { text: "Karaoke", icon: "fa-microphone-lines", checked: false, date: "" },
            { text: "Do a couple's yoga pose", icon: "fa-heart-pulse", checked: false, date: "" }
        ];
        
        this.init();
    }
    
    init() {
        this.loadFromStorage();
        this.setupEventListeners();
        this.renderList();
        this.updateProgress();
        this.updateStats();
        this.createParticles();
        this.animateItemsOnLoad();
    }
    
    // Storage Management
    saveToStorage() {
        localStorage.setItem('loveBucketList', JSON.stringify(this.bucketListItems));
    }
    
    loadFromStorage() {
        const savedList = localStorage.getItem('loveBucketList');
        if (savedList) {
            this.bucketListItems = JSON.parse(savedList);
        } else {
            this.bucketListItems = [...this.initialItems];
        }
    }
    
    // Event Listeners
    setupEventListeners() {
        // Add new item
        const addBtn = document.getElementById('add-item-btn');
        const newItemInput = document.getElementById('new-item-input');
        
        addBtn.addEventListener('click', () => this.addNewItem());
        newItemInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addNewItem();
        });
        
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
                this.updateFilterButtons(e.target);
            });
        });
        
        // Modal events
        const celebrationModal = document.getElementById('celebration-modal');
        const closeCelebration = document.getElementById('close-celebration');
        
        closeCelebration.addEventListener('click', () => {
            celebrationModal.style.display = 'none';
        });
        
        // Close modals on outside click
        window.addEventListener('click', (e) => {
            if (e.target === celebrationModal) {
                celebrationModal.style.display = 'none';
            }
        });
    }
    
    // Icon Detection
    getIcon(text) {
        const lowerText = text.toLowerCase();
        const iconMap = {
            'star': 'fa-star', 'friend': 'fa-users', 'camp': 'fa-campground', 
            'hik': 'fa-campground', 'guitar': 'fa-guitar', 'music': 'fa-music',
            'fam': 'fa-people-roof', 'reunion': 'fa-people-roof', 'narnia': 'fa-tree',
            'surf': 'fa-water', 'fish': 'fa-fish', 'kayak': 'fa-fish', 'golf': 'fa-golf-ball-tee',
            'pickle': 'fa-table-tennis-paddle-ball', 'tennis': 'fa-table-tennis-paddle-ball',
            'run': 'fa-person-running', 'jog': 'fa-person-running', 'bike': 'fa-bicycle',
            'bicycle': 'fa-bicycle', 'soccer': 'fa-futbol', 'football': 'fa-futbol',
            'theatre': 'fa-film', 'movie': 'fa-film', 'cinema': 'fa-film',
            'bake': 'fa-cookie-bite', 'cook': 'fa-utensils', 'food': 'fa-utensils',
            'cottage': 'fa-house-chimney-window', 'house': 'fa-house', 'home': 'fa-home',
            'swim': 'fa-swimmer', 'dip': 'fa-water-ladder', 'water': 'fa-water',
            'karaoke': 'fa-microphone-lines', 'sing': 'fa-microphone',
            'yoga': 'fa-heart-pulse', 'exercise': 'fa-dumbbell', 'workout': 'fa-dumbbell',
            'kiss': 'fa-kiss', 'hug': 'fa-heart', 'love': 'fa-heart', 'date': 'fa-calendar-heart',
            'dinner': 'fa-utensils', 'lunch': 'fa-utensils', 'breakfast': 'fa-coffee',
            'travel': 'fa-plane', 'trip': 'fa-suitcase', 'adventure': 'fa-compass',
            'beach': 'fa-umbrella-beach', 'sunset': 'fa-sun', 'sunrise': 'fa-sun',
            'dance': 'fa-music', 'party': 'fa-party-horn', 'celebrate': 'fa-champagne-glasses'
        };
        
        for (const [keyword, icon] of Object.entries(iconMap)) {
            if (lowerText.includes(keyword)) return icon;
        }
        
        return 'fa-heart'; // Default romantic icon
    }
    
    // Add New Item
    addNewItem() {
        const input = document.getElementById('new-item-input');
        const text = input.value.trim();
        
        if (text) {
            const newItem = {
                text: text,
                icon: this.getIcon(text),
                checked: false,
                date: ""
            };
            
            this.bucketListItems.push(newItem);
            input.value = '';
            this.saveToStorage();
            this.renderList();
            this.updateProgress();
            this.updateStats();
            
            // Add entrance animation to new item
            setTimeout(() => {
                const newItemElement = document.querySelector('.bucket-item:last-child');
                if (newItemElement) {
                    newItemElement.style.animation = 'itemFadeIn 0.6s ease forwards';
                }
            }, 100);
        }
    }
    
    // Filter Management
    setFilter(filter) {
        this.currentFilter = filter;
        this.renderList();
    }
    
    updateFilterButtons(activeBtn) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }
    
    getFilteredItems() {
        switch (this.currentFilter) {
            case 'completed':
                return this.bucketListItems.filter(item => item.checked);
            case 'pending':
                return this.bucketListItems.filter(item => !item.checked);
            default:
                return this.bucketListItems;
        }
    }
    
    // Render List
    renderList() {
        const container = document.getElementById('bucket-list-container');
        const filteredItems = this.getFilteredItems();
        
        container.innerHTML = '';
        
        filteredItems.forEach((item, index) => {
            const originalIndex = this.bucketListItems.indexOf(item);
            const itemElement = this.createItemElement(item, originalIndex);
            container.appendChild(itemElement);
        });
        
        this.animateItemsOnLoad();
    }
    
    createItemElement(item, index) {
        const itemDiv = document.createElement('div');
        itemDiv.className = `bucket-item ${item.checked ? 'completed' : ''}`;
        
        itemDiv.innerHTML = `
            <div class="item-content">
                <div class="item-checkbox-container">
                    <input type="checkbox" id="item-${index}" class="item-checkbox" ${item.checked ? 'checked' : ''}>
                    <label for="item-${index}" class="checkbox-label">
                        <i class="fas fa-check checkbox-icon"></i>
                    </label>
                </div>
                <div class="item-details">
                    <div class="item-text-container">
                        <i class="fas ${item.icon} item-icon"></i>
                        <span class="item-text">${item.text}</span>
                    </div>
                    <div class="item-actions">
                        <input type="date" value="${item.date}" class="item-date" placeholder="Date completed">
                        <button class="delete-item-btn" data-index="${index}">
                            <i class="fas fa-trash"></i>
                            <span class="delete-text">Hold to Delete</span>
                            <div class="delete-progress"></div>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Add event listeners
        const checkbox = itemDiv.querySelector('.item-checkbox');
        const dateInput = itemDiv.querySelector('.item-date');
        const deleteBtn = itemDiv.querySelector('.delete-item-btn');
        
        checkbox.addEventListener('change', (e) => {
            this.toggleItem(index, e.target.checked);
        });
        
        dateInput.addEventListener('change', (e) => {
            this.updateItemDate(index, e.target.value);
        });
        
        // Delete functionality
        let deleteTimeout;
        let isDeleting = false;
        
        deleteBtn.addEventListener('mousedown', (e) => {
            e.preventDefault();
            if (isDeleting) return;
            isDeleting = true;
            deleteBtn.classList.add('deleting');
            deleteBtn.querySelector('.delete-text').textContent = 'Deleting...';
            
            deleteTimeout = setTimeout(() => {
                this.deleteItem(index);
                isDeleting = false;
            }, 2000);
        });
        
        deleteBtn.addEventListener('mouseup', () => {
            if (deleteTimeout) {
                clearTimeout(deleteTimeout);
                deleteTimeout = null;
            }
            deleteBtn.classList.remove('deleting');
            deleteBtn.querySelector('.delete-text').textContent = 'Hold to Delete';
            isDeleting = false;
        });
        
        deleteBtn.addEventListener('mouseleave', () => {
            if (deleteTimeout) {
                clearTimeout(deleteTimeout);
                deleteTimeout = null;
            }
            deleteBtn.classList.remove('deleting');
            deleteBtn.querySelector('.delete-text').textContent = 'Hold to Delete';
            isDeleting = false;
        });
        
        // Touch events for mobile
        deleteBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (isDeleting) return;
            isDeleting = true;
            deleteBtn.classList.add('deleting');
            deleteBtn.querySelector('.delete-text').textContent = 'Deleting...';
            
            deleteTimeout = setTimeout(() => {
                this.deleteItem(index);
                isDeleting = false;
            }, 2000);
        });
        
        deleteBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            if (deleteTimeout) {
                clearTimeout(deleteTimeout);
                deleteTimeout = null;
            }
            deleteBtn.classList.remove('deleting');
            deleteBtn.querySelector('.delete-text').textContent = 'Hold to Delete';
            isDeleting = false;
        });
        
        return itemDiv;
    }
    
    // Item Management
    toggleItem(index, checked) {
        const wasCompleted = this.bucketListItems[index].checked;
        this.bucketListItems[index].checked = checked;
        
        if (checked && !wasCompleted) {
            // Item just completed
            if (!this.bucketListItems[index].date) {
                this.bucketListItems[index].date = new Date().toISOString().split('T')[0];
            }
            this.showCelebration();
            this.createCelebrationParticles();
        }
        
        this.saveToStorage();
        this.updateProgress();
        this.updateStats();
        
        // Update the visual state
        const itemElement = document.querySelector(`#item-${index}`).closest('.bucket-item');
        if (checked) {
            itemElement.classList.add('completed');
        } else {
            itemElement.classList.remove('completed');
        }
    }
    
    updateItemDate(index, date) {
        this.bucketListItems[index].date = date;
        this.saveToStorage();
    }
    
    // Delete Item
    deleteItem(index) {
        const itemText = this.bucketListItems[index].text;
        this.bucketListItems.splice(index, 1);
        
        this.saveToStorage();
        this.renderList();
        this.updateProgress();
        this.updateStats();
        
        // Show a subtle confirmation
        const notification = document.createElement('div');
        notification.textContent = `"${itemText}" deleted`;
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(220, 53, 69, 0.9);
            color: white;
            padding: 1rem 2rem;
            border-radius: 1rem;
            z-index: 10000;
            font-weight: 500;
            max-width: 300px;
            text-align: center;
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 2500);
    }
    

    
    // Progress Management
    updateProgress() {
        const completedItems = this.bucketListItems.filter(item => item.checked).length;
        const totalItems = this.bucketListItems.length;
        const percentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
        
        const progressBar = document.getElementById('progress-bar');
        const progressText = document.getElementById('progress-text');
        const completedCount = document.getElementById('completed-count');
        
        // Animate progress bar
        setTimeout(() => {
            progressBar.style.width = `${percentage}%`;
        }, 100);
        
        progressText.textContent = `${percentage}%`;
        completedCount.textContent = `${completedItems} of ${totalItems} completed`;
    }
    
    updateStats() {
        const totalAdventures = document.getElementById('total-adventures');
        const completedAdventures = document.getElementById('completed-adventures');
        
        const total = this.bucketListItems.length;
        const completed = this.bucketListItems.filter(item => item.checked).length;
        
        this.animateNumber(totalAdventures, total);
        this.animateNumber(completedAdventures, completed);
    }
    
    animateNumber(element, targetNumber) {
        const currentNumber = parseInt(element.textContent) || 0;
        const increment = targetNumber > currentNumber ? 1 : -1;
        const timer = setInterval(() => {
            const current = parseInt(element.textContent) || 0;
            if (current === targetNumber) {
                clearInterval(timer);
            } else {
                element.textContent = current + increment;
            }
        }, 50);
    }
    
    // Celebration Effects
    showCelebration() {
        const modal = document.getElementById('celebration-modal');
        modal.style.display = 'block';
        
        // Auto-close after 3 seconds
        setTimeout(() => {
            modal.style.display = 'none';
        }, 3000);
    }
    
    createCelebrationParticles() {
        const colors = ['#ff69b4', '#ff1493', '#da70d6', '#ffd700', '#ff6347'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.position = 'fixed';
                particle.style.left = Math.random() * window.innerWidth + 'px';
                particle.style.top = '-10px';
                particle.style.width = '6px';
                particle.style.height = '6px';
                particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                particle.style.borderRadius = '50%';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '9999';
                particle.style.animation = `fall ${2 + Math.random() * 3}s linear forwards`;
                
                document.body.appendChild(particle);
                
                // Remove particle after animation
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 5000);
            }, i * 100);
        }
        
        // Add fall animation if not exists
        if (!document.querySelector('#celebration-styles')) {
            const style = document.createElement('style');
            style.id = 'celebration-styles';
            style.textContent = `
                @keyframes fall {
                    to {
                        transform: translateY(100vh) rotate(720deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Particle Effects
    createParticles() {
        const container = document.getElementById('particles-container');
        
        setInterval(() => {
            if (Math.random() < 0.3) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * window.innerWidth + 'px';
                particle.style.top = Math.random() * window.innerHeight + 'px';
                particle.style.animationDelay = Math.random() * 2 + 's';
                
                container.appendChild(particle);
                
                // Remove particle after animation
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 3000);
            }
        }, 2000);
    }
    
    // Animation Effects
    animateItemsOnLoad() {
        const items = document.querySelectorAll('.bucket-item');
        items.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
        });
    }
}

// Initialize the application
const bucketList = new LoveBucketList();

// Add some extra magical touches
document.addEventListener('DOMContentLoaded', () => {
    // Add sparkle effect on hover for various elements
    const sparkleElements = document.querySelectorAll('.bucket-item, .add-btn, .filter-btn');
    
    sparkleElements.forEach(element => {
        element.addEventListener('mouseenter', createSparkleEffect);
    });
    
    function createSparkleEffect(e) {
        const rect = e.target.getBoundingClientRect();
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = rect.left + Math.random() * rect.width + 'px';
        sparkle.style.top = rect.top + Math.random() * rect.height + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        sparkle.style.fontSize = '12px';
        sparkle.style.animation = 'sparkleFloat 1s ease-out forwards';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1000);
    }
    
    // Add sparkle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkleFloat {
            0% {
                opacity: 0;
                transform: translateY(0) scale(0);
            }
            50% {
                opacity: 1;
                transform: translateY(-20px) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-40px) scale(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add love message on special progress milestones
    const originalUpdateProgress = bucketList.updateProgress.bind(bucketList);
    bucketList.updateProgress = function() {
        originalUpdateProgress();
        
        const completedItems = this.bucketListItems.filter(item => item.checked).length;
        const totalItems = this.bucketListItems.length;
        const percentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
        
        // Special messages for milestones
        const milestones = {
            25: "You're making beautiful memories together! 💕",
            50: "Halfway through your love adventure! 🌟",
            75: "Amazing progress, lovebirds! 💖",
            100: "Congratulations! You've completed your love adventure list! 🎉💕"
        };
        
        if (milestones[percentage] && !this.lastMilestone) {
            this.lastMilestone = percentage;
            setTimeout(() => {
                alert(milestones[percentage]);
            }, 500);
        }
    };
});

// Add seasonal theme changes
function addSeasonalTouch() {
    const now = new Date();
    const month = now.getMonth();
    
    // Summer theme (June, July, August)
    if (month >= 5 && month <= 7) {
        document.body.style.background = `
            linear-gradient(135deg, 
                #ff9a9e 0%, 
                #fad0c4 25%, 
                #ffd1dc 50%, 
                #ffb6c1 75%, 
                #ffc0cb 100%)
        `;
    }
    // Spring theme (March, April, May)
    else if (month >= 2 && month <= 4) {
        document.body.style.background = `
            linear-gradient(135deg, 
                #a8e6cf 0%, 
                #dcedc8 25%, 
                #f8bbd9 50%, 
                #e1bee7 75%, 
                #f48fb1 100%)
        `;
    }
    // Fall theme (September, October, November)
    else if (month >= 8 && month <= 10) {
        document.body.style.background = `
            linear-gradient(135deg, 
                #ffa726 0%, 
                #ffcc80 25%, 
                #ffab91 50%, 
                #f8bbd9 75%, 
                #e1bee7 100%)
        `;
    }
    // Winter theme (December, January, February)
    else {
        document.body.style.background = `
            linear-gradient(135deg, 
                #b3e5fc 0%, 
                #e1f5fe 25%, 
                #f8bbd9 50%, 
                #e1bee7 75%, 
                #d1c4e9 100%)
        `;
    }
}

// Apply seasonal theme
addSeasonalTouch();