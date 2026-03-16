export type ExperienceTag =
  | 'Leadership'
  | 'Automation'
  | 'AI/ML'
  | 'Data Analysis'
  | 'IT Infrastructure'
  | 'Support'

export interface Experience {
  id: string
  company: string
  role: string
  dateRange: string
  startYear: number
  tags: ExperienceTag[]
  bullets: string[]
  location: string
}

export const experiences: Experience[] = [
  {
    id: 'smaili-law',
    company: 'Smaili & Associates',
    role: 'IT & Automation Specialist',
    dateRange: 'Nov 2024 – Present',
    startYear: 2024,
    tags: ['Leadership', 'Automation'],
    location: 'Irvine, CA',
    bullets: [
      'Led a 4-person data migration from legacy Abacus Law to Caret Legal — zero data loss across all case records.',
      'Designed a firm-wide automated workflow system that reduced lost, abandoned, and forgotten cases by 75%.',
      'Conducted individual workflow assessments with every team member to map and standardize processes across departments.',
    ],
  },
  {
    id: 'outlier-scale',
    company: 'Outlier / Scale AI',
    role: 'Tasker / Query Manager Intern',
    dateRange: 'Mar 2025 – Jul 2025',
    startYear: 2025,
    tags: ['AI/ML', 'Data Analysis'],
    location: 'Remote',
    bullets: [
      "Contributed to an AI-powered permitting system for Qatar's Ministry of Municipalities, cutting permit issuance from 1 month to ~2 hours.",
      'Used SQL analysis to evaluate task quality, optimize allocation, and align top contributors with critical workloads.',
    ],
  },
  {
    id: 'taanayel-hospital',
    company: 'Taanayel General Hospital',
    role: 'Junior IT Assistant',
    dateRange: 'Oct 2023 – Oct 2024',
    startYear: 2023,
    tags: ['IT Infrastructure', 'Support'],
    location: 'Taanayel, Lebanon',
    bullets: [
      "Supported 50+ hospital staff across hardware, software, and network issues in a healthcare environment where downtime isn't an option.",
      'Deployed new workstations and rolled out IT policies, coordinating across departments for smooth transitions.',
    ],
  },
]

export const TAG_STYLES: Record<ExperienceTag, { bg: string; color: string; border: string }> = {
  Leadership:       { bg: 'rgba(255,179,0,0.10)',  color: '#ffb300', border: 'rgba(255,179,0,0.30)'  },
  Automation:       { bg: 'rgba(255,179,0,0.07)',  color: '#ffa000', border: 'rgba(255,179,0,0.22)'  },
  'AI/ML':          { bg: 'rgba(0,229,255,0.10)',  color: '#00e5ff', border: 'rgba(0,229,255,0.30)'  },
  'Data Analysis':  { bg: 'rgba(167,139,250,0.10)', color: '#a78bfa', border: 'rgba(167,139,250,0.30)' },
  'IT Infrastructure': { bg: 'rgba(34,197,94,0.10)',  color: '#22c55e', border: 'rgba(34,197,94,0.30)'  },
  Support:          { bg: 'rgba(34,197,94,0.07)',  color: '#16a34a', border: 'rgba(34,197,94,0.22)'  },
}
