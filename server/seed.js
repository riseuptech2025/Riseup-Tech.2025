// backend/seed.js
const mongoose = require('mongoose');
const WebsiteData = require('./models/WebsiteData');
require('dotenv').config();

const seedData = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  
  const defaultData = {
    company: {
      name: 'Riseup-Tech',
      email: 'riseuptech2025@gmail.com',
      phone: '+977-9827399860',
      address: 'Basundhara-7, Kathmandu, Nepal',
      registeredOffice: 'Tilathi-Koiladi Rural Municipality-2, Launiya, Saptari, Nepal'
    },
    hero: {
      title: "Let's Rise Together with Technology",
      subtitle: "Building the future of AI, connection, and innovation. We create intelligent platforms that empower people and transform industries worldwide.",
      badge: "Building the Future of AI & Innovation"
    },
    about: {
      mission: "To rise up technology and innovation in Nepal by building smart, user-friendly digital solutions that empower individuals.",
      vision: "Create a fully interconnected ecosystem of apps and AI-driven platforms for seamless digital experiences.",
      approach: "We don't sell technology - we create it for people, enabling growth, learning, and innovation."
    },
    social: {
      facebook: 'https://www.facebook.com/riseup.tech.2082',
      twitter: 'https://x.com/csit_ramanand',
      instagram: 'https://www.instagram.com/riseup__tech/',
      linkedin: 'https://www.linkedin.com/company/riseup-tech-2025'
    }
  };

  await WebsiteData.deleteMany({});
  await WebsiteData.create(defaultData);
  
  console.log('Database seeded successfully');
  process.exit(0);
};

seedData().catch(console.error);