export class SearchResult<T> {
    objects: T[];
    pageSize: number;
    pageNum: number;
    pageTotal: number;
    totalElements: number;

    constructor(objects: T[], pageSize: number, pageNum: number, pageTotal: number, totalElements: number) {
        this.objects = objects;
        this.pageSize = pageSize;
        this.pageNum = pageNum;
        this.pageTotal = pageTotal;
        this.totalElements = totalElements;
    }
}
