import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.pageContainer}>
      
      {/* Lớp chứa chữ và viền background (hiển thị khi ảnh mờ đi) */}
      <div className={styles.textLayer}>
        <div className={styles.textContent}>
          <p>
            Hi there! I&apos;m Dieu-Linh Do, a student from Hanoi, Vietnam, and I&apos;ve always been fascinated by the idea that even small actions can create meaningful change. Whether through scientific research, community initiatives, creative expression, or sports, I&apos;m constantly searching for ways to learn, grow, and contribute to something larger than myself.
          </p>
          <p>
            This website is a collection of the experiences that have shaped me over the years. While the projects and activities may seem diverse, they are all connected by a common purpose: using curiosity, creativity, and collaboration to make a positive impact on the people and communities around me.
          </p>
          <p>
            In the Research page, you&apos;ll find the scientific projects and investigations I&apos;ve pursued throughout high school. From artificial intelligence and oncology to nanotechnology and education, research has taught me how powerful curiosity can be when paired with persistence. More importantly, it has shown me how science can improve lives and help address real-world challenges.
          </p>
          <p>
            In the Extracurricular Activities page, you&apos;ll find the organizations, initiatives, and leadership experiences that have allowed me to work alongside incredible people. Whether mentoring students, organizing STEM programs, or leading community projects, these experiences have taught me the value of empathy, teamwork, and service.
          </p>
          <p>
            In the Arts page, you&apos;ll find another side of who I am. Through drawing and dance, I&apos;ve learned to communicate ideas and emotions in ways that go beyond words. Creativity reminds me that innovation is not only about solving problems, it is also about imagining new possibilities.
          </p>
          <p>
            In the Sports page, you&apos;ll find a part of my journey that has taught me resilience, discipline, and perseverance. Athletics has shown me the importance of pushing beyond limitations, supporting teammates, and continuing to move forward even when progress feels slow.
          </p>
        </div>
      </div>

      <div className={styles.imageLayer}>
        <Image
          src="/image/anh.png"
          alt="Dieu-Linh Do presenting"
          fill
          priority
          quality={100}
          unoptimized={true}
          style={{ objectFit: "cover", objectPosition: "center center" }}
        />
      </div>

    </main>
  );
}