export class Post {
    postid: number| undefined;;
    posterId: number| undefined;
    postcaption: string;
    viewcount: number| undefined;
    createdBy: string| undefined;
    createdDate: Date;
    lastModifiedBy: string| undefined;
    lastModifiedDate: Date;
    filelocation: string| undefined;
    postType: string| undefined;
    data: any;
}
