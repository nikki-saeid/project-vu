'use client';
import { StyledIconProps } from '@/lib/types/ui';
import StyledIcon from './styled-icon';
import { cn } from '@/lib/utils/classes-merge';
import P from './typography/P';

type IconTitleProps = {
    label: string;
    title: string;
    StyledIconProps: StyledIconProps;
};

export default function StyledIconTitle({ StyledIconProps, label, title }: IconTitleProps) {
    return (
        <div className="flex items-center gap-2">
            <StyledIcon
                Icon={StyledIconProps.Icon}
                className={cn('size-9 bg-primary/5', StyledIconProps.className)}
                IconProps={{ className: cn('size-5 text-primary', StyledIconProps.IconProps?.className) }}
            />
            <div className="flex flex-col">
                <P className="text-xs text-muted-foreground">{label}</P>
                <P className="text-sm font-medium">{title}</P>
            </div>
        </div>
    );
}
