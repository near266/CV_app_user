// interface ICvEdu {
//   school: string;
//   major: string;
//   detail: string;
//   period: string;
//   created_at: string;
//   updated_at: string;
// }

// interface ICvExp {
//   company: string;
//   position: string;
//   detail: string;
//   period: string;
//   created_at: string;
//   updated_at: string;
// }

// interface ICvUpdateCvs {
//   assessment_id: number;
//   user_id: string;
//   note: string;
//   position_desire: string;
//   type_work: string;
//   cv_path: string;
//   status: number;
//   created_at: string;
// }
// export interface IGetListLicenseReq {
//   fullname?: string;
//   apply_position?: string;
//   phone_number?: string;
//   email?: string;
//   birthday?: string;
//   address?: string;
//   status?: number;
//   created_at?: string;
//   updated_at?: string;
//   created_by?: string;
//   updated_by?: string;
//   assessment_id?: number;
//   assessment_result_id?: number;
//   cv_Update_Cvs?: ICvUpdateCvs;
//   cv_edu?: ICvEdu[];
//   cv_exp?: ICvExp[];
// }

export interface IGetListLicenseReq {
  fullname: string;
  apply_position: string;
  phone_number: string;
  email: string;
  birthday: string;
  address: string;
  status: number;
  created_by: string;
  updated_by: string;
  assessment_id: number;
  assessment_result_id: number;
  cv_Update_Cvs: {
    assessment_id: number;
    user_id: string;
    note: string;
    position_desire: string;
    type_work: string;
    cv_path: string;
    status: number;
    created_at: string;
  };
  cv_edu: {
    school: string;
    major: string;
    detail: string;
    start_day: string;
    end_day: string;
  }[];
  cv_exp: {
    company: string;
    position: string;
    detail: string;
    period: string;
  }[];
}
