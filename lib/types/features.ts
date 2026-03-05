import { Sidebar } from '@/components/ui/sidebar';
import type { ReactNode, Icon as TablerIcon } from '@tabler/icons-react';
import type { ChildrenProp } from './common';
import { UseSupabaseUploadReturn } from '@/hooks/use-supabase-upload';
import { Business } from './db';
import { Marker, MarkerOptions, PopupOptions } from 'mapbox-gl';

type SidebarNavigationItem = { title: string; url: string; Icon: TablerIcon };
export type PasswordInputProps = React.ComponentProps<'input'>;
export type DashboardSidebarProps = ChildrenProp & React.ComponentProps<typeof Sidebar>;
export type DashboardSidebarGroupProps = { label?: string; data: SidebarNavigationItem[] };
export type DashboardHeaderProps = { pagesMetadata: Omit<SidebarNavigationItem, 'Icon'>[] };
export type SidebarCustomButtonProps = Omit<SidebarNavigationItem, 'Icon'> & ChildrenProp;
export type ImageUploadProps = { dropZoneProps: UseSupabaseUploadReturn; trigger: (props: { onClick: () => void }) => React.ReactNode };
export type NavbarWrapperProps = { isSticky?: boolean } & ChildrenProp;

// profile types
export type ProfileIsEditProp = { isEdit: boolean };
export type ProfileAvatarProps = ProfileIsEditProp & Pick<Business, 'logo_url' | 'name'>;
export type BusinessTitleProps = ProfileIsEditProp & Pick<Business, 'name'>;
export type ProjectCardProps = { action?: ReactNode };
export type BusinessHeaderProps = { name: string | null; logo_url: string | null; type: string | null; description: string | null };
export type BusinessSocialsProps = { website_url: string | null; facebook_url: string | null; instagram_url: string | null };

// map types
export type LocationFeature = {
    type: 'Feature';
    geometry: {
        type: 'Point';
        coordinates: [number, number];
    };
    properties: {
        name: string;
        name_preferred?: string;
        mapbox_id: string;
        feature_type: string;
        address?: string;
        full_address?: string;
        place_formatted?: string;
        context: {
            country?: {
                name: string;
                country_code: string;
                country_code_alpha_3: string;
            };
            region?: {
                name: string;
                region_code: string;
                region_code_full: string;
            };
            postcode?: { name: string };
            district?: { name: string };
            place?: { name: string };
            locality?: { name: string };
            neighborhood?: { name: string };
            address?: {
                name: string;
                address_number?: string;
                street_name?: string;
            };
            street?: { name: string };
        };
        coordinates: {
            latitude: number;
            longitude: number;
            accuracy?: string;
            routable_points?: {
                name: string;
                latitude: number;
                longitude: number;
                note?: string;
            }[];
        };
        language?: string;
        maki?: string;
        poi_category?: string[];
        poi_category_ids?: string[];
        brand?: string[];
        brand_id?: string[];
        external_ids?: Record<string, string>;
        metadata?: Record<string, unknown>;
        bbox?: [number, number, number, number];
        operational_status?: string;
    };
};
export type MapProps = {
    mapContainerRef: React.RefObject<HTMLDivElement | null>;
    initialViewState: {
        longitude: number;
        latitude: number;
        zoom: number;
    };
    children?: React.ReactNode;
};

export type MarkerProps = {
    longitude: number;
    latitude: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    onHover?: ({
        isHovered,
        position,
        marker,
        data,
    }: {
        isHovered: boolean;
        position: { longitude: number; latitude: number };
        marker: mapboxgl.Marker;
        data: LocationFeature;
    }) => void;
    onClick?: ({
        position,
        marker,
        data,
    }: {
        position: { longitude: number; latitude: number };
        marker: mapboxgl.Marker;
        data: LocationFeature;
    }) => void;
    children?: React.ReactNode;
} & MarkerOptions;

export type PopupProps = {
    children: React.ReactNode;
    latitude?: number;
    longitude?: number;
    onClose?: () => void;
    marker?: Marker;
} & PopupOptions;

export type LocationMarkerProps = { location: LocationFeature; onClick: (data: LocationFeature | null) => void };
export type LocationPopupProps = { location: LocationFeature; onClose?: () => void };
