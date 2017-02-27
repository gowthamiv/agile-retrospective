export class Review {
    constructor(
        public id: number,
        public comment: string,
        public nofLikes: number = 0,
        public nofDisLikes: number = 0) { }
}