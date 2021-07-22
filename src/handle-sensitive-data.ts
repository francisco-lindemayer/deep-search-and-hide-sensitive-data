import qs, { ParsedQs } from 'qs';

export type SensitiveDataType = ParsedQs | string;

export enum ActionEnum {
  REMOVE_PROPERTY,
  OBFUSCATE_CONTENT,
}

const KEYS_TO_SEARCH = [
  'password',
  'sensitive_data',
  'other_sensitive_data',
  'other_sensitive_information',
  'street',
];

const FIRST_LEVEL_OF_DEPTH = 1;
const MAX_DEPTH = 10;

function tryParseQuerystring(properties: SensitiveDataType): ParsedQs {
  return typeof properties === 'string'
    ? qs.parse(properties, { ignoreQueryPrefix: true })
    : properties;
}

function isItDepthLimit(currentDepth: number): boolean {
  return !(currentDepth <= MAX_DEPTH);
}

function isSensitiveData(propertyKey: string): boolean {
  return KEYS_TO_SEARCH.includes(propertyKey);
}

function isAnObject(properties: ParsedQs, propertyKey: string): boolean {
  return typeof properties[propertyKey] === 'object';
}

const deepSearchAndHideSensitiveData = ({
  properties,
  action,
  currentDepth = FIRST_LEVEL_OF_DEPTH,
}: {
  properties: ParsedQs;
  action: keyof typeof ActionEnum;
  currentDepth?: number;
}): ParsedQs => {
  const propertiesWithoutSensitiveData = Object.keys(properties).reduce(
    (accumulator, propertyKey) => {
      switch (true) {
        case isSensitiveData(propertyKey):
          if (action === 'OBFUSCATE_CONTENT') {
            accumulator[propertyKey] = '**********';
          }
          break;
        case isItDepthLimit(currentDepth):
          accumulator[propertyKey] = properties[propertyKey];
          break;
        case isAnObject(properties, propertyKey):
          accumulator[propertyKey] = deepSearchAndHideSensitiveData({
            properties: properties[propertyKey] as ParsedQs,
            action,
            currentDepth: currentDepth + 1,
          });
          break;
        default:
          accumulator[propertyKey] = properties[propertyKey];
          break;
      }
      return accumulator;
    },
    {} as ParsedQs,
  );
  return propertiesWithoutSensitiveData;
};

export const searchAndHideSensitiveData = ({
  properties,
  action = 'OBFUSCATE_CONTENT',
}: {
  properties: SensitiveDataType;
  action: keyof typeof ActionEnum;
}): string => {
  try {
    const propertiesWithoutSensitiveData = deepSearchAndHideSensitiveData({
      properties: tryParseQuerystring(properties),
      action,
    });

    return JSON.stringify(propertiesWithoutSensitiveData);
  } catch (error) {
    return "Sorry, but I couldn't convert the data.";
  }
};
