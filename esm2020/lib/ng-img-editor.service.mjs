import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { NgImgEditorComponent } from "./ng-img-editor.component.mjs";
import * as i0 from "@angular/core";
export class NgImgEditorService {
    constructor(componentFactoryResolver, appRef, injector) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.injector = injector;
    }
    open(source, options) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(NgImgEditorComponent);
        const componentRef = componentFactory.create(this.injector);
        this.appRef.attachView(componentRef.hostView);
        const domElem = componentRef.hostView.rootNodes[0];
        document.body.appendChild(domElem);
        this.ngxPESubscriber = new Subject();
        this.ngxPEComponentRef = componentRef;
        this.ngxPEComponentRef.instance.closeEvent.subscribe(() => this.close());
        this.ngxPEComponentRef.instance.errorEvent.subscribe((data) => this.errorHandler(data));
        this.ngxPEComponentRef.instance.imageCroppedEvent.subscribe((data) => this.export(data));
        if (options) {
            Object.keys(options).map(value => {
                // @ts-ignore
                this.ngxPEComponentRef.instance[value] = options[value];
            });
        }
        this.ngxPEComponentRef.instance.source = source;
        return this.ngxPESubscriber.asObservable();
    }
    errorHandler(data) {
        this.ngxPESubscriber.error(data);
        this.close();
    }
    close() {
        this.ngxPESubscriber.complete();
        this.ngxPEComponentRef.destroy();
    }
    export(data) {
        this.ngxPESubscriber.next(data);
        this.close();
    }
}
NgImgEditorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.2", ngImport: i0, type: NgImgEditorService, deps: [{ token: i0.ComponentFactoryResolver }, { token: i0.ApplicationRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
NgImgEditorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.0.2", ngImport: i0, type: NgImgEditorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.2", ngImport: i0, type: NgImgEditorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.ApplicationRef }, { type: i0.Injector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXBob3RvLWVkaXRvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LXBob3RvLWVkaXRvci9zcmMvbGliL25neC1waG90by1lZGl0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBS0wsVUFBVSxFQUVYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBYSxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFekMsT0FBTyxFQUFrQix1QkFBdUIsRUFBQyxNQUFNLDhCQUE4QixDQUFDOztBQU10RixNQUFNLE9BQU8scUJBQXFCO0lBTWhDLFlBQ1Usd0JBQWtELEVBQ2xELE1BQXNCLEVBQ3RCLFFBQWtCO1FBRmxCLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbEQsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFDdEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtJQUM1QixDQUFDO0lBRUQsSUFBSSxDQUFDLE1BQW1DLEVBQUUsT0FBaUI7UUFDekQsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsdUJBQXVCLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUN4RyxNQUFNLFlBQVksR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QyxNQUFNLE9BQU8sR0FBSSxZQUFZLENBQUMsUUFBaUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFnQixDQUFDO1FBQzVGLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQUM3QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsWUFBWSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUN6RSxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN4RixJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3pGLElBQUksT0FBTyxFQUFFO1lBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQy9CLGFBQWE7Z0JBQ2IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDMUQsQ0FBQyxDQUFDLENBQUE7U0FDSDtRQUNELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNoRCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDN0MsQ0FBQztJQUVPLFlBQVksQ0FBQyxJQUFTO1FBQzVCLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFTyxLQUFLO1FBQ1gsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVPLE1BQU0sQ0FBQyxJQUFTO1FBQ3RCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNmLENBQUM7O2tIQTlDVSxxQkFBcUI7c0hBQXJCLHFCQUFxQixjQUZwQixNQUFNOzJGQUVQLHFCQUFxQjtrQkFIakMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBcHBsaWNhdGlvblJlZixcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBDb21wb25lbnRSZWYsXG4gIEVtYmVkZGVkVmlld1JlZixcbiAgSW5qZWN0YWJsZSxcbiAgSW5qZWN0b3Jcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YmplY3R9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQgVmlld01vZGUgPSBDcm9wcGVyLlZpZXdNb2RlO1xuaW1wb3J0IHtOZ3hDcm9wcGVkRXZlbnQsIE5neFBob3RvRWRpdG9yQ29tcG9uZW50fSBmcm9tIFwiLi9uZ3gtcGhvdG8tZWRpdG9yLmNvbXBvbmVudFwiO1xuaW1wb3J0IENyb3BwZXJFdmVudCA9IENyb3BwZXIuQ3JvcHBlckV2ZW50O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOZ3hQaG90b0VkaXRvclNlcnZpY2Uge1xuXG4gIHByaXZhdGUgbmd4UEVTdWJzY3JpYmVyITogU3ViamVjdDxhbnk+O1xuICBwcml2YXRlIG5neFBFQ29tcG9uZW50UmVmITogQ29tcG9uZW50UmVmPE5neFBob3RvRWRpdG9yQ29tcG9uZW50PjtcblxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmLFxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gIH1cblxuICBvcGVuKHNvdXJjZTogRXZlbnQgfCBzdHJpbmcgfCBGaWxlIHwgYW55LCBvcHRpb25zPzogT3B0aW9ucyk6IE9ic2VydmFibGU8Tmd4Q3JvcHBlZEV2ZW50PiB7XG4gICAgY29uc3QgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KE5neFBob3RvRWRpdG9yQ29tcG9uZW50KTtcbiAgICBjb25zdCBjb21wb25lbnRSZWYgPSBjb21wb25lbnRGYWN0b3J5LmNyZWF0ZSh0aGlzLmluamVjdG9yKTtcbiAgICB0aGlzLmFwcFJlZi5hdHRhY2hWaWV3KGNvbXBvbmVudFJlZi5ob3N0Vmlldyk7XG4gICAgY29uc3QgZG9tRWxlbSA9IChjb21wb25lbnRSZWYuaG9zdFZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT4pLnJvb3ROb2Rlc1swXSBhcyBIVE1MRWxlbWVudDtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRvbUVsZW0pO1xuICAgIHRoaXMubmd4UEVTdWJzY3JpYmVyID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICAgIHRoaXMubmd4UEVDb21wb25lbnRSZWYgPSBjb21wb25lbnRSZWY7XG4gICAgdGhpcy5uZ3hQRUNvbXBvbmVudFJlZi5pbnN0YW5jZS5jbG9zZUV2ZW50LnN1YnNjcmliZSgoKSA9PiB0aGlzLmNsb3NlKCkpO1xuICAgIHRoaXMubmd4UEVDb21wb25lbnRSZWYuaW5zdGFuY2UuZXJyb3JFdmVudC5zdWJzY3JpYmUoKGRhdGEpID0+IHRoaXMuZXJyb3JIYW5kbGVyKGRhdGEpKTtcbiAgICB0aGlzLm5neFBFQ29tcG9uZW50UmVmLmluc3RhbmNlLmltYWdlQ3JvcHBlZEV2ZW50LnN1YnNjcmliZSgoZGF0YSkgPT4gdGhpcy5leHBvcnQoZGF0YSkpO1xuICAgIGlmIChvcHRpb25zKSB7XG4gICAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5tYXAodmFsdWUgPT4ge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMubmd4UEVDb21wb25lbnRSZWYuaW5zdGFuY2VbdmFsdWVdID0gb3B0aW9uc1t2YWx1ZV07XG4gICAgICB9KVxuICAgIH1cbiAgICB0aGlzLm5neFBFQ29tcG9uZW50UmVmLmluc3RhbmNlLnNvdXJjZSA9IHNvdXJjZTtcbiAgICByZXR1cm4gdGhpcy5uZ3hQRVN1YnNjcmliZXIuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBwcml2YXRlIGVycm9ySGFuZGxlcihkYXRhOiBhbnkpIHtcbiAgICB0aGlzLm5neFBFU3Vic2NyaWJlci5lcnJvcihkYXRhKTtcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICBwcml2YXRlIGNsb3NlKCkge1xuICAgIHRoaXMubmd4UEVTdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5uZ3hQRUNvbXBvbmVudFJlZi5kZXN0cm95KCk7XG4gIH1cblxuICBwcml2YXRlIGV4cG9ydChkYXRhOiBhbnkpIHtcbiAgICB0aGlzLm5neFBFU3Vic2NyaWJlci5uZXh0KGRhdGEpO1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3B0aW9ucyB7XG4gIGFzcGVjdFJhdGlvPzogbnVtYmVyIHwgYW55O1xuICBtb2RhbFRpdGxlPzogc3RyaW5nO1xuICBoaWRlTW9kYWxIZWFkZXI/OiBib29sZWFuO1xuICBhdXRvQ3JvcEFyZWE/OiBudW1iZXI7XG4gIGF1dG9Dcm9wPzogYm9vbGVhbjtcbiAgbWFzaz86IGJvb2xlYW47XG4gIGd1aWRlcz86IGJvb2xlYW47XG4gIGNlbnRlckluZGljYXRvcj86IGJvb2xlYW47XG4gIHZpZXdNb2RlPzogVmlld01vZGU7XG4gIG1vZGFsTWF4V2lkdGg/OiBzdHJpbmc7XG4gIHNjYWxhYmxlPzogYm9vbGVhbjtcbiAgem9vbWFibGU/OiBib29sZWFuO1xuICBjcm9wQm94TW92YWJsZT86IGJvb2xlYW47XG4gIGNyb3BCb3hSZXNpemFibGU/OiBib29sZWFuO1xuICByb3VuZENyb3BwZXI/OiBib29sZWFuO1xuICByZXNpemVUb1dpZHRoPzogbnVtYmVyIHwgYW55O1xuICByZXNpemVUb0hlaWdodD86IG51bWJlciB8IGFueTtcbiAgaW1hZ2VTbW9vdGhpbmdFbmFibGVkPzogYm9vbGVhbjtcbiAgaW1hZ2VTbW9vdGhpbmdRdWFsaXR5PzogSW1hZ2VTbW9vdGhpbmdRdWFsaXR5O1xuICBmb3JtYXQ/OiBzdHJpbmcgfCBhbnk7XG4gIGltYWdlUXVhbGl0eT86IG51bWJlcjtcbiAgYXBwbHlCdG5UZXh0Pzogc3RyaW5nO1xuICBjbG9zZUJ0blRleHQ/OiBzdHJpbmc7XG59XG4iXX0=