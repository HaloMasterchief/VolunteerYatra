const { Pool } = require('pg');
require('dotenv').config();

console.log("Using connection string:", process.env.SUPABASE_CONNECTION_STRING ? 
  process.env.SUPABASE_CONNECTION_STRING.replace(/\/\/[^:]+:[^@]+@/, '//*****:*****@') : 
  "NOT SET");

const pool = new Pool({
  connectionString: process.env.SUPABASE_CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 10000 // 10 seconds timeout
});

const opportunities = [
  {
    title: "Beach Cleanup",
    description: "Help clean up local beaches and protect marine life",
    skills: ["Environment", "Community Service"],
  },
  {
    title: "Food Bank Assistance",
    description: "Sort and package food donations for distribution",
    skills: ["Food Handling", "Organization"],
  },
  {
    title: "Senior Companion",
    description: "Provide companionship and assistance to elderly residents",
    skills: ["Compassion", "Communication"],
  },
  {
    title: "Tutoring Students",
    description: "Help students with homework and learning",
    skills: ["Teaching", "Patience"],
  },
  {
    title: "Animal Shelter Care",
    description: "Assist in taking care of animals at the shelter",
    skills: ["Animal Care", "Compassion"],
  },
  {
    title: "Park Tree Planting",
    description: "Plant and care for trees in community parks",
    skills: ["Gardening", "Environment"],
  },
  {
    title: "Hospital Volunteer",
    description: "Support healthcare workers with non-medical tasks",
    skills: ["Compassion", "Organization"],
  },
  {
    title: "Coding Mentor",
    description: "Mentor beginners in programming and coding basics",
    skills: ["JavaScript", "Teaching"],
  },
  {
    title: "Library Assistant",
    description: "Help organize books and assist visitors",
    skills: ["Organization", "Customer Service"],
  },
  {
    title: "Event Setup Crew",
    description: "Help set up and organize community events",
    skills: ["Teamwork", "Logistics"],
  },
  {
    title: "Youth Sports Coach",
    description: "Coach children in local sports teams",
    skills: ["Leadership", "Sports"],
  },
  {
    title: "Art Workshop Assistant",
    description: "Assist in conducting art and craft workshops",
    skills: ["Creativity", "Teaching"],
  },
  {
    title: "Homeless Shelter Kitchen Help",
    description: "Cook and serve meals at a homeless shelter",
    skills: ["Cooking", "Compassion"],
  },
  {
    title: "Blood Drive Registration",
    description: "Assist with registering donors and guiding them",
    skills: ["Customer Service", "Organization"],
  },
  {
    title: "Habitat Construction Volunteer",
    description: "Help build homes for families in need",
    skills: ["Carpentry", "Teamwork"],
  },
  {
    title: "Community Tech Support",
    description: "Offer basic tech support for seniors and people in need",
    skills: ["IT Support", "Patience"],
  },
  {
    title: "Environmental Awareness Campaign",
    description: "Distribute materials and raise awareness on eco-issues",
    skills: ["Public Speaking", "Environment"],
  },
  {
    title: "Music Tutor",
    description: "Teach music lessons to children and beginners",
    skills: ["Music", "Teaching"],
  },
  {
    title: "Disaster Relief Packaging",
    description: "Assemble emergency kits for disaster-affected areas",
    skills: ["Teamwork", "Organization"],
  },
  {
    title: "Language Exchange Partner",
    description: "Help non-native speakers practice conversation",
    skills: ["Language", "Communication"],
  },
  {
    title: "Recycling Program Volunteer",
    description: "Assist in sorting and promoting local recycling",
    skills: ["Sustainability", "Community Service"],
  },
  {
    title: "Community Gardening",
    description: "Maintain and plant in a communal vegetable garden",
    skills: ["Gardening", "Teamwork"],
  },
  {
    title: "Museum Guide",
    description: "Guide visitors and explain exhibits",
    skills: ["Public Speaking", "History"],
  },
  {
    title: "Clothes Donation Sorting",
    description: "Sort donated clothes for charity distribution",
    skills: ["Organization", "Teamwork"],
  },
  {
    title: "Youth Mentoring",
    description: "Provide career and life guidance to teenagers",
    skills: ["Leadership", "Mentorship"],
  },
  {
    title: "Online Helpline Volunteer",
    description: "Respond to queries via chat or email",
    skills: ["Communication", "Empathy"],
  },
  {
    title: "Photography for Nonprofits",
    description: "Take photos at events to help nonprofits share their mission",
    skills: ["Photography", "Creativity"],
  },
  {
    title: "Charity Marathon Support",
    description: "Hand out water and cheer runners during fundraisers",
    skills: ["Energy", "Teamwork"],
  },
  {
    title: "Children’s Storytime Reader",
    description: "Read books to young children at libraries",
    skills: ["Storytelling", "Patience"],
  },
  {
    title: "Crisis Hotline Assistant",
    description: "Provide support and resources over the phone",
    skills: ["Empathy", "Crisis Management"],
  },
];


async function generateMockData() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Insert opportunities
    for (const opp of opportunities) {
      // Hardcoded user ID for now
      const userId = '00000000-0000-0000-0000-000000000000';
      await client.query(
        `INSERT INTO opportunities (title, description, skills, user_id)
         VALUES ($1, $2, $3, $4)`,
        [opp.title, opp.description, opp.skills, userId]
      );
    }

    await client.query('COMMIT');
    console.log('Mock data inserted successfully');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Database connection error details:');
    console.error('- Verify your SUPABASE_CONNECTION_STRING in .env file');
    console.error('- Check your network connection to Supabase');
    console.error('- Ensure port 5432 is open in your firewall');
    console.error('- Full error:', err);
  } finally {
    client.release();
    pool.end();
  }
}

generateMockData();
