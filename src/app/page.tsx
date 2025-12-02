import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function Page() {
  const cookieStore = await cookies();

  // Check if user has access token (you can also check from server-side if needed)
  // For now, we'll redirect to dashboard and let client-side handle auth check
  // If you want server-side check, you'd need to implement server-side session

  redirect('/dashboard/overview');
}
