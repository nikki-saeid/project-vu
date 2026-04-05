import P from '@/components/typography/P';
import RevenueCard from './_components/revenu-card';
import SubscriptionsCard from './_components/subscriptions-card';
import UsersCard from './_components/users-card';

export default function Overview() {
    return (
        <section className="flex flex-col gap-4 md:gap-6">
            <P className="text-muted-foreground">These are the key metrics of the platform</P>
            <RevenueCard />
            <UsersCard />
            <SubscriptionsCard />
        </section>
    );
}
