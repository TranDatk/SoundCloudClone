import { endpoints } from "./api";
import API from './api';

export const getTrackList = async (currentPage : number) => {
    try {
      const trackList = await API.get(`${endpoints["tracks"]}?page=${currentPage}`);
      return trackList;
    } catch (error) {
      console.error("Đã xảy ra lỗi khi lấy danh sách bài nhạc:", error);
      throw error; 
    }
};


export const hideTrack = async (id: number) => {
    try {
      const res = await API.post(endpoints["tracks"] + `${id}/hide-track/`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return res; 
  
    } catch (error) {
      console.error("Đã xảy ra lỗi khi ẩn track:", error);
      throw error;
    }
};