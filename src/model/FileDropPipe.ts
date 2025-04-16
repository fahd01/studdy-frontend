import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ngxFileDrop'
})
export class FileDropPipe implements PipeTransform {
    transform(file: File): Promise<string> | string {
        if (!file || !(file instanceof File)) {
            return '';
        }

        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(reader.result as string);
            reader.onerror = (e) => reject(e);
            reader.readAsDataURL(file);
        });
    }
}