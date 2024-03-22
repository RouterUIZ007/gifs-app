import { GifsService } from './../../../gifs/services/gifs.service';
import { Component } from '@angular/core';

@Component({
    selector: 'shared-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
    
    constructor(
        private gifsService: GifsService
    ) {}
    get tagsHistory() {
        return this.gifsService.tagHistory;
    }

    public saveTag(tag: string): void {
        this.gifsService.searchTag(tag);
    }

    public borrarList() {
        this.gifsService.delTagHistory();
        this.gifsService.deleteList();
        this.gifsService.deleteSearchTag();
    }

}
