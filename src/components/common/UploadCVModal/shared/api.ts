import { IGetListLicenseReq } from './uploadCV';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_UPLOAD_CV;

class UploadCVServiceService {
  createFormCV = async (params: any) => {
    try {
      const { data } = await axios.post(`${API_URL}/enterprise/createForm`, params);
      return data;
    } catch (error) {
      console.error('Error creating form CV:', error);
      throw error;
    }
  };
}

export const upLoadCVServiceService = new UploadCVServiceService();
