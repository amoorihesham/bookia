import { ThemeToggle } from '@/components/buttons';
import { SignInButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <div className='h-screen flex items-center justify-center'>
      <ThemeToggle />
      <SignInButton />
    </div>
  );
}
