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

export const CATEGORY_COLORS: Record<SkillCategory, string> = {
  languages: '#ffb300',   // amber
  frontend:  '#00e5ff',   // cyan
  backend:   '#22c55e',   // green
  'ai-tools':'#a855f7',   // purple
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'languages',
    label: 'Languages',
    command: '$ ls ~/skills/languages',
    color: CATEGORY_COLORS.languages,
    skills: ['JavaScript', 'TypeScript', 'Python', 'HTML', 'CSS', 'SQL'],
  },
  {
    category: 'frontend',
    label: 'Frontend',
    command: '$ ls ~/skills/frontend',
    color: CATEGORY_COLORS.frontend,
    skills: ['React', 'Next.js', 'Tailwind CSS', 'Bootstrap', 'Responsive Design'],
  },
  {
    category: 'backend',
    label: 'Backend & Data',
    command: '$ ls ~/skills/backend',
    color: CATEGORY_COLORS.backend,
    skills: ['Node.js', 'Express.js', 'REST APIs', 'GraphQL', 'PostgreSQL', 'MongoDB'],
  },
  {
    category: 'ai-tools',
    label: 'AI & Tools',
    command: '$ ls ~/skills/ai-tools',
    color: CATEGORY_COLORS['ai-tools'],
    skills: ['Claude API', 'OpenAI API', 'Prompt Engineering', 'Git', 'GitHub'],
  },
]

export const allSkills: Skill[] = skillGroups.flatMap((group) =>
  group.skills.map((name) => ({ name, category: group.category }))
)
