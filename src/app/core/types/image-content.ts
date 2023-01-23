import { SafeStyle } from "@angular/platform-browser";

export class ImageContent {
    imageName: string;
    localPath: string;
    imageVirtualPath?: string;
    onlineUrl: string;
    path: string;
    base64content?: string;
    percentSelected?: number;
    localMiniatureBackground: SafeStyle;
    description?: string
}
