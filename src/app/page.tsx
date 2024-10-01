// app/page.tsx
import Link from "next/link";

export default function HomePage() {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen py-2'>
			<main className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center'>
				<h1 className='text-6xl font-bold'>
					Welcome to{" "}
					<span className='text-transparent bg-clip-text bg-gradient-to-r from-[#6c94f8] to-[#7263fa]'>
						ARTFI.WORLD
					</span>
				</h1>

				<p className='mt-3 text-2xl'>
					Begin your journey into art investing with us.
				</p>

				<div className='mt-6'>
					<Link
						href='/dashboard'
						className='px-4 py-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#769CFB] to-[#7D70FA] hover:opacity-90 transition-opacity rounded'>
						Go to Dashboard
					</Link>
				</div>
			</main>
		</div>
	);
}
