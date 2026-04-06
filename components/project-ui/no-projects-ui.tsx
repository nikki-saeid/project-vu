import type { NoProjectsUiProps } from '@/lib/types/forms';
import { IconBuildingOff, IconPlus } from '@tabler/icons-react';
import EmptyData from '../empty-data';
import P from '../typography/P';
import { Button } from '../ui/button';
import AddProjectButtonLink from './add-project-button-link';

export default function NoProjectsUi({ isAction }: NoProjectsUiProps) {
    return (
        <EmptyData className="flex flex-col items-center justify-center min-h-80 md:p-6 p-4 gap-6">
            <div className="flex flex-col items-center gap-2">
                <IconBuildingOff className="w-10 h-10 text-primary mb-2" />
                <P className="text-lg font-semibold text-foreground">No projects found</P>
                <P className="text-muted-foreground max-w-sm text-center">
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
                <AddProjectButtonLink>
                    <Button variant="default" size="lg">
                        <IconPlus /> Add a project
                    </Button>
                </AddProjectButtonLink>
            )}
        </EmptyData>
    );
}
