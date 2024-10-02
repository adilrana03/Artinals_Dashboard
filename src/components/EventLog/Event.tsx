'use client'
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Define the structure of an event log
interface EventLog {
	id: string;
	eventType: "Transfer" | "Burn" | "MetadataUpdate" | "Freeze" | "DenyList";
	timestamp: Date;
	details: string;
}

// Mock function to fetch event logs (replace with actual API call)
const fetchEventLogs = async (): Promise<EventLog[]> => {
	// Simulating API call delay
	await new Promise((resolve) => setTimeout(resolve, 1000));

	// Mock data
	return [
		{
			id: "1",
			eventType: "Transfer",
			timestamp: new Date(),
			details: "Token 1 transferred from 0x123... to 0x456...",
		},
		{
			id: "2",
			eventType: "Burn",
			timestamp: new Date(Date.now() - 5000),
			details: "Token 2 burned by 0x789...",
		},
		{
			id: "3",
			eventType: "MetadataUpdate",
			timestamp: new Date(Date.now() - 10000),
			details: "Metadata updated for Token 3",
		},
		{
			id: "4",
			eventType: "Freeze",
			timestamp: new Date(Date.now() - 15000),
			details: "Token 4 frozen by authority",
		},
		{
			id: "5",
			eventType: "DenyList",
			timestamp: new Date(Date.now() - 20000),
			details: "Address 0xabc... added to deny list",
		},
	];
};

const EventLogs: React.FC = () => {
	const [logs, setLogs] = useState<EventLog[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchLogs = async () => {
			setIsLoading(true);
			try {
				const fetchedLogs = await fetchEventLogs();
				setLogs(fetchedLogs);
			} catch (error) {
				console.error("Failed to fetch event logs:", error);
				// Implement error handling here (e.g., display error message to user)
			} finally {
				setIsLoading(false);
			}
		};

		fetchLogs();

		// Set up polling for real-time updates (every 30 seconds)
		const intervalId = setInterval(fetchLogs, 30000);

		// Clean up interval on component unmount
		return () => clearInterval(intervalId);
	}, []);

	const getEventBadgeColor = (eventType: EventLog["eventType"]) => {
		switch (eventType) {
			case "Transfer":
				return "bg-blue-500";
			case "Burn":
				return "bg-red-500";
			case "MetadataUpdate":
				return "bg-green-500";
			case "Freeze":
				return "bg-purple-500";
			case "DenyList":
				return "bg-yellow-500";
			default:
				return "bg-gray-500";
		}
	};

	return (
		<Card className='w-full'>
			<CardHeader>
				<CardTitle>Event Logs</CardTitle>
			</CardHeader>
			<CardContent>
				{isLoading ? (
					<p>Loading event logs...</p>
				) : (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Event Type</TableHead>
								<TableHead>Timestamp</TableHead>
								<TableHead>Details</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{logs.map((log) => (
								<TableRow key={log.id}>
									<TableCell>
										<Badge
											className={getEventBadgeColor(
												log.eventType
											)}>
											{log.eventType}
										</Badge>
									</TableCell>
									<TableCell>
										{log.timestamp.toLocaleString()}
									</TableCell>
									<TableCell>{log.details}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</CardContent>
		</Card>
	);
};

export default EventLogs;
