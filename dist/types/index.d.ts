export interface DetectionInfo {
    name: string;
    version: string;
}
export interface DatabaseDetectionResult extends DetectionInfo {
    dialect?: string;
    adapter?: string;
}
