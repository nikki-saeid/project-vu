import { IconBuildingOff, IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import P from '../typography/P';

type NoProjectsUiProps = {
    isAction?: boolean;
};

export default function NoProjectsUi({ isAction }: NoProjectsUiProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[320px] bg-muted rounded-lg md:p-6 p-4 gap-6">
            <div className="flex flex-col items-center gap-2">
                <IconBuildingOff className="w-10 h-10 text-primary mb-2" />
                <P className="text-lg font-semibold text-foreground">No projects found</P>
                <P className="text-muted-foreground text-sm max-w-sm text-center">
                    {isAction ? (
                        <>
                            You haven&apos;t added any projects yet. Start by creating your first project to manage and showcase your
                            business activities.
                        </>
                    ) : (
                        <>No projects have been added yet. Once added, they will be visible here.</>
                    )}
                </P>
            </div>
            {isAction && (
                <Link href="/dashboard/projects?open=true" passHref>
                    <Button variant="default" size="lg">
                        <IconPlus /> Add a project
                    </Button>
                </Link>
            )}
        </div>
    );
}
