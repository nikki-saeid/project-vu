import { IconMail, IconPhone } from '@tabler/icons-react';
import { Button } from '../ui/button';

export default function BusinessContact() {
    return (
        <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
            <Button>
                <IconPhone />
                Phone
            </Button>
            <Button variant="outline">
                <IconMail />
                Email
            </Button>
        </div>
    );
}
