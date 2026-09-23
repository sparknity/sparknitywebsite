/**
 * Sparknity - Interactive Controller & Dynamic State Management
 * Token-driven micro-interactions, AI Scope Assistant, Filters & Accessibility
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation Blur & Scroll State
  const siteHeader = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  });

  // 2. Mobile Navigation Drawer Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileToggle.innerHTML = isOpen 
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    // Close drawer when clicking any link
    mobileDrawer.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      });
    });
  }

  // 3. Interactive AI Project Scope Assistant (Nexura-inspired live intelligence)
  const assistantInput = document.getElementById('assistantInput');
  const assistantSubmit = document.getElementById('assistantSubmit');
  const assistantResult = document.getElementById('assistantResult');
  const recStack = document.getElementById('recStack');
  const recTimeline = document.getElementById('recTimeline');
  const recTeam = document.getElementById('recTeam');
  const suggestionChips = document.querySelectorAll('.suggestion-chip');

  const presetAnalyses = {
    'ai-saas': {
      query: 'AI SaaS MVP with Custom LLM Copilot',
      stack: 'Next.js 14 · FastAPI · OpenAI/Claude · PostgreSQL',
      timeline: '4 - 6 Weeks (Iterative sprints)',
      team: '1 Lead AI Eng · 1 Full-Stack · 1 UX Designer'
    },
    'mobile-app': {
      query: 'Cross-platform Mobile App with Offline Sync',
      stack: 'Flutter · Supabase · Node.js · AWS S3',
      timeline: '5 - 7 Weeks (iOS + Android)',
      team: '2 Senior Mobile Engs · 1 Product Designer'
    },
    'cloud-migration': {
      query: 'Enterprise Cloud Architecture & DevOps CI/CD',
      stack: 'Kubernetes · Terraform · AWS · Docker · Datadog',
      timeline: '3 - 5 Weeks (Zero-downtime cutover)',
      team: '1 Cloud Architect · 1 DevOps/SRE Lead'
    },
    'fintech': {
      query: 'Fintech Trading & Portfolio Intelligence Engine',
      stack: 'TypeScript · Python · TimescaleDB · WebSockets',
      timeline: '6 - 8 Weeks (PCI-DSS compliant)',
      team: '2 Senior Backend Engs · 1 Security Specialist'
    }
  };

  function updateAssistantScope(data) {
    if (!data) return;
    if (assistantInput) assistantInput.value = data.query;
    if (recStack) recStack.textContent = data.stack;
    if (recTimeline) recTimeline.textContent = data.timeline;
    if (recTeam) recTeam.textContent = data.team;

    if (assistantResult) {
      assistantResult.style.opacity = '0';
      assistantResult.style.transform = 'translateY(6px)';
      setTimeout(() => {
        assistantResult.style.transition = 'all 0.3s ease';
        assistantResult.style.opacity = '1';
        assistantResult.style.transform = 'translateY(0)';
      }, 50);
    }
  }

  suggestionChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const presetKey = chip.getAttribute('data-preset');
      if (presetAnalyses[presetKey]) {
        updateAssistantScope(presetAnalyses[presetKey]);
      }
    });
  });

  if (assistantSubmit && assistantInput) {
    assistantSubmit.addEventListener('click', () => {
      const val = assistantInput.value.trim().toLowerCase();
      if (!val) return;

      // Intelligent keyword fallback
      let matchedData = {
        query: assistantInput.value,
        stack: 'Next.js · Node.js · TypeScript · Supabase',
        timeline: '4 - 6 Weeks (Milestone based)',
        team: '1 Senior Tech Lead · 1 UI/UX Specialist'
      };

      if (val.includes('ai') || val.includes('llm') || val.includes('bot') || val.includes('agent')) {
        matchedData = presetAnalyses['ai-saas'];
        matchedData.query = assistantInput.value;
      } else if (val.includes('mobile') || val.includes('ios') || val.includes('android')) {
        matchedData = presetAnalyses['mobile-app'];
        matchedData.query = assistantInput.value;
      } else if (val.includes('cloud') || val.includes('scale') || val.includes('devops')) {
        matchedData = presetAnalyses['cloud-migration'];
        matchedData.query = assistantInput.value;
      } else if (val.includes('fintech') || val.includes('crypto') || val.includes('bank') || val.includes('pay')) {
        matchedData = presetAnalyses['fintech'];
        matchedData.query = assistantInput.value;
      }

      updateAssistantScope(matchedData);
    });

    assistantInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        assistantSubmit.click();
      }
    });
  }

  // 4. Portfolio Filter System
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue || cardCategory.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 5. Tech Stack Category Tabs
  const stackTabs = document.querySelectorAll('.stack-tab');
  const techCards = document.querySelectorAll('.tech-card');

  stackTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      stackTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const cat = tab.getAttribute('data-category');

      techCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (cat === 'all' || cardCat === cat) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(8px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 180);
        }
      });
    });
  });

  // 6. Domain Mastery / Industry Vertical Tabs
  const domainTabs = document.querySelectorAll('.domain-tab-btn');
  const domainTitle = document.getElementById('domainTitle');
  const domainDesc = document.getElementById('domainDesc');
  const domainFeatures = document.getElementById('domainFeatures');

  const domainData = {
    fintech: {
      title: 'Fintech & Algorithmic Finance',
      desc: 'We engineer bank-grade financial platforms built for high throughput, sub-millisecond execution, and uncompromising compliance with PCI-DSS, SOC2, and Open Banking APIs.',
      features: [
        'Real-time transaction ledgers & audits',
        'Automated algorithmic trading engines',
        'Stripe, Plaid & banking rail integrations',
        'Anti-fraud & anomaly detection models'
      ]
    },
    healthtech: {
      title: 'HealthTech & Clinical Telehealth',
      desc: 'HIPAA-compliant medical applications designed to connect patients, physicians, and telemetry devices with zero latency and end-to-end medical record encryption.',
      features: [
        'HIPAA & GDPR clinical data vaults',
        'Encrypted WebRTC telehealth calls',
        'EHR/EMR (Epic, Cerner) interoperability',
        'Wearable IoT vitals streaming'
      ]
    },
    saas: {
      title: 'Enterprise B2B SaaS Platforms',
      desc: 'Multi-tenant cloud architectures engineered for hyper-growth. Built with granular role-based access control, automated billing pipelines, and deep telemetry.',
      features: [
        'Multi-tenant DB isolation & sharding',
        'Self-serve RBAC & SSO (SAML/Okta)',
        'Event-driven billing & meter pipelines',
        'Real-time analytics & audit trail'
      ]
    },
    ecommerce: {
      title: 'Headless E-Commerce & Retail',
      desc: 'Ultra-fast composable commerce architectures with instant search, sub-second checkout pipelines, and real-time inventory synchronization across multi-channel retail.',
      features: [
        'Shopify Plus & custom headless engines',
        'Sub-second Algolia / Meilisearch catalog',
        'Omnichannel inventory synchronization',
        'Personalized dynamic cart recommendations'
      ]
    },
    logistics: {
      title: 'Logistics & Fleet Telematics',
      desc: 'High-scale routing and dispatch engines processing tens of thousands of simultaneous driver updates, dynamic route optimization, and predictive delivery windows.',
      features: [
        'Live geospatial tracking & Mapbox integration',
        'Dynamic TSP routing optimization',
        'Automated dispatcher dispatch queues',
        'IoT sensor & temperature monitoring'
      ]
    }
  };

  domainTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      domainTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const domainKey = tab.getAttribute('data-domain');
      const data = domainData[domainKey];
      if (data && domainTitle && domainDesc && domainFeatures) {
        domainTitle.textContent = data.title;
        domainDesc.textContent = data.desc;
        domainFeatures.innerHTML = data.features.map(f => `
          <div class="domain-feature-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>${f}</span>
          </div>
        `).join('');
      }
    });
  });

  // 7. FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherTrigger = otherItem.querySelector('.faq-trigger');
            if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current item
        item.classList.toggle('active', !isActive);
        trigger.setAttribute('aria-expanded', !isActive);
      });
    }
  });

  // 8. Interactive Form Selectable Pills & Submission
  const projectTypePills = document.querySelectorAll('.project-type-pill');
  projectTypePills.forEach(pill => {
    pill.addEventListener('click', () => {
      projectTypePills.forEach(p => p.classList.remove('selected'));
      pill.classList.add('selected');
    });
  });

  const budgetPills = document.querySelectorAll('.budget-pill');
  budgetPills.forEach(pill => {
    pill.addEventListener('click', () => {
      budgetPills.forEach(p => p.classList.remove('selected'));
      pill.classList.add('selected');
    });
  });

  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');
  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const origText = submitBtn.innerHTML;
      submitBtn.innerHTML = `Sending inquiry...`;
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = origText;
        submitBtn.disabled = false;
        formFeedback.classList.add('success');
        formFeedback.innerHTML = `
          <strong>Thank you!</strong> Your project inquiry has been received. A senior engineer will review your specifications and reply to your work email within 24 hours.
        `;
        contactForm.reset();
        projectTypePills.forEach(p => p.classList.remove('selected'));
        budgetPills.forEach(p => p.classList.remove('selected'));
      }, 800);
    });
  }

  // 9. Modal Handlers (Book a Call)
  const modalOverlay = document.getElementById('callModal');
  const openModalBtns = document.querySelectorAll('.open-call-modal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  if (modalOverlay) {
    openModalBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        modalOverlay.classList.add('open');
      });
    });

    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('open');
      });
    }

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('open');
      }
    });
  }
});
