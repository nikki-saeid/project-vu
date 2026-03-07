import { Button } from '../ui/button';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';

export default function NoProjectsUi() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[320px] bg-muted rounded-lg md:p-6 p-4 gap-6">
            <div className="flex flex-col items-center gap-2">
                <IconPlus className="w-10 h-10 text-primary mb-2" />
                <p className="text-lg font-semibold text-foreground">No projects found</p>
                <p className="text-muted-foreground text-sm max-w-sm text-center">
                    You haven&apos;t added any projects yet. Start by creating your first project to manage and showcase your business
                    activities.
                </p>
            </div>
            <Link href="/dashboard/projects" passHref>
                <Button variant="default" size="lg">
                    <IconPlus /> Add a project
                </Button>
            </Link>
        </div>
    );
}
