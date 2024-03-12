export enum LICENSE_DATA_FIELD {
  birthday = 'birthday',
  fullname = 'fullname',
  email = 'email',
  phone_number = 'phone_number',
  address = 'address',
  start_day = 'start_day',
  end_day = 'end_day',
  period = 'period',
  field = 'field',
  province = 'province',
  district = 'district',
  wards = 'wards',
  cv_path = 'cv_path',
  cv_edu = 'cv_edu',
  cv_exp = 'cv_exp',
}

// Sub fields of cv_edu
export enum CV_EDU_DATA_FIELD {
  school = 'school',
  major = 'major',
}

export const listGender = [
  {
    label: 'Nam',
    value: 0,
  },
  {
    label: 'Nữ',
    value: 1,
  },
  {
    label: 'Khác',
    value: 2,
  },
];

export const listFeild = [
  {
    label: 'Sale & Marketing',
    value: 0,
  },
  {
    label: 'Công nghệ thông tin',
    value: 1,
  },
  {
    label: 'Quản trị kinh doanh',
    value: 2,
  },
];
