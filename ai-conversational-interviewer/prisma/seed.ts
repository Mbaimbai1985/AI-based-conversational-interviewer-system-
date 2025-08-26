import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  // Create sample job roles
  const jobRoles = await Promise.all([
    prisma.jobRole.create({
      data: {
        title: 'Senior Frontend Developer',
        department: 'Engineering',
        description: 'We are looking for an experienced frontend developer to join our team and help build amazing user experiences.',
        requirements: [
          'React',
          'TypeScript',
          'Next.js',
          'CSS/SCSS',
          'JavaScript',
          'Git',
          'API Integration',
          'Responsive Design'
        ],
        level: 'SENIOR',
        isActive: true,
      },
    }),
    prisma.jobRole.create({
      data: {
        title: 'Full Stack Developer',
        department: 'Engineering',
        description: 'Join our dynamic team as a full stack developer to work on exciting projects across the entire technology stack.',
        requirements: [
          'Node.js',
          'React',
          'PostgreSQL',
          'Express.js',
          'TypeScript',
          'Docker',
          'AWS',
          'API Design'
        ],
        level: 'MID',
        isActive: true,
      },
    }),
    prisma.jobRole.create({
      data: {
        title: 'Product Manager',
        department: 'Product',
        description: 'Lead product strategy and execution for our core platform features.',
        requirements: [
          'Product Strategy',
          'User Research',
          'Agile/Scrum',
          'Analytics',
          'Roadmap Planning',
          'Stakeholder Management',
          'A/B Testing',
          'Market Analysis'
        ],
        level: 'MID',
        isActive: true,
      },
    }),
    prisma.jobRole.create({
      data: {
        title: 'DevOps Engineer',
        department: 'Engineering',
        description: 'Help us build and maintain scalable infrastructure and deployment pipelines.',
        requirements: [
          'Docker',
          'Kubernetes',
          'AWS/GCP',
          'CI/CD',
          'Terraform',
          'Linux',
          'Monitoring',
          'Security'
        ],
        level: 'SENIOR',
        isActive: true,
      },
    }),
    prisma.jobRole.create({
      data: {
        title: 'UX Designer',
        department: 'Design',
        description: 'Create intuitive and delightful user experiences for our products.',
        requirements: [
          'User Research',
          'Wireframing',
          'Prototyping',
          'Figma',
          'Adobe Creative Suite',
          'Usability Testing',
          'Design Systems',
          'Accessibility'
        ],
        level: 'MID',
        isActive: true,
      },
    }),
    prisma.jobRole.create({
      data: {
        title: 'Data Scientist',
        department: 'Data',
        description: 'Analyze complex datasets to drive business insights and build predictive models.',
        requirements: [
          'Python',
          'R',
          'SQL',
          'Machine Learning',
          'Statistics',
          'Pandas',
          'Scikit-learn',
          'Data Visualization'
        ],
        level: 'SENIOR',
        isActive: true,
      },
    }),
  ])

  console.log(`Created ${jobRoles.length} job roles`)

  // Create sample candidates
  const candidates = await Promise.all([
    prisma.candidate.create({
      data: {
        email: 'alice.johnson@example.com',
        name: 'Alice Johnson',
        phone: '+1-555-0101',
        currentTitle: 'Frontend Developer',
        currentCompany: 'TechCorp',
        yearsExperience: 5,
        location: 'San Francisco, CA',
        expectedSalary: 120000,
        noticePeriod: '2 weeks',
        skills: ['React', 'TypeScript', 'CSS', 'JavaScript'],
        experiences: [
          {
            company: 'TechCorp',
            title: 'Frontend Developer',
            duration: '2022-Present',
            description: 'Building React applications for e-commerce platform'
          }
        ],
        education: [
          {
            institution: 'UC Berkeley',
            degree: 'BS Computer Science',
            graduationYear: 2019
          }
        ]
      },
    }),
    prisma.candidate.create({
      data: {
        email: 'bob.smith@example.com',
        name: 'Bob Smith',
        phone: '+1-555-0102',
        currentTitle: 'Full Stack Engineer',
        currentCompany: 'StartupXYZ',
        yearsExperience: 3,
        location: 'Austin, TX',
        expectedSalary: 95000,
        noticePeriod: '1 month',
        skills: ['Node.js', 'React', 'PostgreSQL', 'Express'],
        experiences: [
          {
            company: 'StartupXYZ',
            title: 'Full Stack Engineer',
            duration: '2021-Present',
            description: 'Developing web applications using Node.js and React'
          }
        ],
        education: [
          {
            institution: 'UT Austin',
            degree: 'BS Software Engineering',
            graduationYear: 2021
          }
        ]
      },
    }),
    prisma.candidate.create({
      data: {
        email: 'carol.davis@example.com',
        name: 'Carol Davis',
        phone: '+1-555-0103',
        currentTitle: 'Product Manager',
        currentCompany: 'MegaCorp',
        yearsExperience: 7,
        location: 'New York, NY',
        expectedSalary: 140000,
        noticePeriod: '3 weeks',
        skills: ['Product Strategy', 'Agile', 'Analytics', 'User Research'],
        experiences: [
          {
            company: 'MegaCorp',
            title: 'Senior Product Manager',
            duration: '2020-Present',
            description: 'Leading product initiatives for consumer mobile app'
          }
        ],
        education: [
          {
            institution: 'Columbia University',
            degree: 'MBA',
            graduationYear: 2017
          }
        ]
      },
    }),
  ])

  console.log(`Created ${candidates.length} candidates`)

  console.log('Database seed completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })