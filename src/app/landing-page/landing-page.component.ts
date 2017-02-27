import { Resolve } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Review } from './landing-page.model';

@Component({
    selector: 'landing-page',
    templateUrl: 'landing-page.component.html'
})

export class LandingPageComponent implements OnInit {
    private goodReviews: Review[];
    private badReviews: Review[];
    private improvementReviews: Review[];

    private goodText: string = "";
    private badText: string = "";
    private improvementText: string = "";

    private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(
        private http: Http) {
    }

    ngOnInit() {
        this.getComments();
    }

    updateGoodArray() {
        // saving the new comment entered into the DB
        let payload = new Review(this.goodReviews.length + 1, this.goodText, 0, 0);
        this.http.post('http://localhost:4000/good-comments', payload)
            .subscribe((res: Response) => {
                this.goodReviews.push(res.json());
            });

        this.goodText = "";
    }

    updateBadArray() {
        // saving the new comment entered into the DB
        let payload = new Review(this.badReviews.length + 1, this.badText, 0, 0);
        this.http.post('http://localhost:4000/bad-comments', payload)
            .subscribe((res: Response) => {
                this.badReviews.push(res.json());
            });

        this.badText = "";
    }

    updateImprovementArray() {
        // saving the new comment entered into the DB
        let payload = new Review(this.improvementReviews.length + 1, this.improvementText, 0, 0);
        this.http.post('http://localhost:4000/improvement-comments', payload)
            .subscribe((res: Response) => {
                this.improvementReviews.push(res.json());
            });

        this.improvementText = "";
    }

    likeGoodReview(review: Review) {
        review.nofLikes = review.nofLikes + 1;
        let payload = review;
        this.http.put('http://localhost:4000/good-comments/' + review.id, payload)
            .subscribe((res: Response) => {
                console.log(res.json());
            });
    }

    likeBadReview(review: Review) {
        review.nofLikes = review.nofLikes + 1;
        let payload = review;
        this.http.put('http://localhost:4000/bad-comments/' + review.id, payload)
            .subscribe((res: Response) => {
                console.log(res.json());
            });
    }

    likeImprovementReview(review: Review) {
        review.nofLikes = review.nofLikes + 1;
        let payload = review;
        this.http.put('http://localhost:4000/improvement-comments/' + review.id, payload)
            .subscribe((res: Response) => {
                console.log(res.json());
            });
    }

    disLikeGoodReview(review: Review) {
        review.nofDisLikes = review.nofDisLikes + 1;
        let payload = review;
        this.http.put('http://localhost:4000/good-comments/' + review.id, payload)
            .subscribe((res: Response) => {
                console.log(res.json());
            });
    }

    disLikeBadReview(review: Review) {
        review.nofDisLikes = review.nofDisLikes + 1;
        let payload = review;
        this.http.put('http://localhost:4000/bad-comments/' + review.id, payload)
            .subscribe((res: Response) => {
                console.log(res.json());
            });
    }

    disLikeImprovementReview(review: Review) {
        review.nofDisLikes = review.nofDisLikes + 1;
        let payload = review;
        this.http.put('http://localhost:4000/improvement-comments/' + review.id, payload)
            .subscribe((res: Response) => {
                console.log(res.json());
            });
    }

    getComments() {
        this.http.request('http://localhost:4000/db').subscribe((res: Response) => {
            this.setInitData(res.json());
        });
    }

    setInitData(data: Object) {
        console.log(data);
        this.goodReviews = data['good-comments'];
        this.badReviews = data['bad-comments'];
        this.improvementReviews = data['improvement-comments'];
        console.info(this.goodReviews);
        console.info(this.badReviews);
        console.info(this.improvementReviews);
    }
}
