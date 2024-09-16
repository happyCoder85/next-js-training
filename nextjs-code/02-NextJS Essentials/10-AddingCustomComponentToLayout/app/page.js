import Link from 'next/link';
export default function Home() {
  return (
    <main>
      <h1 style={{ color: 'white', textAlign: 'center' }}>
        Time to get started!
      </h1>
      <Link href="/meals">Meals Link</Link>
      <Link href="/meals/share">Share Meals Link</Link>
      <Link href="/community">Community Link</Link>
      <Link href="/meals/foodie-1">Dynamic Content</Link>
      <Link href="/meals/foodie-2">Dynamic Content</Link>

    </main>
  );
}
