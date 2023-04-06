import { ApplicationRef, ComponentFactoryResolver, Injector } from '@angular/core';
import { Observable } from "rxjs";
import ViewMode = Cropper.ViewMode;
import { NgxCroppedEvent } from "./ng-img-editor.component";
import * as i0 from "@angular/core";
export declare class NgImgEditorService {
    private componentFactoryResolver;
    private appRef;
    private injector;
    private ngxPESubscriber;
    private ngxPEComponentRef;
    constructor(componentFactoryResolver: ComponentFactoryResolver, appRef: ApplicationRef, injector: Injector);
    open(source: Event | string | File | any, options?: Options): Observable<NgxCroppedEvent>;
    private errorHandler;
    private close;
    private export;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgImgEditorService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgImgEditorService>;
}
export interface Options {
    aspectRatio?: number | any;
    modalTitle?: string;
    hideModalHeader?: boolean;
    autoCropArea?: number;
    autoCrop?: boolean;
    mask?: boolean;
    guides?: boolean;
    centerIndicator?: boolean;
    viewMode?: ViewMode;
    modalMaxWidth?: string;
    scalable?: boolean;
    zoomable?: boolean;
    cropBoxMovable?: boolean;
    cropBoxResizable?: boolean;
    roundCropper?: boolean;
    resizeToWidth?: number | any;
    resizeToHeight?: number | any;
    imageSmoothingEnabled?: boolean;
    imageSmoothingQuality?: ImageSmoothingQuality;
    format?: string | any;
    imageQuality?: number;
    applyBtnText?: string;
    closeBtnText?: string;
}
