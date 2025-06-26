import { Employee, PerformanceHistory, Project, Feedback } from '@/types';

const departments = [
  'Engineering',
  'Marketing',
  'Sales',
  'HR',
  'Finance',
  'Operations',
  'Design',
  'Product'
];

const generateMockEmployee = (user: any): Employee => {
  const department = departments[Math.floor(Math.random() * departments.length)];
  const performance = Math.floor(Math.random() * 5) + 1;
  
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    age: user.age,
    department,
    performance,
    address: {
      address: user.address.address,
      city: user.address.city,
      state: user.address.state,
      postalCode: user.address.postalCode,
    },
    phone: user.phone,
    bio: `Experienced professional with ${Math.floor(Math.random() * 10) + 3} years in ${department}. Passionate about delivering high-quality results and driving innovation.`,
  };
};

export const fetchEmployees = async (): Promise<Employee[]> => {
  try {
    const response = await fetch('https://dummyjson.com/users?limit=20');
    const data = await response.json();
    
    return data.users.map(generateMockEmployee);
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw new Error('Failed to fetch employees');
  }
};

export const generatePerformanceHistory = (employeeId: number): PerformanceHistory[] => {
  const history = [];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  for (let i = 0; i < 6; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    
    history.push({
      id: i + 1,
      date: `${months[date.getMonth()]} ${date.getFullYear()}`,
      rating: Math.floor(Math.random() * 5) + 1,
      feedback: [
        'Excellent performance this month. Keep up the great work!',
        'Good progress, but there\'s room for improvement in communication.',
        'Outstanding results and leadership demonstrated.',
        'Meeting expectations with consistent quality work.',
        'Strong technical skills and collaborative approach.'
      ][Math.floor(Math.random() * 5)],
      reviewer: ['John Smith', 'Sarah Johnson', 'Mike Davis', 'Lisa Wilson'][Math.floor(Math.random() * 4)]
    });
  }
  
  return history.reverse();
};

export const generateProjects = (): Project[] => {
  const projects = [
    {
      name: 'E-commerce Platform Redesign',
      status: 'active' as const,
      role: 'Frontend Developer',
      description: 'Leading the redesign of our main e-commerce platform with modern UI/UX principles.'
    },
    {
      name: 'Mobile App Development',
      status: 'completed' as const,
      role: 'Team Lead',
      description: 'Successfully delivered a cross-platform mobile application for iOS and Android.'
    },
    {
      name: 'Data Analytics Dashboard',
      status: 'on-hold' as const,
      role: 'Full Stack Developer',
      description: 'Building an interactive dashboard for real-time business analytics and reporting.'
    }
  ];
  
  return projects.map((project, index) => ({
    id: index + 1,
    ...project,
    startDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: project.status === 'completed' 
      ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      : undefined
  }));
};

export const generateFeedback = (): Feedback[] => {
  const feedbackTypes: Feedback['type'][] = ['positive', 'constructive', 'neutral'];
  const messages = [
    'Great teamwork and communication skills demonstrated.',
    'Shows strong initiative and problem-solving abilities.',
    'Could improve time management and prioritization.',
    'Excellent technical skills and attention to detail.',
    'Good collaboration with cross-functional teams.',
    'Needs to work on presentation and public speaking skills.',
    'Consistently delivers high-quality work on time.',
    'Shows potential for leadership roles in the future.'
  ];
  
  const feedback = [];
  for (let i = 0; i < 5; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 90));
    
    feedback.push({
      id: i + 1,
      date: date.toISOString().split('T')[0],
      type: feedbackTypes[Math.floor(Math.random() * feedbackTypes.length)],
      message: messages[Math.floor(Math.random() * messages.length)],
      from: ['Manager', 'Peer', 'Client', 'Team Lead'][Math.floor(Math.random() * 4)]
    });
  }
  
  return feedback.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}; 