import { IconBubbleX, IconBuildingOff } from '@tabler/icons-react';
import EmptyData from '../empty-data';
import P from '../typography/P';
import RequestReviewDialog from './review-request-dialog';

export default function NoReview() {
    return (
        <EmptyData className="flex flex-col items-center justify-center min-h-80 md:p-6 p-4 gap-6">
            <div className="flex flex-col items-center gap-2">
                <IconBubbleX className="w-10 h-10 text-primary mb-2" />
                <P className="text-lg font-semibold text-foreground">No reviews found</P>
                <P className="text-muted-foreground max-w-sm text-center">
                    No reviews have been added yet. You can request a review from your clients. Once added, you will be
                    able to see your them here.
                </P>
            </div>

            <RequestReviewDialog />
        </EmptyData>
    );
}
