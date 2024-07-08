// app.config.ts
import {
  ApplicationConfig,
  isDevMode,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { appReducers } from './store/app.state';
import { provideEffects } from '@ngrx/effects';
import { UserEffect } from './store/userState/user.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule,
  provideRouterStore,
  routerReducer,
} from '@ngrx/router-store';
import { Serializer } from '@angular/compiler';
import { CustomSerializer } from './store/router/custom-route-serializer';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(NoopAnimationsModule),
    provideRouter(routes),
    provideHttpClient(),
    provideStore(appReducers),
    provideEffects(UserEffect),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideRouterStore({ serializer: CustomSerializer }),
    provideAnimationsAsync(),
  ],
};
