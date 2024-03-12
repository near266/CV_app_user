import { axiosInstanceV4 } from '@/shared/axios';
import { IGetListLicenseReq } from './uploadCV';
import axios from 'axios';

class UploadCVServiceService {
  createFormCV = async (formData: FormData) => {
    const response = await axiosInstanceV4.post('/enterprise/createForm', FormData);
    return response.data;
  };
}

export const upLoadCVServiceService = new UploadCVServiceService();
