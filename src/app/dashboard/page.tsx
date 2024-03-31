import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { AUTH_OPTIONS } from '../api/auth/[...nextauth]/options';
import Image from 'next/image';
import { AuthButton } from '@/components/authButton';
import { db } from '@/lib/db';
import { ProjectList } from '@/components/projectList';

async function getUserProjects(userId?:string) {
  if (!userId) {
    return [];
  }
  // Use Prisma's `findMany` to get projects where the `userId` matches
  const projects = await db.project.findMany({
    where: {
      userId: userId,
    },
    // Include additional data if needed, e.g., expenses or collaborators
    include: {
      expenses: true,
      collaborators: true,
      // ...any other related models you want to include
    },
  });

  return projects;
}

export default async function DashboardPage() {
  const session = await getServerSession(AUTH_OPTIONS);
  const projects = await getUserProjects(session?.user?.id);
  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }
  console.debug('projects', projects);
  return (
    <div className="flex flex-col space-y-4">
      <ProjectList projects={projects} />
    </div>
  );
}
