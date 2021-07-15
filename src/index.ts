import { searchAndHideSensitiveData } from "./handle-sensitive-data";
import { getSensitiveDataMock } from "./sensitive-data.mock";

console.log(JSON.stringify(searchAndHideSensitiveData(getSensitiveDataMock())));
