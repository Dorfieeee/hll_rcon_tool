import { get } from '../../utils/fetchUtils';

const loader = async () => {
  const response = await get('get_services');
  if (response.status >= 500) {
    throw new Response('Internal Server Error', { status: response.status });
  }
  const json = await response.json();
  if (json.error) {
    throw new Response(json.error, { status: 500 });
  }

  const services = json.result;

  return { services };
};

export default loader;
