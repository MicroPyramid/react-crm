export const formatFileSize = (sizeInBytes: number): string => {
    const kilobyte = 1024;
    const megabyte = kilobyte * 1024;

    if (sizeInBytes < kilobyte) {
        return `${sizeInBytes} B`;
    } else if (sizeInBytes < megabyte) {
        return `${(sizeInBytes / kilobyte).toFixed(2)} KB`;
    } else {
        return `${(sizeInBytes / megabyte).toFixed(2)} MB`;
    }
};