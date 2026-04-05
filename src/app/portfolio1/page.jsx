import Profile from "@/components/pages/Profile";

export const metadata = {
  title: 'Arbaz Murme | My Journey', 
  description: 'Discover the journey of Arbaz Murme, a React JS Developer. Explore his professional growth, achievements, and milestones in the field of web development.',
  openGraph: {
    title: 'Arbaz Murme | My Journey',
    description: 'Learn about Arbaz Murme’s journey from a budding developer to a skilled React JS Developer. Explore his professional milestones and personal growth.',
    url: 'https://arbazmurme.vercel.app/journey',
    images: [
      {
        url: '/journey.png',  // Example image from your public folder
        width: 800,
        height: 600,
        alt: 'Journey Image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arbaz Murme | My Journey',
    description: 'Explore the journey of Arbaz Murme, showcasing his development as a React JS Developer and his career achievements.',
    images: ['/journey.png'],  // Same image for Twitter
  },
};

// app/page.jsx
export default function Home() {
  return (
    <Profile />
  );
}
