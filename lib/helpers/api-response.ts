import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { NextResponse } from 'next/server';

abstract class APIResponse<T> {
    protected data: T | null = null;
    protected status: StatusCodes;
    protected message: string;

    constructor(status: StatusCodes, message: string = ReasonPhrases.OK, data: T | null) {
        this.status = status;
        this.message = message;
        if (data) {
            this.data = data;
        }
    }

    send() {
        return NextResponse.json({ message: this.message, status: this.status, data: this.data }, { status: this.status });
    }
}

// success
export class SuccessResponse<T> extends APIResponse<T> {
    constructor(message: string = ReasonPhrases.OK, data: T) {
        super(StatusCodes.OK, message, data);
    }
}

// errors
export class ErrorResponse extends APIResponse<null> {
    constructor(status: StatusCodes, message: string = ReasonPhrases.OK) {
        super(status, message, null);
    }
}
