// CeremonIA - Mock Data Initialization
// Comprehensive mock data for all roles to demonstrate full system flow

const MOCK_DATA = {
    // End User - Can test both first-time and returning flows
    // Starts completely fresh with no pre-filled data
    // After generation, automatically becomes "returning user"
    'user@ceremonia.com': {
        // No pre-filled data - completely fresh start
        // User will fill all questionnaire blocks from scratch
        // No ceremony initially - user generates it
        // After generation, ceremony data will be added automatically
    },

    // Officiant - With Ceremonies (can delete to test empty state)
    // Starts with 3 ceremonies to test management features
    'officiant@ceremonia.com': {
        ceremonies: [
            {
                id: 'ceremony-1',
                coupleNames: 'Sarah & James',
                ceremonyName: 'Sarah & James Union',
                date: '2025-06-15',
                lastEdited: 'Today',
                status: 'completed',
                tone: 'Romantic',
                length: 'Full Length',
                location: 'Provence, France'
            },
            {
                id: 'ceremony-2',
                coupleNames: 'Maria & David',
                ceremonyName: 'Maria & David Celebration',
                date: '2025-07-10',
                lastEdited: '2 days ago',
                status: 'in-progress',
                tone: 'Formal',
                length: 'Standard',
                location: 'Tuscany, Italy'
            },
            {
                id: 'ceremony-3',
                coupleNames: 'Sophie & Thomas',
                ceremonyName: 'Sophie & Thomas Vow Renewal',
                date: '2025-09-05',
                lastEdited: 'Oct 24',
                status: 'draft',
                tone: 'Casual & Fun',
                length: 'Short',
                location: 'Paris, France'
            }
        ]
    }
};

/**
 * Initialize mock data for a user
 */
function initializeMockData(email) {
    const userData = MOCK_DATA[email.toLowerCase()];
    if (!userData) return;

    // Clear all questionnaire data for fresh start (if no questionnaire data defined)
    if (!userData.questionnaire) {
        // Clear all block-related localStorage items for fresh testing
        // Block 1
        localStorage.removeItem('block1_coupleName');
        localStorage.removeItem('block1_ceremonyName');
        localStorage.removeItem('block1_ceremonyDate');
        // Block 2
        localStorage.removeItem('block2_ceremonyLocation');
        localStorage.removeItem('block2_meetStory');
        localStorage.removeItem('block2_sharedHobby');
        // Block 3
        localStorage.removeItem('block3_connection');
        // Block 4
        localStorage.removeItem('block4_values');
        // Block 5
        localStorage.removeItem('block5_future');
        
        // Also clear block1Locked to allow fresh start
        localStorage.removeItem('block1Locked');
        // Clear intro seen flag for fresh intro screen
        localStorage.removeItem('introSeen');
        // Clear ceremony generated flag
        localStorage.removeItem('ceremonyGenerated');
        localStorage.removeItem('ceremonyStory');
        // Clear filter selections
        localStorage.removeItem('selectedTone');
        localStorage.removeItem('selectedWritingStyle');
    } else {
        // Initialize questionnaire answers (if pre-filled data exists)
        Object.keys(userData.questionnaire).forEach(key => {
            const value = userData.questionnaire[key];
            // Convert key format: block1_coupleName -> block1_coupleName
            localStorage.setItem(key, value);
        });
    }

    // Initialize filter selections
    if (userData.filters) {
        localStorage.setItem('selectedTone', userData.filters.tone);
        localStorage.setItem('selectedWritingStyle', userData.filters.writingStyle);
    }

    // Initialize story content
    if (userData.story) {
        localStorage.setItem('ceremonyStory', JSON.stringify(userData.story));
        localStorage.setItem('ceremonyGenerated', 'true');
    }

    // Initialize ceremonies for Officiants
    if (userData.ceremonies) {
        localStorage.setItem('officiantCeremonies', JSON.stringify(userData.ceremonies));
        localStorage.setItem('hasCeremonies', userData.ceremonies.length > 0 ? 'true' : 'false');
    }
}

/**
 * Get mock story content
 */
function getMockStory() {
    const storyJson = localStorage.getItem('ceremonyStory');
    if (storyJson) {
        return JSON.parse(storyJson);
    }
    
    // Default mock story
    return {
        title: 'Sarah & James Union',
        coupleNames: 'Sarah & James',
        date: 'June 15, 2025',
        sections: [
            {
                title: 'The Opening',
                content: 'Friends and family, we are gathered here today to witness and celebrate the union of Sarah and James. In this quiet moment, amidst the noise of the world, we pause to honor something simple yet profound: two people choosing each other.'
            },
            {
                title: 'The Story',
                content: 'They say timing is everything. For Sarah and James, time stopped on a rainy Tuesday. It wasn\'t fireworks or thunder; it was a conversation that felt like coming home. Over the years, that initial spark has grown into a steady flame—one that warms not just them, but everyone lucky enough to know them.'
            },
            {
                title: 'The Connection',
                content: 'The moment they realized this was special was during a weekend trip to the mountains. They got lost, but instead of panicking, they laughed and found their way together. That\'s when they knew—this was more than a relationship; this was a partnership built on trust, humor, and the ability to find joy even when things don\'t go as planned.'
            },
            {
                title: 'The Values',
                content: 'Their relationship is guided by honesty, adventure, and always making time for each other. They believe in growing together while maintaining their individual passions, creating a love that is both strong and free.'
            },
            {
                title: 'The Future',
                content: 'Today, as they stand here in Provence, they look forward to traveling the world together, starting a family, and building a home filled with love, laughter, and many more adventures. Their journey together is just beginning, and we are honored to witness this beautiful moment.'
            },
            {
                title: 'The Vows',
                content: 'Sarah and James, as you exchange your vows today, remember that love is not just a feeling—it\'s a choice you make every day. Choose each other, support each other, and continue to find joy in the simple moments that brought you together.'
            }
        ]
    };
}

/**
 * Get mock ceremonies for Officiant
 */
function getMockCeremonies() {
    const ceremoniesJson = localStorage.getItem('officiantCeremonies');
    if (ceremoniesJson) {
        return JSON.parse(ceremoniesJson);
    }
    
    // Default mock ceremonies
    return [
        {
            id: 'ceremony-1',
            coupleNames: 'Sarah & James',
            ceremonyName: 'Sarah & James Union',
            date: '2025-06-15',
            lastEdited: 'Today',
            status: 'completed',
            tone: 'Romantic',
            length: 'Full Length',
            location: 'Provence, France'
        },
        {
            id: 'ceremony-2',
            coupleNames: 'Maria & David',
            ceremonyName: 'Maria & David Celebration',
            date: '2025-07-10',
            lastEdited: '2 days ago',
            status: 'in-progress',
            tone: 'Formal',
            length: 'Standard',
            location: 'Tuscany, Italy'
        }
    ];
}

// Export for use in other files
window.mockData = {
    initializeMockData,
    getMockStory,
    getMockCeremonies,
    MOCK_DATA
};

