import { Button } from '@/components/ui/button';
import NavbarWrapper from './navbar-wrapper';
import Link from 'next/link';

export default function Navbar() {
    return (
        <NavbarWrapper className="border-b">
            <Link href="/login">
                <Button>Log in</Button>
            </Link>
        </NavbarWrapper>
    );
}
