'use client'
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const ART20NFTCreationForm = () => {
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		amount: 0,
		uri: "",
		logoUri: "",
		royaltyPercentage: 0,
		isMutable: false,
		hasDenyListAuthority: false,
		hasRoyaltyAuthority: false,
		complianceAuthorityAddress: "",
	});

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleCheckboxChange = (name: string) => {
		setFormData((prevData) => ({
			...prevData,
			[name]: !prevData[name as keyof typeof prevData],
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Here you would typically call a function to interact with your smart contract
		console.log("Form submitted:", formData);
		// TODO: Implement mint_token function call
	};

	return (
		<Card className='w-full max-w-2xl mx-auto'>
			<CardHeader>
				<CardTitle>Create ART20 NFT</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<div>
						<Label htmlFor='name'>ART20 NFT Name</Label>
						<Input
							id='name'
							name='name'
							value={formData.name}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div>
						<Label htmlFor='description'>Description</Label>
						<Textarea
							id='description'
							name='description'
							value={formData.description}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div>
						<Label htmlFor='amount'>Amount</Label>
						<Input
							id='amount'
							name='amount'
							type='number'
							value={formData.amount}
							onChange={handleInputChange}
							required
							min='1'
						/>
					</div>
					<div>
						<Label htmlFor='uri'>URI</Label>
						<Input
							id='uri'
							name='uri'
							type='url'
							value={formData.uri}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div>
						<Label htmlFor='logoUri'>Logo URI</Label>
						<Input
							id='logoUri'
							name='logoUri'
							type='url'
							value={formData.logoUri}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div>
						<Label htmlFor='royaltyPercentage'>
							Royalty Percentage
						</Label>
						<Input
							id='royaltyPercentage'
							name='royaltyPercentage'
							type='number'
							value={formData.royaltyPercentage}
							onChange={handleInputChange}
							required
							min='0'
							max='100'
						/>
					</div>
					<div className='flex items-center space-x-2'>
						<Checkbox
							id='isMutable'
							checked={formData.isMutable}
							onCheckedChange={() =>
								handleCheckboxChange("isMutable")
							}
						/>
						<Label htmlFor='isMutable'>Is Mutable</Label>
					</div>
					<div className='flex items-center space-x-2'>
						<Checkbox
							id='hasDenyListAuthority'
							checked={formData.hasDenyListAuthority}
							onCheckedChange={() =>
								handleCheckboxChange("hasDenyListAuthority")
							}
						/>
						<Label htmlFor='hasDenyListAuthority'>
							Has Deny List Authority
						</Label>
					</div>
					<div className='flex items-center space-x-2'>
						<Checkbox
							id='hasRoyaltyAuthority'
							checked={formData.hasRoyaltyAuthority}
							onCheckedChange={() =>
								handleCheckboxChange("hasRoyaltyAuthority")
							}
						/>
						<Label htmlFor='hasRoyaltyAuthority'>
							Has Royalty Authority
						</Label>
					</div>
					<div>
						<Label htmlFor='complianceAuthorityAddress'>
							Compliance Authority Address
						</Label>
						<Input
							id='complianceAuthorityAddress'
							name='complianceAuthorityAddress'
							value={formData.complianceAuthorityAddress}
							onChange={handleInputChange}
							required
						/>
					</div>
					<Button type='submit' className='w-full'>
						Create ART20 NFT
					</Button>
				</form>
			</CardContent>
		</Card>
	);
};

export default ART20NFTCreationForm;
