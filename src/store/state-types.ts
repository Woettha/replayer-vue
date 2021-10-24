/** @interface Defines a playable media file */
export interface IMediaFile {
    /** The name of the original media file (from the disk or from within a REZ/ZIP-file)  */
    fileName: string;
    /** The object URL representing the playable file content  */
    objectUrl: string;
}
/** @class Implements a playable media file */
export class MediaFile implements IMediaFile {
    /** @constructor
     * @param {string} fileName - The name of the original media file (from the disk or from within a REZ/ZIP-file)
     * @param {string} objectUrl - The object URL representing the playable file content
     */
    constructor(fileName: string, objectUrl: string) {
        this.fileName = fileName;
        this.objectUrl = objectUrl;
    }
    fileName: string;
    objectUrl: string;
}

/** The set of supported mime type in a REZ container */
export enum RezMimeTypes {
    AUDIO_MP3 = 'audio/mp3',
    TEXT_XML = 'text/xml',
    APPLICATION_XBPLIST = 'application/x-bplist',
}
