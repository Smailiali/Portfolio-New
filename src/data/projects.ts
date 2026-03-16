export interface ProjectFeature {
  icon: string
  label: string
}

export interface Project {
  id: string
  title: string
  tagline: string
  description: string
  stack: string[]
  features: ProjectFeature[]
  githubUrl: string  // TODO: Add real URL
  demoUrl: string    // TODO: Add real URL
  accentColor: string
}

export const projects: Project[] = [
  {
    id: 'docassist',
    title: 'DocAssist',
    tagline: 'Ask your documents anything.',
    description:
      'Upload any PDF and ask questions in plain English. Get AI-generated answers with page-level citations. Built to solve a real problem — staff at my firm spent hours digging through contracts. This tool finds answers in seconds.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Claude API'],
    features: [
      { icon: '💬', label: 'Chat-based Q&A with citations' },
      { icon: '📄', label: 'One-click document summaries' },
      { icon: '🔍', label: 'Key term extraction' },
      { icon: '⏰', label: 'Automatic deadline detection' },
    ],
    githubUrl: '#', // TODO: Add real GitHub URL
    demoUrl: '#',   // TODO: Add real demo URL
    accentColor: '#00e5ff',
  },
  {
    id: 'dsa-mastery',
    title: 'DSA Mastery',
    tagline: 'Structured prep for technical interviews.',
    description:
      'Built to solve my own problem: preparing for technical interviews without structure or progress tracking. Covers 22 DSA topics with 65+ problems, spaced repetition, mock interviews, and AI-powered code translation.',
    stack: ['React', 'JavaScript', 'Claude API'],
    features: [
      { icon: '📚', label: '22 topics, 65+ problems with walkthroughs' },
      { icon: '🧠', label: 'SM-2 spaced repetition algorithm' },
      { icon: '🎯', label: '5-phase mock interview system' },
      { icon: '🌐', label: 'AI code translation across 12 languages' },
    ],
    githubUrl: '#', // TODO: Add real GitHub URL
    demoUrl: '#',   // TODO: Add real demo URL
    accentColor: '#ffb300',
  },
]
