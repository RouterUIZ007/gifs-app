import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {

    private gifList: Gif[] = [];

    private _tagHistory: string[] = [];

    private api_key: string = '85rLykFyR70Y07hKxcwUXLBDalug1VTS';

    private serviceUrl: string = 'http://api.giphy.com/v1/gifs';


    constructor(private http: HttpClient) {
        this.loadLocalStore();
    }

    get tagHistory() {
        return [...this._tagHistory];
    }

    get getgifList() {
        return [...this.gifList];
    }

    private organizeHistory(tag: string): void {
        tag = tag.toLowerCase();
        if (this._tagHistory.includes(tag)) {
            this._tagHistory = this._tagHistory.filter(
                (oldTag) => oldTag !== tag
            )
        }
        this._tagHistory.unshift(tag);
        this._tagHistory = this._tagHistory.splice(0, 10);
        this.saveLocalStore();
    }

    public searchTag(tag: string): void {
        if (tag.length === 0) {
            return;
        }
        this.organizeHistory(tag);

        const params = new HttpParams()
            .set('api_key', this.api_key)
            .set('q', tag)
            .set('limit', 10)
            .set('rating', 'r')
        this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
            .subscribe(response => {
                this.gifList = response.data;
            });
    }

    private saveLocalStore(): void {
        localStorage.setItem('history', JSON.stringify(this._tagHistory))
    }
    private loadLocalStore(): void {
        if (!localStorage.getItem('history')) return;
        this._tagHistory = JSON.parse(localStorage.getItem('history')!);
        if (this._tagHistory.length === 0) {
            this.searchTag(this._tagHistory[0])
        }
    }
    /* vaciar search */
    private deleteLocalStore(): void {
        localStorage.clear();
    }

    public deleteList(): void {
        this.deleteLocalStore();
    }

    public delTagHistory() {
        this._tagHistory = [];
    }
    public deleteSearchTag(): void {
        const params = new HttpParams()
            .set('api_key', this.api_key)
            .set('q', '')
        this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
            .subscribe(response => {
                this.gifList = response.data;
            });
    }
}