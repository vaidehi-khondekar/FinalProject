// --- MOCK DATA (Simulating a data fetch) ---
const mockUserProfile = {
    name: "Alexa Johnson",
    title: "Senior Frontend Developer | 🌟 Top 1% Learner",
    profilePicUrl: "pro.jpg",
    stats: {
        certifications: 12,
        hoursSpent: 520,
        projectsCompleted: 8
    },
    skills: [
        { name: "Web Development", rating: 5 },
        { name: "Data Science", rating: 4 },
        { name: "UI/UX", rating: 5 },
        { name: "Cybersecurity", rating: 3 },
    ],
    badges: [
        { title: "Quantum Leap", icon: "fas fa-rocket" },
        { title: "Code Architect", icon: "fas fa-drafting-compass" },
        { title: "Pixel Perfect", icon: "fas fa-paint-brush" },
        { title: "Terminal Guru", icon: "fas fa-terminal" },
        { title: "Team Player", icon: "fas fa-users" },
    ],
    enrolledCourses: [
        { title: "Mastering Web Development", progress: 85 },
        { title: "Advanced Cybersecurity", progress: 55 },
        { title: "Data Science", progress: 100 },
        { title: "UI/UX Design Principles", progress: 30 }
    ]
};

// --- DOM ELEMENT REFERENCES ---
const userNameEl = document.getElementById('user-name');
const userTitleEl = document.getElementById('user-title');
const profilePictureEl = document.getElementById('profile-picture');
const certificationsCountEl = document.getElementById('certifications-count');
const hoursSpentCountEl = document.getElementById('hours-spent-count');
const projectsCountEl = document.getElementById('projects-count');
const skillsContainer = document.getElementById('skills-container');
const badgesContainer = document.getElementById('badges-container');
const coursesContainer = document.getElementById('courses-container');

// --- HELPER FUNCTIONS ---
/**
 * Generates the star rating HTML based on a numeric rating.
 * @param {number} rating - The star rating (e.g., 5).
 * @returns {string} - HTML string of star icons.
 */
function getStarRatingHtml(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            stars += '<i class="fas fa-star"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return `<div class="stars">${stars}</div>`;
}

// --- FUNCTIONS TO RENDER DATA ---
function renderUserInfo(profileData) {
    userNameEl.textContent = profileData.name;
    userTitleEl.textContent = profileData.title;
    profilePictureEl.src = profileData.profilePicUrl;

    certificationsCountEl.textContent = profileData.stats.certifications;
    hoursSpentCountEl.textContent = profileData.stats.hoursSpent;
    projectsCountEl.textContent = profileData.stats.projectsCompleted;
}

function renderSkills(skills) {
    skillsContainer.innerHTML = '';
    skills.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        skillItem.innerHTML = `
            <h3>${skill.name}</h3>
            ${getStarRatingHtml(skill.rating)}
        `;
        skillsContainer.appendChild(skillItem);
    });
}

function renderBadges(badges) {
    badgesContainer.innerHTML = '';
    badges.forEach(badge => {
        const badgeEl = document.createElement('div');
        badgeEl.className = 'badge';
        badgeEl.title = badge.title;
        badgeEl.innerHTML = `
            <i class="${badge.icon} badge-icon"></i>
            <p class="badge-title">${badge.title}</p>
        `;
        badgesContainer.appendChild(badgeEl);
    });
}

function renderCourses(courses) {
    coursesContainer.innerHTML = '';
    courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.innerHTML = `
            <h3>${course.title}</h3>
            <p>Progress towards completion</p>
            <div class="course-progress">
                <div class="progress-bar" style="width: ${course.progress}%;"></div>
            </div>
            <span class="progress-text">${course.progress}% Complete</span>
        `;
        coursesContainer.appendChild(courseCard);
    });
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // Simulate data loading
    setTimeout(() => {
        renderUserInfo(mockUserProfile);
        renderSkills(mockUserProfile.skills);
        renderBadges(mockUserProfile.badges);
        renderCourses(mockUserProfile.enrolledCourses);
    }, 500);
});
