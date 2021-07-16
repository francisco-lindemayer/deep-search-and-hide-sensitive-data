import {
  searchAndHideSensitiveData,
  SensitiveDataType,
} from "./handle-sensitive-data";
import { getSensitiveDataMock } from "./sensitive-data.mock";

const printObfuscatedData = (sensitiveData: SensitiveDataType): void => {
  console.log(searchAndHideSensitiveData(sensitiveData));
};

printObfuscatedData(getSensitiveDataMock().json);
printObfuscatedData(getSensitiveDataMock().query_string);
