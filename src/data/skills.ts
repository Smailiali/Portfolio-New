export type SkillCategory = 'languages' | 'frontend' | 'backend' | 'ai-tools'

export interface Skill {
  name: string
  category: SkillCategory
}

export interface SkillGroup {
  category: SkillCategory
  label: string
  command: string
  color: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'languages',
    label: 'Languages',
    command: '$ ls ~/skills/languages',
    color: '#00e5ff',
    skills: ['JavaScript', 'TypeScript', 'Python', 'HTML', 'CSS', 'SQL'],
  },
  {
    category: 'frontend',
    label: 'Frontend',
    command: '$ ls ~/skills/frontend',
    color: '#ffb300',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'Bootstrap', 'Responsive Design', 'Framer Motion'],
  },
  {
    category: 'backend',
    label: 'Backend',
    command: '$ ls ~/skills/backend',
    color: '#00e5ff',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'GraphQL', 'PostgreSQL', 'MongoDB'],
  },
  {
    category: 'ai-tools',
    label: 'AI & Tools',
    command: '$ ls ~/skills/ai-tools',
    color: '#ffb300',
    skills: ['Claude API', 'OpenAI API', 'Prompt Engineering', 'Git', 'GitHub', 'VS Code'],
  },
]

// Flat skills list for constellation view
export const allSkills: Skill[] = skillGroups.flatMap((group) =>
  group.skills.map((name) => ({ name, category: group.category }))
)
