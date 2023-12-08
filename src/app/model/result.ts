export class Result<T> {
    public status: string;
    public description!: string;
    public object: T | undefined;

    constructor(status: string);
    constructor(status: string, object: T);

    constructor(status: string, object?: T) {
        this.status = status;
        this.object = object;
    }
}

export class Status {
    static OK = new Status(1, 200);
    static CREATED = new Status(2, 201);
    static NOT_FOUND = new Status(2, 404);
    static INTERNAL_ERROR = new Status(3, 503);
    static INCORRECT_PARAMS = new Status(4, 400);

    private constructor(public id: number, public httpStatus: number) {}
}
