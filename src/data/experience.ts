export type ExperienceTag = 'Leadership' | 'AI/ML' | 'IT Infrastructure' | 'Automation'

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
    company: 'Smaili & Associates Law Firm',
    role: 'IT & Automation Specialist',
    dateRange: 'Nov 2024 – Present',
    startYear: 2024,
    tags: ['Leadership', 'Automation'],
    location: 'Irvine, CA',
    bullets: [
      'Led a 4-person data migration from Abacus Law → Caret Legal with zero data loss across thousands of case records.',
      'Designed an automated workflow system that cut lost/abandoned cases by 75% — saving the firm real revenue.',
      'Mapped and standardized processes across every team member, turning scattered workflows into repeatable systems.',
    ],
  },
  {
    id: 'outlier-scale',
    company: 'Outlier / Scale AI',
    role: 'Tasker / Query Manager Intern',
    dateRange: 'Mar 2025 – Jul 2025',
    startYear: 2025,
    tags: ['AI/ML'],
    location: 'Remote',
    bullets: [
      'Contributed to an AI-powered permitting system for Qatar\'s Ministry of Municipality — reduced permit approval time from 1 month to ~2 hours.',
      'Used SQL analysis to evaluate task quality and optimize contributor allocation across the pipeline.',
      'Reviewed and refined AI model outputs to improve accuracy on complex regulatory queries.',
    ],
  },
  {
    id: 'taanayel-hospital',
    company: 'Taanayel General Hospital',
    role: 'Junior IT Assistant',
    dateRange: 'Oct 2023 – Oct 2024',
    startYear: 2023,
    tags: ['IT Infrastructure'],
    location: 'Taanayel, Lebanon',
    bullets: [
      'Supported 50+ hospital staff across hardware, software, and network issues — keeping critical systems online.',
      'Deployed workstations and rolled out standardized IT policies across departments.',
      'Diagnosed and resolved network issues under time pressure in a high-stakes medical environment.',
    ],
  },
]
