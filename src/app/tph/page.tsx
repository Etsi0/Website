import type { Metadata } from 'next';
import { pageTitle } from '@/lib/pageTitle';
import { TphHub } from '@/components/Tph/tphHub';
import { ShikiCodeBlock } from '@/components/ui/shikiCodeBlock';

export const metadata: Metadata = {
	title: pageTitle('TPH'),
	description: 'Learning resources for design, front end, back end, and DevOps — curated for the TPH Discord community.',
};

const GIT_COMMANDS = `git switch

git reset

git fetch
git pull

git add
git commit
git push

git merge
git rebase`;

export default function Page() {
	return (
		<TphHub
			gitCommands={
				<ShikiCodeBlock lang='bash' className='mt-2'>
					{GIT_COMMANDS}
				</ShikiCodeBlock>
			}
		/>
	);
}
