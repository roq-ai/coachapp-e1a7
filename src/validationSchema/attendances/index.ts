import * as yup from 'yup';

export const attendanceValidationSchema = yup.object().shape({
  date: yup.date().required(),
  attended: yup.boolean().required(),
  swimmer_id: yup.string().nullable().required(),
  coach_id: yup.string().nullable().required(),
});
