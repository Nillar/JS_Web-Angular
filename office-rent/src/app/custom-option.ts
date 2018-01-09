import {ToastOptions} from 'ng2-toastr';

export class CustomOption extends ToastOptions {
  animate = 'fade';
  toastLife = 2500;
  newestOnTop = true;
  showCloseButton = true;
  dismiss = 'auto';
  maxShown: 1;
}
