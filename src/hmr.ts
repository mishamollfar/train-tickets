import { NgModuleRef, ApplicationRef } from '@angular/core';
import { createNewHosts } from '@angularclass/hmr';

export const hmrBootstrap = (module: any, bootstrap: () => Promise<NgModuleRef<any>>) => {
  let ngModule: NgModuleRef<any>;
  module.hot.accept();
  bootstrap().then(mod => (ngModule = mod));
  module.hot.dispose(() => {
    const appRef: ApplicationRef = ngModule.injector.get(ApplicationRef);
    const elements = appRef.components.map(c => c.location.nativeElement);
    const makeVisible = createNewHosts(elements);
    ngModule.destroy();
    const materialOverlay = document.querySelector('.cdk-overlay-container');
    const materialOverlayHiden = document.querySelector('.cdk-visually-hidden');
    if (materialOverlay) {
      materialOverlay.remove();
    }
    if (materialOverlayHiden) {
      materialOverlayHiden.remove();
    }
    makeVisible();
  });
};
