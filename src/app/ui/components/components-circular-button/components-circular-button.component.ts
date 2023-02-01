import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ButtonLogin } from '@models/login';
import { LoginComunicationProvider } from '@providers/login-comunication/login-comunication.provider';
import { UIProgressButton } from './SVG';
import {Subscription} from 'rxjs';

@Component({
  selector: 'components-circular-button',
  templateUrl: './components-circular-button.component.html',
  styleUrls: ['./components-circular-button.component.scss'],
})
export class ComponentsCircularButtonComponent implements OnInit {
  public loading: boolean;
  public error: boolean;
  public success: boolean;
  private subscription: Subscription;
  private svg: UIProgressButton;

  constructor(
      private el: ElementRef,
      private com: LoginComunicationProvider
  ) {
  }

  @Input() set status(value: boolean) {
      if (value) {
          this.ngOnDestroy();
          this.ngOnInit();
      } else {
          this.ngOnDestroy();
      }
  }

  public start() {
      this.svg.submit();
  };

  ngOnInit(): void {
      const self = this;

      this.svg = new UIProgressButton(this.el.nativeElement, {
          statusTime: 1000,
          progress: this.progress.bind(this),
          reset: this.reset.bind(this)
      });

      this.subscription = this.com.navItem$
          .subscribe((event: ButtonLogin) => {
              if (event.loading) {
                  self.loading = true;
              } else if (event.success) {
                  self.success = true;
                  self.svg.stop(1, event.callback);
              } else if (event.error) {
                  self.error = true;
                  self.svg.stop(-1, event.callback);
              } else if (event.done) {
                  this.subscription.unsubscribe();
              }
          });
  }

  ngOnDestroy(): void {
      //console.log('ngOnDestroy: components-circular-button');
      if (this.subscription) {
          this.subscription.unsubscribe();
      }
  }

  private progress(instance: UIProgressButton) {
      let progress = 0,
          interval = setInterval(function () {
              progress = Math.min(progress + Math.random() * 0.1, 0.75);
              instance.setProgress(progress);

              if (progress === 0.75) {
                  clearInterval(interval);
              }
          }, 150);
  }

  private reset() {
      this.loading = false;
      this.error = false;
      this.success = false;
  }
}
