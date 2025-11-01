// 共享数据

export const companyInfo = {
  name: '辰锋软件分发工作室',
  slogan: '科技引领未来，创新驱动发展'
}

export const footerText = '© 2024 辰锋软件分发工作室 | 科技引领未来，创新驱动发展'

export const homeContent = {
  title: '欢迎来到我们的企业门户',
  paragraphs: [
    '我们致力于为客户提供最优质的服务和最前沿的技术解决方案。通过不断创新和努力，我们已经成为行业内的领军企业。',
    '公司秉承"以人为本、科技创新"的理念，汇聚了一批行业精英，打造了一支高效专业的团队。我们专注于技术研发与创新，为客户提供定制化的解决方案。'
  ],
  features: [
    { title: '创新技术', description: '采用最新的技术栈，提供前沿的解决方案', icon: '💡' },
    { title: '专业团队', description: '拥有经验丰富的专业技术团队', icon: '👥' },
    { title: '高效服务', description: '快速响应，高效完成项目交付', icon: '⚡' },
    { title: '客户至上', description: '以客户需求为导向，提供优质服务', icon: '🎯' },
    { title: '品质保证', description: '严格的质量控制体系，确保项目交付质量', icon: '✨' },
    { title: '持续优化', description: '持续跟踪项目效果，不断优化改进方案', icon: '🔄' }
  ]
}

export const aboutContent = {
  title: '关于我们',
  intro: '辰锋软件分发工作室成立于2020年，是一家专注于软件分发和技术服务的高科技企业。公司总部位于中国，业务遍及全国各地，为数百家企业提供优质的软件分发服务和解决方案。',
  culture: {
    title: '企业文化',
    content: '我们秉承"创新、协作、专业、共赢"的企业价值观，致力于打造一个充满活力和创造力的工作环境。公司鼓励员工持续学习和创新，为员工提供广阔的发展空间和成长机会。'
  },
  advantages: {
    title: '核心优势',
    items: [
      { 
        label: '技术实力', 
        text: '拥有一支经验丰富的研发团队，掌握多项核心技术，持续投入研发创新。',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&auto=format',
        icon: '💻'
      },
      { 
        label: '服务质量', 
        text: '以客户需求为导向，提供全方位、高质量的技术服务和支持。',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop&auto=format',
        icon: '🎯'
      },
      { 
        label: '行业经验', 
        text: '深耕行业多年，积累了丰富的项目经验和成功案例。',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&auto=format',
        icon: '📊'
      },
      { 
        label: '创新能力', 
        text: '紧跟技术发展趋势，不断探索和应用新技术、新方法。',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&auto=format',
        icon: '🚀'
      }
    ]
  },
  timeline: {
    title: '十六年发展历程',
    subtitle: '每一步都聚焦着对技术的追求,每一年都见证着与客户的共同成长',
    items: [
      { 
        year: '2009', 
        title: '公司成立', 
        description: '辰锋软件分发工作室正式成立，专业于软件检测仪领域，组建创新研发团队，开启技术创业之路。' 
      },
      { 
        year: '2012', 
        title: '技术突破', 
        description: '推出第二代软件检测仪，实现核心技术自主研发，获得多项专利申请，奠定技术领先地位。' 
      },
      { 
        year: '2016', 
        title: '产能升级', 
        description: '建立标准化生产线，实现日产500件产能，良品率达到100%，技术水平达到国际领先水平。' 
      },
      { 
        year: '2020', 
        title: '业务拓展', 
        description: '业务拓展至自动化检测领域，入选国家高新技术企业认证，成为行业标杆企业。' 
      },
      { 
        year: '2025', 
        title: '全球布局', 
        description: '与多家国际顶尖企业建立合作关系，实现自动化24/7远程检测，建立全球服务中心，产品出口30+国家和地区。' 
      }
    ]
  }
}

export const jobsData = {
  title: '加入我们',
  intro: '我们正在寻找充满激情的人才加入我们的团队！如果你热爱技术、追求卓越，欢迎投递简历。',
  jobs: [
    {
      title: '前端工程师',
      location: '北京/上海/深圳',
      salary: '15K-30K',
      experience: '2年以上',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&auto=format',
      requirements: [
        '精通 HTML5、CSS3、JavaScript (ES6+)',
        '熟练使用 Vue.js 或 React.js 框架',
        '了解前端工程化和模块化开发',
        '良好的代码风格和团队协作能力'
      ]
    },
    {
      title: '后端工程师',
      location: '北京/上海',
      salary: '18K-35K',
      experience: '3年以上',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&auto=format',
      requirements: [
        '精通 Java/Python/Node.js 等后端语言',
        '熟悉 MySQL、Redis、MongoDB 等数据库',
        '了解微服务架构和分布式系统',
        '具备良好的系统设计和优化能力'
      ]
    },
    {
      title: '产品经理',
      location: '北京/深圳',
      salary: '20K-40K',
      experience: '3年以上',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&auto=format',
      requirements: [
        '3年以上互联网产品经验',
        '优秀的需求分析和产品设计能力',
        '熟练使用 Axure、Sketch 等工具',
        '良好的沟通协调和项目管理能力'
      ]
    },
    {
      title: 'UI/UX 设计师',
      location: '北京/上海/深圳',
      salary: '12K-25K',
      experience: '2年以上',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop&auto=format',
      requirements: [
        '精通 Photoshop、Figma、Sketch 等设计工具',
        '具备优秀的视觉设计和用户体验能力',
        '了解前端开发流程和设计规范',
        '有成功的设计作品集'
      ]
    }
  ]
}

export const eventsData = {
  title: '企业活动',
  intro: '我们定期举办各种技术分享会、团建活动和行业交流会。通过这些活动，促进团队协作，提升技术能力，同时也为员工提供更好的工作体验和成长机会。',
  valueTitle: '活动价值',
  values: [
    '提升专业技能和技术水平',
    '增强团队协作和凝聚力',
    '激发创新思维和创造力',
    '拓展人脉和行业视野',
    '营造积极向上的工作氛围',
    '促进知识分享与传承'
  ],
  events: [
    {
      icon: '🎤',
      title: '年度技术峰会',
      date: '2024年12月15日',
      description: '汇聚行业技术专家，分享最新技术趋势和实践经验，探讨未来发展方向。邀请业内知名讲师进行主题演讲。',
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop&auto=format'
    },
    {
      icon: '💡',
      title: '前端技术分享会',
      date: '每周五下午',
      description: '团队成员分享前端开发经验、新技术探索和项目实践，共同学习成长。促进知识交流与传承。',
      status: 'ongoing',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop&auto=format'
    },
    {
      icon: '🎯',
      title: '团队建设活动',
      date: '2024年10月20日',
      description: '户外拓展训练，增强团队凝聚力，促进成员之间的沟通与协作。包括团队协作游戏和拓展项目。',
      status: 'completed',
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop&auto=format'
    },
    {
      icon: '📚',
      title: '新员工入职培训',
      date: '每月第一周',
      description: '为新员工提供全面的入职培训，包括公司文化、技术栈、开发流程、团队协作规范等内容。',
      status: 'ongoing',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop&auto=format'
    },
    {
      icon: '🏆',
      title: '内部编程竞赛',
      date: '2024年11月10日',
      description: '内部编程竞赛，激发创新思维，提升编程能力。设置多个难度等级，优胜者将获得丰厚奖品。',
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop&auto=format'
    },
    {
      icon: '☕',
      title: '午餐学习交流会',
      date: '每周三中午',
      description: '轻松的午餐时光，分享工作心得和学习资源。促进跨部门交流，增进团队成员之间的了解。',
      status: 'ongoing',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop&auto=format'
    }
  ]
}

export const teamData = {
  title: '专业团队',
  intro: '我们拥有一支由行业资深专家组成的团队。团队成员平均拥有10年以上的行业经验，曾参与多个大型项目的开发和管理，具备深厚的技术功底和丰富的实战经验。',
  membersTitle: '核心成员',
  advantagesTitle: '团队优势',
  advantages: [
    '丰富的行业经验和项目实战能力',
    '持续学习和技术创新的团队文化',
    '高效协作和良好的沟通能力',
    '完善的人才培养和成长体系',
    '多个行业认证和技术专利',
    '注重代码质量和开发规范'
  ],
  stats: [
    { value: '50+', label: '团队成员' },
    { value: '10+', label: '平均工作年限' },
    { value: '100+', label: '成功项目' },
    { value: '95%', label: '客户满意度' }
  ],
  members: [
    {
      name: '张伟',
      position: '技术总监 / CTO',
      description: '15年软件开发经验，曾任职于知名互联网公司，主导过多个大型项目的架构设计与技术选型。',
      skills: ['架构设计', '团队管理', '技术规划'],
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format'
    },
    {
      name: '李娜',
      position: '前端架构师',
      description: '12年前端开发经验，精通各类前端框架和工程化实践，注重用户体验和性能优化。',
      skills: ['Vue.js', 'React', '前端工程化'],
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&auto=format'
    },
    {
      name: '王强',
      position: '后端架构师',
      description: '13年后端开发经验，擅长微服务架构、分布式系统设计和性能调优，具备深厚的技术功底。',
      skills: ['Java', '微服务', '分布式系统'],
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&auto=format'
    },
    {
      name: '刘芳',
      position: 'UX/UI 设计总监',
      description: '10年设计经验，擅长用户体验研究和界面设计，作品多次获得设计奖项，具有独特的设计理念。',
      skills: ['UI设计', '用户研究', '交互设计'],
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&auto=format'
    },
    {
      name: '陈杰',
      position: 'DevOps 工程师',
      description: '8年运维经验，精通容器化部署、自动化运维和云平台管理，确保系统稳定高效运行。',
      skills: ['Docker', 'Kubernetes', 'CI/CD'],
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&auto=format'
    },
    {
      name: '赵敏',
      position: '产品总监',
      description: '11年产品经验，擅长需求分析和产品规划，成功推出多款用户喜爱的产品，具备敏锐的市场洞察力。',
      skills: ['产品规划', '需求分析', '数据分析'],
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&auto=format'
    }
  ]
}

