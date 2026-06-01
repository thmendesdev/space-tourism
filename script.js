// Global variables
let data = null;
let currentDestinationIndex = 0;
let currentCrewIndex = 0;
let currentTechnologyIndex = 0;

// Inline fallback data used when fetching JSON is not possible (e.g., opened via file://)
// This mirrors the contents of `starter-code/data.json` to keep the UI working offline.
const FALLBACK_DATA = {
  "destinations": [
    {
      "name": "Moon",
      "images": {
        "png": "./assets/destination/image-moon.png",
        "webp": "./assets/destination/image-moon.webp"
      },
      "description": "See our planet as you’ve never seen it before. A perfect relaxing trip away to help regain perspective and come back refreshed. While you’re there, take in some history by visiting the Luna 2 and Apollo 11 landing sites.",
      "distance": "384,400 km",
      "travel": "3 days"
    },
    {
      "name": "Mars",
      "images": {
        "png": "./assets/destination/image-mars.png",
        "webp": "./assets/destination/image-mars.webp"
      },
      "description": "Don’t forget to pack your hiking boots. You’ll need them to tackle Olympus Mons, the tallest planetary mountain in our solar system. It’s two and a half times the size of Everest!",
      "distance": "225 mil. km",
      "travel": "9 months"
    },
    {
      "name": "Europa",
      "images": {
        "png": "./assets/destination/image-europa.png",
        "webp": "./assets/destination/image-europa.webp"
      },
      "description": "The smallest of the four Galilean moons orbiting Jupiter, Europa is a winter lover’s dream. With an icy surface, it’s perfect for a bit of ice skating, curling, hockey, or simple relaxation in your snug wintery cabin.",
      "distance": "628 mil. km",
      "travel": "3 years"
    },
    {
      "name": "Titan",
      "images": {
        "png": "./assets/destination/image-titan.png",
        "webp": "./assets/destination/image-titan.webp"
      },
      "description": "The only moon known to have a dense atmosphere other than Earth, Titan is a home away from home (just a few hundred degrees colder!). As a bonus, you get striking views of the Rings of Saturn.",
      "distance": "1.6 bil. km",
      "travel": "7 years"
    }
  ],
  "crew": [
    {
      "name": "Douglas Hurley",
      "images": {
        "png": "./assets/crew/image-douglas-hurley.png",
        "webp": "./assets/crew/image-douglas-hurley.webp"
      },
      "role": "Commander",
      "bio": "Douglas Gerald Hurley is an American engineer, former Marine Corps pilot and former NASA astronaut. He launched into space for the third time as commander of Crew Dragon Demo-2."
    },
    {
      "name": "Mark Shuttleworth",
      "images": {
        "png": "./assets/crew/image-mark-shuttleworth.png",
        "webp": "./assets/crew/image-mark-shuttleworth.webp"
      },
      "role": "Mission Specialist",
      "bio": "Mark Richard Shuttleworth is the founder and CEO of Canonical, the company behind the Linux-based Ubuntu operating system. Shuttleworth became the first South African to travel to space as a space tourist."
    },
    {
      "name": "Victor Glover",
      "images": {
        "png": "./assets/crew/image-victor-glover.png",
        "webp": "./assets/crew/image-victor-glover.webp"
      },
      "role": "Pilot",
      "bio": "Pilot on the first operational flight of the SpaceX Crew Dragon to the International Space Station. Glover is a commander in the U.S. Navy where he pilots an F/A-18.He was a crew member of Expedition 64, and served as a station systems flight engineer."
    },
    {
      "name": "Anousheh Ansari",
      "images": {
        "png": "./assets/crew/image-anousheh-ansari.png",
        "webp": "./assets/crew/image-anousheh-ansari.webp"
      },
      "role": "Flight Engineer",
      "bio": "Anousheh Ansari is an Iranian American engineer and co-founder of Prodea Systems. Ansari was the fourth self-funded space tourist, the first self-funded woman to fly to the ISS, and the first Iranian in space."
    }
  ],
  "technology": [
    {
      "name": "Launch vehicle",
      "images": {
        "portrait": "./assets/technology/image-launch-vehicle-portrait.jpg",
        "landscape": "./assets/technology/image-launch-vehicle-landscape.jpg"
      },
      "description": "A launch vehicle or carrier rocket is a rocket-propelled vehicle used to carry a payload from Earth's surface to space, usually to Earth orbit or beyond. Our WEB-X carrier rocket is the most powerful in operation. Standing 150 metres tall, it's quite an awe-inspiring sight on the launch pad!"
    },
    {
      "name": "Spaceport",
      "images": {
        "portrait": "./assets/technology/image-spaceport-portrait.jpg",
        "landscape": "./assets/technology/image-spaceport-landscape.jpg"
      },
      "description": "A spaceport or cosmodrome is a site for launching (or receiving) spacecraft, by analogy to the seaport for ships or airport for aircraft. Based in the famous Cape Canaveral, our spaceport is ideally situated to take advantage of the Earth’s rotation for launch."
    },
    {
      "name": "Space capsule",
      "images": {
        "portrait": "./assets/technology/image-space-capsule-portrait.jpg",
        "landscape": "./assets/technology/image-space-capsule-landscape.jpg"
      },
      "description": "A space capsule is an often-crewed spacecraft that uses a blunt-body reentry capsule to reenter the Earth's atmosphere without wings. Our capsule is where you'll spend your time during the flight. It includes a space gym, cinema, and plenty of other activities to keep you entertained."
    }
  ]
};

// Load data from JSON file with robust fallback
async function loadData() {
  try {
    const response = await fetch('./starter-code/data.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    data = await response.json();
  } catch (error) {
    console.warn('Falling back to inline data because loading JSON failed:', error);
    data = FALLBACK_DATA;
  } finally {
    initializePage();
  }
}

// Initialize page based on current URL
function initializePage() {
  const path = window.location.pathname;
  
  if (path.includes('destination.html')) {
    initializeDestinationPage();
  } else if (path.includes('crew.html')) {
    initializeCrewPage();
  } else if (path.includes('technology.html')) {
    initializeTechnologyPage();
  }
}

// Destination Page Functions
function initializeDestinationPage() {
  if (!data) return;
  
  // Set up tab event listeners
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const index = parseInt(button.dataset.index);
      updateDestination(index);
    });
  });
  
  // Load initial destination
  updateDestination(0);
}

function updateDestination(index) {
  if (!data || !data.destinations[index]) return;
  
  const destination = data.destinations[index];
  
  // Update active tab
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`[data-index="${index}"]`).classList.add('active');
  
  // Update content with fade animation
  const contentElements = [
    document.getElementById('destination-img'),
    document.getElementById('destination-name'),
    document.getElementById('destination-description'),
    document.getElementById('destination-distance'),
    document.getElementById('destination-travel')
  ];
  
  contentElements.forEach(el => {
    if (el) {
      el.classList.add('fade-in');
      setTimeout(() => el.classList.remove('fade-in'), 500);
    }
  });
  
  // Update image
  const img = document.getElementById('destination-img');
  if (img) {
    img.src = './starter-code/' + destination.images.png.replace('./', '');
    img.alt = destination.name;
  }
  
  // Update text content
  const name = document.getElementById('destination-name');
  if (name) name.textContent = destination.name;
  
  const description = document.getElementById('destination-description');
  if (description) description.textContent = destination.description;
  
  const distance = document.getElementById('destination-distance');
  if (distance) distance.textContent = destination.distance;
  
  const travel = document.getElementById('destination-travel');
  if (travel) travel.textContent = destination.travel;
  
  currentDestinationIndex = index;
}

// Crew Page Functions
function initializeCrewPage() {
  if (!data) return;
  
  // Set up indicator event listeners
  const indicators = document.querySelectorAll('.indicator');
  indicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
      const index = parseInt(indicator.dataset.index);
      updateCrew(index);
    });
  });
  
  // Load initial crew member
  updateCrew(0);
}

function updateCrew(index) {
  if (!data || !data.crew[index]) return;
  
  const crewMember = data.crew[index];
  
  // Update active indicator
  document.querySelectorAll('.indicator').forEach(ind => ind.classList.remove('active'));
  document.querySelector(`[data-index="${index}"]`).classList.add('active');
  
  // Update content with fade animation
  const contentElements = [
    document.getElementById('crew-img'),
    document.getElementById('crew-role'),
    document.getElementById('crew-name'),
    document.getElementById('crew-bio')
  ];
  
  contentElements.forEach(el => {
    if (el) {
      el.classList.add('fade-in');
      setTimeout(() => el.classList.remove('fade-in'), 500);
    }
  });
  
  // Update image
  const img = document.getElementById('crew-img');
  if (img) {
    img.src = './starter-code/' + crewMember.images.png.replace('./', '');
    img.alt = crewMember.name;
  }
  
  // Update text content
  const role = document.getElementById('crew-role');
  if (role) role.textContent = crewMember.role;
  
  const name = document.getElementById('crew-name');
  if (name) name.textContent = crewMember.name;
  
  const bio = document.getElementById('crew-bio');
  if (bio) bio.textContent = crewMember.bio;
  
  currentCrewIndex = index;
}

// Technology Page Functions
function initializeTechnologyPage() {
  if (!data) return;
  
  // Set up technology tab event listeners
  const techTabs = document.querySelectorAll('.tech-tab');
  techTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const index = parseInt(tab.dataset.index);
      updateTechnology(index);
    });
  });
  
  // Load initial technology
  updateTechnology(0);
}

function updateTechnology(index) {
  if (!data || !data.technology[index]) return;
  
  const technology = data.technology[index];
  
  // Update active tab
  document.querySelectorAll('.tech-tab').forEach(tab => tab.classList.remove('active'));
  document.querySelector(`[data-index="${index}"]`).classList.add('active');
  
  // Update content with fade animation
  const contentElements = [
    document.getElementById('tech-img'),
    document.getElementById('tech-name'),
    document.getElementById('tech-description')
  ];
  
  contentElements.forEach(el => {
    if (el) {
      el.classList.add('fade-in');
      setTimeout(() => el.classList.remove('fade-in'), 500);
    }
  });
  
  // Update image based on screen size
  const img = document.getElementById('tech-img');
  if (img) {
    const isMobile = window.innerWidth <= 768;
    const imagePath = isMobile ? technology.images.landscape : technology.images.portrait;
    img.src = './starter-code/' + imagePath.replace('./', '');
    img.alt = technology.name;
  }
  
  // Update text content
  const name = document.getElementById('tech-name');
  if (name) name.textContent = technology.name;
  
  const description = document.getElementById('tech-description');
  if (description) description.textContent = technology.description;
  
  currentTechnologyIndex = index;
}

// Mobile Menu Functions
function initializeMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (mobileMenuBtn && nav) {
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', () => {
      nav.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
      document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking on navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        nav.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
    
    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('active')) {
        nav.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
}

// Keyboard Navigation
function initializeKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('destination.html')) {
      handleDestinationKeyboard(e);
    } else if (currentPage.includes('crew.html')) {
      handleCrewKeyboard(e);
    } else if (currentPage.includes('technology.html')) {
      handleTechnologyKeyboard(e);
    }
  });
}

function handleDestinationKeyboard(e) {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const maxIndex = tabButtons.length - 1;
  
  switch (e.key) {
    case 'ArrowLeft':
      e.preventDefault();
      const newIndex = Math.max(0, currentDestinationIndex - 1);
      updateDestination(newIndex);
      break;
    case 'ArrowRight':
      e.preventDefault();
      const nextIndex = Math.min(maxIndex, currentDestinationIndex + 1);
      updateDestination(nextIndex);
      break;
  }
}

function handleCrewKeyboard(e) {
  const indicators = document.querySelectorAll('.indicator');
  const maxIndex = indicators.length - 1;
  
  switch (e.key) {
    case 'ArrowLeft':
      e.preventDefault();
      const newIndex = Math.max(0, currentCrewIndex - 1);
      updateCrew(newIndex);
      break;
    case 'ArrowRight':
      e.preventDefault();
      const nextIndex = Math.min(maxIndex, currentCrewIndex + 1);
      updateCrew(nextIndex);
      break;
  }
}

function handleTechnologyKeyboard(e) {
  const techTabs = document.querySelectorAll('.tech-tab');
  const maxIndex = techTabs.length - 1;
  
  switch (e.key) {
    case 'ArrowUp':
      e.preventDefault();
      const newIndex = Math.max(0, currentTechnologyIndex - 1);
      updateTechnology(newIndex);
      break;
    case 'ArrowDown':
      e.preventDefault();
      const nextIndex = Math.min(maxIndex, currentTechnologyIndex + 1);
      updateTechnology(nextIndex);
      break;
  }
}

// Touch Gesture Support for Mobile
function initializeTouchGestures() {
  let startX = 0;
  let startY = 0;
  let endX = 0;
  let endY = 0;
  
  document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });
  
  document.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    endY = e.changedTouches[0].clientY;
    
    const deltaX = startX - endX;
    const deltaY = startY - endY;
    const minSwipeDistance = 50;
    
    // Only trigger if swipe distance is significant
    if (Math.abs(deltaX) > minSwipeDistance || Math.abs(deltaY) > minSwipeDistance) {
      const currentPage = window.location.pathname;
      
      if (currentPage.includes('destination.html')) {
        handleDestinationSwipe(deltaX);
      } else if (currentPage.includes('crew.html')) {
        handleCrewSwipe(deltaX);
      } else if (currentPage.includes('technology.html')) {
        handleTechnologySwipe(deltaY);
      }
    }
  });
}

function handleDestinationSwipe(deltaX) {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const maxIndex = tabButtons.length - 1;
  
  if (deltaX > 0) {
    // Swipe left - next destination
    const nextIndex = Math.min(maxIndex, currentDestinationIndex + 1);
    updateDestination(nextIndex);
  } else if (deltaX < 0) {
    // Swipe right - previous destination
    const prevIndex = Math.max(0, currentDestinationIndex - 1);
    updateDestination(prevIndex);
  }
}

function handleCrewSwipe(deltaX) {
  const indicators = document.querySelectorAll('.indicator');
  const maxIndex = indicators.length - 1;
  
  if (deltaX > 0) {
    // Swipe left - next crew member
    const nextIndex = Math.min(maxIndex, currentCrewIndex + 1);
    updateCrew(nextIndex);
  } else if (deltaX < 0) {
    // Swipe right - previous crew member
    const prevIndex = Math.max(0, currentCrewIndex - 1);
    updateCrew(prevIndex);
  }
}

function handleTechnologySwipe(deltaY) {
  const techTabs = document.querySelectorAll('.tech-tab');
  const maxIndex = techTabs.length - 1;
  
  if (deltaY > 0) {
    // Swipe up - next technology
    const nextIndex = Math.min(maxIndex, currentTechnologyIndex + 1);
    updateTechnology(nextIndex);
  } else if (deltaY < 0) {
    // Swipe down - previous technology
    const prevIndex = Math.max(0, currentTechnologyIndex - 1);
    updateTechnology(prevIndex);
  }
}

// Smooth scrolling for explore button
function initializeSmoothScrolling() {
  const exploreBtn = document.querySelector('.explore-btn');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const destination = exploreBtn.getAttribute('href');
      window.location.href = destination;
    });
  }
}

// Handle window resize for technology images
function handleResize() {
  if (window.location.pathname.includes('technology.html') && data) {
    updateTechnology(currentTechnologyIndex);
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  initializeMobileMenu();
  initializeKeyboardNavigation();
  initializeSmoothScrolling();
  initializeTouchGestures(); // Initialize touch gestures
  
  // Handle window resize
  window.addEventListener('resize', handleResize);
});

// Add smooth transitions for all interactive elements
document.addEventListener('DOMContentLoaded', () => {
  // Remove any conflicting transform styles
  const interactiveElements = document.querySelectorAll('a, button, .tab-btn, .indicator, .tech-tab');
  
  interactiveElements.forEach(element => {
    // Clear any inline styles that might conflict with CSS
    element.style.transform = '';
  });
});

// Add loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Add CSS for loading state
const style = document.createElement('style');
style.textContent = `
  body:not(.loaded) {
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  
  body.loaded {
    opacity: 1;
  }
  
  .fade-in {
    animation: fadeIn 0.5s ease-out;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style); 