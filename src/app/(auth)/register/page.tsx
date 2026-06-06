import { SignUp } from '@clerk/nextjs';

export default function RegisterPage() {
  return (
    <div className='flex h-[calc(100vh-4rem)] items-center justify-center p-4'>
      <SignUp routing='path' path='/register' />
    </div>
  );
}