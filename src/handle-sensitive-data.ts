import qs, { ParsedQs } from "qs";

export type SensitiveDataType = ParsedQs | string;

const KEYS_TO_SEARCH = [
  "password",
  "sensitive_data",
  "other_sensitive_data",
  "other_sensitive_information",
  "street",
];

const FIRST_LEVEL_OF_DEPTH = 1;
const MAX_DEPTH = 10;

const tryParseQuerystring = (properties: SensitiveDataType): ParsedQs =>
  typeof properties === "string"
    ? qs.parse(properties, { ignoreQueryPrefix: true })
    : properties;

const isItDepthLimit = (currentDepth: number): boolean => {
  return !(currentDepth <= MAX_DEPTH);
};

const isSensitiveData = (propertyKey: string): boolean =>
  KEYS_TO_SEARCH.includes(propertyKey);

const isAnObject = (properties: ParsedQs, propertyKey: string): boolean =>
  typeof properties[propertyKey] === "object";

const deepSearchAndHideSensitiveData = ({
  properties,
  currentDepth = FIRST_LEVEL_OF_DEPTH,
}: {
  properties: ParsedQs;
  currentDepth?: number;
}): ParsedQs => {
  const propertiesWithoutSensitiveData = Object.keys(properties).reduce(
    (accumulator, propertyKey) => {
      switch (true) {
        case isSensitiveData(propertyKey):
          accumulator[propertyKey] = "**********";
          break;
        case isItDepthLimit(currentDepth):
          accumulator[propertyKey] = properties[propertyKey];
          break;
        case isAnObject(properties, propertyKey):
          accumulator[propertyKey] = deepSearchAndHideSensitiveData({
            properties: properties[propertyKey] as ParsedQs,
            currentDepth: currentDepth + 1,
          });
          break;
        default:
          accumulator[propertyKey] = properties[propertyKey];
          break;
      }
      return accumulator;
    },
    {} as ParsedQs
  );
  return propertiesWithoutSensitiveData;
};

export const searchAndHideSensitiveData = (
  properties: SensitiveDataType
): string => {
  try {
    const propertiesWithoutSensitiveData = deepSearchAndHideSensitiveData({
      properties: tryParseQuerystring(properties),
    });

    return JSON.stringify(propertiesWithoutSensitiveData);
  } catch (error) {
    return "Sorry, but I couldn't convert the data.";
  }
};
