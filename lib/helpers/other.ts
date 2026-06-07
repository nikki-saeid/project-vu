import { Stripe } from 'stripe';
import { BASE_URL } from '../constants/urls';
import { Review } from '../types/db';

export const getProjectCostLabel = (cost: string) => {
    const costInt = parseInt(cost);

    return `${
        costInt >= 1000000000
            ? parseFloat((costInt / 1000000000).toFixed(1)) + 'B'
            : costInt >= 1000000
              ? parseFloat((costInt / 1000000).toFixed(1)) + 'M'
              : parseFloat((costInt / 1000).toFixed(1)) + 'K'
    } AUD`;
};

export function mapPaymentMethodTypeToLogo(type?: Stripe.PaymentMethod.Type, brand?: string | null) {
    // card brands
    if (type === 'card' || type === 'card_present') {
        switch (brand?.toLowerCase()) {
            case 'visa':
                return 'Visa';

            case 'mastercard':
                return 'Mastercard';

            case 'amex':
            case 'american express':
                return 'AmericanExpress';

            case 'discover':
                return 'Discover';

            case 'diners':
            case 'diners club':
                return 'DinersClub';

            case 'jcb':
                return 'JCB';

            case 'unionpay':
                return 'UnionPay';

            case 'maestro':
                return 'Maestro';

            default:
                return 'Generic';
        }
    }

    // alternative payment methods
    switch (type) {
        case 'paypal':
            return 'PayPal';

        case 'alipay':
            return 'Alipay';

        case 'swish':
            return 'Swish';

        // unsupported / no official icon in package
        case 'cashapp':
        case 'amazon_pay':
        case 'klarna':
        case 'afterpay_clearpay':
        case 'affirm':
        case 'link':
        case 'paynow':
        case 'wechat_pay':
        case 'revolut_pay':
        case 'bancontact':
        case 'ideal':
        case 'eps':
        case 'giropay':
        case 'sofort':
        case 'sepa_debit':
        case 'bacs_debit':
        case 'acss_debit':
        case 'au_becs_debit':
        case 'us_bank_account':
        case 'nz_bank_account':
        case 'fpx':
        case 'grabpay':
        case 'p24':
        case 'promptpay':
        case 'upi':
        case 'blik':
        case 'boleto':
        case 'oxxo':
        case 'zip':
        default:
            return 'Generic';
    }
}

export const getLiveHref = (slug: string | null | undefined) => {
    if (!slug) return null;

    return `/page/${slug}`;
};

export const getLiveUrl = (slug: string | null | undefined) => {
    const livePageHref = getLiveHref(slug);
    if (!livePageHref) return '';

    return BASE_URL + livePageHref;
};

export const arrayToSequentialString = (array: string[]) => {
    return array.length === 1 ? array[0] : array.slice(0, -1).join(', ') + ' and ' + array[array.length - 1];
};

export function timeAgo(date: string | Date) {
    const now = new Date();
    const past = new Date(date);

    const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'week', seconds: 604800 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
        { label: 'second', seconds: 1 },
    ];

    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);

        if (count >= 1) {
            return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
        }
    }

    return 'just now';
}

export function getAverageRating(_reviews: Review[]) {
    const reviews = _reviews.filter((review) => review.status === 'done');

    const averageRating = reviews.length > 0 ? reviews.reduce((sum, review) => sum + (review.rate ?? 0), 0) / reviews.length : 0;

    let mainStart = Math.floor(averageRating);
    let halfStart = averageRating % 1;
    if (halfStart >= 0.9) {
        mainStart += 1;
        halfStart = 0;
    }

    return {
        averageRating,
        mainStart,
        halfStart,
    };
}
