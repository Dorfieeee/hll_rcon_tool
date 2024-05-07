
const action = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData());
  const { intent } = formData;

  if (intent === 'reset_map') {
    const { current_map } = formData;
    console.log('RESET', current_map);
    return { success: true }
  } else if (intent === 'next_map') {
    const { next_map } = formData;
    console.log('NEXT', next_map);
    return { success: true }
  }
};

export default action;
