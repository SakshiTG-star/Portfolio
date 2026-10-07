// Theme Toggling, Timeline Filters, Project Modals, AI Chat & Interactive Controls
document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const rootElement = document.documentElement;
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const currentYearSpan = document.getElementById('current-year');

  // Set current year dynamically
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Detect user's default browser theme via media query
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    rootElement.setAttribute('data-theme', savedTheme);
  } else {
    rootElement.setAttribute('data-theme', darkQuery.matches ? 'dark' : 'light');
  }

  // Listen for browser/OS theme changes when no manual override exists
  darkQuery.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      rootElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });

  // Toggle Theme button
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = rootElement.getAttribute('data-theme') || (darkQuery.matches ? 'dark' : 'light');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      rootElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // Interactive Timeline Filtering
  const timelineFilterBtns = document.querySelectorAll('.timeline-filter-btn');
  const timelineItems = document.querySelectorAll('.timeline-card-item');

  if (timelineFilterBtns.length > 0 && timelineItems.length > 0) {
    timelineFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        timelineFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        timelineItems.forEach(item => {
          const itemCategory = item.getAttribute('data-category');
          if (filterValue === 'all' || itemCategory === filterValue) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }

  // =========================================================================
  // Project Clickable Thumbnails & Modal Dialog Controls
  // =========================================================================
  const modalTriggers = document.querySelectorAll('[data-modal-target]');
  const allModals = document.querySelectorAll('.project-modal');

  function openModal(modalId) {
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
      targetModal.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal(modal) {
    if (modal) {
      modal.setAttribute('hidden', '');
      document.body.style.overflow = '';
    }
  }

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-modal-target');
      openModal(modalId);
    });
  });

  allModals.forEach(modal => {
    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', () => closeModal(modal));

    const dismissBtn = modal.querySelector('.modal-dismiss-btn');
    if (dismissBtn) dismissBtn.addEventListener('click', () => closeModal(modal));

    const backdrop = modal.querySelector('.modal-backdrop');
    if (backdrop) backdrop.addEventListener('click', () => closeModal(modal));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      allModals.forEach(modal => {
        if (!modal.hasAttribute('hidden')) closeModal(modal);
      });
    }
  });

  // =========================================================================
  // AI Chat Interface Simulation & API Integration Handler
  // =========================================================================
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-user-input');
  const chatContainer = document.getElementById('chat-messages-container');
  const typingIndicator = document.getElementById('chat-typing-indicator');
  const clearChatBtn = document.getElementById('chat-clear-btn');
  const chipButtons = document.querySelectorAll('.chat-chip-btn');

  // Knowledge base facts for intelligent simulated responses
  const resumeKnowledgeBase = {
    skills: "Sakshi is highly proficient in Java and has a solid foundational grasp of C. Her core engineering strengths include Object-Oriented Programming (OOP), Data Structures & Algorithms (DSA), Artificial Intelligence & Machine Learning (AI/ML), Git/GitHub, and VS Code.",
    sih: "During the Smart India Hackathon (SIH) 2026, Sakshi led an interdisciplinary team of 6 engineers. She coordinated the sprint planning, sensor integration, and complete development of the Smart Waste Segregation System, earning the SIH 2026 Participation Award.",
    drowsiness: "The Driver Drowsiness Detection System is an AI/Computer Vision project designed to improve highway safety. It analyzes facial landmarks (Eye Aspect Ratio & Mouth Aspect Ratio) to detect fatigue in real-time and trigger instant alerts using affordable edge hardware.",
    waste: "The Smart Waste Segregation System is an automated IoT project that uses inductive, proximity, and moisture sensors combined with servo actuators to automatically sort wet, dry, and metallic refuse.",
    education: "Sakshi is pursuing her Bachelor of Engineering in Information Science and Engineering at Adichunchanagiri Institute of Technology, Chikkamagaluru, maintaining an academic CGPA of 9.56 (Graduation 2029). Previously, she scored 91.83% in Class XII (PUC) and 96.00% in Class X.",
    cgpa: "Sakshi currently maintains an academic CGPA of 9.56 / 10.0 in Information Science and Engineering at AIT Chikkamagaluru.",
    contact: "You can reach Sakshi via email at sakshitgbhat08@gmail.com, call +91 8317481473, or connect on LinkedIn (linkedin.com/in/sakshi-tg-3629bb397) and GitHub (github.com/SakshiTG-star)."
  };

  // Helper function to append message to display area
  function appendMessage(sender, text) {
    if (!chatContainer) return;

    const msgEl = document.createElement('div');
    msgEl.className = `chat-message ${sender === 'user' ? 'user-message' : 'bot-message'}`;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    msgEl.innerHTML = `
      <div class="message-avatar">
        <span>${sender === 'user' ? 'You' : 'AI'}</span>
      </div>
      <div class="message-content">
        <div class="message-bubble">
          <p>${text}</p>
        </div>
        <span class="message-time">${timeStr}</span>
      </div>
    `;

    chatContainer.appendChild(msgEl);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  // Simulated AI response generator
  function generateAIResponse(userText) {
    const lower = userText.toLowerCase();

    if (lower.includes('skill') || lower.includes('stack') || lower.includes('java') || lower.includes('language') || lower.includes('dsa') || lower.includes('oop')) {
      return resumeKnowledgeBase.skills;
    } else if (lower.includes('sih') || lower.includes('hackathon') || lower.includes('leader')) {
      return resumeKnowledgeBase.sih;
    } else if (lower.includes('drowsiness') || lower.includes('driver') || lower.includes('vision') || lower.includes('safety')) {
      return resumeKnowledgeBase.drowsiness;
    } else if (lower.includes('waste') || lower.includes('segregation') || lower.includes('sensor')) {
      return resumeKnowledgeBase.waste;
    } else if (lower.includes('cgpa') || lower.includes('grade') || lower.includes('marks') || lower.includes('score') || lower.includes('percentage')) {
      return resumeKnowledgeBase.cgpa;
    } else if (lower.includes('education') || lower.includes('college') || lower.includes('school') || lower.includes('university') || lower.includes('ait')) {
      return resumeKnowledgeBase.education;
    } else if (lower.includes('contact') || lower.includes('email') || lower.includes('hire') || lower.includes('phone') || lower.includes('reach') || lower.includes('linkedin')) {
      return resumeKnowledgeBase.contact;
    } else if (lower.includes('project') || lower.includes('built') || lower.includes('work')) {
      return `Sakshi has engineered several impactful solutions including the **Driver Drowsiness Detection System**, the SIH 2026 **Smart Waste Segregation System**, a **Java OOP Academic Management System**, and an **Algorithm Visualizer**. Which one would you like to explore?`;
    } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
      return "Hello there! How can I assist you with Sakshi's engineering portfolio today?";
    } else {
      return `Thank you for your question! Sakshi is an Information Science & Engineering student at AIT (CGPA 9.56) skilled in Java, DSA, AI/ML, and embedded systems. Feel free to ask about her projects, SIH 2026 leadership, or contact her at sakshitgbhat08@gmail.com!`;
    }
  }

  /* =========================================================================
     FUTURE API INTEGRATION POINT (e.g. OpenAI / Google Gemini / Custom Backend)
     To connect a live backend API in production:
     
     async function fetchRealAIResponse(userMessage) {
       try {
         const response = await fetch('/api/chat', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ message: userMessage })
         });
         const data = await response.json();
         return data.reply;
       } catch (error) {
         console.error('API Error:', error);
         return generateAIResponse(userMessage); // Fallback to local simulation
       }
     }
  ========================================================================= */

  // Process message submission
  function handleSendMessage(messageText) {
    const text = messageText || (chatInput ? chatInput.value.trim() : '');
    if (!text) return;

    // 1. Display User Message
    appendMessage('user', text);
    if (chatInput) chatInput.value = '';

    // 2. Show Typing Indicator
    if (typingIndicator) typingIndicator.removeAttribute('hidden');
    if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;

    // 3. Simulate AI processing time (600ms - 900ms)
    setTimeout(() => {
      if (typingIndicator) typingIndicator.setAttribute('hidden', '');
      const aiReply = generateAIResponse(text);
      appendMessage('bot', aiReply);
    }, 750);
  }

  // Submit via form
  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleSendMessage();
    });
  }

  // Quick suggestion chips
  if (chipButtons.length > 0) {
    chipButtons.forEach(chip => {
      chip.addEventListener('click', () => {
        handleSendMessage(chip.textContent);
      });
    });
  }

  // Clear chat history
  if (clearChatBtn && chatContainer) {
    clearChatBtn.addEventListener('click', () => {
      chatContainer.innerHTML = `
        <div class="chat-message bot-message">
          <div class="message-avatar"><span>AI</span></div>
          <div class="message-content">
            <div class="message-bubble">
              <p>Chat cleared! Feel free to ask another question about Sakshi's skills, projects, or background.</p>
            </div>
            <span class="message-time">Just now</span>
          </div>
        </div>
      `;
    });
  }

  // Mobile Navigation Menu Toggle
  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', () => {
      const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
      mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
});
