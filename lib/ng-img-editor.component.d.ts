import { ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import Cropper from "ng-image-cropper-js";
import ViewMode = Cropper.ViewMode;
import * as i0 from "@angular/core";
export declare class NgImgEditorComponent implements OnDestroy {
    image: ElementRef;
    private cropper;
    imgUrl: string;
    private FILES_REGEX;
    modalTitle: string;
    hideModalHeader: boolean;
    aspectRatio: number;
    autoCropArea: number;
    autoCrop: boolean;
    mask: boolean;
    guides: boolean;
    centerIndicator: boolean;
    viewMode: ViewMode;
    modalMaxWidth: string;
    modalCentered: boolean;
    scalable: boolean;
    zoomable: boolean;
    cropBoxMovable: boolean;
    cropBoxResizable: boolean;
    darkTheme: boolean;
    roundCropper: boolean;
    canvasHeight: number;
    resizeToWidth: number | any;
    resizeToHeight: number | any;
    imageSmoothingEnabled: boolean;
    imageSmoothingQuality: ImageSmoothingQuality;
    format: string | any;
    closeBtnText: string;
    applyBtnText: string;
    quality: number;
    set imageQuality(value: number);
    closeEvent: EventEmitter<any>;
    imageCroppedEvent: EventEmitter<NgxCroppedEvent>;
    errorEvent: EventEmitter<any>;
    imageLoaded: boolean;
    isProcessing: boolean;
    set source(data: File | string | any);
    isValidImageURL(str: string): RegExpMatchArray | null;
    rotateRight(): void;
    rotateLeft(): void;
    crop(): void;
    move(): void;
    zoomIn(): void;
    zoomOut(): void;
    flipH(): void;
    flipV(): void;
    reset(): void;
    export(): void;
    close(): void;
    onLoad(): void;
    ngOnDestroy(): void;
    error(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgImgEditorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgImgEditorComponent, "lib-ng-img-editor", never, { "modalTitle": "modalTitle"; "hideModalHeader": "hideModalHeader"; "aspectRatio": "aspectRatio"; "autoCropArea": "autoCropArea"; "autoCrop": "autoCrop"; "mask": "mask"; "guides": "guides"; "centerIndicator": "centerIndicator"; "viewMode": "viewMode"; "modalMaxWidth": "modalMaxWidth"; "modalCentered": "modalCentered"; "scalable": "scalable"; "zoomable": "zoomable"; "cropBoxMovable": "cropBoxMovable"; "cropBoxResizable": "cropBoxResizable"; "darkTheme": "darkTheme"; "roundCropper": "roundCropper"; "canvasHeight": "canvasHeight"; "resizeToWidth": "resizeToWidth"; "resizeToHeight": "resizeToHeight"; "imageSmoothingEnabled": "imageSmoothingEnabled"; "imageSmoothingQuality": "imageSmoothingQuality"; "format": "format"; "closeBtnText": "closeBtnText"; "applyBtnText": "applyBtnText"; "imageQuality": "imageQuality"; "source": "source"; }, { "closeEvent": "closeEvent"; "imageCroppedEvent": "imageCroppedEvent"; "errorEvent": "errorEvent"; }, never, never, false>;
}
export interface NgxCroppedEvent {
    base64?: string;
    file?: File;
}
export declare type imageFormat = 'gif' | 'jpeg' | 'tiff' | 'png' | 'webp' | 'bmp';
