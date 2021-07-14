import qs, { ParsedQs } from 'qs';

const KEYS_TO_SEARCH = [
  'client_id',
  'client_secret',
  'access_token',
  'refresh_token',
  'password',
];

const deepSearchAndHideSensitiveData = ({
  properties,
  currentDepth = 1,
}: {
  properties: ParsedQs;
  currentDepth?: number;
}): ParsedQs => {
  const MAX_DEPTH = 4;
  if (properties) {
    const propertiesWithoutSensitiveData = Object.keys(properties).reduce(
      (accumulator, property) => {
        if (KEYS_TO_SEARCH.includes(property)) {
          accumulator[property] = '**********';
        } else if (currentDepth < MAX_DEPTH) {
          switch (typeof properties[property]) {
            case 'object':
              deepSearchAndHideSensitiveData({
                properties: properties[property] as ParsedQs,
                currentDepth: currentDepth + 1,
              });
              break;
            default:
              accumulator[property] = properties[property];
              break;
          }
        } else {
          accumulator[property] = properties[property];
        }
        return accumulator;
      },
      {} as ParsedQs,
    );
    return propertiesWithoutSensitiveData;
  }
};

export const searchAndHideSensitiveData = (
  properties: ParsedQs | string,
): ParsedQs => {
  const objectProperties: ParsedQs =
    typeof properties === 'string'
      ? qs.parse(properties, { ignoreQueryPrefix: true })
      : properties;
  if (objectProperties) {
    const propertiesWithoutSensitiveData = deepSearchAndHideSensitiveData({
      properties: objectProperties,
    });

    return propertiesWithoutSensitiveData;
  }
};
