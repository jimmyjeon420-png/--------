declare global {
    interface Window {
        PortOne: any;
    }
}

export interface PaymentData {
    storeId: string;
    paymentId: string;
    orderName: string;
    totalAmount: number;
    currency: string;
    channelKey?: string;
    payMethod: string;
    customer?: {
        fullName?: string;
        phoneNumber?: string;
        email?: string;
    }
}

export function requestPayment(data: PaymentData) {
    if (!window.PortOne) {
        console.error("PortOne SDK not loaded");
        return Promise.reject("SDK not loaded");
    }

    return window.PortOne.requestPayment(data);
}
