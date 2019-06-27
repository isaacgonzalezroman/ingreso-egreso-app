import { Action } from '@ngrx/store';

export const ACTIVAR_LOADING = '[User interface Loading] Cargando...';
export const DESACTIVAR_LOADING = '[User interface Loading] Fin de carga...';

export class ActivarLoadingAction implements Action {
    readonly type = ACTIVAR_LOADING;
}

export class DesctivarLoadingAction implements Action {
    readonly type = DESACTIVAR_LOADING;
}

export type acciones = ActivarLoadingAction | DesctivarLoadingAction ;
