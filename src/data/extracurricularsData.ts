export type ExtraSubItem = {
  id: string;
  title: string;
  desc: string;
  images: string[];
  linkLabel: string;
};

export type ExtraCategory = {
  categoryId: string;
  categoryName: string;
  items: ExtraSubItem[];
};

export const extracurricularsData: ExtraCategory[] = [
  {
    categoryId: 'social',
    categoryName: 'Social Impact',
    items: [
      {
        id: 'cook-n-connect',
        title: "Cook N' Connect",
        desc: "Founded Cook N' Connect, a community initiative dedicated to supporting single-parent families in Vietnam through cooking, learning, and shared experiences. Inspired by the idea that meals can bring people together, I designed and led interactive cooking workshops that teach practical life skills while creating opportunities for children and parents to connect. By incorporating cultural stories and traditions into each session, the project encourages independence, strengthens family bonds, and fosters cross-cultural understanding through the universal language of food.",
        images: [
          '/image/extracurriculars-1.png',
          '/image/extracurriculars-2.png',
          '/image/extracurriculars-3.png'
        ],
        linkLabel: "Cook N' Connect"
      },
      {
        id: 'gravity-water',
        title: "Gravity Water",
        desc: "Joined a student-led initiative focused on improving access to clean water for children in underserved communities. As part of the fundraising and outreach team, I helped raise over $5,000 USD to support the construction of a water filtration system for students in Lao Cai. I coordinated more than five fundraising events, including art auctions and community initiatives, reached out to over 200 donors and organizations, and participated in a needs-assessment and donation trip to Y Ty Kindergarten. Through this experience, I saw how research, community engagement, and collective action can create tangible impact.",
        images: [
          '/image/extracurriculars-4.png',
          '/image/extracurriculars-5.png',
          '/image/extracurriculars-6.png'
        ],
        linkLabel: "Gravity Water"
      },
      {
        id: 'chalk-road',
        title: "Chalk Road - Volunteer",
        desc: "Contributed to educational outreach initiatives designed to promote holistic learning opportunities for 450+ students in Thanh Hoa. I develop and facilitate workshops on cybersecurity and orientation, combining technical skills with creative expression. Together with fellow volunteers, I helped deliver over 180 million VND worth of equipment and donations to Thanh Kim Elementary and Middle School, witnessing firsthand the impact that community support can have on educational access. The experience deepened my belief that education extends beyond the classroom and that meaningful change often begins with local action.",
        images: [
          '/image/extracurriculars-7.png',
          '/image/extracurriculars-8.png',
          '/image/extracurriculars-9.png'
        ],
        linkLabel: "Chalk Road-Volunteer"
      }
    ]
  },
  {
    categoryId: 'global',
    categoryName: 'Global Citizenery',
    items: [
      {
        id: 'global-citizens',
        title: "Global Citizens Initiatives 2025 Fellowship",
        desc: "Selected as the only student from Vietnam for the Global Citizens Initiative Fellowship 2025, a 10-month program bringing together young leaders from around the world. During the fellowship, I explored topics ranging from global governance and ethics to leadership and social impact, while collaborating with peers from diverse backgrounds. I was honored to be chosen as a representative student speaker and to share my experiences with the broader community at the celebratory dinner at Powell Hall. The experience culminated in a 9-day summit in St Andrews, Scotland, and continued through panel talks and information sessions where I had the opportunity to present my work, discuss my research interests, and exchange ideas with students, educators, and professionals from around the world.",
        images: [
          '/image/extracurriculars-10.png',
          '/image/extracurriculars-11.png',
          '/image/extracurriculars-12.png'
        ],
        linkLabel: "Global Citizens Initiatives 2025 Fellowship"
      },
      {
        id: 'wfuna',
        title: "WFUNA International Model United Nations, New York 2024\nDiplomacy Award (Highest Distinction)",
        desc: "Awarded the Diplomacy Award for outstanding collaboration, negotiation, and consensus-building in committee sessions. Represented the United States in the Commission on Crime Prevention and Criminal Justice, where 81 delegates from all across the globe came together to address the theme of \"Equal Justice for All.\" Worked with peers from around the world to debate policy solutions, draft resolutions, and explore challenges in ensuring equitable access to justice.",
        images: [
          '/image/extracurriculars-13.png',
          '/image/extracurriculars-14.png',
          '/image/extracurriculars-15.png'
        ],
        linkLabel: "WFUNA International Model United Nations, New York 2024"
      },
      {
        id: 'british-mun',
        title: "British International School Model United Nations 2024\nOutstanding Delegate",
        desc: "Received the Outstanding Delegate Award for leadership, diplomacy, and contributions to committee discussions.\n\n• Represented Mexico in the World Food Programme, examining the challenges of sustainable agriculture and the potential role of high-yield genetically modified crops in addressing global food security.\n• Collaborated with delegates to develop policy proposals balancing agricultural productivity, environmental sustainability, and equitable access to food.",
        images: [
          '/image/extracurriculars-16.png',
          '/image/extracurriculars-17.png',
          '/image/extracurriculars-18.png'
        ],
        linkLabel: "British International School Model United Nations 2024"
      },
      {
        id: 'competitive-debate',
        title: "Competitive Debate",
        desc: "Developed skills in public speaking, critical thinking, and argumentation through national and international debating competitions. Achievements include:\n\n• Champion & Team Leader, Vietnam Middle School Debating Championship 2023 (Open Division)\n• Semi-Finalist, Asian Open Debating Championship 2023 (High School Division)\n• Top 9 Best Speaker & Quarter-Finalist, National Schools Debating Championship 2023 (Open Division)\n• Vietnam Junior Squad Member, World Schools Debating Championship 2023 (WSDC)\n• Vietnam Developmental Squad Member, World Schools Debating Championship 2023 (WSDC)\n\nThrough competitive debate, I engaged with a wide range of social, political, and ethical issues while developing skills in persuasive communication, teamwork, and analytical reasoning.",
        images: [
          '/image/extracurriculars-19.png',
          '/image/extracurriculars-20.png',
          '/image/extracurriculars-21.png'
        ],
        linkLabel: "Competitive Debate"
      }
    ]
  },
  {
    categoryId: 'leadership',
    categoryName: 'Leadership',
    items: [
      {
        id: 'ironteen',
        title: "IronTeen Club — Vice Captain | Grades 8–12",
        desc: "IronTeen has been one of the most meaningful parts of my high school journey. As Vice Captain, I helped organize and coordinate over 10 overnight marathon trips for middle and high school students over five years, supporting both logistics and participant safety.\n\nBeyond the planning, the experience reshaped how I think about leadership. Watching students push through exhaustion during long-distance runs, and slowly grow more confident, resilient, and connected to each other, taught me that leadership is less about directing others and more about creating conditions where people can challenge and support themselves.",
        images: [
          '/image/extracurriculars-22.png',
          '/image/extracurriculars-23.png',
          '/image/extracurriculars-24.png'
        ],
        linkLabel: "IronTeen Club—Vice Captain | Grades 8–12"
      },
      {
        id: 'lumos',
        title: "Lumos Dance Crew — Founder & Captain | Grades 9–12",
        desc: "I started Lumos Dance Crew with a small group of students who simply enjoyed dancing together, and over time it grew into a team of more than 20 members across different grades (middle school to high school). I managed rehearsals, supported younger members as they improved, and helped coordinate performances for school events. With over ten showcases, the experience became less about performance itself and more about building confidence, trust, and a space where people could express themselves freely.",
        images: [
          '/image/extracurriculars-25.png',
          '/image/extracurriculars-26.png',
          '/image/extracurriculars-27.png'
        ],
        linkLabel: "Lumos Dance Crew—Founder & Captain | Grades 9–12"
      },
      {
        id: 'tiny-machine',
        title: "Tiny Machine Learning Bootcamp — Mentor | Grades 10–12",
        desc: "I led hands-on workshops introducing students to TinyML and edge AI using Arduino Nano 33 BLE Sense and TensorFlow Lite. I guided them through building simple models such as gesture recognition and plant disease classification, while also breaking down core ideas like data augmentation and underfitting in a way that felt accessible to high school learners. It was especially meaningful to see students move from confusion to experimenting confidently with their own models.",
        images: [
          '/image/extracurriculars-28.png',
          '/image/extracurriculars-29.png',
          '/image/extracurriculars-30.png'
        ],
        linkLabel: "Tiny Machine Learning Bootcamp—Mentor | Grades 10–12"
      },
      {
        id: 'vietrescon',
        title: "Vietnam Innovation Network (VIETRESCON) — General\nProgram Co-Chair 2026 & Tutorial Co-Chair 2025",
        desc: "Appointed as a General Program Co-Chair for VIETRESCON 2026, a student research conference organized by the Vietnam Innovation Network in Hanoi. Involved in supporting academic and program coordination for a platform where high school students present research across disciplines and receive feedback from international academic reviewers. Helped contribute to shaping the conference structure and fostering an environment that encourages early-stage research, critical thinking, and interdisciplinary collaboration among student researchers.",
        images: [
          '/image/extracurriculars-31.png',
          '/image/extracurriculars-32.png',
          '/image/extracurriculars-33.png'
        ],
        linkLabel: "Vietnam Innovation Network (VIETRESCON)"
      }
    ]
  }
];