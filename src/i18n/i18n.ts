// src/i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector'; // Tự động phát hiện ngôn ngữ

i18n
  .use(LanguageDetector) // Phát hiện ngôn ngữ người dùng
  .use(initReactI18next) // Khởi tạo cho react-i18next
  .init({
    fallbackLng: 'en', // Ngôn ngữ dự phòng nếu không tìm thấy bản dịch
    supportedLngs: ['en', 'fr', 'es'], // Các ngôn ngữ hỗ trợ
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Đường dẫn đến các tệp bản dịch
    },
    detection: {
      order: ['cookie', 'localStorage', 'navigator'], // Tự động phát hiện ngôn ngữ
      caches: ['cookie'], // Lưu ngôn ngữ đã chọn vào cookie
    },
    interpolation: {
      escapeValue: false, // React đã mặc định chống lại XSS nên không cần escape
    },
  });

export default i18n;
