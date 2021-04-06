import { Component, Input, OnDestroy, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { RegistrationComponent } from 'src/app/account/registration/registration.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
})
export class ModalContainerComponent implements OnDestroy {

  //@Input() comp = null;

  destroy = new Subject<any>();
  currentDialog!: NgbModalRef;

  constructor(
    private modalService : NgbModal,
    private route: ActivatedRoute,
    private router: Router
    ) {
      /*if(!this.comp){
        return;
      }
*/
      this.route.params.pipe(takeUntil(this.destroy)).subscribe(params => {
        this.currentDialog = this.modalService.open(RegistrationComponent, {centered: true});

        //this.router.navigateByUrl('/');
        this.currentDialog.result.then(result => {
          this.router.navigateByUrl('/');
        }, reason => {
          this.router.navigateByUrl('/');
        });
      })
    }

  ngOnDestroy(): void {
    this.destroy.next();
  }
}
