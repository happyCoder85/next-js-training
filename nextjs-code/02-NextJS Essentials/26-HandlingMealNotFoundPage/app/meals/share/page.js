import Link from 'next/link';

export default function ShareMealsPage() {
    return (
        <div>
            <h1>Share Meals Page</h1>
            <Link href="/">Home</Link>
            <Link href="/meals">Meals Link</Link>
            <Link href="/community">Community Link</Link>
            <Link href="/meals/foodie-1">Dynamic Content</Link>
            <Link href="/meals/foodie-2">Dynamic Content</Link>
        </div>
    );
}