'use client'
import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BatchOperations = () => {
	const [transferData, setTransferData] = useState({
		addresses: "",
		idsAndAmounts: "",
	});
	const [burnData, setBurnData] = useState({
		idsAndAmounts: "",
	});
	const transferFileInputRef = useRef<HTMLInputElement>(null);
	const burnFileInputRef = useRef<HTMLInputElement>(null);

	const handleTransferChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setTransferData((prev) => ({ ...prev, [name]: value }));
	};

	const handleBurnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setBurnData((prev) => ({ ...prev, [name]: value }));
	};

	const handleFileUpload =
		(operation: "transfer" | "burn") =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files?.[0];
			if (file) {
				const reader = new FileReader();
				reader.onload = (event) => {
					const csv = event.target?.result;
					if (typeof csv === "string") {
						if (operation === "transfer") {
							const [addresses, idsAndAmounts] =
								csv.split("\n\n");
							setTransferData({
								addresses: addresses.trim(),
								idsAndAmounts: idsAndAmounts.trim(),
							});
						} else {
							setBurnData({
								idsAndAmounts: csv.trim(),
							});
						}
					}
				};
				reader.readAsText(file);
			}
		};

	const handleBatchTransfer = () => {
		// TODO: Implement batch_transfer_tokens function call
		console.log("Batch Transfer:", transferData);
	};

	const handleBatchBurn = () => {
		// TODO: Implement batch_burn_tokens function call
		console.log("Batch Burn:", burnData);
	};

	return (
		<Card className='w-full max-w-2xl mx-auto'>
			<CardHeader>
				<CardTitle>Batch Operations</CardTitle>
			</CardHeader>
			<CardContent>
				<Tabs defaultValue='transfer' className='w-full'>
					<TabsList className='grid w-full grid-cols-2'>
						<TabsTrigger value='transfer'>
							Batch Transfer
						</TabsTrigger>
						<TabsTrigger value='burn'>Batch Burn</TabsTrigger>
					</TabsList>

					<TabsContent value='transfer'>
						<div className='space-y-4'>
							<div>
								<Label htmlFor='transferAddresses'>
									Recipient Addresses (one per line)
								</Label>
								<Textarea
									id='transferAddresses'
									name='addresses'
									value={transferData.addresses}
									onChange={handleTransferChange}
									placeholder='0x1234...&#10;0x5678...&#10;0x9ABC...'
									className='h-32'
								/>
							</div>
							<div>
								<Label htmlFor='transferIdsAndAmounts'>
									IDs and Amounts (ID,Amount - one per line)
								</Label>
								<Textarea
									id='transferIdsAndAmounts'
									name='idsAndAmounts'
									value={transferData.idsAndAmounts}
									onChange={handleTransferChange}
									placeholder='1,100&#10;2,200&#10;3,300'
									className='h-32'
								/>
							</div>
							<div>
								<Label htmlFor='transferCsvUpload'>
									Or upload a CSV file
								</Label>
								<Input
									id='transferCsvUpload'
									type='file'
									accept='.csv'
									onChange={handleFileUpload("transfer")}
									ref={transferFileInputRef}
									className='hidden'
								/>
								<Button
									onClick={() =>
										transferFileInputRef.current?.click()
									}
									variant='outline'
									className='w-full'>
									Upload CSV
								</Button>
							</div>
							<Button
								onClick={handleBatchTransfer}
								className='w-full'>
								Batch Transfer
							</Button>
						</div>
					</TabsContent>

					<TabsContent value='burn'>
						<div className='space-y-4'>
							<div>
								<Label htmlFor='burnIdsAndAmounts'>
									IDs and Amounts to Burn (ID,Amount - one per
									line)
								</Label>
								<Textarea
									id='burnIdsAndAmounts'
									name='idsAndAmounts'
									value={burnData.idsAndAmounts}
									onChange={handleBurnChange}
									placeholder='1,50&#10;2,100&#10;3,150'
									className='h-32'
								/>
							</div>
							<div>
								<Label htmlFor='burnCsvUpload'>
									Or upload a CSV file
								</Label>
								<Input
									id='burnCsvUpload'
									type='file'
									accept='.csv'
									onChange={handleFileUpload("burn")}
									ref={burnFileInputRef}
									className='hidden'
								/>
								<Button
									onClick={() =>
										burnFileInputRef.current?.click()
									}
									variant='outline'
									className='w-full'>
									Upload CSV
								</Button>
							</div>
							<Button
								onClick={handleBatchBurn}
								className='w-full'>
								Batch Burn
							</Button>
						</div>
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	);
};

export default BatchOperations;
