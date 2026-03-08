/**
 * Parse PostGIS EWKB (hex) point to longitude and latitude.
 * Format: 1 byte endian, 4 bytes type, 4 bytes SRID, 8 bytes X (lng), 8 bytes Y (lat).
 */
export function parsePostGisPoint(hex: string | null | undefined): { lng: number; lat: number } | null {
    if (!hex || typeof hex !== 'string') return null;
    const trimmed = hex.trim();
    if (trimmed.length < 50) return null; // minimum length for point with SRID
    try {
        const buf = Buffer.from(trimmed, 'hex');
        if (buf.length < 25) return null;
        const lng = buf.readDoubleLE(9);
        const lat = buf.readDoubleLE(17);
        return { lng, lat };
    } catch {
        return null;
    }
}
