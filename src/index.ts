import {
  ActionEnum,
  searchAndHideSensitiveData,
  SensitiveDataType,
} from './handle-sensitive-data';
import { getSensitiveDataMock } from './sensitive-data.mock';

const printObfuscatedData = (
  sensitiveData: SensitiveDataType,
  action: keyof typeof ActionEnum,
): void => {
  console.log(
    searchAndHideSensitiveData({
      properties: sensitiveData,
      action,
    }),
  );
};

printObfuscatedData(getSensitiveDataMock().json, 'OBFUSCATE_CONTENT');
printObfuscatedData(getSensitiveDataMock().queryString, 'REMOVE_PROPERTY');
