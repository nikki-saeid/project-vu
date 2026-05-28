'use client';
import { IconCardProps } from '@/lib/types/dashboard';
import { cn } from '@/lib/utils/classes-merge';
import StyledIcon from './styled-icon';
import P from './typography/P';

export default function StyledIconTitleSameText({ StyledIconProps, label, title, Icon }: IconCardProps) {
    return (
        <div className="flex items-center gap-2">
            {StyledIconProps ? (
                <StyledIcon
                    Icon={StyledIconProps.Icon}
                    className={cn('size-9 bg-primary/5', StyledIconProps.className)}
                    IconProps={{ className: cn('size-5 text-primary', StyledIconProps.IconProps?.className) }}
                />
            ) : (
                <>{Icon}</>
            )}
            <div className="flex flex-col">
                {label && <P className="text-sm text-muted-foreground">{label}</P>}
                {title && <P className="text-sm">{title}</P>}
            </div>
        </div>
    );
}
