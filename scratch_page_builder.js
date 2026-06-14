const fs = require('fs');

let jsx = fs.readFileSync('c:/Users/sivas/OneDrive/Desktop/ChiefOs/mockups/marketing_jsx.txt', 'utf8');

// Replace standard JS state logic
jsx = jsx.replace('id="ml" className="tgl-label active"', 'className={`tgl-label ${!isAnnual ? "active" : ""}`}');
jsx = jsx.replace('id="al" className="tgl-label"', 'className={`tgl-label ${isAnnual ? "active" : ""}`}');
jsx = jsx.replace('id="tgl" className="tgl-switch" onClick="toggleBilling()"', 'className={`tgl-switch ${isAnnual ? "on" : ""}`} onClick={() => setIsAnnual(!isAnnual)}');

jsx = jsx.replace('<span className="pv" data-m="19" data-a="15">19</span>', '{!isAnnual ? "19" : "15"}');
jsx = jsx.replace('<span className="pv" data-m="49" data-a="39">49</span>', '{!isAnnual ? "49" : "39"}');
jsx = jsx.replace('<span className="pv" data-m="99" data-a="79">99</span>', '{!isAnnual ? "99" : "79"}');

jsx = jsx.replace(
  '<span className="pp">per month</span> &middot; billed monthly',
  '<span className="pp">per month</span> &middot; {isAnnual ? "billed annually" : "billed monthly"}'
);
jsx = jsx.replace(
  '<span className="pp">per month</span> &middot; billed monthly',
  '<span className="pp">per month</span> &middot; {isAnnual ? "billed annually" : "billed monthly"}'
);
jsx = jsx.replace(
  '<span className="pp">per month</span> &middot; billed monthly',
  '<span className="pp">per month</span> &middot; {isAnnual ? "billed annually" : "billed monthly"}'
);

let idx = 0;
jsx = jsx.replace(/<div className="faq-item (.*?)"><button className="faq-q" onClick="tFaq\(this\)">(.*?)<div className="faq-ico">\+<\/div><\/button><div className="faq-a">([\s\S]*?)<\/div><\/div>/g, (match, classes, question, answer) => {
  const currentIdx = idx++;
  return `<div className={\`faq-item ${classes} \${openFaq === ${currentIdx} ? 'open' : ''}\`}><button className="faq-q" onClick={() => toggleFaq(${currentIdx})}>${question}<div className="faq-ico">+</div></button><div className="faq-a">${answer}</div></div>`;
});

jsx = jsx.replace('id="navbar" className="navbar"', 'className={`navbar ${isScrolled ? "scrolled" : ""}`}');
jsx = jsx.replace('className="mobile-menu" id="mobile-menu"', 'className={`mobile-menu ${isMenuOpen ? "open" : ""}`}');
jsx = jsx.replace('id="hamburger" className="hamburger" onClick="toggleMenu()"', 'className={`hamburger ${isMenuOpen ? "open" : ""}`} onClick={toggleMenu}');
jsx = jsx.replace(/onClick="closeMenu\(\)"/g, 'onClick={closeMenu}');

jsx = jsx.replace(/<svg[\s\S]*?<\/svg>/g, '<LinkedinIcon size={15} />');

let react_code = `"use client";

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { Linkedin as LinkedinIcon } from 'lucide-react';
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

  return (
    <div className="marketing-page">
${jsx}
    </div>
  );
}
`;

// Link tags replace
react_code = react_code.replace(/<a href="([^"]*)">([\s\S]*?)<\/a>/g, (match, p1, p2) => {
  if (p1.startsWith('#')) return `<a href="${p1}">${p2}</a>`; // Native smooth scroll anchor
  return `<Link href="${p1}">${p2}</Link>`;
});
react_code = react_code.replace(/<a href="([^"]*)" className="([^"]*)">([\s\S]*?)<\/a>/g, (match, p1, p2, p3) => {
  if (p1.startsWith('#')) return `<a href="${p1}" className="${p2}">${p3}</a>`;
  return `<Link href="${p1}" className="${p2}">${p3}</Link>`;
});
react_code = react_code.replace(/<a href="([^"]*)" className="([^"]*)" style={([^}]*})}>([\s\S]*?)<\/a>/g, (match, p1, p2, p3, p4) => {
  if (p1.startsWith('#')) return `<a href="${p1}" className="${p2}" style={${p3}}>${p4}</a>`;
  return `<Link href="${p1}" className="${p2}" style={${p3}}>${p4}</Link>`;
});

fs.writeFileSync('c:/Users/sivas/OneDrive/Desktop/ChiefOs/src/app/(marketing)/page.tsx', react_code, 'utf8');

console.log("Done page.tsx");
