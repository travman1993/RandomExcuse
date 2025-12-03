// ============================================================================
// CAUGHT-SLIPPIN.COM - Main JavaScript
// ============================================================================

// ============================================================================
// 1. CONSTANTS & DOM SELECTORS
// ============================================================================

const SELECTORS = {
    categorySelect: '#category-select',
    toneButtons: '.tone-btn',
    generateBtn: '#generate-btn',
    resultContainer: '#result-container',
    resultText: '#result-text',
    resultTone: '#result-tone',
    copyBtn: '#copy-btn',
    smsBtn: '#sms-btn',
    shareBtn: '#share-btn',
    saveBtn: '#save-btn',
    rateUpBtn: '#rate-up-btn',
    rateDownBtn: '#rate-down-btn',
    toast: '#toast',
    showMoreBtn: '#show-more-tips',
    hiddenTips: '.hidden-tip',
    copyTipBtns: '.copy-tip-btn',
    saveTipBtns: '.save-tip-btn',
    rateTipBtns: '.rate-tip-btn'
};

const STORAGE_KEYS = {
    savedReplies: 'caught-slippin-saved-replies',
    savedTips: 'caught-slippin-saved-tips',
    lastCategory: 'caught-slippin-last-category',
    lastTone: 'caught-slippin-last-tone'
};

// ============================================================================
// 2. DATA - CATEGORIES & EXCUSES
// ============================================================================

const CATEGORIES = {
    'late-for-work': {
        title: 'Late for work',
        description: 'Running behind schedule for work',
        serious: [
            "I'm so sorry I'm running late — there was an unexpected issue with public transit this morning.",
            "Apologies for the delay. My alarm didn't go off and I just woke up. Heading in now.",
            "I'm running about 20 minutes behind. Had a car issue this morning but I'm on my way.",
            "Sorry for being late. There was a family situation I had to handle this morning.",
            "I apologize for the tardiness. Traffic was completely backed up due to an accident on the highway.",
            "Running late today — had to deal with an urgent home maintenance issue. Will be there ASAP.",
            "Sorry, my usual route was closed and I got turned around. Should be there in 15 minutes.",
            "Apologies. I had a medical appointment run over this morning. On my way now.",
            "I'm running behind schedule. Had to help my neighbor with an emergency. Nearly there.",
            "Sorry for the delay. Woke up feeling unwell but I'm coming in now.",
            "Running about 15 minutes late due to a delayed train. Apologies for the inconvenience.",
            "I'm sorry — had a flat tire this morning. Getting it sorted and will be there soon.",
            "Apologies for being late. There was a power outage and my phone didn't charge overnight.",
            "Running behind this morning. Had an important personal call I had to take. Almost there.",
            "Sorry I'm late. My child was sick and I had to make arrangements. On my way.",
            "I apologize for the delay. There was a water leak in my apartment I had to address.",
            "Running late due to unexpected road closures. Taking an alternate route now.",
            "Sorry for being tardy. Had a last-minute emergency with my pet. Heading in now.",
            "Apologies. My ride fell through at the last minute. Arranging alternative transport.",
            "Running about 30 minutes behind. Had to wait for a delivery that couldn't be rescheduled."
        ],
        funny: [
            "I'm late because I spent 10 minutes trying to convince my cat I don't work for her.",
            "Running behind — forgot how pants work this morning. Figured it out now.",
            "Sorry I'm late. Got stuck behind a funeral procession... for my motivation.",
            "Apologies for the delay. My snooze button and I were in a very committed relationship this morning.",
            "I'm late because I tried to leave the house three times but kept forgetting something. I'm basically a sitcom character.",
            "Running behind schedule. Traffic was invented by someone who hates me personally.",
            "Sorry, I got lost in my own neighborhood. Yes, I've lived here for three years.",
            "I'm late because my coffee maker betrayed me this morning. Still processing the trauma.",
            "Apologies. I was held hostage by a really good breakfast burrito.",
            "Running late — had an intense staring contest with my reflection. Lost.",
            "Sorry I'm late. Spent 15 minutes looking for my phone. It was in my hand.",
            "Apologies for the delay. My brain doesn't start working until 10am and it's not even negotiable.",
            "I'm late because the universe is testing my commitment to this job. So far, I'm passing barely.",
            "Running behind — forgot humans need to sleep at night, not just scroll endlessly.",
            "Sorry, I got dressed, looked in the mirror, and had to start over. Three times.",
            "I'm late because I couldn't decide which podcast to listen to on the commute. Paralysis by analysis.",
            "Apologies. My bed was very convincing this morning. Made some excellent points.",
            "Running behind schedule. Got caught in a YouTube rabbit hole about penguins at 6am.",
            "Sorry I'm late. Tried to adult this morning and it went poorly.",
            "I'm late because I left on time but forgot I'm slow. Mathematical error on my part."
        ]
    },
    
    'missed-deadline': {
        title: 'Missed a deadline',
        description: 'Failed to complete work by due date',
        serious: [
            "I sincerely apologize for missing the deadline. I underestimated the scope and ran into technical difficulties.",
            "I'm sorry I didn't deliver on time. I had some unexpected personal issues that impacted my schedule.",
            "Apologies for the delay. I encountered complications that took longer to resolve than anticipated.",
            "I take full responsibility for missing the deadline. Can I have until end of day tomorrow to complete this properly?",
            "Sorry for not meeting the deadline. I had a family emergency that required my immediate attention.",
            "I apologize for the late delivery. I was dealing with a health issue that affected my productivity.",
            "I'm sorry this is late. I had competing priorities and misjudged how long this would take.",
            "Apologies for missing the deadline. There were dependencies on other team members that caused delays.",
            "I should have communicated earlier, but I've been struggling with some technical challenges. Working to resolve them now.",
            "Sorry for the delay. I've had internet connectivity issues that prevented me from completing this on time.",
            "I apologize for not delivering as promised. I encountered data issues that required additional troubleshooting.",
            "I'm sorry this is overdue. I had a bereavement in the family that took me away from work.",
            "Apologies for the missed deadline. I was dealing with a home emergency that couldn't wait.",
            "I take responsibility for this delay. Can we discuss a realistic new timeline?",
            "Sorry for not meeting the deadline. I was out sick and am still catching up.",
            "I apologize for the delay. There were last-minute changes to requirements that set me back.",
            "I'm sorry this is late. I had childcare issues that disrupted my work schedule.",
            "Apologies for missing the deadline. I underestimated the complexity and should have asked for help sooner.",
            "Sorry for the delay. I've been dealing with a personal crisis that affected my focus.",
            "I apologize for not delivering on time. I had to prioritize an urgent client issue that came up."
        ],
        funny: [
            "I missed the deadline because time is a social construct and I'm trying to live authentically.",
            "Sorry this is late. I was busy inventing new and creative ways to procrastinate.",
            "I didn't meet the deadline because my motivation took a vacation without telling me.",
            "Apologies for the delay. Turns out 'I work better under pressure' was a lie I told myself.",
            "I'm late because I spent three days perfecting something that was due yesterday. It's very good though.",
            "Sorry, I missed the deadline while I was busy missing other deadlines. It's a whole system.",
            "I didn't deliver on time because I was convinced today was yesterday. Calendar is fake news.",
            "Apologies. I was trapped in a vortex of perfectionism and self-doubt. Still climbing out.",
            "I'm late because I thought 'due Friday' meant 'Friday of some week, eventually.'",
            "Sorry this is overdue. My dog ate my productivity. No, really.",
            "I missed the deadline because I made the classic blunder of thinking I could 'just wing it.'",
            "Apologies for the delay. I was busy creating elaborate excuses instead of just doing the work.",
            "I'm late because I confused 'deadline' with 'suggestion.' My mistake.",
            "Sorry, I got distracted by the existential dread of having a deadline in the first place.",
            "I didn't finish on time because I was optimistic about my abilities. Won't make that mistake again.",
            "Apologies for missing the deadline. I was working on it in my mind. Does that count?",
            "I'm late because I believed in myself too much. Overconfidence is a killer.",
            "Sorry this is overdue. I experienced what scientists call 'catastrophic task paralysis.'",
            "I missed the deadline because I kept finding things that were slightly more interesting. So, everything.",
            "Apologies. I thought I had more time because I forgot how time works. Rookie error."
        ]
    },
    
    'forgot-birthday': {
        title: 'Forgot a birthday',
        description: 'Missed someone\'s special day',
        serious: [
            "I'm so sorry I forgot your birthday. There's no excuse — I feel terrible about it.",
            "I apologize for missing your birthday. I've been overwhelmed lately, but that's not an excuse. Can I take you out this week?",
            "I'm really sorry I forgot your birthday. You deserve better. Let me make it up to you.",
            "I feel awful for forgetting your birthday. I've had a lot on my mind, but you're important to me.",
            "I'm so sorry. Your birthday completely slipped my mind. Can we celebrate this weekend?",
            "I apologize for forgetting your birthday. I've been dealing with some personal issues, but I should have remembered.",
            "I'm sorry I missed your special day. I have no good excuse. You mean a lot to me.",
            "I feel terrible about forgetting your birthday. I've been scattered lately. Let me take you to dinner.",
            "I'm really sorry. I marked it wrong in my calendar and completely missed it.",
            "I apologize for not remembering your birthday. I was traveling and lost track of dates.",
            "I'm so sorry I forgot. I've been having a rough time, but that doesn't excuse missing your day.",
            "I feel awful about this. Can I still get you a gift and celebrate late?",
            "I'm sorry for missing your birthday. I've been so focused on work that I lost sight of what matters.",
            "I apologize for forgetting. You're important to me and I should have had it marked everywhere.",
            "I'm really sorry. My phone died and I missed all my reminders. That's on me.",
            "I feel terrible for missing your birthday. I've been dealing with family stuff but I should have remembered.",
            "I'm so sorry. I thought it was next week. That's completely my fault.",
            "I apologize for forgetting your special day. Let me make it up to you properly.",
            "I'm sorry I missed it. I've been in my own head too much lately. You deserve better.",
            "I feel awful about this. Can we do a belated celebration? My treat, of course."
        ],
        funny: [
            "I forgot your birthday because I was too busy aging myself. The years blend together now.",
            "Sorry I missed your birthday. I was celebrating the fact that you're another year wiser than me.",
            "I forgot because birthdays are just Earth completing another lap around the sun. You're still you! (But seriously, I'm sorry.)",
            "I'm sorry I forgot your birthday. I was distracted by my own mortality. You know how it is.",
            "I missed your birthday because time is an illusion and I'm living proof.",
            "Sorry! I forgot your birthday while I was busy forgetting literally everything else too.",
            "I'm sorry. I thought your birthday was next month. Turns out I can't calendar.",
            "I forgot your birthday because my brain is like a browser with 47 tabs open and one is playing music but I don't know which one.",
            "Sorry I missed it. I was busy pretending I have my life together. Clearly, I don't.",
            "I forgot your birthday because I'm still processing that this year happened at all.",
            "I'm sorry. My memory has the storage capacity of a goldfish with amnesia.",
            "I missed your birthday because I was convinced it was three weeks from now. Math is hard.",
            "Sorry! I forgot because I'm getting older and my brain is now more vibes than facts.",
            "I forgot your birthday while simultaneously remembering every embarrassing thing I've ever done. Brain prioritization is weird.",
            "I'm sorry. I was too busy being a disappointment in other areas to remember.",
            "I missed it because I thought Facebook would remind me. I've overestimated technology again.",
            "Sorry I forgot. My internal calendar app crashed and hasn't rebooted since 2019.",
            "I forgot your birthday because I'm still figuring out what month it is.",
            "I'm sorry. I was busy being wrong about literally everything, including your birthday.",
            "I missed your birthday because the universe is testing how many ways I can mess up. Spoiler: a lot."
        ]
    }
};

// ============================================================================
// 3. UTILITY FUNCTIONS
// ============================================================================

/**
 * Get random item from array
 */
function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Copy text to clipboard
 */
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        const success = document.execCommand('copy');
        document.body.removeChild(textarea);
        return success;
    }
}

/**
 * Show toast notification
 */
function showToast(message, duration = 3000) {
    const toast = document.querySelector(SELECTORS.toast);
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

/**
 * Get from local storage
 */
function getFromStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (err) {
        console.error('Error reading from storage:', err);
        return null;
    }
}

/**
 * Save to local storage
 */
function saveToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (err) {
        console.error('Error saving to storage:', err);
        return false;
    }
}

/**
 * Track analytics event
 */
function trackEvent(eventName, properties = {}) {
    // GA4 tracking (if gtag is available)
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
    
    // Console log for development
    console.log('Event:', eventName, properties);
}

/**
 * Debounce function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================================================
// 4. GENERATOR FUNCTIONS
// ============================================================================

let currentExcuse = '';
let currentCategory = '';
let currentTone = 'serious';

/**
 * Generate excuse based on selected category and tone
 */
function generateExcuse() {
    const categorySelect = document.querySelector(SELECTORS.categorySelect);
    const category = categorySelect.value;
    
    if (!category) {
        showToast('Please select a situation first');
        return;
    }
    
    if (!CATEGORIES[category]) {
        showToast('Category not found');
        return;
    }
    
    const categoryData = CATEGORIES[category];
    const excuses = categoryData[currentTone];
    
    if (!excuses || excuses.length === 0) {
        showToast('No excuses available for this category');
        return;
    }
    
    currentExcuse = getRandom(excuses);
    currentCategory = category;
    
    renderResult();
    
    // Track event
    trackEvent('generator_generate', {
        category: category,
        tone: currentTone
    });
    
    // Save last used settings
    saveToStorage(STORAGE_KEYS.lastCategory, category);
    saveToStorage(STORAGE_KEYS.lastTone, currentTone);
}

/**
 * Render the result
 */
function renderResult() {
    const resultContainer = document.querySelector(SELECTORS.resultContainer);
    const resultText = document.querySelector(SELECTORS.resultText);
    const resultTone = document.querySelector(SELECTORS.resultTone);
    
    resultText.textContent = currentExcuse;
    resultTone.textContent = currentTone.charAt(0).toUpperCase() + currentTone.slice(1);
    resultContainer.style.display = 'block';
    
    // Scroll to result
    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Handle tone toggle
 */
function handleToneToggle(e) {
    if (!e.target.classList.contains('tone-btn')) return;
    
    // Remove active from all buttons
    document.querySelectorAll(SELECTORS.toneButtons).forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active to clicked button
    e.target.classList.add('active');
    
    // Update current tone
    currentTone = e.target.dataset.tone;
}

/**
 * Copy result to clipboard
 */
async function handleCopy() {
    if (!currentExcuse) return;
    
    const success = await copyToClipboard(currentExcuse);
    
    if (success) {
        showToast('Copied to clipboard!');
        trackEvent('generator_result_copy', {
            category: currentCategory,
            tone: currentTone
        });
    } else {
        showToast('Failed to copy. Please try again.');
    }
}

/**
 * Handle SMS/Text share
 */
function handleSMS() {
    if (!currentExcuse) return;
    
    const smsUrl = `sms:?body=${encodeURIComponent(currentExcuse)}`;
    window.location.href = smsUrl;
    
    trackEvent('share_click', {
        channel: 'sms',
        contentType: 'excuse'
    });
}

/**
 * Handle share
 */
async function handleShare() {
    if (!currentExcuse) return;
    
    const shareData = {
        title: 'Caught-Slippin',
        text: currentExcuse,
        url: window.location.href
    };
    
    // Check if Web Share API is available
    if (navigator.share) {
        try {
            await navigator.share(shareData);
            trackEvent('share_click', {
                channel: 'native',
                contentType: 'excuse'
            });
        } catch (err) {
            if (err.name !== 'AbortError') {
                console.error('Error sharing:', err);
            }
        }
    } else {
        // Fallback: copy to clipboard
        await handleCopy();
    }
}

/**
 * Save reply to local storage
 */
function handleSaveReply() {
    if (!currentExcuse) return;
    
    const savedReplies = getFromStorage(STORAGE_KEYS.savedReplies) || [];
    
    const newReply = {
        id: Date.now(),
        text: currentExcuse,
        category: currentCategory,
        tone: currentTone,
        timestamp: new Date().toISOString()
    };
    
    savedReplies.unshift(newReply);
    
    // Keep only last 50 replies
    if (savedReplies.length > 50) {
        savedReplies.pop();
    }
    
    saveToStorage(STORAGE_KEYS.savedReplies, savedReplies);
    showToast('Reply saved!');
}

/**
 * Handle rating
 */
function handleRating(isPositive) {
    trackEvent('generator_feedback', {
        category: currentCategory,
        tone: currentTone,
        vote: isPositive ? 'up' : 'down'
    });
    
    showToast(isPositive ? 'Thanks for the feedback!' : 'Thanks, we\'ll work on improving!');
}

// ============================================================================
// 5. TIPS FUNCTIONS
// ============================================================================

/**
 * Show more tips
 */
function handleShowMoreTips() {
    const hiddenTips = document.querySelectorAll(SELECTORS.hiddenTips);
    const showMoreBtn = document.querySelector(SELECTORS.showMoreBtn);
    
    hiddenTips.forEach(tip => {
        tip.classList.remove('hidden-tip');
    });
    
    showMoreBtn.style.display = 'none';
    trackEvent('tips_show_more');
}

/**
 * Copy tip to clipboard
 */
async function handleCopyTip(e) {
    const tipCard = e.target.closest('.tip-card');
    const tipTitle = tipCard.querySelector('h3').textContent;
    const tipBody = tipCard.querySelector('p').textContent;
    const tipText = `${tipTitle}\n\n${tipBody}`;
    
    const success = await copyToClipboard(tipText);
    
    if (success) {
        showToast('Tip copied!');
        trackEvent('tip_copy', {
            tipId: tipCard.dataset.tipId
        });
    } else {
        showToast('Failed to copy. Please try again.');
    }
}

/**
 * Save tip
 */
function handleSaveTip(e) {
    const tipCard = e.target.closest('.tip-card');
    const tipId = tipCard.dataset.tipId;
    const tipTitle = tipCard.querySelector('h3').textContent;
    const tipBody = tipCard.querySelector('p').textContent;
    
    const savedTips = getFromStorage(STORAGE_KEYS.savedTips) || [];
    
    // Check if already saved
    if (savedTips.some(tip => tip.id === tipId)) {
        showToast('Tip already saved!');
        return;
    }
    
    const newTip = {
        id: tipId,
        title: tipTitle,
        body: tipBody,
        timestamp: new Date().toISOString()
    };
    
    savedTips.unshift(newTip);
    
    // Keep only last 100 tips
    if (savedTips.length > 100) {
        savedTips.pop();
    }
    
    saveToStorage(STORAGE_KEYS.savedTips, savedTips);
    showToast('Tip saved!');
    
    trackEvent('tip_save', {
        tipId: tipId
    });
}

/**
 * Rate tip
 */
function handleRateTip(e) {
    const tipCard = e.target.closest('.tip-card');
    const tipId = tipCard.dataset.tipId;
    
    trackEvent('tip_feedback', {
        tipId: tipId,
        vote: 'up'
    });
    
    showToast('Thanks for the feedback!');
    
    // Visual feedback
    e.target.style.opacity = '0.5';
    setTimeout(() => {
        e.target.style.opacity = '1';
    }, 300);
}

// ============================================================================
// 6. EVENT LISTENERS
// ============================================================================

function attachEventListeners() {
    // Generator events
    const generateBtn = document.querySelector(SELECTORS.generateBtn);
    if (generateBtn) {
        generateBtn.addEventListener('click', generateExcuse);
    }
    
    // Tone toggle
    const toneButtons = document.querySelector('.toggle-buttons');
    if (toneButtons) {
        toneButtons.addEventListener('click', handleToneToggle);
    }
    
    // Result actions
    const copyBtn = document.querySelector(SELECTORS.copyBtn);
    if (copyBtn) {
        copyBtn.addEventListener('click', handleCopy);
    }
    
    const smsBtn = document.querySelector(SELECTORS.smsBtn);
    if (smsBtn) {
        smsBtn.addEventListener('click', handleSMS);
    }
    
    const shareBtn = document.querySelector(SELECTORS.shareBtn);
    if (shareBtn) {
        shareBtn.addEventListener('click', handleShare);
    }
    
    const saveBtn = document.querySelector(SELECTORS.saveBtn);
    if (saveBtn) {
        saveBtn.addEventListener('click', handleSaveReply);
    }
    
    const rateUpBtn = document.querySelector(SELECTORS.rateUpBtn);
    if (rateUpBtn) {
        rateUpBtn.addEventListener('click', () => handleRating(true));
    }
    
    const rateDownBtn = document.querySelector(SELECTORS.rateDownBtn);
    if (rateDownBtn) {
        rateDownBtn.addEventListener('click', () => handleRating(false));
    }
    
    // Show more tips
    const showMoreBtn = document.querySelector(SELECTORS.showMoreBtn);
    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', handleShowMoreTips);
    }
    
    // Tip card actions
    document.querySelectorAll(SELECTORS.copyTipBtns).forEach(btn => {
        btn.addEventListener('click', handleCopyTip);
    });
    
    document.querySelectorAll(SELECTORS.saveTipBtns).forEach(btn => {
        btn.addEventListener('click', handleSaveTip);
    });
    
    document.querySelectorAll(SELECTORS.rateTipBtns).forEach(btn => {
        btn.addEventListener('click', handleRateTip);
    });
    
    // Category select change
    const categorySelect = document.querySelector(SELECTORS.categorySelect);
    if (categorySelect) {
        categorySelect.addEventListener('change', (e) => {
            trackEvent('category_select', {
                category: e.target.value
            });
        });
    }
    
    // Track More Tools clicks
    document.querySelectorAll('a[href*="dailyhelphub"]').forEach(link => {
        link.addEventListener('click', () => {
            trackEvent('nav_more_tools_click', {
                source: 'caught-slippin'
            });
        });
    });
}

// ============================================================================
// 7. INITIALIZATION
// ============================================================================

function init() {
    // Attach all event listeners
    attachEventListeners();
    
    // Restore last used settings
    const lastCategory = getFromStorage(STORAGE_KEYS.lastCategory);
    const lastTone = getFromStorage(STORAGE_KEYS.lastTone);
    
    if (lastCategory) {
        const categorySelect = document.querySelector(SELECTORS.categorySelect);
        if (categorySelect) {
            categorySelect.value = lastCategory;
        }
    }
    
    if (lastTone) {
        currentTone = lastTone;
        document.querySelectorAll(SELECTORS.toneButtons).forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tone === lastTone);
        });
    }
    
    // Track page view
    trackEvent('page_view', {
        page: 'home'
    });
    
    console.log('Caught-Slippin initialized successfully');
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}