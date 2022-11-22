export class PhotoDetail {
  id: string;
  author: string;
  width: number;
  height: number;
  download_url: string;
  constructor(id?, author?, width?, height?, download_url?) {
    this.id = id || '';
    this.author = author || '';
    this.width = width || null;
    this.height = height || null;
    this.download_url = download_url || '';
  }
}
