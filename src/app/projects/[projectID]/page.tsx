import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { Project } from '@/components/projects/project/project';
import { AUTH_OPTIONS } from '@/app/api/auth/[...nextauth]/options';

async function getProject(projectID?:string) {
  if (!projectID) {
    return null;
  }
  const project = await db.project.findUnique({
    where: {
      id:  projectID,
    }
  });

  return project;
}

export default async function ProjectsPage({ params }: { params: { projectID: string } }) {
  const session = await getServerSession(AUTH_OPTIONS);
  const project = await getProject(params.projectID);
  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }
  if (!project) redirect('/projects');
  return (
    <Project project={project} />
  );
}
