const mongoose = require('mongoose');
const Skill=require('../models/skill');
const skills = [
    { name: "JavaScript Basics", description: "Learn the fundamentals of JavaScript programming." },
    { name: "Python for Beginners", description: "Introduction to Python programming with hands-on examples." },
    { name: "Data Structures & Algorithms", description: "Master the key data structures and algorithms for coding interviews." },
    { name: "Web Development with React", description: "Learn how to build modern web applications using React." },
    { name: "Backend Development with Node.js", description: "Understand how to create backend services with Node.js and Express." },
    { name: "Database Management with MongoDB", description: "Learn how to design and manage NoSQL databases using MongoDB." },
    { name: "Full-Stack Development", description: "Become a full-stack developer by mastering frontend and backend technologies." },
    { name: "DevOps Fundamentals", description: "Learn DevOps principles, CI/CD, and infrastructure automation." },
    { name: "Cybersecurity Basics", description: "Understand cybersecurity threats and how to protect systems." },
    { name: "Machine Learning with Python", description: "Introduction to machine learning concepts using Python and scikit-learn." },
    { name: "Blockchain Fundamentals", description: "Learn about blockchain technology and smart contracts." },
    { name: "UI/UX Design Principles", description: "Understand user experience and interface design for web and mobile apps." },
    { name: "Software Testing & QA", description: "Learn the fundamentals of software testing and quality assurance." },
    { name: "Cloud Computing with AWS", description: "Get started with cloud computing using Amazon Web Services (AWS)." },
    { name: "Android App Development", description: "Learn to build mobile applications using Android and Kotlin." },
    { name: "iOS App Development", description: "Learn Swift and build apps for iOS devices." },
    { name: "Ethical Hacking", description: "Learn penetration testing techniques and cybersecurity strategies." },
    { name: "Computer Networking", description: "Understand the basics of networking, protocols, and security." },
    { name: "C++ for Competitive Programming", description: "Master C++ for coding contests and problem-solving." },
    { name: "Artificial Intelligence", description: "Explore AI concepts, neural networks, and deep learning." },
  ];
  
    Skill.insertMany(skills).then(() => {
      console.log('Skills added successfully');
    }).catch((err) => {
      console.log(err);
    });
  