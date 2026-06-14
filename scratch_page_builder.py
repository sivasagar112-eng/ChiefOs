import re

def create_page():
    with open('c:/Users/sivas/OneDrive/Desktop/ChiefOs/mockups/marketing_jsx.txt', 'r', encoding='utf-8') as f:
        jsx = f.read()

    # The HTML contains standard JS for animCount, toggleBilling, tFaq, etc.
    # We should convert those to React states and effects.
    
    react_code = """\"use client\";

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import './marketing.css';

export default function MarketingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    function animCount(el) {
      const dec = el.dataset.decimal === 'true';
      const target = parseFloat(el.dataset.count);
      const pre = el.dataset.prefix || '';
      const suf = el.dataset.suffix || '';
      const dur = 1800, st = performance.now();
      
      function step(now) {
        const p = Math.min((now - st) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3);
        el.textContent = pre + (dec ? (e * target).toFixed(1) : Math.round(e * target)) + suf;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    setTimeout(() => {
      document.querySelectorAll('.hero [data-count]').forEach(el => animCount(el));
    }, 700);

    const cObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animCount(e.target);
          cObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count]').forEach(el => {
      if (!el.closest('.hero')) cObs.observe(el);
    });

    return () => cObs.disconnect();
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

"""
    
    # We need to replace class="faq-item" logic with dynamic classNames
    # But wait, `marketing_jsx.txt` has hardcoded markup. We can use dangerouslySetInnerHTML or just do text replacement.
    # Text replacement is safer if we want to return a clean component.
    
    # Let's fix the href to # linking smoothly.
    # Next.js Link doesn't do smooth scroll by default, but we can just leave href="#features" and add CSS `html { scroll-behavior: smooth }` which is already in the CSS.
    
    # Fix the toggleBilling:
    jsx = re.sub(r'id="ml" className="tgl-label active"', 'className={`tgl-label ${!isAnnual ? "active" : ""}`}', jsx)
    jsx = re.sub(r'id="al" className="tgl-label"', 'className={`tgl-label ${isAnnual ? "active" : ""}`}', jsx)
    jsx = re.sub(r'id="tgl" className="tgl-switch" onClick="toggleBilling\(\)"', 'className={`tgl-switch ${isAnnual ? "on" : ""}`} onClick={() => setIsAnnual(!isAnnual)}', jsx)
    
    # Fix the pricing cards logic
    jsx = re.sub(r'<span className="pv" data-m="19" data-a="15">19</span>', '{!isAnnual ? "19" : "15"}', jsx)
    jsx = re.sub(r'<span className="pv" data-m="49" data-a="39">49</span>', '{!isAnnual ? "49" : "39"}', jsx)
    jsx = re.sub(r'<span className="pv" data-m="99" data-a="79">99</span>', '{!isAnnual ? "99" : "79"}', jsx)
    
    jsx = re.sub(r'<span className="pp">per month</span> &middot; billed monthly', '<span className="pp">per month</span> &middot; {isAnnual ? "billed annually" : "billed monthly"}', jsx)
    
    # FAQ mapping
    # We will replace faq-item static class with dynamic class based on openFaq state.
    # We can find all faq-items and replace them one by one.
    faq_items = re.findall(r'<div className="faq-item(.*?)</button><div className="faq-a">(.*?)</div></div>', jsx)
    # The structure: <div className="faq-item reveal reveal-delay-X"><button className="faq-q" onClick="tFaq(this)">Question<div className="faq-ico">+</div></button><div className="faq-a">Answer</div></div>
    faq_matches = re.finditer(r'<div className="faq-item (.*?)"><button className="faq-q" onClick="tFaq\(this\)">(.*?)<div className="faq-ico">\+</div></button><div className="faq-a">(.*?)</div></div>', jsx)
    
    for idx, match in enumerate(faq_matches):
        classes = match.group(1)
        question = match.group(2)
        answer = match.group(3)
        
        replacement = f"""<div className={{`faq-item {classes} ${{openFaq === {idx} ? 'open' : ''}}`}}><button className="faq-q" onClick={{() => toggleFaq({idx})}}>{question}<div className="faq-ico">+</div></button><div className="faq-a">{answer}</div></div>"""
        jsx = jsx.replace(match.group(0), replacement)

    # Navbar
    jsx = jsx.replace('id="navbar" className="navbar"', 'className={`navbar ${isScrolled ? "scrolled" : ""}`}')
    jsx = jsx.replace('id="mobile-menu" className="mobile-menu"', 'className={`mobile-menu ${isMenuOpen ? "open" : ""}`}')
    jsx = jsx.replace('id="hamburger" className="hamburger" onClick="toggleMenu()"', 'className={`hamburger ${isMenuOpen ? "open" : ""}`} onClick={toggleMenu}')
    jsx = jsx.replace('onClick="closeMenu()"', 'onClick={closeMenu}')
    
    # SVGs - the user says replace inline SVGs with lucide-react if it makes sense.
    # In footer there is an SVG for linkedin. Let's see if we can find it.
    jsx = re.sub(r'<svg(.*?)<\/svg>', '<LinkedinIcon size={15} />', jsx)
    
    # Add SVG imports
    # react_code += "import { Linkedin as LinkedinIcon } from 'lucide-react';\n"
    
    # Create the render
    react_code += f"""
  return (
    <>
{jsx}
    </>
  );
}}
"""
    
    # Also add lucide import at the top
    react_code = react_code.replace("import Link from 'next/link';", "import Link from 'next/link';\nimport { Linkedin as LinkedinIcon } from 'lucide-react';")

    with open('c:/Users/sivas/OneDrive/Desktop/ChiefOs/src/app/(marketing)/page.tsx', 'w', encoding='utf-8') as f:
        f.write(react_code)

create_page()
