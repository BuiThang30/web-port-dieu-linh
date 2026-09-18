export type ResearchItem = {
  id: number;
  title: string;
  desc: string;
  type: 'gallery' | 'link'; // Xác định kiểu hiển thị
  linkUrl?: string;         // Đường link cho nút "View Here" (dành cho type: 'link')
  images?: string[];        // Danh sách ảnh (dành cho type: 'gallery')
};

export const researchData: ResearchItem[] = [
  {
    id: 0,
    title: "7th Advanced Innovation Global Competition Singapore 2025",
    desc: "Awarded a Gold Medal for presenting research on MnFe₂O₄-based magnetic nanoparticles for targeted and controlled drug release. Conducted at the laboratory of Hanoi National University of Education, the project explored innovative nanotechnology-based drug delivery systems aimed at improving therapeutic precision and reducing side effects.",
    type: 'gallery',
    // Cập nhật đường dẫn ảnh thật của bạn vào đây (vd: '/image/anh1.jpg')
    // Hiện tại tôi để trống '' thì nó sẽ hiện khối màu đen gốc
    images: ['/image/anh1.png', '/image/anh2.png', '/image/anh3.png', '/image/anh4.png'] 
  },
  {
    id: 1,
    title: "Artificial Intelligence-Driven Nano-Oncology for Precision Cancer Treatment Literature Review",
    desc: "Conducting independent research at the intersection of machine learning and nanomedicine. Reviewing leading Q1 oncology and biomedical engineering publications (2023-2026), identifying research gaps, and analyzing emerging AI applications in precision cancer treatment. Developed Python-based case studies using published Nano-ML-AI models to predict nanoparticle tumor delivery, exploring how machine learning can improve drug delivery design and therapeutic effectiveness in cancer care.",
    type: 'link',
    linkUrl: "https://docs.google.com/document/d/1ndBC3YXWsrbWzcnwT7g0HYBuSX4sbFx3zQVlFCg-8_k/edit?tab=t.ojgah7tkgile"
  },
  {
    id: 2,
    title: "Student Intern @ VinUniversity College of Health Sciences",
    desc: "Worked under faculty mentorship to develop a comprehensive review of artificial intelligence applications in oncology diagnosis and prediction. Conducted literature searches, analyzed recent research on machine learning and medical imaging, and synthesized findings on the opportunities and challenges of AI integration in cancer care. Strengthened skills in academic research, scientific writing, and critical evaluation of biomedical literature.",
    type: 'link',
    linkUrl: "https://docs.google.com/document/d/1TZx6JRacqDLbVzTMZPtHyo8ctCew9gJJ/edit#heading=h.jt6ylyb5rq41"
  },
  {
    id: 3,
    title: "Research Assistant, Navigating Pedagogical Shifts in the Age of Generative AI: A Comparative Study of International and National Schools in Vietnam",
    desc: "Contributed to a mixed-methods research project examining the impact of generative AI on teaching and learning in Vietnam. Conducted literature reviews and assisted with qualitative data collection through interviews with students and educators from both international schools and the Ministry of Education and Training (MOET) system. Investigated how tools such as ChatGPT influence learning behaviors, assessment integrity, and instructional practices, while analyzing differences in AI adoption and curriculum adaptation across educational settings.",
    type: 'link',
    linkUrl: "https://docs.google.com/document/d/1tzJaMUhcUT2RO9hik0o_PMhMSiIS2c3uhVhuY_Xo-Ko/edit?tab=t.0"
  },
  {
    id: 4,
    title: "Independent Research, Navigating Vietnam's Legal Landscape Amidst AI and Digital Economy Growth",
    desc: "I authored and published my first academic paper in the Curieux Academic Journal, examining the impact of artificial intelligence on Vietnam's legal and regulatory frameworks within the digital economy. Conducted comparative analysis of policy gaps, governance challenges, and emerging legal issues against international standards. Evaluated the adaptability of existing legal structures to rapid technological change and proposed recommendations to support innovation, responsible AI governance, and sustainable legal development.",
    type: 'link',
    linkUrl: "https://drive.google.com/file/d/1O5Fs-1DZbxg70nwBQbR-RaOzE9RHCziU/view"
  }
];