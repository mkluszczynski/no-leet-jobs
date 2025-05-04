import { EmploymentType, ExperienceLevel, Job, WorkType } from "../types/job";
import { SkillLevel } from "../types/required-skill";

// export const jsField: FieldOfJob = {
//   id: 1,
//   name: "JavaScript",
//   alias: "js",
// };

// export const NextJsSkill: Skill = {
//   id: 1,
//   name: "Next.js",
// };
const jobDescription = `
# Software Developer at ByteForge 🚀

## About Us 💡
ByteForge is a dynamic tech startup revolutionizing the way businesses interact with data. We build intelligent analytics platforms that transform complex datasets into actionable insights. Our team is small but mighty, with a passion for elegant code and impactful solutions. We're growing fast and looking for talented developers to join our journey!

## What You'll Do 👨‍💻
- Develop and maintain high-quality, scalable web applications
- Collaborate with our product team to transform ideas into features
- Write clean, efficient, and well-documented code
- Participate in code reviews and architectural discussions
- Debug production issues and implement solutions
- Continuously learn and apply new technologies

## What You Should Have 🔍
- 3+ years of professional software development experience
- Strong proficiency in JavaScript/TypeScript and React
- Experience with RESTful APIs and modern frontend architecture
- Problem-solving mindset and attention to detail
- Ability to work both independently and as part of a team
- Excellent communication skills and a passion for learning

## Our Tech Stack 🛠️
- **Frontend**: React, TypeScript, Next.js, Tailwind CSS
- **Backend**: Node.js, Express, PostgreSQL
- **Infrastructure**: AWS, Docker, GitHub Actions
- **Tools**: Git, Jira, Figma

## Benefits & Perks 🌈
- Competitive salary with equity options
- Flexible remote work policy (2 days in office)
- Health, dental, and vision insurance
- 25 days PTO + public holidays
- Professional development budget
- Regular team events and hackathons
- Modern office in the heart of the city with snacks and coffee ☕

## How to Apply 📝
Send your resume and a brief introduction to careers@byteforge.io. We'd love to see examples of your work, so please include links to your GitHub or projects you're proud of!

*ByteForge values diversity and is committed to creating an inclusive environment for all employees. We encourage applications from all qualified individuals regardless of background.*
`;

export const jobMoc: Job = {
  id: 1,
  title: "Software Engineer",
  alias: "software-engineer",
  description: jobDescription,
  minSalary: 5000,
  maxSalary: 10000,
  workType: WorkType.FULL_TIME,
  experience: ExperienceLevel.MID,
  employmentType: EmploymentType.PERMANENT,
  fieldOfJob: {
    id: 1,
    name: "JavaScript",
    alias: "js",
  },
  requiredSkills: [
    {
      id: 1,
      skill: {
        id: 1,
        name: "Next.js",
      },
      level: SkillLevel.NICE_TO_HAVE,
    },
    {
      id: 2,
      skill: {
        id: 2,
        name: "React",
      },
      level: SkillLevel.NOVICE,
    },
    {
      id: 3,
      skill: {
        id: 3,
        name: "Node.js",
      },
      level: SkillLevel.REGULAR,
    },
    {
      id: 4,
      skill: {
        id: 4,
        name: "TypeScript",
      },
      level: SkillLevel.ADVANCED,
    },
    {
      id: 5,
      skill: {
        id: 5,
        name: "GraphQL",
      },
      level: SkillLevel.EXPERT,
    },
    {
      id: 6,
      skill: {
        id: 6,
        name: "REST API",
      },
      level: SkillLevel.ADVANCED,
    },
    {
      id: 7,
      skill: {
        id: 7,
        name: "HTML",
      },
      level: SkillLevel.EXPERT,
    },
    {
      id: 8,
      skill: {
        id: 8,
        name: "CSS",
      },
      level: SkillLevel.EXPERT,
    },
  ],
  company: {
    id: 1,
    name: "Tech Company",
    address: "123 Tech Street",
    email: "tech@example.com",
    phoneNumber: null,
    website: null,
  },
};
