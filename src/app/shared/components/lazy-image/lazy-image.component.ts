import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'shared-lazy-image',
    templateUrl: './lazy-image.component.html'
})
export class LazyImageComponent implements OnInit {

    public hasLoaded: boolean = false;

    constructor() { }

    @Input()
    public url!: string;
    public title: string = '';

    ngOnInit(): void {
        if (!this.url) throw new Error('URL property is required');
    }

    public onLoad(): void {
        setTimeout(() => {
            this.hasLoaded = true;
        }, 1000);
    }
}
