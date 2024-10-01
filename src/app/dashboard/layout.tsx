// app/dashboard/layout.tsx
import DashboardLayout from "@/components/Sidebar/Sidebar";

export default function DashboardLayoutWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	return <DashboardLayout>{children}</DashboardLayout>;
}
