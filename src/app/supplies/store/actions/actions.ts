import { suppliesSlice } from '../slice/slice';
//services
import suppliesDataService from '../../services/supplies-data.service';
//repository
import suppliesRepository from '../../repository/supplies-repository';
//types
import type { AppThunk } from '../../../../types';
import type {
  IChangeItemSetting,
  IClearItemAction,
  ISuppliesItem,
  IIncDecAction,
} from '../../types';

const { increment, decrement, log, clearItem, clearData, changeItemSetting } =
  suppliesSlice.actions;

export const incrementAction =
  (action: IIncDecAction): AppThunk =>
  (dispatch, getState) => {
    dispatch(increment(action));

    const newLog = {
      log: action.logText ? action.logText : `+${action.value.toString()}`,
      logName: action.logName,
      UNID: action.UNID,
    };

    dispatch(log(newLog));
    suppliesRepository.sendData(getState().supplies);
  };

export const decrementAction =
  (action: IIncDecAction): AppThunk =>
  (dispatch, getState) => {
    dispatch(decrement(action));

    const newLog = {
      log: action.logText ? action.logText : `-${action.value.toString()}`,
      logName: action.logName,
      UNID: action.UNID,
    };

    dispatch(log(newLog));
    suppliesRepository.sendData(getState().supplies);
  };

export const clearItemDataAction =
  (action: IClearItemAction<ISuppliesItem>): AppThunk =>
  (dispatch, getState) => {
    const clearedItem = suppliesDataService.getDataItem(action.item.UNID);
    dispatch(clearItem({ item: clearedItem }));

    suppliesRepository.sendData(getState().supplies);
  };

export const clearDataAction = (): AppThunk => (dispatch, getState) => {
  const clearedItem = suppliesDataService.getData();
  dispatch(clearData(clearedItem));

  suppliesRepository.sendData(getState().supplies);
};

export const changeItemSettingAction =
  (action: IChangeItemSetting): AppThunk =>
  (dispatch, getState) => {
    dispatch(changeItemSetting(action));
    suppliesRepository.sendData(getState().supplies);
  };