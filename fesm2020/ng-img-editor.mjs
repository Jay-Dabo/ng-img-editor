import * as i0 from '@angular/core';
import { EventEmitter, Component, ViewChild, Input, Output, Injectable, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import Cropper from 'ng-image-cropper-js';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';

class NgImgEditorComponent {
    constructor() {
        this.FILES_REGEX = /\.(gif|jpe?g|tiff|png|webp|bmp)$/i;
        this.modalTitle = 'Photo Editor';
        this.hideModalHeader = false;
        this.aspectRatio = NaN;
        this.autoCropArea = 0.8;
        this.autoCrop = true;
        this.mask = true;
        this.guides = true;
        this.centerIndicator = true;
        this.viewMode = 0;
        this.modalMaxWidth = '500px';
        this.modalCentered = false;
        this.scalable = true;
        this.zoomable = true;
        this.cropBoxMovable = true;
        this.cropBoxResizable = true;
        this.darkTheme = true;
        this.roundCropper = false;
        this.canvasHeight = 400;
        this.imageSmoothingEnabled = true;
        this.imageSmoothingQuality = 'high';
        this.closeBtnText = 'Close';
        this.applyBtnText = 'Apply';
        this.quality = 92;
        this.closeEvent = new EventEmitter();
        this.imageCroppedEvent = new EventEmitter();
        this.errorEvent = new EventEmitter();
        this.imageLoaded = false;
        this.isProcessing = false;
    }
    set imageQuality(value) {
        if (value > 0 && value <= 100) {
            this.quality = value;
        }
        else {
            this.errorEvent.error('Invalid image quality');
        }
    }
    set source(data) {
        if (data instanceof Event) {
            // @ts-ignore
            const file = data.target.files[0];
            if (this.FILES_REGEX.test(file.name)) {
                if (!this.format) {
                    // @ts-ignore
                    this.format = data.target.files[0].type.split('/')[1];
                }
                const reader = new FileReader();
                reader.onload = (ev) => {
                    this.imgUrl = ev.target.result;
                };
                // @ts-ignore
                reader.readAsDataURL(data.target.files[0]);
            }
            else {
                console.log('error');
                this.errorEvent.emit('Not supported INPUT');
            }
        }
        else if (data instanceof File) {
            if (this.FILES_REGEX.test(data.name)) {
                if (!this.format) {
                    this.format = data.type.split('/')[1];
                }
                const reader = new FileReader();
                reader.onload = (ev) => {
                    this.imgUrl = ev.target.result;
                };
                reader.readAsDataURL(data);
            }
            else {
                this.errorEvent.emit('Not supported INPUT');
            }
        }
        else if (typeof data === 'string') {
            if ((/^data:image\/([a-zA-Z]*);base64,([^\"]*)$/).test(data)) {
                this.imgUrl = data;
                if (!this.format) {
                    this.format = ((data.split(',')[0]).split(';')[0]).split(':')[1].split('/')[1];
                }
            }
            else if (this.isValidImageURL(data)) {
                this.imgUrl = data;
                if (!this.format) {
                    // @ts-ignore
                    this.format = data.split(/[#?]/)[0].split('.').pop().trim();
                }
            }
            else {
                this.errorEvent.emit('Not supported URL');
            }
        }
        else {
            this.errorEvent.emit('Not supported INPUT');
        }
    }
    isValidImageURL(str) {
        return str.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?(\#(.*))?$/gim);
    }
    rotateRight() {
        this.cropper.rotate(45);
    }
    rotateLeft() {
        this.cropper.rotate(-45);
    }
    crop() {
        this.cropper.setDragMode('crop');
    }
    move() {
        this.cropper.setDragMode('move');
    }
    zoomIn() {
        this.cropper.zoom(0.1);
    }
    zoomOut() {
        this.cropper.zoom(-0.1);
    }
    flipH() {
        this.cropper.scaleX(-this.cropper.getImageData().scaleX);
    }
    flipV() {
        this.cropper.scaleY(-this.cropper.getImageData().scaleY);
    }
    reset() {
        this.cropper.reset();
    }
    export() {
        this.isProcessing = true;
        this.imageLoaded = false;
        let cropedImage = this.cropper.getCroppedCanvas({
            width: this.resizeToWidth,
            height: this.resizeToHeight,
            imageSmoothingEnabled: this.imageSmoothingEnabled,
            imageSmoothingQuality: this.imageSmoothingQuality
        });
        const outputImage = cropedImage.toDataURL('image/' + this.format, this.quality);
        fetch(outputImage)
            .then(res => res.blob())
            .then(blob => {
            this.isProcessing = false;
            this.imageLoaded = true;
            this.imageCroppedEvent.emit({
                base64: outputImage,
                file: new File([blob], Date.now() + '.' + this.format, { type: 'image/' + this.format })
            });
        });
    }
    close() {
        this.closeEvent.emit();
    }
    onLoad() {
        this.image.nativeElement.addEventListener('ready', () => {
            this.imageLoaded = true;
        });
        this.cropper = new Cropper(this.image.nativeElement, {
            aspectRatio: this.aspectRatio,
            autoCropArea: this.autoCropArea,
            autoCrop: this.autoCrop,
            modal: this.mask,
            guides: this.guides,
            center: this.centerIndicator,
            viewMode: this.viewMode,
            scalable: this.scalable,
            zoomable: this.zoomable,
            background: false,
            cropBoxMovable: this.cropBoxMovable,
            cropBoxResizable: this.cropBoxResizable,
        });
    }
    ngOnDestroy() {
    }
    error() {
        this.errorEvent.emit('Error loading image');
    }
}
NgImgEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.2", ngImport: i0, type: NgImgEditorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NgImgEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.0.2", type: NgImgEditorComponent, selector: "lib-ng-img-editor", inputs: { modalTitle: "modalTitle", hideModalHeader: "hideModalHeader", aspectRatio: "aspectRatio", autoCropArea: "autoCropArea", autoCrop: "autoCrop", mask: "mask", guides: "guides", centerIndicator: "centerIndicator", viewMode: "viewMode", modalMaxWidth: "modalMaxWidth", modalCentered: "modalCentered", scalable: "scalable", zoomable: "zoomable", cropBoxMovable: "cropBoxMovable", cropBoxResizable: "cropBoxResizable", darkTheme: "darkTheme", roundCropper: "roundCropper", canvasHeight: "canvasHeight", resizeToWidth: "resizeToWidth", resizeToHeight: "resizeToHeight", imageSmoothingEnabled: "imageSmoothingEnabled", imageSmoothingQuality: "imageSmoothingQuality", format: "format", closeBtnText: "closeBtnText", applyBtnText: "applyBtnText", imageQuality: "imageQuality", source: "source" }, outputs: { closeEvent: "closeEvent", imageCroppedEvent: "imageCroppedEvent", errorEvent: "errorEvent" }, viewQueries: [{ propertyName: "image", first: true, predicate: ["image"], descendants: true }], ngImport: i0, template: "<div class=\"ngx-pe-overlay-container\">\r\n  <div class=\"ngx-pe-dialog-container\" [style.max-width]=\"modalMaxWidth\">\r\n     <div class=\"ngx-pe-dialog-body\">\r\n      <div class=\"ngx-pe-cropper-wrapper\">\r\n        <div class=\"ngx-pe-loading\" *ngIf=\"!imageLoaded\" [class.ngx-pe-processing]=\"isProcessing\">\r\n          <svg xmlns=\"http://www.w3.org/2000/svg\"\r\n               style=\"margin: auto; display: block; shape-rendering: auto; animation-play-state: running; animation-delay: 0s;\"\r\n               viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid\">\r\n            <circle cx=\"50\" cy=\"50\" fill=\"none\" stroke=\"#f3f3f3\" stroke-width=\"10\" r=\"35\"\r\n                    stroke-dasharray=\"164.93361431346415 56.97787143782138\"\r\n                    style=\"animation-play-state: running; animation-delay: 0s;\">\r\n              <animateTransform attributeName=\"transform\" type=\"rotate\" repeatCount=\"indefinite\" dur=\"1s\"\r\n                                values=\"0 50 50;360 50 50\" keyTimes=\"0;1\"\r\n                                style=\"animation-play-state: running; animation-delay: 0s;\"></animateTransform>\r\n            </circle>\r\n          </svg>\r\n        </div>\r\n        <img *ngIf=\"imgUrl\" class=\"ngx-pe-img\" #image loading=\"lazy\" (load)=\"onLoad()\" (error)=\"error()\" [src]=\"imgUrl\" alt=\"cropper-img\" crossorigin=\"anonymous\">\r\n        <div class=\"ngx-pe-tool-bar\">\r\n          <!--move-->\r\n          <button (click)=\"move()\" title=\"Move\">\r\n            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\">\r\n              <path\r\n                d=\"M24 44 15.85 35.85 18.05 33.65 22.5 38.1V28.65H25.5V38.1L29.95 33.65L32.15 35.85ZM11.9 31.9 4 24 11.95 16.05 14.15 18.25 9.9 22.5H19.35V25.5H9.9L14.1 29.7ZM36.1 31.9 33.9 29.7 38.1 25.5H28.7V22.5H38.1L33.9 18.3L36.1 16.1L44 24ZM22.5 19.3V9.9L18.3 14.1L16.1 11.9L24 4L31.9 11.9L29.7 14.1L25.5 9.9V19.3Z\"/>\r\n            </svg>\r\n          </button>\r\n\r\n          <!--crop-->\r\n          <button (click)=\"crop()\" title=\"Crop\">\r\n            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\">\r\n              <path\r\n                d=\"M34.75 31.75V13.25Q34.75 13.25 34.75 13.25Q34.75 13.25 34.75 13.25H16.25V10.25H34.75Q35.95 10.25 36.85 11.15Q37.75 12.05 37.75 13.25V31.75ZM36.25 46Q35.6 46 35.175 45.575Q34.75 45.15 34.75 44.5V37.75H13.25Q12.05 37.75 11.15 36.85Q10.25 35.95 10.25 34.75V13.25H3.5Q2.85 13.25 2.425 12.825Q2 12.4 2 11.75Q2 11.1 2.425 10.675Q2.85 10.25 3.5 10.25H10.25V3.5Q10.25 2.85 10.675 2.425Q11.1 2 11.75 2Q12.4 2 12.825 2.425Q13.25 2.85 13.25 3.5V34.75Q13.25 34.75 13.25 34.75Q13.25 34.75 13.25 34.75H44.5Q45.15 34.75 45.575 35.175Q46 35.6 46 36.25Q46 36.9 45.575 37.325Q45.15 37.75 44.5 37.75H37.75V44.5Q37.75 45.15 37.325 45.575Q36.9 46 36.25 46Z\"/>\r\n            </svg>\r\n          </button>\r\n\r\n          <!--zoom in-->\r\n          <button (click)=\"zoomIn()\" title=\"Zoom In\">\r\n            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\">\r\n              <path\r\n                d=\"M38.7 40.85 26.65 28.8Q25.15 30.1 23.15 30.825Q21.15 31.55 18.9 31.55Q13.5 31.55 9.75 27.8Q6 24.05 6 18.75Q6 13.45 9.75 9.7Q13.5 5.95 18.85 5.95Q24.15 5.95 27.875 9.7Q31.6 13.45 31.6 18.75Q31.6 20.9 30.9 22.9Q30.2 24.9 28.8 26.65L40.95 38.7Q41.4 39.1 41.375 39.75Q41.35 40.4 40.9 40.85Q40.45 41.3 39.8 41.3Q39.15 41.3 38.7 40.85ZM18.85 28.55Q22.9 28.55 25.75 25.675Q28.6 22.8 28.6 18.75Q28.6 14.7 25.75 11.825Q22.9 8.95 18.85 8.95Q14.75 8.95 11.875 11.825Q9 14.7 9 18.75Q9 22.8 11.875 25.675Q14.75 28.55 18.85 28.55ZM18.8 24.3Q18.15 24.3 17.725 23.875Q17.3 23.45 17.3 22.8V20.2H14.65Q14.05 20.2 13.625 19.75Q13.2 19.3 13.2 18.65Q13.2 18.05 13.625 17.625Q14.05 17.2 14.7 17.2H17.3V14.6Q17.3 14 17.75 13.575Q18.2 13.15 18.85 13.15Q19.45 13.15 19.875 13.575Q20.3 14 20.3 14.65V17.2H22.9Q23.5 17.2 23.925 17.65Q24.35 18.1 24.35 18.7Q24.35 19.35 23.925 19.775Q23.5 20.2 22.85 20.2H20.3V22.85Q20.3 23.45 19.85 23.875Q19.4 24.3 18.8 24.3Z\"/>\r\n            </svg>\r\n          </button>\r\n\r\n          <!--zoom out-->\r\n          <button (click)=\"zoomOut()\" title=\"Zoom Out\">\r\n            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\">\r\n              <path\r\n                d=\"M38.7 40.85 26.65 28.8Q25.15 30.1 23.15 30.825Q21.15 31.55 18.9 31.55Q13.5 31.55 9.75 27.8Q6 24.05 6 18.75Q6 13.45 9.75 9.7Q13.5 5.95 18.85 5.95Q24.15 5.95 27.875 9.7Q31.6 13.45 31.6 18.75Q31.6 20.9 30.9 22.9Q30.2 24.9 28.8 26.65L40.95 38.7Q41.4 39.1 41.375 39.75Q41.35 40.4 40.9 40.85Q40.45 41.3 39.8 41.3Q39.15 41.3 38.7 40.85ZM18.85 28.55Q22.9 28.55 25.75 25.675Q28.6 22.8 28.6 18.75Q28.6 14.7 25.75 11.825Q22.9 8.95 18.85 8.95Q14.75 8.95 11.875 11.825Q9 14.7 9 18.75Q9 22.8 11.875 25.675Q14.75 28.55 18.85 28.55ZM15.2 20.2Q14.6 20.2 14.175 19.75Q13.75 19.3 13.75 18.65Q13.75 18.05 14.175 17.625Q14.6 17.2 15.25 17.2H22.35Q22.95 17.2 23.375 17.65Q23.8 18.1 23.8 18.7Q23.8 19.35 23.375 19.775Q22.95 20.2 22.3 20.2Z\"/>\r\n            </svg>\r\n          </button>\r\n\r\n          <!--rotate left-->\r\n          <button (click)=\"rotateLeft()\" title=\"Rotate Left\">\r\n            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\">\r\n              <path\r\n                d=\"M7.9 23.6Q7.15 23.6 6.7 23.075Q6.25 22.55 6.4 21.85Q6.75 20.3 7.325 18.85Q7.9 17.4 8.7 16.05Q9.1 15.4 9.775 15.35Q10.45 15.3 11 15.85Q11.4 16.2 11.45 16.75Q11.5 17.3 11.25 17.75Q10.55 18.9 10.075 20.075Q9.6 21.25 9.35 22.4Q9.25 22.95 8.85 23.275Q8.45 23.6 7.9 23.6ZM20.05 43.7Q18.6 43.35 17.15 42.775Q15.7 42.2 14.4 41.4Q13.75 41 13.7 40.3Q13.65 39.6 14.2 39Q14.55 38.65 15.05 38.6Q15.55 38.55 15.95 38.8Q17.1 39.5 18.225 39.975Q19.35 40.45 20.55 40.75Q21.05 40.85 21.4 41.275Q21.75 41.7 21.75 42.25Q21.75 43 21.25 43.425Q20.75 43.85 20.05 43.7ZM8.7 35.7Q7.9 34.4 7.325 32.925Q6.75 31.45 6.4 29.85Q6.25 29.15 6.675 28.625Q7.1 28.1 7.9 28.1Q8.4 28.1 8.825 28.425Q9.25 28.75 9.35 29.3Q9.6 30.55 10.05 31.725Q10.5 32.9 11.2 33.95Q11.5 34.4 11.45 34.95Q11.4 35.5 11 35.9Q10.45 36.45 9.775 36.4Q9.1 36.35 8.7 35.7ZM27.95 43.65Q27.25 43.85 26.75 43.425Q26.25 43 26.25 42.25Q26.25 41.75 26.6 41.325Q26.95 40.9 27.45 40.75Q32.5 39.4 35.75 35.375Q39 31.35 39 25.85Q39 19.5 34.675 15.175Q30.35 10.85 24 10.85H23L25.85 13.7Q26.3 14.15 26.3 14.8Q26.3 15.45 25.85 15.9Q25.4 16.35 24.75 16.35Q24.1 16.35 23.65 15.9L18.15 10.4Q17.9 10.15 17.8 9.9Q17.7 9.65 17.7 9.35Q17.7 9.05 17.8 8.8Q17.9 8.55 18.15 8.3L23.65 2.8Q24.1 2.35 24.75 2.35Q25.4 2.35 25.85 2.8Q26.3 3.25 26.3 3.9Q26.3 4.55 25.85 5L23 7.85H24Q31.55 7.85 36.775 13.075Q42 18.3 42 25.85Q42 32.4 38.075 37.275Q34.15 42.15 27.95 43.65Z\"/>\r\n            </svg>\r\n          </button>\r\n\r\n          <!--rotate right-->\r\n          <button (click)=\"rotateRight()\" title=\"Rotate Right\">\r\n            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\">\r\n              <path\r\n                d=\"M40.2 23.6Q39.7 23.6 39.275 23.25Q38.85 22.9 38.75 22.4Q38.5 21.2 38.025 20.05Q37.55 18.9 36.85 17.75Q36.6 17.3 36.65 16.75Q36.7 16.2 37.1 15.8Q37.65 15.25 38.35 15.325Q39.05 15.4 39.45 16.05Q40.25 17.35 40.8 18.775Q41.35 20.2 41.7 21.8Q41.85 22.5 41.4 23.05Q40.95 23.6 40.2 23.6ZM26.3 42.2Q26.3 41.7 26.65 41.275Q27 40.85 27.5 40.75Q28.65 40.5 29.8 40.025Q30.95 39.55 32.1 38.85Q32.55 38.6 33.075 38.625Q33.6 38.65 34 39.05Q34.55 39.6 34.475 40.3Q34.4 41 33.75 41.4Q32.4 42.25 30.975 42.8Q29.55 43.35 28.1 43.7Q27.4 43.85 26.85 43.4Q26.3 42.95 26.3 42.2ZM37.1 35.9Q36.75 35.55 36.7 34.975Q36.65 34.4 36.9 33.95Q37.6 32.8 38.05 31.65Q38.5 30.5 38.75 29.3Q38.85 28.8 39.25 28.45Q39.65 28.1 40.2 28.1Q40.95 28.1 41.375 28.625Q41.8 29.15 41.65 29.85Q41.25 31.45 40.7 32.9Q40.15 34.35 39.4 35.65Q39 36.3 38.325 36.375Q37.65 36.45 37.1 35.9ZM20.05 43.7Q13.9 42.3 10 37.35Q6.1 32.4 6.1 25.85Q6.1 18.3 11.325 13.075Q16.55 7.85 24.1 7.85H25.1L22.25 5Q21.8 4.55 21.8 3.9Q21.8 3.25 22.25 2.8Q22.7 2.35 23.35 2.35Q24 2.35 24.45 2.8L29.95 8.3Q30.2 8.55 30.3 8.8Q30.4 9.05 30.4 9.35Q30.4 9.65 30.3 9.9Q30.2 10.15 29.95 10.4L24.45 15.9Q24 16.35 23.35 16.35Q22.7 16.35 22.25 15.9Q21.8 15.45 21.8 14.8Q21.8 14.15 22.25 13.7L25.1 10.85H24.1Q17.75 10.85 13.425 15.175Q9.1 19.5 9.1 25.85Q9.1 31.35 12.35 35.375Q15.6 39.4 20.65 40.7Q21.15 40.8 21.5 41.225Q21.85 41.65 21.85 42.2Q21.85 42.95 21.3 43.4Q20.75 43.85 20.05 43.7Z\"/>\r\n            </svg>\r\n          </button>\r\n\r\n          <!--flip vertical-->\r\n          <button (click)=\"flipH()\" title=\"Flip Horizontal\">\r\n            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\">\r\n              <path\r\n                d=\"M9 42Q7.8 42 6.9 41.1Q6 40.2 6 39V9Q6 7.8 6.9 6.9Q7.8 6 9 6H18.1Q18.75 6 19.175 6.425Q19.6 6.85 19.6 7.5Q19.6 8.15 19.175 8.575Q18.75 9 18.1 9H9Q9 9 9 9Q9 9 9 9V39Q9 39 9 39Q9 39 9 39H18.1Q18.75 39 19.175 39.425Q19.6 39.85 19.6 40.5Q19.6 41.15 19.175 41.575Q18.75 42 18.1 42ZM24.1 46Q23.45 46 23.025 45.575Q22.6 45.15 22.6 44.5V3.5Q22.6 2.85 23.025 2.425Q23.45 2 24.1 2Q24.75 2 25.175 2.425Q25.6 2.85 25.6 3.5V44.5Q25.6 45.15 25.175 45.575Q24.75 46 24.1 46ZM39 9H38.3V6H39Q40.2 6 41.1 6.9Q42 7.8 42 9V9.7H39ZM39 26.75V21.25H42V26.75ZM39 42H38.3V39H39V38.3H42V39Q42 40.2 41.1 41.1Q40.2 42 39 42ZM39 18.25V12.7H42V18.25ZM39 35.3V29.75H42V35.3ZM28.6 42V39H35.3V42ZM28.6 9V6H35.3V9Z\"/>\r\n            </svg>\r\n          </button>\r\n\r\n          <!--flip horizontal-->\r\n          <button (click)=\"flipV()\" title=\"Flip Vertical\">\r\n            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\" transform='rotate(90)'>\r\n              <path\r\n                d=\"M9 42Q7.8 42 6.9 41.1Q6 40.2 6 39V9Q6 7.8 6.9 6.9Q7.8 6 9 6H18.1Q18.75 6 19.175 6.425Q19.6 6.85 19.6 7.5Q19.6 8.15 19.175 8.575Q18.75 9 18.1 9H9Q9 9 9 9Q9 9 9 9V39Q9 39 9 39Q9 39 9 39H18.1Q18.75 39 19.175 39.425Q19.6 39.85 19.6 40.5Q19.6 41.15 19.175 41.575Q18.75 42 18.1 42ZM24.1 46Q23.45 46 23.025 45.575Q22.6 45.15 22.6 44.5V3.5Q22.6 2.85 23.025 2.425Q23.45 2 24.1 2Q24.75 2 25.175 2.425Q25.6 2.85 25.6 3.5V44.5Q25.6 45.15 25.175 45.575Q24.75 46 24.1 46ZM39 9H38.3V6H39Q40.2 6 41.1 6.9Q42 7.8 42 9V9.7H39ZM39 26.75V21.25H42V26.75ZM39 42H38.3V39H39V38.3H42V39Q42 40.2 41.1 41.1Q40.2 42 39 42ZM39 18.25V12.7H42V18.25ZM39 35.3V29.75H42V35.3ZM28.6 42V39H35.3V42ZM28.6 9V6H35.3V9Z\"/>\r\n            </svg>\r\n          </button>\r\n          <button (click)=\"reset()\" title=\"Reset\">\r\n            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\">\r\n              <path\r\n                d=\"M9.8 31.45Q8.8 29.65 8.4 27.825Q8 26 8 24.1Q8 17.55 12.725 12.825Q17.45 8.1 24 8.1H26.15L22.15 4.1L24.1 2.15L31.55 9.6L24.1 17.05L22.1 15.05L26.05 11.1H24Q18.65 11.1 14.825 14.925Q11 18.75 11 24.1Q11 25.55 11.275 26.85Q11.55 28.15 11.95 29.3ZM23.8 46 16.35 38.55 23.8 31.1 25.75 33.05 21.75 37.05H24Q29.35 37.05 33.175 33.225Q37 29.4 37 24.05Q37 22.6 36.75 21.3Q36.5 20 36 18.85L38.15 16.7Q39.15 18.5 39.575 20.325Q40 22.15 40 24.05Q40 30.6 35.275 35.325Q30.55 40.05 24 40.05H21.75L25.75 44.05Z\"/>\r\n            </svg>\r\n          </button>\r\n\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"ngx-pe-dialog-footer\">\r\n      <button class=\"ngx-pe-btn ngx-pe-btn-outline-light\" (click)=\"close()\">{{closeBtnText}}</button>\r\n      <button class=\"ngx-pe-btn ngx-pe-btn-primary\" [disabled]=\"isProcessing\" (click)=\"export()\">{{applyBtnText}}</button>\r\n    </div>\r\n  </div>\r\n</div>\r\n", dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.2", ngImport: i0, type: NgImgEditorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-ng-img-editor', template: "<div class=\"ngx-pe-overlay-container\">\r\n  <div class=\"ngx-pe-dialog-container\" [style.max-width]=\"modalMaxWidth\">\r\n     <div class=\"ngx-pe-dialog-body\">\r\n      <div class=\"ngx-pe-cropper-wrapper\">\r\n        <div class=\"ngx-pe-loading\" *ngIf=\"!imageLoaded\" [class.ngx-pe-processing]=\"isProcessing\">\r\n          <svg xmlns=\"http://www.w3.org/2000/svg\"\r\n               style=\"margin: auto; display: block; shape-rendering: auto; animation-play-state: running; animation-delay: 0s;\"\r\n               viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid\">\r\n            <circle cx=\"50\" cy=\"50\" fill=\"none\" stroke=\"#f3f3f3\" stroke-width=\"10\" r=\"35\"\r\n                    stroke-dasharray=\"164.93361431346415 56.97787143782138\"\r\n                    style=\"animation-play-state: running; animation-delay: 0s;\">\r\n              <animateTransform attributeName=\"transform\" type=\"rotate\" repeatCount=\"indefinite\" dur=\"1s\"\r\n                                values=\"0 50 50;360 50 50\" keyTimes=\"0;1\"\r\n                                style=\"animation-play-state: running; animation-delay: 0s;\"></animateTransform>\r\n            </circle>\r\n          </svg>\r\n        </div>\r\n        <img *ngIf=\"imgUrl\" class=\"ngx-pe-img\" #image loading=\"lazy\" (load)=\"onLoad()\" (error)=\"error()\" [src]=\"imgUrl\" alt=\"cropper-img\" crossorigin=\"anonymous\">\r\n        <div class=\"ngx-pe-tool-bar\">\r\n          <!--move-->\r\n          <button (click)=\"move()\" title=\"Move\">\r\n            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\">\r\n              <path\r\n                d=\"M24 44 15.85 35.85 18.05 33.65 22.5 38.1V28.65H25.5V38.1L29.95 33.65L32.15 35.85ZM11.9 31.9 4 24 11.95 16.05 14.15 18.25 9.9 22.5H19.35V25.5H9.9L14.1 29.7ZM36.1 31.9 33.9 29.7 38.1 25.5H28.7V22.5H38.1L33.9 18.3L36.1 16.1L44 24ZM22.5 19.3V9.9L18.3 14.1L16.1 11.9L24 4L31.9 11.9L29.7 14.1L25.5 9.9V19.3Z\"/>\r\n            </svg>\r\n          </button>\r\n\r\n          <!--crop-->\r\n          <button (click)=\"crop()\" title=\"Crop\">\r\n            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\">\r\n              <path\r\n                d=\"M34.75 31.75V13.25Q34.75 13.25 34.75 13.25Q34.75 13.25 34.75 13.25H16.25V10.25H34.75Q35.95 10.25 36.85 11.15Q37.75 12.05 37.75 13.25V31.75ZM36.25 46Q35.6 46 35.175 45.575Q34.75 45.15 34.75 44.5V37.75H13.25Q12.05 37.75 11.15 36.85Q10.25 35.95 10.25 34.75V13.25H3.5Q2.85 13.25 2.425 12.825Q2 12.4 2 11.75Q2 11.1 2.425 10.675Q2.85 10.25 3.5 10.25H10.25V3.5Q10.25 2.85 10.675 2.425Q11.1 2 11.75 2Q12.4 2 12.825 2.425Q13.25 2.85 13.25 3.5V34.75Q13.25 34.75 13.25 34.75Q13.25 34.75 13.25 34.75H44.5Q45.15 34.75 45.575 35.175Q46 35.6 46 36.25Q46 36.9 45.575 37.325Q45.15 37.75 44.5 37.75H37.75V44.5Q37.75 45.15 37.325 45.575Q36.9 46 36.25 46Z\"/>\r\n            </svg>\r\n          </button>\r\n\r\n          <!--zoom in-->\r\n          <button (click)=\"zoomIn()\" title=\"Zoom In\">\r\n            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\">\r\n              <path\r\n                d=\"M38.7 40.85 26.65 28.8Q25.15 30.1 23.15 30.825Q21.15 31.55 18.9 31.55Q13.5 31.55 9.75 27.8Q6 24.05 6 18.75Q6 13.45 9.75 9.7Q13.5 5.95 18.85 5.95Q24.15 5.95 27.875 9.7Q31.6 13.45 31.6 18.75Q31.6 20.9 30.9 22.9Q30.2 24.9 28.8 26.65L40.95 38.7Q41.4 39.1 41.375 39.75Q41.35 40.4 40.9 40.85Q40.45 41.3 39.8 41.3Q39.15 41.3 38.7 40.85ZM18.85 28.55Q22.9 28.55 25.75 25.675Q28.6 22.8 28.6 18.75Q28.6 14.7 25.75 11.825Q22.9 8.95 18.85 8.95Q14.75 8.95 11.875 11.825Q9 14.7 9 18.75Q9 22.8 11.875 25.675Q14.75 28.55 18.85 28.55ZM18.8 24.3Q18.15 24.3 17.725 23.875Q17.3 23.45 17.3 22.8V20.2H14.65Q14.05 20.2 13.625 19.75Q13.2 19.3 13.2 18.65Q13.2 18.05 13.625 17.625Q14.05 17.2 14.7 17.2H17.3V14.6Q17.3 14 17.75 13.575Q18.2 13.15 18.85 13.15Q19.45 13.15 19.875 13.575Q20.3 14 20.3 14.65V17.2H22.9Q23.5 17.2 23.925 17.65Q24.35 18.1 24.35 18.7Q24.35 19.35 23.925 19.775Q23.5 20.2 22.85 20.2H20.3V22.85Q20.3 23.45 19.85 23.875Q19.4 24.3 18.8 24.3Z\"/>\r\n            </svg>\r\n          </button>\r\n\r\n          <!--zoom out-->\r\n          <button (click)=\"zoomOut()\" title=\"Zoom Out\">\r\n            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\">\r\n              <path\r\n                d=\"M38.7 40.85 26.65 28.8Q25.15 30.1 23.15 30.825Q21.15 31.55 18.9 31.55Q13.5 31.55 9.75 27.8Q6 24.05 6 18.75Q6 13.45 9.75 9.7Q13.5 5.95 18.85 5.95Q24.15 5.95 27.875 9.7Q31.6 13.45 31.6 18.75Q31.6 20.9 30.9 22.9Q30.2 24.9 28.8 26.65L40.95 38.7Q41.4 39.1 41.375 39.75Q41.35 40.4 40.9 40.85Q40.45 41.3 39.8 41.3Q39.15 41.3 38.7 40.85ZM18.85 28.55Q22.9 28.55 25.75 25.675Q28.6 22.8 28.6 18.75Q28.6 14.7 25.75 11.825Q22.9 8.95 18.85 8.95Q14.75 8.95 11.875 11.825Q9 14.7 9 18.75Q9 22.8 11.875 25.675Q14.75 28.55 18.85 28.55ZM15.2 20.2Q14.6 20.2 14.175 19.75Q13.75 19.3 13.75 18.65Q13.75 18.05 14.175 17.625Q14.6 17.2 15.25 17.2H22.35Q22.95 17.2 23.375 17.65Q23.8 18.1 23.8 18.7Q23.8 19.35 23.375 19.775Q22.95 20.2 22.3 20.2Z\"/>\r\n            </svg>\r\n          </button>\r\n\r\n          <!--rotate left-->\r\n          <button (click)=\"rotateLeft()\" title=\"Rotate Left\">\r\n            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\">\r\n              <path\r\n                d=\"M7.9 23.6Q7.15 23.6 6.7 23.075Q6.25 22.55 6.4 21.85Q6.75 20.3 7.325 18.85Q7.9 17.4 8.7 16.05Q9.1 15.4 9.775 15.35Q10.45 15.3 11 15.85Q11.4 16.2 11.45 16.75Q11.5 17.3 11.25 17.75Q10.55 18.9 10.075 20.075Q9.6 21.25 9.35 22.4Q9.25 22.95 8.85 23.275Q8.45 23.6 7.9 23.6ZM20.05 43.7Q18.6 43.35 17.15 42.775Q15.7 42.2 14.4 41.4Q13.75 41 13.7 40.3Q13.65 39.6 14.2 39Q14.55 38.65 15.05 38.6Q15.55 38.55 15.95 38.8Q17.1 39.5 18.225 39.975Q19.35 40.45 20.55 40.75Q21.05 40.85 21.4 41.275Q21.75 41.7 21.75 42.25Q21.75 43 21.25 43.425Q20.75 43.85 20.05 43.7ZM8.7 35.7Q7.9 34.4 7.325 32.925Q6.75 31.45 6.4 29.85Q6.25 29.15 6.675 28.625Q7.1 28.1 7.9 28.1Q8.4 28.1 8.825 28.425Q9.25 28.75 9.35 29.3Q9.6 30.55 10.05 31.725Q10.5 32.9 11.2 33.95Q11.5 34.4 11.45 34.95Q11.4 35.5 11 35.9Q10.45 36.45 9.775 36.4Q9.1 36.35 8.7 35.7ZM27.95 43.65Q27.25 43.85 26.75 43.425Q26.25 43 26.25 42.25Q26.25 41.75 26.6 41.325Q26.95 40.9 27.45 40.75Q32.5 39.4 35.75 35.375Q39 31.35 39 25.85Q39 19.5 34.675 15.175Q30.35 10.85 24 10.85H23L25.85 13.7Q26.3 14.15 26.3 14.8Q26.3 15.45 25.85 15.9Q25.4 16.35 24.75 16.35Q24.1 16.35 23.65 15.9L18.15 10.4Q17.9 10.15 17.8 9.9Q17.7 9.65 17.7 9.35Q17.7 9.05 17.8 8.8Q17.9 8.55 18.15 8.3L23.65 2.8Q24.1 2.35 24.75 2.35Q25.4 2.35 25.85 2.8Q26.3 3.25 26.3 3.9Q26.3 4.55 25.85 5L23 7.85H24Q31.55 7.85 36.775 13.075Q42 18.3 42 25.85Q42 32.4 38.075 37.275Q34.15 42.15 27.95 43.65Z\"/>\r\n            </svg>\r\n          </button>\r\n\r\n          <!--rotate right-->\r\n          <button (click)=\"rotateRight()\" title=\"Rotate Right\">\r\n            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\">\r\n              <path\r\n                d=\"M40.2 23.6Q39.7 23.6 39.275 23.25Q38.85 22.9 38.75 22.4Q38.5 21.2 38.025 20.05Q37.55 18.9 36.85 17.75Q36.6 17.3 36.65 16.75Q36.7 16.2 37.1 15.8Q37.65 15.25 38.35 15.325Q39.05 15.4 39.45 16.05Q40.25 17.35 40.8 18.775Q41.35 20.2 41.7 21.8Q41.85 22.5 41.4 23.05Q40.95 23.6 40.2 23.6ZM26.3 42.2Q26.3 41.7 26.65 41.275Q27 40.85 27.5 40.75Q28.65 40.5 29.8 40.025Q30.95 39.55 32.1 38.85Q32.55 38.6 33.075 38.625Q33.6 38.65 34 39.05Q34.55 39.6 34.475 40.3Q34.4 41 33.75 41.4Q32.4 42.25 30.975 42.8Q29.55 43.35 28.1 43.7Q27.4 43.85 26.85 43.4Q26.3 42.95 26.3 42.2ZM37.1 35.9Q36.75 35.55 36.7 34.975Q36.65 34.4 36.9 33.95Q37.6 32.8 38.05 31.65Q38.5 30.5 38.75 29.3Q38.85 28.8 39.25 28.45Q39.65 28.1 40.2 28.1Q40.95 28.1 41.375 28.625Q41.8 29.15 41.65 29.85Q41.25 31.45 40.7 32.9Q40.15 34.35 39.4 35.65Q39 36.3 38.325 36.375Q37.65 36.45 37.1 35.9ZM20.05 43.7Q13.9 42.3 10 37.35Q6.1 32.4 6.1 25.85Q6.1 18.3 11.325 13.075Q16.55 7.85 24.1 7.85H25.1L22.25 5Q21.8 4.55 21.8 3.9Q21.8 3.25 22.25 2.8Q22.7 2.35 23.35 2.35Q24 2.35 24.45 2.8L29.95 8.3Q30.2 8.55 30.3 8.8Q30.4 9.05 30.4 9.35Q30.4 9.65 30.3 9.9Q30.2 10.15 29.95 10.4L24.45 15.9Q24 16.35 23.35 16.35Q22.7 16.35 22.25 15.9Q21.8 15.45 21.8 14.8Q21.8 14.15 22.25 13.7L25.1 10.85H24.1Q17.75 10.85 13.425 15.175Q9.1 19.5 9.1 25.85Q9.1 31.35 12.35 35.375Q15.6 39.4 20.65 40.7Q21.15 40.8 21.5 41.225Q21.85 41.65 21.85 42.2Q21.85 42.95 21.3 43.4Q20.75 43.85 20.05 43.7Z\"/>\r\n            </svg>\r\n          </button>\r\n\r\n          <!--flip vertical-->\r\n          <button (click)=\"flipH()\" title=\"Flip Horizontal\">\r\n            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\">\r\n              <path\r\n                d=\"M9 42Q7.8 42 6.9 41.1Q6 40.2 6 39V9Q6 7.8 6.9 6.9Q7.8 6 9 6H18.1Q18.75 6 19.175 6.425Q19.6 6.85 19.6 7.5Q19.6 8.15 19.175 8.575Q18.75 9 18.1 9H9Q9 9 9 9Q9 9 9 9V39Q9 39 9 39Q9 39 9 39H18.1Q18.75 39 19.175 39.425Q19.6 39.85 19.6 40.5Q19.6 41.15 19.175 41.575Q18.75 42 18.1 42ZM24.1 46Q23.45 46 23.025 45.575Q22.6 45.15 22.6 44.5V3.5Q22.6 2.85 23.025 2.425Q23.45 2 24.1 2Q24.75 2 25.175 2.425Q25.6 2.85 25.6 3.5V44.5Q25.6 45.15 25.175 45.575Q24.75 46 24.1 46ZM39 9H38.3V6H39Q40.2 6 41.1 6.9Q42 7.8 42 9V9.7H39ZM39 26.75V21.25H42V26.75ZM39 42H38.3V39H39V38.3H42V39Q42 40.2 41.1 41.1Q40.2 42 39 42ZM39 18.25V12.7H42V18.25ZM39 35.3V29.75H42V35.3ZM28.6 42V39H35.3V42ZM28.6 9V6H35.3V9Z\"/>\r\n            </svg>\r\n          </button>\r\n\r\n          <!--flip horizontal-->\r\n          <button (click)=\"flipV()\" title=\"Flip Vertical\">\r\n            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\" transform='rotate(90)'>\r\n              <path\r\n                d=\"M9 42Q7.8 42 6.9 41.1Q6 40.2 6 39V9Q6 7.8 6.9 6.9Q7.8 6 9 6H18.1Q18.75 6 19.175 6.425Q19.6 6.85 19.6 7.5Q19.6 8.15 19.175 8.575Q18.75 9 18.1 9H9Q9 9 9 9Q9 9 9 9V39Q9 39 9 39Q9 39 9 39H18.1Q18.75 39 19.175 39.425Q19.6 39.85 19.6 40.5Q19.6 41.15 19.175 41.575Q18.75 42 18.1 42ZM24.1 46Q23.45 46 23.025 45.575Q22.6 45.15 22.6 44.5V3.5Q22.6 2.85 23.025 2.425Q23.45 2 24.1 2Q24.75 2 25.175 2.425Q25.6 2.85 25.6 3.5V44.5Q25.6 45.15 25.175 45.575Q24.75 46 24.1 46ZM39 9H38.3V6H39Q40.2 6 41.1 6.9Q42 7.8 42 9V9.7H39ZM39 26.75V21.25H42V26.75ZM39 42H38.3V39H39V38.3H42V39Q42 40.2 41.1 41.1Q40.2 42 39 42ZM39 18.25V12.7H42V18.25ZM39 35.3V29.75H42V35.3ZM28.6 42V39H35.3V42ZM28.6 9V6H35.3V9Z\"/>\r\n            </svg>\r\n          </button>\r\n          <button (click)=\"reset()\" title=\"Reset\">\r\n            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\">\r\n              <path\r\n                d=\"M9.8 31.45Q8.8 29.65 8.4 27.825Q8 26 8 24.1Q8 17.55 12.725 12.825Q17.45 8.1 24 8.1H26.15L22.15 4.1L24.1 2.15L31.55 9.6L24.1 17.05L22.1 15.05L26.05 11.1H24Q18.65 11.1 14.825 14.925Q11 18.75 11 24.1Q11 25.55 11.275 26.85Q11.55 28.15 11.95 29.3ZM23.8 46 16.35 38.55 23.8 31.1 25.75 33.05 21.75 37.05H24Q29.35 37.05 33.175 33.225Q37 29.4 37 24.05Q37 22.6 36.75 21.3Q36.5 20 36 18.85L38.15 16.7Q39.15 18.5 39.575 20.325Q40 22.15 40 24.05Q40 30.6 35.275 35.325Q30.55 40.05 24 40.05H21.75L25.75 44.05Z\"/>\r\n            </svg>\r\n          </button>\r\n\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"ngx-pe-dialog-footer\">\r\n      <button class=\"ngx-pe-btn ngx-pe-btn-outline-light\" (click)=\"close()\">{{closeBtnText}}</button>\r\n      <button class=\"ngx-pe-btn ngx-pe-btn-primary\" [disabled]=\"isProcessing\" (click)=\"export()\">{{applyBtnText}}</button>\r\n    </div>\r\n  </div>\r\n</div>\r\n" }]
        }], propDecorators: { image: [{
                type: ViewChild,
                args: ['image']
            }], modalTitle: [{
                type: Input
            }], hideModalHeader: [{
                type: Input
            }], aspectRatio: [{
                type: Input
            }], autoCropArea: [{
                type: Input
            }], autoCrop: [{
                type: Input
            }], mask: [{
                type: Input
            }], guides: [{
                type: Input
            }], centerIndicator: [{
                type: Input
            }], viewMode: [{
                type: Input
            }], modalMaxWidth: [{
                type: Input
            }], modalCentered: [{
                type: Input
            }], scalable: [{
                type: Input
            }], zoomable: [{
                type: Input
            }], cropBoxMovable: [{
                type: Input
            }], cropBoxResizable: [{
                type: Input
            }], darkTheme: [{
                type: Input
            }], roundCropper: [{
                type: Input
            }], canvasHeight: [{
                type: Input
            }], resizeToWidth: [{
                type: Input
            }], resizeToHeight: [{
                type: Input
            }], imageSmoothingEnabled: [{
                type: Input
            }], imageSmoothingQuality: [{
                type: Input
            }], format: [{
                type: Input
            }], closeBtnText: [{
                type: Input
            }], applyBtnText: [{
                type: Input
            }], imageQuality: [{
                type: Input
            }], closeEvent: [{
                type: Output
            }], imageCroppedEvent: [{
                type: Output
            }], errorEvent: [{
                type: Output
            }], source: [{
                type: Input
            }] } });

class NgImgEditorService {
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

class NgImgEditorModule {
}
NgImgEditorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.2", ngImport: i0, type: NgImgEditorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NgImgEditorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.0.2", ngImport: i0, type: NgImgEditorModule, declarations: [NgImgEditorComponent], imports: [CommonModule], exports: [NgImgEditorComponent] });
NgImgEditorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.0.2", ngImport: i0, type: NgImgEditorModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.2", ngImport: i0, type: NgImgEditorModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        NgImgEditorComponent
                    ],
                    imports: [
                        CommonModule,
                    ],
                    exports: [
                        NgImgEditorComponent
                    ]
                }]
        }] });

/*
 * Public API Surface of ng-img-editor
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NgImgEditorComponent, NgImgEditorModule, NgImgEditorService };
//# sourceMappingURL=ng-img-editor.mjs.map