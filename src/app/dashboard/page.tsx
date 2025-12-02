import { redirect } from 'next/navigation';

export default async function Dashboard() {
  // Redirect to overview page
  // Auth check will be handled by client-side middleware
  redirect('/dashboard/overview');
}
