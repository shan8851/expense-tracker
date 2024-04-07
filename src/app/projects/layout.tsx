export default async function ProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="px-4">
      {children}
    </div>
  );
}
