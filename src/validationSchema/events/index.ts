import * as yup from 'yup';

export const eventValidationSchema = yup.object().shape({
  name: yup.string().required(),
  swim_meet_id: yup.string().nullable().required(),
  swimmer_id: yup.string().nullable().required(),
});
