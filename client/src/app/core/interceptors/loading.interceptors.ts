import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BusyService } from '../services/busy.service';
import { finalize, delay } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

    constructor(private busyService: BusyService) {}
   
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.busyService.busy();
        return next.handle(req).pipe(
            finalize(() => {
                this.busyService.idle();
            })
        )
    }

}