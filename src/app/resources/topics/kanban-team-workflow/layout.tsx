import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kanban Team Workflow | LeadFlow CRM",
  description: "Combine visual Kanban boards with seamless team collaboration. Create workflows where everyone sees the big picture and handoffs happen automatically.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function KanbanTeamWorkflowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
