import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, queueScheduler } from 'rxjs';
import { filter, map, observeOn, tap } from 'rxjs/operators';
import { AuthService } from '../../auth/user-auth/facade/auth.service';
import { B2BAddress, CostCenter } from '../../model/org-unit.model';
import { OCC_USER_ID_ANONYMOUS } from '../../occ/utils/occ-constants';
import { StateWithProcess } from '../../process/store/process-state';
import { LoaderState } from '../../state/utils/loader/loader-state';
import { UserActions } from '../store/actions/index';
import { UsersSelectors } from '../store/selectors/index';
import { StateWithUser } from '../store/user-state';

@Injectable({
  providedIn: 'root',
})
export class UserCostCenterService {
  constructor(
    protected store: Store<StateWithUser | StateWithProcess<void>>,
    protected authService: AuthService
  ) {}

  /**
   * Load all visible active cost centers for the currently login user
   */
  loadActiveCostCenters(): void {
    this.authService.invokeWithUserId((userId) => {
      if (userId && userId !== OCC_USER_ID_ANONYMOUS) {
        this.store.dispatch(new UserActions.LoadActiveCostCenters(userId));
      }
    });
  }

  private getCostCentersState(): Observable<LoaderState<CostCenter[]>> {
    return this.store.select(UsersSelectors.getCostCentersState);
  }

  /**
   * Get all visible active cost centers
   */
  getActiveCostCenters(): Observable<CostCenter[]> {
    return this.getCostCentersState().pipe(
      observeOn(queueScheduler),
      tap((process: LoaderState<CostCenter[]>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadActiveCostCenters();
        }
      }),
      filter(
        (process: LoaderState<CostCenter[]>) => process.success || process.error
      ),
      map((result) => result.value)
    );
  }

  /**
   * Get the addresses of the cost center's unit based on cost center id
   * @param costCenterId cost center id
   */
  getCostCenterAddresses(costCenterId: string): Observable<B2BAddress[]> {
    return this.getActiveCostCenters().pipe(
      map((costCenters) => {
        const costCenter = costCenters.find((cc) => cc.code === costCenterId);
        if (costCenter && costCenter.unit) {
          return costCenter.unit.addresses;
        } else {
          return [];
        }
      })
    );
  }
}