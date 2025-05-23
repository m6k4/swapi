export const prepareEndpointName = (endpoint: string): string => {
  let endpointName = endpoint.replace(import.meta.env.VITE_BASE_API, '');

  endpointName = endpointName.split('?')[0];

  const endpointNameParts = endpointName.split('/');
  
  let endpointWithoutParams = ''
  for (let i = 0; i < endpointNameParts.length; i++) {
    if (isNaN(parseInt(endpointNameParts[i]))) {
      endpointWithoutParams += '/' + endpointNameParts[i];
    } else {
      break;
    }

  }

  return endpointWithoutParams;
}