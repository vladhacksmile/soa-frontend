export class SearchResult<T> {
    objects: T[];
    pageSize: number;
    pageNum: number;
    pageTotal: number;

    constructor(objects: T[], pageSize: number, pageNum: number, pageTotal: number) {
        this.objects = objects;
        this.pageSize = pageSize;
        this.pageNum = pageNum;
        this.pageTotal = pageTotal;
    }
}
