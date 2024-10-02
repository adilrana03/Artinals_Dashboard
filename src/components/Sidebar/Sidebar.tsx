"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	Users,
	Bell,
	Palette,
	Users as Team,
	Briefcase,
	FileText,
	LayoutDashboard,
	Menu,
	X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

const Sidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen }:any) => {
	const pathname = usePathname();

	const NavItem = ({
		href,
		icon: Icon,
		children,
	}: {
		href: string;
		icon: any;
		children: React.ReactNode;
	}) => (
		<Button
			variant='ghost'
			className={`w-full justify-start ${
				pathname === href ? "bg-gray-900 text-white hover:bg-gray-800 hover:text-white" : ""
			}`}
			asChild
			onClick={() => setIsMobileMenuOpen(false)}>
			<Link href={href}>
				<Icon className='mr-2 h-4 w-4' />
				{children}
			</Link>
		</Button>
	);

	return (
		<>
			<div
				className={`fixed  inset-0 bg-black bg-opacity-50 z-40 md:hidden ${
					isMobileMenuOpen ? "block" : "hidden"
				}`}
				onClick={() => setIsMobileMenuOpen(false)}
			/>
			<div
				className={`fixed inset-y-0 left-0 w-64 bg-background border-r transform  ${
					isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
				} transition-transform duration-200 ease-in-out md:relative md:translate-x-0 z-50 `}>
				<div className='flex justify-between items-center p-4 border-b'>
					<h1 className='text-xl font-bold'>User Dashboard</h1>
					<Button
						variant='ghost'
						size='icon'
						className='md:hidden'
						onClick={() => setIsMobileMenuOpen(false)}>
						<X className='h-6 w-6' />
					</Button>
				</div>
				<div className='p-4 flex items-center space-x-4'>
					<Avatar>
						<AvatarImage src='/api/placeholder/40/40' alt='User' />
						<AvatarFallback>SA</AvatarFallback>
					</Avatar>
					<div>
						<p className='font-medium'>ali@artfi.com</p>
						<p className='text-sm text-muted-foreground'>User</p>
					</div>
				</div>
				<ScrollArea className='h-[calc(100vh-140px)]'>
					<nav className='space-y-1 p-2'>
						<NavItem href='/dashboard' icon={LayoutDashboard}>
							Dashboard
						</NavItem>
						<div className='px-3 py-2 text-xs font-semibold text-muted-foreground uppercase'>
							Whitelist
						</div>
						<NavItem href='/create' icon={FileText}>
							ART20 NFTs Creation
						</NavItem>
						<NavItem href='/manage' icon={FileText}>
							ART20 NFTs Management
						</NavItem>
						<NavItem href='/batch' icon={FileText}>
							Batch Management
						</NavItem>
						<NavItem href='/eventLog' icon={FileText}>
							Event Log
						</NavItem>
						<NavItem href='/' icon={Bell}>
							Announcements
						</NavItem>
					</nav>
				</ScrollArea>
			</div>
		</>
	);
};

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<div className='flex bg-background min-h-screen'>
			<Sidebar
				isMobileMenuOpen={isMobileMenuOpen}
				setIsMobileMenuOpen={setIsMobileMenuOpen}
			/>
			<div className='flex-1 flex flex-col'>
				<header className='bg-background border-b p-4 flex justify-between items-center md:hidden'>
					<h1>Artinals</h1>
					<h1 className='font-semibold'>User Dashboard</h1>
					<Button
						variant='ghost'
						size='icon'
						onClick={() => setIsMobileMenuOpen(true)}>
						<Menu className='h-6 w-6' />
					</Button>
				</header>
				<main className='flex-1 overflow-y-auto p-4 md:p-8 md:w-[80%] mx-auto'>
					{children}
				</main>
			</div>
		</div>
	);
}
