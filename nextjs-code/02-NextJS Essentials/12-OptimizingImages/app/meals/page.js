import Link from 'next/link';

export default function MealsPage() {
    return (
        <div>
            <h1>Meals Page</h1>
            <Link href="/">Home</Link>
            <Link href="/meals/share">Shared Meals Link</Link>
            <Link href="/community">Community Link</Link>
            <Link href="/meals/foodie-1">Dynamic Content</Link>
            <Link href="/meals/foodie-2">Dynamic Content</Link>
        </div>
    );
}