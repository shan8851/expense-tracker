import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { AUTH_OPTIONS } from '../api/auth/[...nextauth]/options';
import { db } from '@/lib/db';
import { ProjectList } from '@/components/projects/projectList/projectList';

async function getUserProjects(userId?:string) {
  if (!userId) {
    return [];
  }
  const projects = await db.project.findMany({
    where: {
      userId: userId,
    },
  });

  return projects;
}

export default async function ProjectsPage() {
  const session = await getServerSession(AUTH_OPTIONS);
  const projects = await getUserProjects(session?.user?.id);
  if (!session || !session.user) {
    redirect('/sign-in');
  }
  return (
    <div className="flex flex-col space-y-4">
      <ProjectList projects={projects} />
    </div>
  );
}
